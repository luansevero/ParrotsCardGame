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
        <div class="back-face face"><img src="backCards/${arrayImgs[i]}.gif"/></div>`;
        document.querySelector(`main`).appendChild(newParrotCard);
    }
}


 