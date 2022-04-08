//Timer
let seconds = 0
let minute = 0
let timerInterval;
let timer = document.querySelector(`.timer`)
function timePlayed(){
    let timer = document.querySelector(`.timer`)
    seconds++
    if(seconds > 59){
        seconds = 0
        minute ++
    }
    timer.innerHTML = `${("0" + minute).slice(-2)}:${("0" + seconds).slice(-2)}`
}
//
function startGame(){
    cardNumber = checkNumber()//Função - Número de Cartas digitada pelo Usuário!
    createParrotCards(cardNumber) //Função - CriandoCartas + Sorteando as Cartas                          
}
function checkNumber(){
    let cardNumber = prompt("Bem vindo ao PARROT CARD GAME! Com quantas cartas você quer jogar? Digite números pares entre 4 e 14!")
    cardNumber = Number(cardNumber)
    while(cardNumber % 2 != 0 || cardNumber > 14 || cardNumber < 4){
        cardNumber = prompt("Número inválido!Digite número pares entre 4 e 14!")
    }
    return cardNumber
}
function createParrotCards(counter){
    const arrayImgs = [] // Vai armazenar o conteúdo da parte de tras das cartas.
    for(let i = 0; i < counter/2; i++){ //O contador é dividido por 2, pois são 2 cartas iguais
        arrayImgs.push(i + 1)
        arrayImgs.push(i + 1)
    }
    arrayImgs.sort(comparador) // Embaralha as imgs que estão na array
    function comparador() { 
	return Math.random() - 0.5; 
    }
    for(let i = 0; i < counter ; i++){ //Criando cartas de acordo com o return da funão checkNumber()
        let newParrotCard = document.createElement(`div`); 
        newParrotCard.classList.add(`card`)
        newParrotCard.setAttribute(`onclick`, `seeBackFace(this)`)
        newParrotCard.innerHTML = `
        <div class="front-face face"><img src="archives/front.png" /></div>
        <div class="back-face face"><img class="backImg" src="backCards/${arrayImgs[i]}.gif"/></div>`; //A cada div criada, ja armazena uma img aleatória.
        document.querySelector(`main`).appendChild(newParrotCard);
    }
    timerInterval = setInterval(timePlayed, 1000)
}
let numberOfPlays = 0 // Contador de Jogadas
let imgcheck = []
function seeBackFace(element){ // Verificador de Cartas iguais - Ativado por
    numberOfPlays++
    element.removeAttribute("onclick")
    element.classList.add(`toTurn`)
    imgcheck.push(element.querySelector(`.backImg`))
        if(imgcheck.length == 2){ // Comparar as 2 cartas
            let cardsToCheck = document.querySelectorAll(".toTurn")
            if(imgcheck[0].src == imgcheck[1].src){ //Se tiver a mesma source =  true
                cardsToCheck.forEach(rightParrots)
            } else { // False - desvira as cartas
                setTimeout(function(){cardsToCheck.forEach(unturned)}, 1000,)
            } //Resetando as ARRAYS
            imgcheck = []  
        }
        let allturned = document.querySelectorAll(`.turned`)
        if(allturned.length == cardNumber){
           setTimeout(results, 500, numberOfPlays) 
    } 
}
function rightParrots(ParrotCard){
    ParrotCard.classList.remove("toTurn")
    ParrotCard.classList.add("turned")
}
function unturned(ParrotCard){ //Função para desvirar as cartas
    ParrotCard.setAttribute(`onclick`, `seeBackFace(this)`)
    ParrotCard.classList.remove(`toTurn`)
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
function resetGame(){
    numberOfPlays = 0
    seconds = 0
    minute = 0
    rightcards = 0
    document.querySelector("main").innerHTML = ""
    timer.innerHTML = `00:00`
}