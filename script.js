const speedRange = document.getElementById('speedRange');
const disk = document.querySelector('.disk');
const stopButton = document.getElementById('stopButton');
const resumeButton = document.getElementById('resumeButton');
let animationPaused = false;

speedRange.addEventListener('input', function() {
    const speed = parseInt(this.value); // Obtener el valor del rango
    const animationDuration = 10 / speed; // Calcular la duración de la animación

    // Actualizar la velocidad de rotación ajustando la duración de la animación
    disk.style.animationDuration = animationDuration + 's';
});

stopButton.addEventListener('click', function() {
    disk.style.animationPlayState = 'paused';
    animationPaused = true;
});

resumeButton.addEventListener('click', function() {
    if (animationPaused) {
        disk.style.animationPlayState = 'running';
        animationPaused = false;
    }
});

$(document).ready(function(e){

    

    $('#speedRange').change(function(e){
        //Calculo velocidad RPM
        const num = $(this).val();
        let velocidad = (num * 7200) / 10;
        $('#txt-velocidad').val(velocidad);

        //CALCULO DESPLAZAMIENTO ANGULAR
        let velo_angular = ((velocidad * 2) / 60 ) * Math.PI;
        let desplazamiento = (velo_angular / 2) * 360;
        $('#txt-desplazamiento-angular').val(desplazamiento.toString().match(/^-?\d+(?:\.\d{0,1})?/)[0]);

        //VELOCIDAD ANGULAR
        $('#txt-velocidad-angular').val(velo_angular.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);

        //ACELERACION ANGULAR
        let aceleracion = velo_angular / 4.397;
        $('#txt-aceleracion-angular').val(aceleracion.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0]);

        //VELOCIDAD ANGULAR MEDIA
        let velo_media = velo_angular / 2;
        $('#txt-velocidad-media').val(velo_media.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
        
        //VELOCIDAD TANGENCIAL
        let velo_tangencial = 0.0475 * velo_angular;
        $('#txt-velocidad-tangencial').val(velo_tangencial.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0]);

        //ACELERACION TANGENCIAL
        let aceleracion_tangencial = 0.0475 * aceleracion;
        $('#txt-aceleracion-tangencial').val(aceleracion_tangencial.toString().match(/^-?\d+(?:\.\d{0,5})?/)[0]);

        //ACELERACION CENTRIPETA
        let aceleracion_centripeta = 0.0475 * Math.pow($('#txt-velocidad-angular').val(), 2);
        $('#txt-aceleracion-centripeta').val(aceleracion_centripeta.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
    
        //ACELERACION TRALACION
        let aceleracion_traslacion = aceleracion_tangencial + aceleracion_centripeta;
        $('#txt-aceleracion-traslacion').val(aceleracion_traslacion.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);

    });

    $('#speedRange').change();
});
