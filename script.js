function startGame(){
    let cardNumber = checkNumber()//Número de Cartas digitada pelo Usuário!                            
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

 