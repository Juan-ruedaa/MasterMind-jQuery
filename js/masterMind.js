/**
 * Juan Rueda Morales
 * MasterMind - DWEC
 */

masterMind = (function () {
    let colores = ["red", "white", "black", "yellow", "orange", "brown", "blue", "green"];
    let esta;
    let estaEnSuSitionSuSitio;
    let objetivo;


    let sacarColorAleatorio = function () {
        return Math.floor((Math.random() * colores.length));
    };

    let rellenarObjetivo = function () {
        for (let i = 0; i < 4; i++) {
            objetivo.push(colores[sacarColorAleatorio()]);
        }
    }

    let listarObjetivo = function () {
        console.log(objetivo);
    }

    let comprobar = function (combinacionPrueba) {
        let copiaObjetivo = objetivo.slice();
        esta = 0;
        estaEnSuSitio = 0;

        combinacionPrueba.forEach(function (element, indice) {
            if (element == copiaObjetivo[indice]) {
                copiaObjetivo[indice] = undefined;
                combinacionPrueba[indice] = 1;
                estaEnSuSitio++;
            }
        });

        combinacionPrueba.forEach(function (element, indice) {
            let indiceOrigen = copiaObjetivo.indexOf(element);
            if (copiaObjetivo.indexOf(combinacionPrueba[indice]) != -1) {
                copiaObjetivo[indiceOrigen] = 0;
                esta++;
            }
        });


        return {
            copiaObjetivo: copiaObjetivo,
            combinacionPrueba: combinacionPrueba,
            estaEnSuSitio: estaEnSuSitio,
            esta: esta
        }
    }

    let init = function () {
        objetivo = [];
        rellenarObjetivo();
    }

    return {
        init: init,
        listarObjetivo: listarObjetivo,
        comprobar: comprobar
    };
})();