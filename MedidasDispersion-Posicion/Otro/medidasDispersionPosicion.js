var btnStart = document.getElementById("start");
var btnCalculate = document.getElementById("calculate");
var i = document.getElementById("classes");
var n = document.getElementById("nD");

var toggleBtnInterval = document.getElementById('toggleBtnTypeInterval');
var toggleBtn = document.getElementById('toggleBtn');
var inputCuartiles = document.getElementById('Cuartiles');
var inputDeciles = document.getElementById('Deciles');
var inputPercentiles = document.getElementById('Percentiles');

toggleBtn.addEventListener('change', function() {
    if (this.checked) {
        inputCuartiles.disabled = false;
        inputDeciles.disabled = false;
        inputPercentiles.disabled = false;
    } else {
        inputCuartiles.disabled = true;
        inputDeciles.disabled = true;
        inputPercentiles.disabled = true;
        inputCuartiles.value = '0';
        inputDeciles.value = '0';
        inputPercentiles.value = '0';
    }
});

var inputDataTable = document.getElementById("inputDataTable");
btnStart.addEventListener('click', ()=>{

    let dataTableColsRows = ''; 
    dataTableColsRows = dataTableColsRows+`
        <tr>
            <th>Li</th>
            <th>Ls</th>
            <th>f</th>
        </tr>
        `;
    for (let j = 0; j < i.value; j++) {
        dataTableColsRows = dataTableColsRows+`
        <tr>
            <td><input class="generalInput inputBlue classSupp" type="number" id="Li${j}"></td>
            <td><input class="generalInput inputBlue classSupp" type="number" id="Ls${j}"></td>
            <td><input class="generalInput inputBlue classSupp" type="number" id="F${j}"></td>
        <tr/>
        `;
    }
    inputDataTable.innerHTML = dataTableColsRows;
});

function calculateMC(liArray, lsArray){
        let arrayMc = liArray.map((element, index)=>{
            console.log(liArray[index]+" "+lsArray[index])
            return (parseFloat(element) + parseFloat(lsArray[index]))/2;
        });
        return arrayMc;
}

function calculateXF(fArray, mcArray){
    let arrayXF = fArray.map((element, index)=>{
        return parseFloat(element) * parseFloat(mcArray[index]);
    })
    return arrayXF;
}

function calculateXiX(mcArray, DM){
    let arrayXiX = mcArray.map((element)=>{
        return Math.abs(parseFloat(element)-parseFloat(DM));
    })
    return arrayXiX;
}

function calculateFXiX(XiXarray, fArray){
    let FXiX = XiXarray.map((element, index)=>{
        return parseFloat(fArray[index])*parseFloat(element);
    })
    return FXiX;
}

function calculateXiX2(XiXarray){
    let XiX2 = XiXarray.map((element)=>{
        return Math.pow(parseFloat(element), 2);
    })
    return XiX2;
}

function calculateXiX2F(XiX2array, fArray){
    let XiX2F = XiX2array.map((element, index)=>{
        return parseFloat(element)*parseFloat(fArray[index]);
    })
    return XiX2F;
}

