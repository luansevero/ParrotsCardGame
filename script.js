//Timer
let seconds = 0
let minute = 0
let timerInterval;
function timePlayed(){
    let timer = document.querySelector(`.timer`)
    seconds++
    if(seconds > 59){
        seconds = 0
        minute ++
    }
    timer.innerHTML = `${("0" + minute).slice(-2)}:${("0" + seconds).slice(-2)}`
    return timer
}
function timereduce(){
    let timer = document.querySelector(`.timer`)
    if(minute > 0){
        if(seconds == 0){
            minute--
            seconds = 60
        }
    }
    seconds--
    timer.innerHTML = `${("0" + minute).slice(-2)}:${("0" + seconds).slice(-2)}`
    if(minute == 0 && seconds == 0){
        return "end"
    }
}
function playgame(x){
    if(x == 1){
        classicgame()
        return 1
    } else {
        pensarapido()
        return 2
    }
}
function classicgame(){
    games.style.display = "none";
    numberOfCards = checkNumber()//Número de Cartas digitada pelo Usuário!
    createParrotCards(numberOfCards) //CriandoCartas + Sorteando as Cartas
    document.querySelector(`footer`).classList.add(`show`)
    timerInterval = setInterval(timePlayed, 1000)//Começar o timer
}
function pensarapido(){
    games.style.display = "none"
    let numberOfCardsTime = 14
    createParrotCards(numberOfCardsTime) //CriandoCartas + Sorteando as Cartas
    document.querySelector(`footer`).classList.add(`show`)
    minute = 1
    document.querySelector(`.timer`).innerHTML = `01:00`
    timerInterval = setInterval(timereduce, 1000)//Começar o timer
    if(timereduce() == "end"){

    }
}
function checkNumber(){
    let numberOfCards = prompt("Bem vindo ao PARROT CARD GAME! Com quantas cartas você quer jogar? Digite um número par entre 4 e 14!")
    numberOfCards = Number(numberOfCards)
    while(numberOfCards % 2 != 0 || numberOfCards > 14 || numberOfCards < 4){
        numberOfCards = prompt("Número inválido!Digite um número par entre 4 e 14!")
    }
    return numberOfCards
}

function createParrotCards(counter){
    const arrayImgs = ["1","2","3","4","5","6","7"]
    arrayImgs.sort(comparador)
    const arrayImgsSorted = [] // Vai armazenar o conteúdo da parte de tras das cartas.
    for(let i = 0; i < counter/2; i++){ //O contador é dividido por 2, pois são 2 cartas iguais
        arrayImgsSorted.push(arrayImgs[i])
        arrayImgsSorted.push(arrayImgs[i])
    }
    arrayImgsSorted.sort(comparador) // Embaralha as imgs que estão na array
    for(let i = 0; i < counter ; i++){ //Criando cartas de acordo com o return da funão checkNumber()
        let newParrotCard = document.createElement(`div`); 
        newParrotCard.classList.add(`card`)
        newParrotCard.setAttribute(`onclick`, `seeBackFace(this)`)
        newParrotCard.innerHTML = `
        <div class="front-face face click"><img src="frontcard/front.png" /></div>
        <div class="back-face face"><img class="backImg" src="backCards/${arrayImgsSorted[i]}.gif"/></div>`; //A cada div criada, ja armazena uma img aleatória.
        document.querySelector(`main`).appendChild(newParrotCard);
    }
}
function comparador() { 
	return Math.random() - 0.5; 
}
let numberOfPlays = 0 // Contador de Jogadas
let imgcheck = []
function seeBackFace(element){ // Verificador de Cartas iguais - Ativado por
    if( 2 > imgcheck.length){
        numberOfPlays++
        element.classList.add(`toTurn`)
        imgcheck.push(element.querySelector(`.backImg`))
        if(imgcheck.length == 2){ // Comparar as 2 cartas
            let cardsToCheck = document.querySelectorAll(".toTurn")
            if(imgcheck[0].src == imgcheck[1].src){
                cardsToCheck.forEach(rightParrots)
            } else {
                setTimeout(function(){cardsToCheck.forEach(unturned)}, 1000)
            }
            let allturned = document.querySelectorAll(`.turned`)
            if(allturned.length == numberOfCards){
                    setTimeout(results, 500, numberOfPlays) 
            }
        }
    } 
}
function rightParrots(ParrotCard){ //Função para duplicatas corretas
    ParrotCard.classList.remove("toTurn")
    ParrotCard.classList.add("turned")
    ParrotCard.removeAttribute("onclick")
    imgcheck = []
}
function unturned(ParrotCard){ //Função para duplicatas erradas
    ParrotCard.setAttribute(`onclick`, `seeBackFace(this)`)
    ParrotCard.classList.remove(`toTurn`)
    imgcheck = []
}
function results(numberOfPlays){ // Função de termino de Jogo
    let winx = document.querySelector(`.winScreen`)
    winx.classList.add(`show`)
    clearInterval(timerInterval)
    if(playgame ==  1){
        document.querySelector(`.clicks`).innerHTML = `Você ganhou em ${numberOfPlays} jogadas.` 
        document.querySelector(`.timespend`).innerHTML = `E demorou ${minute} minutos e ${seconds} segundos para terminar o jogo.`
    } else if(playgame == 2 || (pensarapido == "end") != true){
        document.querySelector(`.clicks`).innerHTML = `Você ganhou em ${numberOfPlays} jogadas.` 
        document.querySelector(`.timespend`).innerHTML = `E demorou ${minute} minutos e ${seconds} segundos para terminar o jogo.`
    } else {
        document.querySelector(`.clicks`).innerHTML = `Você teve ${numberOfPlays} jogadas.` 
        document.querySelector(`.timespend`).innerHTML = `E não conseguiu completar o jogo, tente novamente!`
    }

}
function playAgain(){
  if(playgame() == 1){
      resetGame()
      classicgame()
  } else if(playgame() == 2) {
      resetGame()
      pensarapido()
  }
}
function changeGameMode(){
    resetGame()
    document.querySelector(`.winScreen`).classList.remove(`show`)
    choseGameMode()
}
function resetGame(){ //Função para limpar as variáveis e outros
    timePlayed().innerHTML = `00:00`
    document.querySelector(`footer`).classList.remove(`show`)
    numberOfPlays = 0
    seconds = 0
    minute = 0
    rightcards = 0
    document.querySelector(`main`).innerHTML = ""
}
let rules = document.querySelector(`.rules-container`)
let games = document.querySelector(`.gamemodes`)
function closeWindown(){
    document.querySelector(`.winScreen`).classList.remove(`show`)
    resetGame()
    back()
}
function choseGameMode(){
    rules.style.display = "none";
    games.style.display = "flex";
}
function back(){
    games.style.display = "none";
    rules.style.display = "flex";
}
function alerta(){
    alert(`Ainda em construção`)
}
//botao changegame - vai para a tela de mudança de jogo (Logo tem a classe turned)
//botao playagain - recomeça o ultimo jogo que está sendo jogado(a pensar)
//botao fechar - volta para a tela inicial(display off no resultado)