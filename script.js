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
        // -------------- CLASE 1

        //Calculo velocidad RPM
        const num = $(this).val();

        if(num == 0){
            $('#stopButton').click();
        }else{
            $('#resumeButton').click();
        }

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


        // ------------CLASE 2

        //Calculo de inercia del plato
        let inercia_plato = 1/2 * $('#txt-masa').val() * (Math.pow(0.013, 2) + Math.pow(0.0475, 2));
        $('#txt-inercia-plato').val(inercia_plato.toString().match(/^-?\d+(?:\.\d{0,8})?/)[0]);

        //INERCIA TOTAL
        let inercia_total = inercia_plato + 0.00000173247 + 0.00009614;
        $('#txt-inercia-total').val(inercia_total.toString().match(/^-?\d+(?:\.\d{0,7})?/)[0]);

        //ENERGIA CINETICA
        let energia_cinetica = 1/2 * inercia_total * Math.pow($('#txt-velocidad-angular').val(), 2);
        $('#txt-energia-cinetica').val(energia_cinetica.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
        $('#txt-trabajo-energia').val(energia_cinetica.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);

        //MOMENTO DE TORSION
        let momento_torsion = inercia_total * aceleracion;
        $('#txt-momento-torsion').val(momento_torsion.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
        $('#txt-ley-newton').val(momento_torsion.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);

        //TRABAJO
        let trabajo = momento_torsion * 1658.76;
        $('#txt-trabajo').val(trabajo.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);

        //POTENCIA 
        let potencia = momento_torsion * velo_media;
        $('#txt-potencia').val(potencia.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);

        //-----CLASE 3

        //CONSERVIACION DE LA ENERGIA
        let conservacion_energia = ((parseInt($('#txt-masa').val()) + 0.002 + 0.020) * 9.8 * 0.019) + (1/2 * inercia_total * Math.pow($('#txt-velocidad-angular').val(), 2)) ;
        $('#txt-conservacion-energia').val(conservacion_energia.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);

        //MOVIMIENTO ROTACIONAL
        let rotacion_traslacion = (1/2 * (Math.pow((velo_angular * 0.007), 2)) * 0.332) + (1/2 * inercia_total * Math.pow($('#txt-velocidad-angular').val(), 2));
        $('#txt-movimiento-rotacional').val(rotacion_traslacion.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0]);

        //CANTIDAD DE MOVIMIENTO ANGULAR
        let movimiento_angular = 0.00009614 * velo_angular;
        $('#txt-cantidad-movimiento').val(movimiento_angular.toString().match(/^-?\d+(?:\.\d{0,5})?/)[0]);
    });

    $('#speedRange').change();

    $('#txt-masa').change(function(e){
        $('#speedRange').change();
    })
});