var tableCDP = document.getElementById("tableCDP");
function CreateCuartilesDecilesPercentiles(){
    if (toggleBtn.checked) {
        let cuartiles = document.getElementById("Cuartiles").value;
        let Deciles = document.getElementById("Deciles").value;
        let Percentiles = document.getElementById("Percentiles").value;

        // console.log('a')
        let tableCDPColsRows = ''; 
        tableCDPColsRows = tableCDPColsRows+`
            <tr>
                <th>Cuartiles</th>
                <th>Deciles</th>
                <th>Percentiles</th>
            </tr>
            <tr>
                <td><input class="generalInput inputRed classSupp" type="number" id="Cuartiles" value="${cuartiles}"></td>
                <td><input class="generalInput inputRed classSupp" type="number" id="Deciles" value="${Deciles}"></td>
                <td><input class="generalInput inputRed classSupp" type="number" id="Percentiles" value="${Percentiles}"></td>
            </tr>
        `;
        let HTMLcuartiles = '';
        let HTMLdeciles = '';
        let HTMLpercentiles = '';
        for (let j = 0; j < cuartiles; j++) {
            HTMLcuartiles = HTMLcuartiles+`<input class="generalInput inputRed classSupp" type="number" id="Q${j}"><br>`;
        }
        for (let j = 0; j < Deciles; j++) {
            HTMLdeciles = HTMLdeciles+`<input class="generalInput inputRed classSupp" type="number" id="D${j}"><br>`;
        }
        for (let j = 0; j < Percentiles; j++) {
            HTMLpercentiles = HTMLpercentiles+`<input class="generalInput inputRed classSupp" type="number" id="P${j}"><br>`;
        }
        tableCDPColsRows = tableCDPColsRows+`
        <tr>
            <td>${HTMLcuartiles}</td>
            <td>${HTMLdeciles}</td>
            <td>${HTMLpercentiles}</td>
        <tr/>
        `;
        tableCDP.innerHTML = tableCDPColsRows;
    }else{
        // console.log('a')
    }
}
function calculateCaurtiles(liArray, lsArray, FaArray, FaAcum, QArrayElemnts){
    let uv = parseFloat(liArray[1]) - parseFloat(lsArray[0]);
    let a = 0;
    if(toggleBtnInterval.checked){
        a = (parseFloat(lsArray[0]) - parseFloat(liArray[0]));
    }else{
        a = (parseFloat(lsArray[0]) - parseFloat(liArray[0])) + uv;
    }
    // console.log(a)

    let arrayQ = QArrayElemnts.map((element, index)=>{
        let Qk = 0;
        Qk = (parseFloat(element) * parseFloat(FaAcum))/4;

        if (FaArray.includes(Qk)) {
            return `Q${element}=
                    <math>
                        <mrow>
                            <mfrac>
                                <mrow>
                                    <mn>${element}</mn>
                                    <mo>*</mo>
                                    <mn>${FaAcum}</mn>
                                </mrow>
                                <mrow>
                                    <mn>4</mn>
                                </mrow>
                            </mfrac>
                        </mrow>
                    </math>
                    = ${Qk}
                    <br><br>
            `;
        } else {
            let stringR = '';
            let QkE = 0;
            QkE = Qk;
            stringR = `Q${element}=
                        <math>
                            <mrow>
                                <mfrac>
                                    <mrow>
                                        <mn>${element}</mn>
                                        <mo>*</mo>
                                        <mn>${FaAcum}</mn>
                                    </mrow>
                                    <mrow>
                                        <mn>4</mn>
                                    </mrow>
                                </mfrac>
                            </mrow>
                        </math>
                        = ${QkE}
                        <br>
                        `;
            
            let elementFmy = null;
            FaArray.forEach((numero)=> {
                if (numero > parseFloat(QkE) && elementFmy === null) {
                    elementFmy = numero;
                }
            });
            let indexFi = FaArray.indexOf(parseFloat(elementFmy));
            Qk = parseFloat(liArray[indexFi]) + ((Qk - parseFloat(FaArray[indexFi-1])) / (parseFloat(FaArray[indexFi]) - parseFloat(FaArray[indexFi-1]))) * a;
            
            stringR = stringR + `Q${element} = ${parseFloat(liArray[indexFi])} +
                        <math>
                            <mrow>
                                <mfrac>
                                    <mrow>
                                        <mn>${QkE}</mn>
                                        <mo>-</mo>
                                        <mn>${FaArray[indexFi-1]}</mn>
                                    </mrow>
                                    <mrow>
                                        <mn>${FaArray[indexFi]}</mn>
                                        <mo>-</mo>
                                        <mn>${FaArray[indexFi-1]}</mn>
                                    </mrow>
                                </mfrac>
                            </mrow>
                        </math>
                        * ${a}
                        = ${Qk}
                        <br><br>
                        `;
            return stringR;
        }
    })
    return arrayQ;
}
function calculateDeciles(liArray, lsArray, FaArray, FaAcum, QArrayElemnts){
    let uv = parseFloat(liArray[1]) - parseFloat(lsArray[0]);
    let a = 0;
    if(toggleBtnInterval.checked){
        a = (parseFloat(lsArray[0]) - parseFloat(liArray[0]));
    }else{
        a = (parseFloat(lsArray[0]) - parseFloat(liArray[0])) + uv;
    }
    // console.log(a)

    let arrayD = QArrayElemnts.map((element, index)=>{
        let Qk = 0;
        Qk = (parseFloat(element) * parseFloat(FaAcum))/10;

        if (FaArray.includes(Qk)) {
            return `D${element}=
                    <math>
                        <mrow>
                            <mfrac>
                                <mrow>
                                    <mn>${element}</mn>
                                    <mo>*</mo>
                                    <mn>${FaAcum}</mn>
                                </mrow>
                                <mrow>
                                    <mn>10</mn>
                                </mrow>
                            </mfrac>
                        </mrow>
                    </math>
                    = ${Qk}
                    <br><br>
            `;
        } else {
            let stringR = '';
            let QkE = 0;
            QkE = Qk;
            stringR = `D${element}=
                        <math>
                            <mrow>
                                <mfrac>
                                    <mrow>
                                        <mn>${element}</mn>
                                        <mo>*</mo>
                                        <mn>${FaAcum}</mn>
                                    </mrow>
                                    <mrow>
                                        <mn>10</mn>
                                    </mrow>
                                </mfrac>
                            </mrow>
                        </math>
                        = ${QkE}
                        <br>
                        `;
            
            let elementFmy = null;
            FaArray.forEach((numero)=> {
                if (numero > parseFloat(QkE) && elementFmy === null) {
                    elementFmy = numero;
                }
            });
            let indexFi = FaArray.indexOf(parseFloat(elementFmy));
            Qk = parseFloat(liArray[indexFi]) + ((Qk - parseFloat(FaArray[indexFi-1])) / (parseFloat(FaArray[indexFi]) - parseFloat(FaArray[indexFi-1]))) * a;
            
            stringR = stringR + `D${element} = ${parseFloat(liArray[indexFi])} +
                        <math>
                            <mrow>
                                <mfrac>
                                    <mrow>
                                        <mn>${QkE}</mn>
                                        <mo>-</mo>
                                        <mn>${FaArray[indexFi-1]}</mn>
                                    </mrow>
                                    <mrow>
                                        <mn>${FaArray[indexFi]}</mn>
                                        <mo>-</mo>
                                        <mn>${FaArray[indexFi-1]}</mn>
                                    </mrow>
                                </mfrac>
                            </mrow>
                        </math>
                        * ${a}
                        = ${Qk}
                        <br><br>
                        `;
            return stringR;
        }
    })
    return arrayD;
}
function calculatePercentiles(liArray, lsArray, FaArray, FaAcum, QArrayElemnts){
    let uv = parseFloat(liArray[1]) - parseFloat(lsArray[0]);
    let a = 0;
    if(toggleBtnInterval.checked){
        a = (parseFloat(lsArray[0]) - parseFloat(liArray[0]));
    }else{
        a = (parseFloat(lsArray[0]) - parseFloat(liArray[0])) + uv;
    }
    // console.log(a)

    let arrayP = QArrayElemnts.map((element, index)=>{
        let Qk = 0;
        Qk = (parseFloat(element) * parseFloat(FaAcum))/100;

        if (FaArray.includes(Qk)) {
            return `P${element}=
                    <math>
                        <mrow>
                            <mfrac>
                                <mrow>
                                    <mn>${element}</mn>
                                    <mo>*</mo>
                                    <mn>${FaAcum}</mn>
                                </mrow>
                                <mrow>
                                    <mn>100</mn>
                                </mrow>
                            </mfrac>
                        </mrow>
                    </math>
                    = ${Qk}
                    <br><br>
            `;
        } else {
            let stringR = '';
            let QkE = 0;
            QkE = Qk;
            stringR = `P${element}=
                        <math>
                            <mrow>
                                <mfrac>
                                    <mrow>
                                        <mn>${element}</mn>
                                        <mo>*</mo>
                                        <mn>${FaAcum}</mn>
                                    </mrow>
                                    <mrow>
                                        <mn>100</mn>
                                    </mrow>
                                </mfrac>
                            </mrow>
                        </math>
                        = ${QkE}
                        <br>
                        `;
            
            let elementFmy = null;
            FaArray.forEach((numero)=> {
                if (numero > parseFloat(QkE) && elementFmy === null) {
                    elementFmy = numero;
                }
            });
            let indexFi = FaArray.indexOf(parseFloat(elementFmy));
            Qk = parseFloat(liArray[indexFi]) + ((Qk - parseFloat(FaArray[indexFi-1])) / (parseFloat(FaArray[indexFi]) - parseFloat(FaArray[indexFi-1]))) * a;
            
            stringR = stringR + `P${element} = ${parseFloat(liArray[indexFi])} +
                        <math>
                            <mrow>
                                <mfrac>
                                    <mrow>
                                        <mn>${QkE}</mn>
                                        <mo>-</mo>
                                        <mn>${FaArray[indexFi-1]}</mn>
                                    </mrow>
                                    <mrow>
                                        <mn>${FaArray[indexFi]}</mn>
                                        <mo>-</mo>
                                        <mn>${FaArray[indexFi-1]}</mn>
                                    </mrow>
                                </mfrac>
                            </mrow>
                        </math>
                        * ${a}
                        = ${Qk}
                        <br><br>
                        `;
            return stringR;
        }
    })
    return arrayP;
}

