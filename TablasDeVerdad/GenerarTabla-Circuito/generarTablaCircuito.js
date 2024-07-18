"use strict";
const btnCalc = document.getElementById("calculate");
const txtExpression = document.getElementById("txtExpression");
const toggleBtn = document.getElementById('toggleBtn');
const info = document.getElementById('info');
var trutTable = [];
var headers = "";
const getVariables = function (expression) {
    let variables = "";
    let regex = /^[a-zA-Z]$/;
    expression.split('').forEach((caracter) => {
        if (regex.test(caracter)) {
            variables += caracter;
        }
    });
    return variables.replace((/(.)(?=.*\1)/g), "");
};
const fillPrepositions = function (rows, columns) {
    let table = [];
    //Llenar las combinaciones
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let positionValue = Math.floor(i / Math.pow(2, j)) % 2;
            //las columnas no existen por ello se crean
            if (!Array.isArray(table[i])) {
                table[i] = [];
            }
            if (positionValue == 0) {
                table[i].unshift(1);
            }
            else {
                table[i].unshift(0);
            }
        }
    }
    return table;
};
const getSubExpressions = function (expression) {
    let regex = /\(([^()]|\([^()]*\))+\)/g;
    let expressions = [];
    let exp;
    while ((exp = regex.exec(expression)) !== null) {
        expressions.push(exp[0]);
    }
    let count = expressions.length;
    for (let i = 0; i < count; i++) {
        //console.log(expressions[i]);
        while ((exp = regex.exec(expressions[i].slice(1, -1))) !== null) {
            expressions.splice(i, 0, exp[0]);
            i++;
            count++;
        }
    }
    return expressions;
};
const evaluateBrackets = function (table, subExpressions, prepositions, type) {
    let variables = {};
    prepositions.split('').forEach((caracter) => {
        variables[caracter] = [];
    });
    table.forEach((element, indexI) => {
        let indexJ = 0;
        for (let porperty in variables) {
            variables[porperty] = !!element[indexJ];
            indexJ++;
        }
        //console.log(variables)
        subExpressions.forEach((subExp) => {
            if (type == "Expresión Booleana") {
                let subExpression = createValidOperation(subExp);
                //console.log(subExpression)
                let res = eval(subExpression);
                //console.log(res)
                trutTable[indexI].push((res === true) ? 1 : 0);
            }
            else {
                let subExpression = createSOP(subExp);
                //console.log(subExpression)
                let res = eval(subExpression);
                //console.log(res)
                trutTable[indexI].push((res === true) ? 1 : 0);
            }
        });
    });
};
const createValidOperation = function (subExpression) {
    let exp = "";
    subExpression.split('').forEach((caracter) => {
        exp += ' ';
        // Verifica si el carácter es una letra
        if ((/^[a-zA-Z]$/).test(caracter)) {
            exp += 'variables.' + caracter;
        }
        else {
            exp += caracter;
        }
    });
    exp = exp.replaceAll('∧', '&&').replaceAll('∨', '||').replaceAll('¬ ', '!').replaceAll('⇔', '==').replaceAll('⇒ ', '&& !');
    if (exp.includes("&& !")) {
        exp = '!' + exp;
    }
    //console.log(exp);
    return exp;
};
const createSOP = function (sop) {
    let exp = "";
    sop.split('').forEach((caracter) => {
        // Verifica si el carácter es una letra
        if ((/^[a-zA-Z]$/).test(caracter)) {
            exp += 'variables.' + caracter;
        }
        else {
            exp += caracter;
        }
    });
    exp = exp.replace(/([a-zA-Z])variables/g, '$1*variables');
    exp = exp.replace(/([a-zA-Z])¬/g, '$1*¬');
    exp = exp.replaceAll('+', ' || ').replaceAll('¬', '!').replaceAll('*', ' && ');
    //console.log(exp)
    return exp;
};
const printTable = function (table, subExpressions, prepositions) {
};
if (toggleBtn != null) {
    toggleBtn.addEventListener('change', function () {
        if (info != null) {
            if (this.checked) {
                info.textContent = "Suma de productos";
            }
            else {
                info.textContent = "Expresión Booleana";
            }
        }
    });
}
if (btnCalc != null) {
    btnCalc.addEventListener('click', () => {
        let initialInput = "";
        if (txtExpression != null) {
            initialInput = txtExpression.value;
        }
        let prepositions = getVariables(initialInput);
        let rows = Math.pow(2, prepositions.length);
        let columns = prepositions.length;
        trutTable = fillPrepositions(rows, columns);
        let subExpressions = getSubExpressions(initialInput);
        subExpressions.push("(" + initialInput + ")");
        let type = "";
        if (info != null && info.textContent != null) {
            type = info.textContent;
        }
        //console.log(initialInput);
        //console.log(variables);
        //console.log(trutTable);
        //console.log(subExpressions);
        evaluateBrackets(trutTable, subExpressions, prepositions, type);
        console.log(trutTable);
    });
}
