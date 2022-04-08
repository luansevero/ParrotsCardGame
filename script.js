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
function startGame(){
    cardNumber = checkNumber()//Número de Cartas digitada pelo Usuário!
    createParrotCards(cardNumber) //CriandoCartas + Sorteando as Cartas
    timerInterval = setInterval(timePlayed, 1000)//Começar o timer                       
}
function checkNumber(){
    let cardNumber = prompt("Bem vindo ao PARROT CARD GAME! Com quantas cartas você quer jogar? Digite um número par entre 4 e 14!")
    cardNumber = Number(cardNumber)
    while(cardNumber % 2 != 0 || cardNumber > 14 || cardNumber < 4){
        cardNumber = prompt("Número inválido!Digite um número par entre 4 e 14!")
    }
    return cardNumber
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
        <div class="front-face face"><img src="frontcard/front.png" /></div>
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
            if(allturned.length == cardNumber){
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
    clearInterval(timerInterval)
    alert(`Você ganhou em ${numberOfPlays} jogadas, e com o tempo de ${minute} minutos e ${seconds} segundos`)
    const answer = prompt(`Deseja jogar novamente? Digite "sim" ou "não"`)
    if(answer === "sim"){
        resetGame()
        setTimeout(startGame(), 500)
    }
}
function resetGame(){ //Função para limpar as variáveis e outros
    timePlayed().innerHTML = `00:00`
    numberOfPlays = 0
    seconds = 0
    minute = 0
    rightcards = 0
    document.querySelector("main").innerHTML = ""
}