document.addEventListener("DOMContentLoaded", function() {
    const authorDiv = document.createElement("div");
    authorDiv.setAttribute("id", "ath");
    document.body.appendChild(authorDiv);
});

var CDPcreateBtn = document.getElementById("CDPcreate");
CDPcreate.addEventListener('click', ()=>{
    CreateCuartilesDecilesPercentiles();
});    


divCuartiles = document.getElementById('CDPdiv');
var outputDataTable = document.getElementById("outputDataTable");
btnCalculate.addEventListener('click', ()=>{
    let liArray = [];
    let lsArray = [];
    let fArray = [];
    let FaArray = [];
    let FaAcum = 0;
    for (let j = 0; j < i.value; j++) {
        liArray.push(document.getElementById(`Li${j}`).value);
        lsArray.push(document.getElementById(`Ls${j}`).value);
        fArray.push(document.getElementById(`F${j}`).value);
        FaArray.push(FaAcum+=parseFloat(document.getElementById(`F${j}`).value));
    }

    let arrayMc = calculateMC(liArray, lsArray);
    let arrayXF = calculateXF(fArray, arrayMc);
    let XFT =   0;
    arrayXF.forEach((element)=>{XFT+=element});
    let arrayXiX = calculateXiX(arrayMc, (XFT/n.value));
    let arrayFXiX = calculateFXiX(arrayXiX, fArray);
    let FXiXT = 0;
    arrayFXiX.forEach((element)=>{FXiXT+=element});
    let arrayXiX2 = calculateXiX2(arrayXiX);
    let arrayXiX2F = calculateXiX2F(arrayXiX2, fArray);
    let XiX2T = 0;
    arrayXiX2F.forEach((element)=>{XiX2T+=element});

    let dataTableColsRows = ''; 
    dataTableColsRows = dataTableColsRows+`
        <tr>
            <th>Li</th>
            <th>Ls</th>
            <th>f</th>
            <th>F</th>
            <th>Mc</th>
            <th>x*f</th>
            <th>Xi-X̅</th>
            <th>f*(Xi-X̅)</th>
            <th>(Xi-X̅)²</th>
            <th>f * (Xi-X̅)²</th>
        </tr>
        `;
    for (let j = 0; j < i.value; j++) {
        dataTableColsRows = dataTableColsRows+`
        <tr>
            <td>${liArray[j]}</td>
            <td>${lsArray[j]}</td>
            <td>${fArray[j]}</td>
            <td>${FaArray[j]}</td>
            <td>${arrayMc[j]}</td>
            <td>${arrayXF[j]}</td>
            <td>${arrayXiX[j]}</td>
            <td>${arrayFXiX[j]}</td>
            <td>${arrayXiX2[j]}</td>
            <td>${arrayXiX2F[j]}</td>
        <tr/>
        `;
        if (j === (i.value-1)){
            dataTableColsRows = dataTableColsRows+`
            <tr>
                <td style="visibility: hidden;">a</td>
                <td style="visibility: hidden;">a</td>
                <td style="visibility: hidden;">a</td>
                <td>${FaAcum}</td>
                <td style="visibility: hidden;">a</td>
                <td>${XFT}</td>
                <td style="visibility: hidden;">a</td>
                <td>${FXiXT}</td>
                <td style="visibility: hidden;">a</td>
                <td>${XiX2T}</td>
            <tr/>
            `;
        }
    }
    outputDataTable.innerHTML = dataTableColsRows;

    document.getElementById("X").innerHTML = ("X̅ = " + `
                                                        <math>
                                                            <mrow>
                                                                <mfrac>
                                                                    <mrow>
                                                                        <mn>${XFT}</mn>
                                                                    </mrow>
                                                                    <mrow>
                                                                        <mi>${n.value}</mi>
                                                                    </mrow>
                                                                </mfrac>
                                                            </mrow>
                                                        </math>
                                                        = ` + XFT/n.value);
    document.getElementById("DM").innerHTML = ("DM = " + `
                                                            <math>
                                                                <mrow>
                                                                    <mfrac>
                                                                        <mrow>
                                                                            <mn>${FXiXT}</mn>
                                                                        </mrow>
                                                                        <mrow>
                                                                            <mn>${n.value}</mn>
                                                                        </mrow>
                                                                    </mfrac>
                                                                </mrow>
                                                            </math>
                                                            = ` + FXiXT/n.value);
    document.getElementById("S").innerHTML = ("S² = " + `
                                                        <math>
                                                            <mrow>
                                                                <mfrac>
                                                                    <mrow>
                                                                        <mn>${XiX2T}</mn>
                                                                    </mrow>
                                                                    <mrow>
                                                                        <mn>${n.value}</mn>
                                                                    </mrow>
                                                                </mfrac>
                                                            </mrow>
                                                        </math>
                                                        = ` + XiX2T/n.value);
    document.getElementById("S2").innerHTML = ("S = " + `
                                                        <math>
                                                            <msqrt>
                                                                <mrow>
                                                                    <mfrac>
                                                                        <mrow>
                                                                            <mn>${XiX2T}</mn>
                                                                        </mrow>
                                                                        <mrow>
                                                                            <mn>${n.value}</mn>
                                                                        </mrow>
                                                                    </mfrac>
                                                                </mrow>
                                                            </msqrt>
                                                        </math>
                                                        = ` + Math.sqrt((XiX2T/n.value)));

    let QArrayElemnts = [];
    let DArrayElemnts = [];
    let PArrayElemnts = [];
    for (let j = 0; j < (document.getElementById("Cuartiles").value); j++) {
        QArrayElemnts.push(document.getElementById(`Q${j}`).value);
    }
    for (let j = 0; j < (document.getElementById("Deciles").value); j++) {
        DArrayElemnts.push(document.getElementById(`D${j}`).value);
    }
    for (let j = 0; j < (document.getElementById("Percentiles").value); j++) {
        PArrayElemnts.push(document.getElementById(`P${j}`).value);
    }
    let cuartilesArrayResult = calculateCaurtiles(liArray, lsArray, FaArray, FaAcum, QArrayElemnts);
    let decilesArrayResult = calculateDeciles(liArray, lsArray, FaArray, FaAcum, DArrayElemnts);
    let percentilesArrayResult = calculatePercentiles(liArray, lsArray, FaArray, FaAcum, PArrayElemnts);
    let cuartilesStringF = '';
    let decilesStringF = '';
    let percentilesStringF = '';
    cuartilesArrayResult.forEach((element)=>{
        cuartilesStringF+=element;
    })
    decilesArrayResult.forEach((element)=>{
        decilesStringF+=element;
    })
    percentilesArrayResult.forEach((element)=>{
        percentilesStringF+=element;
    })
    divCuartiles.innerHTML = '';    
    divCuartiles.innerHTML = cuartilesStringF + decilesStringF + percentilesStringF;    
});
