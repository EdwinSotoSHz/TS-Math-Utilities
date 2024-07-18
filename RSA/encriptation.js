"use strict";
const calcN = (p, q) => {
    let n = p * q;
    return n;
};
const calcPhiN = (p, q) => {
    let phiN = (p - 1) * (q - 1);
    return phiN;
};
const MCD = (a, b) => {
    while (b !== 0) {
        let bOrnal = b;
        b = a % b;
        a = bOrnal;
    }
    return a;
};
const MCDTable = (phiN, e) => {
    let table = [];
    e.forEach(element => {
        if (MCD(phiN, element) == 1) {
            table.push([phiN, element]);
        }
    });
    return table;
};
const calcD = (phiN, e) => {
    let d = 0;
    for (let k = 1; k <= e; k++) {
        let dValue = (1 + k * phiN) / e;
        // console.log(dValue)
        if ((dValue % 1) === 0) {
            d = dValue;
        }
    }
    return d;
};
const convertMessage = (message) => {
    let m = message.split('');
    let me = [];
    let number = '';
    let numsAlf = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c',
        'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q',
        'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'á', 'é', 'í', 'ó', 'ú'
    ];
    m.forEach(element => {
        if (/^[0-9]$/.test(element)) {
            number += element;
        }
        else if (element == ' ') {
            me.push(BigInt(-1));
        }
        else if (element == '.') {
            me.push(BigInt(number));
            me.push(BigInt(-2));
            number = '';
        }
        else {
            me.push(BigInt(numsAlf.indexOf(element)));
        }
    });
    if (/[0-9]/.test(message)) {
        me.push(BigInt(number));
    }
    return me;
};
const calcCM = (num, ed, n) => {
    // Calcula num^ed % n utilizando BigInt
    let result = BigInt(1);
    for (let i = BigInt(0); i < ed; i++) {
        result = (result * num) % n;
    }
    return result.toString();
};
const cPrintable = (nums, e, n) => {
    let cArray = [];
    if (nums.includes(BigInt(-2))) {
        let numPE = nums[0];
        let numPD = nums[2];
        let enc = calcCM(BigInt(numPE), BigInt(e), BigInt(n)) + '.' + calcCM(BigInt(numPD), BigInt(e), BigInt(n));
        cArray.push(`<i>C = ${numPE}.${numPD}<sup>${e}</sup> Mod(${n})</i> = ${enc}<br>`);
    }
    else {
        nums.forEach(num => {
            if (num == BigInt(-1)) {
                cArray.push(' ');
            }
            else {
                cArray.push(`<i>C = ${num}<sup>${e}</sup> Mod(${n})</i> = ${calcCM(BigInt(num), BigInt(e), BigInt(n))}<br>`);
            }
        });
    }
    return cArray;
};
const mPrintable = (nums, e, d, n) => {
    let cArray = [];
    if (nums.includes(BigInt(-2))) {
        let numPE = nums[0];
        let numPD = nums[2];
        let num1 = calcCM(BigInt(numPE), BigInt(e), BigInt(n));
        let num2 = calcCM(BigInt(numPD), BigInt(e), BigInt(n));
        let desenc = calcCM(BigInt(num1), BigInt(d), BigInt(n)) + '.' + calcCM(BigInt(num2), BigInt(d), BigInt(n));
        cArray.push(`<i>M = ${num1}.${num2}<sup>${d}</sup> Mod(${n})</i> = ${desenc}<br>`);
    }
    else {
        nums.forEach(num => {
            if (num == BigInt(-1)) {
                cArray.push(' ');
            }
            else {
                let num1 = parseFloat(calcCM(BigInt(num), BigInt(e), BigInt(n)));
                cArray.push(`<i>M = ${num1}<sup>${d}</sup> Mod(${n})</i> = ${parseFloat(calcCM(BigInt(num1), BigInt(d), BigInt(n)))}<br>`);
            }
        });
    }
    return cArray;
};
const txtP = document.getElementById('txtP');
const txtQ = document.getElementById('txtQ');
const btnCalcular = document.getElementById('btnCalcular');
var p = 0;
var q = 0;
var n = 0;
var phiN = 0;
var tableMCDE = [];
var eArray = [];
var e = 0;
var d = 0;
const lblPHIE = document.querySelectorAll('.lblPHIE');
const lblN = document.querySelectorAll('.lblN');
if (btnCalcular != null) {
    btnCalcular.addEventListener('click', () => {
        if (tbMCD != null) {
            tbMCD.innerHTML = `
            <tr>
                <th colspan="2">MCD(φ(n), e) = 1</th>
            </tr>
            <tr>
                <th>φ(n)</th>
                <th>e</th>
            </tr>
            `;
        }
        if ((txtP != null) && (txtQ != null)) {
            p = 0;
            q = 0;
            n = 0;
            phiN = 0;
            tableMCDE = [];
            eArray = [];
            e = 0;
            d = 0;
            p = parseInt(txtP.value);
            q = parseInt(txtQ.value);
            n = calcN(p, q);
            phiN = calcPhiN(p, q);
            for (let i = 2; i < phiN; i++) {
                eArray.push(i);
            }
            lblN.forEach(element => {
                element.textContent = n.toString();
            });
            lblPHIE.forEach(element => {
                element.textContent = phiN.toString();
            });
            tableMCDE = MCDTable(phiN, eArray);
            createTableMCD(tableMCDE);
        }
    });
}
var tbMCD = document.getElementById('mcd');
const createTableMCD = (tableMCD) => {
    tableMCD.forEach(element => {
        let row = null;
        row = document.createElement('tr');
        let col1 = document.createElement('td');
        col1.textContent = element[0].toString();
        row.appendChild(col1);
        let col2 = document.createElement('td');
        col2.innerHTML = `<label><input type="radio" name="opcion" value="${element[1]}">${element[1]}</label>`;
        row.appendChild(col2);
        if (tbMCD != null) {
            tbMCD.appendChild(row);
        }
    });
    let radioButtons = document.querySelectorAll('input[type="radio"][name="opcion"]');
    if (radioButtons != null) {
        radioButtons.forEach(radioButton => {
            radioButton.addEventListener('change', function () {
                btnEncrypt.disabled = false;
                if (this.checked) {
                    // console.log(`Opción: ${this.value}`);
                    e = this.value;
                    d = calcD(phiN, e);
                    setValues();
                }
            });
        });
    }
};
const lblE = document.querySelectorAll('.lblE');
const lblD = document.querySelectorAll('.lblD');
const setValues = () => {
    if (lblN != null && lblPHIE != null && lblE != null && lblD != null) {
        lblN.forEach(element => {
            element.textContent = n.toString();
        });
        lblPHIE.forEach(element => {
            element.textContent = phiN.toString();
        });
        lblE.forEach(element => {
            element.textContent = e.toString();
        });
        lblD.forEach(element => {
            element.textContent = d.toString();
        });
    }
};
const toggleBtn = document.getElementById('toggleBtn');
const encOptional = document.getElementById('enc-optional');
const mode = document.getElementById('mode');
var isText = true;
toggleBtn.addEventListener('change', function () {
    if (encOptional != null && mode != null) {
        if (this.checked) {
            encOptional.style.height = '0';
            mode.textContent = 'Número';
            isText = false;
        }
        else {
            encOptional.style.height = 'auto';
            mode.textContent = 'Texto';
            isText = true;
        }
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const authorDiv = document.createElement("div");
    authorDiv.setAttribute("id", "ath");
    document.body.appendChild(authorDiv);
});
const btnEncrypt = document.getElementById('btnEncrypt');
const txtM = document.getElementById('txtM');
const mathM = document.getElementById('mathM');
const mathC = document.getElementById('mathC');
const lblME = document.getElementById('lblME');
const lblMO = document.getElementById('lblMO');
if (btnEncrypt != null && mathM != null && mathC != null && txtM != null) {
    btnEncrypt.addEventListener('click', () => {
        let originalValues = [];
        let strC = '';
        let strM = '';
        originalValues = convertMessage(txtM.value);
        let originalValuesBigInt = originalValues.map(num => BigInt(num));
        if (isText) {
            if (lblMO != null && lblME != null) {
                lblMO.textContent = txtM.value;
                lblME.textContent = originalValues.toString();
            }
        }
        console.log(originalValuesBigInt);
        strC = '';
        cPrintable(originalValuesBigInt, BigInt(e), BigInt(n)).forEach((element) => {
            strC += element;
        });
        mathC.innerHTML = strC;
        strM = '';
        mPrintable(originalValuesBigInt, BigInt(e), BigInt(d), BigInt(n)).forEach((element) => {
            strM += element;
        });
        mathM.innerHTML = strM;
    });
}
