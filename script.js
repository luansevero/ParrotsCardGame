function startGame(){
    let cardNumber = checkNumber()//Número de Cartas digitada pelo Usuário!
        createParrotCards(cardNumber) //CriandoCartas + Sorteando as Cartas                          
}
function checkNumber(){
    let cardNumber = prompt("Bem vindo ao PARROT CARD GAME! Com quantas cartas você quer jogar? Digite números pares entre 4 e 14!")
    cardNumber = Number(cardNumber)
    for(let i = 0; i == i; i++){ //Verificar se o número digito é válido!
        if(cardNumber % 2 == 0 && cardNumber <= 14 && cardNumber >= 4){
            break
        }
        cardNumber = prompt("Número inválido!Digite número pares entre 4 e 14!")
    }
    return cardNumber
}
function createParrotCards(counter){
    const arrayImgs = []
    for(let i = 0; i < counter/2; i++){
        arrayImgs.push(i + 1)
        arrayImgs.push(i + 1)
    }
    arrayImgs.sort(comparador)
    function comparador() { 
	return Math.random() - 0.5; 
    }
    for(let i = 0; i < counter ; i++){ //Criando cartas de acordo com o return da função checkNumber()
        newParrotCard = document.createElement(`div`);
        newParrotCard.classList.add(`card`)
        newParrotCard.setAttribute(`onclick`, `seeBackFace(this)`)
        newParrotCard.innerHTML = `
        <div class="front-face face"><img src="archives/front.png" /></div>
        <div class="back-face face"><img class="backImg" src="backCards/${arrayImgs[i]}.gif"/></div>`;
        document.querySelector(`main`).appendChild(newParrotCard);
    }
}
let cardsTurned = 0
let imgcheck = []
let cardcheck = []
let img;
function seeBackFace(element){
    const ParrotCards = document.querySelectorAll(`.card`)
    element.removeAttribute("onclick")
    element.classList.add(`toTurn`)
    cardsTurned++
    img = element.querySelector(`.backImg`)
    imgcheck.push(img)
    cardcheck.push(element)
    if(cardsTurned == 2){
        if(imgcheck[0].src == imgcheck[1].src){
            for(let i = 0; i < cardcheck.length; i++){
                cardcheck[i].classList.remove(`toTurn`)
                cardcheck[i].classList.add(`turned`)
            }
        } else {
            for(let i = 0; i < cardcheck.length; i++){
                cardcheck[i].setAttribute(`onclick`, `seeBackFace(this)`)
                cardcheck[i].classList.remove(`toTurn`)
            }
        }
        cardsTurned = 0
        imgcheck = []
        cardcheck = []
    }
}



 