/**
 * Juan Rueda Morales
 * MasterMind - DWEC
 */

let $circulosAciertos, $combinacionPrueba, $intentosRealizados, $cuadroGanador, contador;


/** Quita los eventos de la línea anterior y pinta una nueva línea*/ 

let crearNuevaLinea = function () {
    $combinacionPrueba.off("click");

    let contenido = "<div class='filaRellenar intento" + contador + "'>"

    for (let i = 0; i < 4; i++) {
        contenido += "<div class='combinacionPrueba combinacionPrueba" + contador + "'></div>";
    }

    for (let i = 0; i < 4; i++) {
        contenido += "<div class='circulosAciertos circulosAciertos" + contador + "'></div>";
    }

    contenido += "</div>";

    $intentosRealizados.append(contenido);

    $combinacionPrueba = $(".combinacionPrueba" + contador).on("click", vaciarColor);

    $circulosAciertos = $(".circulosAciertos" + contador);

    contador++;
}

let aniadirCirculo = function () {
    for (let i = 0; i < $combinacionPrueba.length; i++) {
        if ($combinacionPrueba[i].style.backgroundColor == "" || $combinacionPrueba[i].style.backgroundColor == "moccasin") {
            $combinacionPrueba[i].style.backgroundColor = this.id;
            break;
        }
    }
}

let comprobar = function () {
    let arrayColoresComprobar = [];
    let contador2 = 0;
    $combinacionPrueba.each(function (indice, circulo) {
        if (circulo.style.backgroundColor != "" && circulo.style.backgroundColor != "moccasin")
            arrayColoresComprobar.push(circulo.style.backgroundColor);
    });
    if (arrayColoresComprobar.length >= 4) {
        objetoComprobar = masterMind.comprobar(arrayColoresComprobar);

        if (objetoComprobar.estaEnSuSitio > 0) {
            while (contador2 < objetoComprobar.estaEnSuSitio) {
                $circulosAciertos[contador2].style.backgroundColor = "black";
                contador2++;
            }
        }

        if (contador2 == 4) {
            $cuadroGanador.dialog("open");
            return;
        }

        if (objetoComprobar.esta > 0) {
            for (let i = 0; i < objetoComprobar.esta; i++) {
                $circulosAciertos[contador2].style.backgroundColor = "white";
                contador2++;
            }
            contador2 = 0;
        }

        if (contador2 != 4) {
            crearNuevaLinea();
        }
        
        $intentosRealizados.scrollTop(0);
    }
}

let vaciarColor = function () {
    $(this).css("backgroundColor", "moccasin");
}



$(function () {
    masterMind.init();
    masterMind.listarObjetivo();

    contador = 0;

    $combinacionPrueba = $(".combinacionPrueba");
    $circulosAciertos = $(".circulosAciertos");

    $intentosRealizados = $("#intentosRealizados");
    $cuadroGanador = $("#cuadroGanador");

    $(".colores").on("click", aniadirCirculo);
    $("#botonComprobar").on("click", comprobar);

    $cuadroGanador.dialog({
        modal: true,
        autoOpen: false,
        resizable: false,
        buttons: {
            "Jugar de nuevo": function () {
                $(this).dialog("close");
                setTimeout(function () {
                    window.location.reload();
                }, 1200)

            },
            "Salir": function () {
                window.close();
            }
        },
        show: {
            effect: "drop",
            duration: 500,
        },
        hide: {
            effect: "fold",
            duration: 1200
        },
    });

    

    crearNuevaLinea();
})