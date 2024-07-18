/* *****************************************************************************************************
            * Obtener datos del usuario
***************************************************************************************************** */
const inputElement = document.getElementById('inputData') as HTMLInputElement;
const getData = function(): string[] {
    let inputString = inputElement.value.trim(); 
    let dataArray = inputString.split(',').map(value => value.trim());    
    return dataArray;
}
const getValueCheck = function(checkElement: HTMLInputElement): boolean {
    let isChecked: boolean = false; 
    if (checkElement != null) {
        isChecked = checkElement.checked;
    }
    //console.log(isChecked)
    return isChecked;
}

const checkType = document.getElementById('type') as HTMLInputElement;
const checkOrder = document.getElementById('checkOrder') as HTMLInputElement;
const checkWay = document.getElementById('checkWay') as HTMLInputElement;
const tableContainer = document.getElementById('tableContainer') as HTMLDivElement;
const numClass = document.getElementById('numClass') as HTMLInputElement;
const showData = function(){
    let classNum: number = 0;
    let dataArray: string[] = getData();
    let content: any[] = [];
    let headers: string[] = [];
    let isContinuosData = getValueCheck(checkType);
    if (isContinuosData == false) {
        checkOrder.removeAttribute('disabled');
        checkWay.setAttribute('disabled', 'true');
        numClass.setAttribute('disabled', 'true');

        let sortByFreq = getValueCheck(checkOrder);
        headers = ["Clase", "F<sub>a</sub>", "F<sub>r</sub>", "F<sub>r</sub> Acum."]
        let class_fa_fr_frAc: any[] = generateDiscreteCuantitativeData(dataArray, sortByFreq);
        classNum = class_fa_fr_frAc[0].length;
        numClass.value = classNum.toString();
        content = class_fa_fr_frAc;
    }else{
        checkOrder.setAttribute('disabled', 'true');
        checkWay.removeAttribute('disabled');
        numClass.removeAttribute('disabled');

        let way = getValueCheck(checkWay);
        headers = ["Clase", "Límites inferiores", "Límites superiores", "Marca de clase", "F<sub>a</sub>", "F<sub>r</sub>", "F<sub>r</sub> Acum."]
        let class_limsL_limsU_mkC_fa_fr_frAc: any[] = generateContinousCuantitativeData(dataArray, way, numClass.value);
        classNum = class_limsL_limsU_mkC_fa_fr_frAc[0].length;
        numClass.value = classNum.toString();
        content = class_limsL_limsU_mkC_fa_fr_frAc;
    }
    
    if (tableContainer != null){
        //console.table(class_fa_faAc_fr_frAc)
        tableContainer.innerHTML = '';
        printHTMLTable(headers, content, tableContainer)
    }
}

const btnData = document.getElementById('btnData') as HTMLButtonElement;
if (btnData != null) {
    btnData.addEventListener('click', showData);
}
if (checkOrder != null) {
    checkOrder.addEventListener('click', showData);
}
if (checkWay != null) {
    checkWay.addEventListener('click', showData);
}
if (checkType != null) {
    checkType.addEventListener('change', ()=>{numClass.value = '';});
}

inputElement.addEventListener('change',()=>{
    let inputString = inputElement.value; 
    inputElement.value = inputString.replace(/[^,\.\d]/g, '').replaceAll(',,',',').replaceAll(',,,',',');
    if (inputString.includes('.')) {
        checkType.checked = true;
    }else{
        checkType.checked = false;
    }
    numClass.value = ''
});