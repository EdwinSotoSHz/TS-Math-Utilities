"use strict";
const btnCalc = document.getElementById("calculate");
const inputDataSet = document.getElementById("outputsZero");
const inputNumberBits = document.getElementById("numberBits");
const trutTable = document.getElementById("trutTable");
const lblExpression = document.getElementById("expresion");
const lblNumberBits = document.getElementById("nBits");
const prepositions = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
//Llenar matriz que contiene la tabla de verdad
const fillTable = function (rows, columns, outputsZero) {
    let table = [];
    let numericOutputsZero = outputsZero.map((element) => {
        return parseInt(element) - 1;
    });
    numericOutputsZero = numericOutputsZero.sort((a, b) => a - b);
    //Llenar las combinaciones
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let positionValue = Math.floor(i / Math.pow(2, j)) % 2;
            //las columnas no existen por ello se crean
            if (!Array.isArray(table[i])) {
                table[i] = [];
            }
            if (positionValue == 0) {
                table[i].unshift(0);
            }
            else {
                table[i].unshift(1);
            }
        }
    }
    //LLenar las salidas de la tabla
    for (let i = 0; i < rows; i++) {
        if (numericOutputsZero.includes(i)) {
            table[i].push(1);
        }
        else {
            table[i].push(0);
        }
    }
    return table;
};
//Imprimir tabla
const createTable = function (rows, columns, table) {
    let row;
    let cell;
    row = document.createElement('tr');
    cell = document.createElement('td');
    cell.textContent = "No.";
    row.appendChild(cell);
    for (let i = 0; i <= columns; i++) {
        cell = document.createElement('td');
        if (i != columns) {
            cell.textContent = prepositions[i];
            row.appendChild(cell);
        }
        else {
            cell.textContent = "Salida";
            row.appendChild(cell);
        }
    }
    if (trutTable != null) {
        trutTable.innerHTML = "";
        trutTable.appendChild(row);
    }
    for (let i = 0; i < rows; i++) {
        row = document.createElement('tr');
        cell = document.createElement('td');
        cell.textContent = (i + 1).toString();
        row.appendChild(cell);
        for (let j = 0; j <= columns; j++) {
            cell = document.createElement('td');
            cell.textContent = table[i][j];
            row.appendChild(cell);
        }
        if (trutTable != null) {
            trutTable.appendChild(row);
        }
    }
};
//Generar expresion booleana
const generateBooleanExpression = function (rows, columns, table) {
    let expression = "";
    let aux = [];
    let count = 0;
    for (let i = 0; i < rows; i++) {
        if (table[i][columns] == 1) {
            for (let j = 0; j < columns; j++) {
                //Otra ves las columnas no existen
                if (!Array.isArray(aux[count])) {
                    aux[count] = [];
                }
                console.log(table[i][j]);
                aux[count].push((table[i][j]).toString());
            }
            count++;
        }
    }
    console.log(aux);
    for (let i = 0; i < aux.length; i++) {
        for (let j = 0; j < aux[i].length; j++) {
            if ('0' === aux[i][j]) {
                aux[i][j] = `<u class="notSimbol">${prepositions[j]}</u>`;
            }
            else {
                aux[i][j] = prepositions[j].toString();
            }
        }
    }
    console.log(aux);
    //Concatear arreglo en una cadena
    aux.forEach((element, index) => {
        element.forEach((value) => {
            expression += value.toString();
        });
        if (index != aux.length - 1) {
            expression += " + ";
        }
    });
    return expression;
};
if (inputNumberBits != null) {
    inputNumberBits.addEventListener('input', () => {
        if (lblNumberBits != null) {
            lblNumberBits.textContent = (2 ** parseInt(inputNumberBits.value)).toString();
            if (inputNumberBits.value == "")
                lblNumberBits.textContent = "1";
        }
    });
}
if (btnCalc != null) {
    btnCalc.addEventListener('click', () => {
        let rows = 0;
        let columns = 0;
        let outputsZero = [];
        if (inputDataSet != null && inputNumberBits != null) {
            rows = Math.pow(2, parseInt(inputNumberBits.value));
            columns = parseInt(inputNumberBits.value);
            outputsZero = inputDataSet.value.split(",");
        }
        let table = fillTable(rows, columns, outputsZero);
        console.log(table);
        createTable(rows, columns, table);
        if (lblExpression != null) {
            lblExpression.innerHTML = generateBooleanExpression(rows, columns, table);
        }
    });
}
