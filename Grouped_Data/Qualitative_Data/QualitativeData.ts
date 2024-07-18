/*
    * Metodos para contruir las distribuciones de frecuencia
*/
const highestToLowestFreu = function(classList: any[], freqList: number[]): [any[], number[]] {
    const l = classList.length;
    for (let i = 0; i < l; i++) {
        let elemento = i;
        for (let j = i + 1; j < l; j++) {
            if (freqList[j] < freqList[elemento]) {
                elemento = j;
            }
        }
        [classList[i], classList[elemento]] = [classList[elemento], classList[i]];
        [freqList[i], freqList[elemento]] = [freqList[elemento], freqList[i]];
    }
    return [classList, freqList];
}

const formatData = function(dataArray: any[]): any[] {
    let dataArraySorted: any[] = [];
    for (let element of dataArray) {
        if (typeof element === 'string') {
            element = (element.trim().toLowerCase()).replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u');
            dataArraySorted.push(element);
        } else {
            element = parseFloat(element.toFixed(3));
            dataArraySorted.push(element);
        }
    }
    return dataArraySorted;
}

const sum = function(array: number[]) {
    return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

const generateQualitativeData = function(lstData: any[], sortByfrequency: boolean): [any[], number[], string[], string[]] {
    lstData = formatData(lstData);
    lstData.sort();
    let lstClass: any[] = [];
    let freqAbs: number[] = [];
    
    for (let element of lstData) {
        if (!lstClass.includes(element)) {
            lstClass.push(element);
            freqAbs.push(1);
        } else {
            freqAbs[lstClass.indexOf(element)] += 1;
        }
    }

    if (sortByfrequency) {
        [lstClass, freqAbs] = highestToLowestFreu(lstClass, freqAbs);
    }
    
    let frecRel: string[] = [];
    let frecRelAc: string[] = [];
    let freqAbsT = sum(freqAbs);
    let ultFa = 0, ultFr = 0;
    
    for (let fa of freqAbs) {
        const fr = 100 / freqAbsT * fa;
        frecRel.push(parseFloat(fr.toFixed(3))+'%');
        frecRelAc.push(parseFloat((fr + ultFr).toFixed(3))+'%');
        ultFr += fr;
        ultFa += fa;
    }
    
    return [lstClass, freqAbs, frecRel, frecRelAc];
}

/*
    * Obtener datos del usuario
*/
const getData = function(): string[] {
    let inputElement = document.getElementById('inputData') as HTMLInputElement;
    let inputString = (inputElement.value).trim(); 
    let dataArray = inputString.split(',').map(value => value.trim());    
    return dataArray;
}

const checkOrder = document.getElementById('checkOrder') as HTMLInputElement;
const getOrderCheck = function(): boolean {
    let isChecked: boolean = false; 
    if (checkOrder != null) {
        isChecked = checkOrder.checked;
    }
    //console.log(isChecked)
    return isChecked;
}

const tableContainer = document.getElementById('tableContainer') as HTMLDivElement;
const showData = function(){
    let dataArray: string[] = getData();
    let orderCheck = getOrderCheck();
    let class_fa_fr_frAc: any[] = generateQualitativeData(dataArray, orderCheck);
    const headers: string[] = ["Clases", "F<sub>a</sub>", "F<sub>r</sub>", "F<sub>r</sub> Acum."]
    
    if (tableContainer != null){
        //console.table(class_fa_faAc_fr_frAc)
        tableContainer.innerHTML = '';
        printHTMLTable(headers, class_fa_fr_frAc, tableContainer)
    }
}

const btnData = document.getElementById('btnData') as HTMLButtonElement;
if (btnData != null) {
    btnData.addEventListener('click', showData);
}
if (checkOrder != null) {
    checkOrder.addEventListener('click', showData);
}