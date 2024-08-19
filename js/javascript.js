function extraer_texto() {

    // Almacenamiento del texto escrito en el textarea.
    var texto = document.getElementById('contenido__input__texto').value;
    
    if (texto) {        
        texto = texto.trim();               // Eliminación de espacios al inicio y al final
        if (!validar_conticion_de_cadena(texto)) {
            alert("¡El texto solamente debe contener letras minúsculas y un espacio entre letras!");
            return '';
        }
        return texto;
    }
    else {
        alert("¡Debe ingresar texto antes de encriptar o desencriptar!");
        return '';
    }
}

function encriptar_texto() {
    
    // Almacenamiento de texto validado.
    var texto = extraer_texto();

    // Función callback para reemplazar caracteres (vocales).
    var texto_encriptado = texto.replace(/./g, function(caracter) {
        switch (caracter) {
            case 'a':
                return 'ai';
            case 'e':
                return 'enter';
            case 'i':
                return 'imes';
            case 'o':
                return 'ober';
            case 'u':
                return 'ufat';
            default:
                return caracter;        // Retorno y reemplazo de carácter por cadena.
        }
    });

    // Retorno de texto con caracteres reemplazados.
    return texto_encriptado;
}

function desencriptar_texto() {
    var texto = extraer_texto();

    // Función callback para reemplazar cadenas (vocales encriptadas).
    var texto_desencriptado = texto.replace(/ai|enter|imes|ober|ufat/g, function(cadena) {
        switch (cadena) {
            case 'ai':
                return 'a';
            case 'enter':
                return 'e';
            case 'imes':
                return 'i';
            case 'ober':
                return 'o';
            case 'ufat':
                return 'u';
            default:
                return cadena;          // Retorno y reemplazo de cadena por carácter.
        }
    });

    // Retorno de texto con cadenas reemplazadas.
    return texto_desencriptado;
}

function ejecutar_encriptado() {
    encriptar_texto();
    actualizar_parrafo('encriptar');
}

function ejecutar_desencriptado() {
    desencriptar_texto();
    actualizar_parrafo('desencriptar');
}

function actualizar_parrafo(funcion) {
    var texto;

    // Referencias a los elementos html.
    var parrafo_procesado = document.getElementById('contenido__output__procesado__texto');
    var contenido_predeterminado = document.querySelector('.contenido__output__defaultcontent');
    var contenido_procesado = document.querySelector('.contenido__output__procesado');

    // Funcionalidad encriptar/desencriptar para actualización de párrafo.
    if (funcion == 'encriptar') {
        texto = encriptar_texto();
    } else if (funcion == 'desencriptar') {
        texto = desencriptar_texto();
    } else {
        console.error('Operación inválida');
        return
    }

    // Actualización de párrafo.
    parrafo_procesado.textContent = texto;

    // Mostrar y ocultar elementos pertinentes.
    if (texto == '') {
        if (contenido_predeterminado) {
            contenido_predeterminado.style.display = 'flex';
        }
        if (contenido_procesado) {
            contenido_procesado.style.display = 'none';
        }
    } else {
        if (contenido_predeterminado) {
            contenido_predeterminado.style.display = 'none';
        }
        if (contenido_predeterminado) {
            contenido_procesado.style.display = 'flex';
        }
    }
}
function copiar_texto() {
    // Variable que almacena el contenido del párrafo.
    var texto = document.getElementById('contenido__output__procesado__texto').textContent;

    // Función del clipboard para almacenado de contenido en el portapapeles.
    navigator.clipboard.writeText(texto).then(function() {
        alert('¡Texto copiado!');
    });
}

function validar_conticion_de_cadena(texto) {
    var regex = /^[a-z]+(?: [a-z]+)*$/;     // Expresión regular con la condición de entrada
    return regex.test(texto);
}