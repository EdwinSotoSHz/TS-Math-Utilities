/* ******************************************************************************************************
                        * Metodos numericos
****************************************************************************************************** */
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
        if (element.includes('.')) {
            element = parseFloat(element).toFixed(3);            
        }
        dataArraySorted.push(parseFloat(element));
    }
    return dataArraySorted;
}

const sum = function(array: number[]) {
    return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

/* ******************************************************************************************************
    * Metodos para contruir las distribuciones de frequencias con datos DISCRETOS
****************************************************************************************************** */

const generateDiscreteCuantitativeData = function(lstData: any[], sortByfrequency: boolean): [any[], number[], string[], string[]] {
    lstData = formatData(lstData);
    lstData = lstData.sort();

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

    let freqRel: string[] = [];
    let freqRelAc: string[] = [];
    let freqAbsT: number = sum(freqAbs);
    let ultFa: number = 0;
    let ultFr: number = 0;
    for (let fa of freqAbs) {
        let fr = 100 / freqAbsT * fa;
        freqRel.push(parseFloat(fr.toFixed(3))+'%');
        freqRelAc.push(parseFloat((fr + ultFr).toFixed(3))+'%');
        ultFr += fr;
        ultFa += fa;
    }

    return [lstClass, freqAbs, freqRel, freqRelAc];
}