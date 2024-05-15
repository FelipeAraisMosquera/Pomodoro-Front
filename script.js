const html = document.querySelector('html')
const botonCorto = document.querySelector('.app__card-button--corto')
const botonEnfoque = document.querySelector('.app__card-button--enfoque')
const botonLargo = document.querySelector('.app__card-button--largo')
const banner = document.querySelector('.app__image')
const iconPause = document.querySelector('.app__card-primary-butto-icon')
const titulo = document.querySelector('.app__title')
const botones = document.querySelectorAll('.app__card-button')
const inputEnfoqueMusica = document.querySelector('#alternar-musica')
const musica = new Audio('./sonidos/luna-rise-part-one.mp3')
const musicaFin = new Audio('./sonidos/beep.mp3')
const musicaInicio = new Audio('./sonidos/play.wav')
const musicaPause = new Audio('./sonidos/pause.mp3')
const botonIniciarPausar = document.querySelector('#start-pause')
const textoIniciarPausar = document.querySelector('#start-pause span')
const tiempoEnPantalla = document.querySelector('#timer')

let tiempoTranscurridoEnSegundos = 1500
let idIntervalo = null

musica.loop = true

inputEnfoqueMusica.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')
})

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
})

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')
})

function cambiarContexto(contexto){
    mostrarTiempo()
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagenes/${contexto}.png`)

    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    
    switch (contexto) {
        case "enfoque":
                titulo.innerHTML = `Optimiza tu productividad,<br>
                    <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;
        case "descanso-corto":
                titulo.innerHTML = `¿Que tal tomar un respiro?
                    <strong class="app__title-strong">¡Haz una pausa corta! </strong>`
            break;
        case "descanso-largo": 
                titulo.innerHTML = `Hora de volver a la superficie,
                    <strong class="app__title-strong"> ¡Haz una pausa larga!</Strong>`
        default:
            break;
    }
}

//mostrar
const cuentaRegresiva = () => {
    
    if(tiempoTranscurridoEnSegundos <= 0){
        musicaFin.play()
        reiniciar();
        setTimeout(function() {
            alert('¡Tiempo final!'); // Detener el contador
        }, 1000);
        return
    }
    textoIniciarPausar.textContent = "Pausar"
    iconPause.setAttribute('src','./imagenes/pause.png')
    tiempoTranscurridoEnSegundos -= 1
    mostrarTiempo()
}

botonIniciarPausar.addEventListener('click', iniciarPausar)

//boton
function iniciarPausar(){
    console.log(idIntervalo);
    if(idIntervalo){
        musicaPause.play()
        reiniciar()
        return//Se puede pausar desde el boton
    }
    musicaInicio.play()
    idIntervalo = setInterval(cuentaRegresiva,1000)
}

function reiniciar(){
    clearInterval(idIntervalo)
    idIntervalo = null
    textoIniciarPausar.textContent = "Reanudar"
    iconPause.setAttribute('src', './imagenes/play_arrow.png')
}

function mostrarTiempo(){
    const tiempo = new Date(tiempoTranscurridoEnSegundos *1000) 
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX',{minute:'2-digit', second:'2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo()