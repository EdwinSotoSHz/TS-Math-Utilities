"use strict";
/* *****************************************************************************************************
            * Obtener datos del usuario
***************************************************************************************************** */
const inputElement = document.getElementById('inputData');
const getData = function () {
    let inputString = inputElement.value.trim();
    let dataArray = inputString.split(',').map(value => value.trim());
    return dataArray;
};
const getValueCheck = function (checkElement) {
    let isChecked = false;
    if (checkElement != null) {
        isChecked = checkElement.checked;
    }
    //console.log(isChecked)
    return isChecked;
};
const checkType = document.getElementById('type');
const checkOrder = document.getElementById('checkOrder');
const checkWay = document.getElementById('checkWay');
const tableContainer = document.getElementById('tableContainer');
const numClass = document.getElementById('numClass');
const showData = function () {
    let classNum = 0;
    let dataArray = getData();
    let content = [];
    let headers = [];
    let isContinuosData = getValueCheck(checkType);
    if (isContinuosData == false) {
        checkOrder.removeAttribute('disabled');
        checkWay.setAttribute('disabled', 'true');
        numClass.setAttribute('disabled', 'true');
        let sortByFreq = getValueCheck(checkOrder);
        headers = ["Clase", "F<sub>a</sub>", "F<sub>r</sub>", "F<sub>r</sub> Acum."];
        let class_fa_fr_frAc = generateDiscreteCuantitativeData(dataArray, sortByFreq);
        classNum = class_fa_fr_frAc[0].length;
        numClass.value = classNum.toString();
        content = class_fa_fr_frAc;
    }
    else {
        checkOrder.setAttribute('disabled', 'true');
        checkWay.removeAttribute('disabled');
        numClass.removeAttribute('disabled');
        let way = getValueCheck(checkWay);
        headers = ["Clase", "Límites inferiores", "Límites superiores", "Marca de clase", "F<sub>a</sub>", "F<sub>r</sub>", "F<sub>r</sub> Acum."];
        let class_limsL_limsU_mkC_fa_fr_frAc = generateContinousCuantitativeData(dataArray, way, numClass.value);
        classNum = class_limsL_limsU_mkC_fa_fr_frAc[0].length;
        numClass.value = classNum.toString();
        content = class_limsL_limsU_mkC_fa_fr_frAc;
    }
    if (tableContainer != null) {
        //console.table(class_fa_faAc_fr_frAc)
        tableContainer.innerHTML = '';
        printHTMLTable(headers, content, tableContainer);
    }
};
const btnData = document.getElementById('btnData');
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
    checkType.addEventListener('change', () => { numClass.value = ''; });
}
inputElement.addEventListener('change', () => {
    let inputString = inputElement.value;
    inputElement.value = inputString.replace(/[^,\.\d]/g, '').replaceAll(',,', ',').replaceAll(',,,', ',');
    if (inputString.includes('.')) {
        checkType.checked = true;
    }
    else {
        checkType.checked = false;
    }
    numClass.value = '';
});
