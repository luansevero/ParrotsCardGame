let cardNumber;
function startGame(){
    numberOfPlays = 0
    cardNumber = checkNumber()//Função - Número de Cartas digitada pelo Usuário!
    createParrotCards(cardNumber) //Função - CriandoCartas + Sorteando as Cartas                          
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
}
let rightcards = 0 //Contador de cartas certas
let numberOfPlays = 0 // Contador de Jogadas
let cardsTurned = 0 //Identificador de 2 cartas selecionadas
let imgcheck = [] // Conferir se tem é a mesma carta(Pela back-face img)
let cardcheck = [] //Seleciona as 2 cartas que estão sendo avaliadas
let img; // Seletor da back-face img
function seeBackFace(element){
    numberOfPlays++
    const ParrotCards = document.querySelectorAll(`.card`)
    element.removeAttribute("onclick")
    element.classList.add(`toTurn`)
    cardsTurned++
    img = element.querySelector(`.backImg`)
    imgcheck.push(img)
    cardcheck.push(element)
        if(cardsTurned == 2){ // Comparar as 2 cartas
            if(imgcheck[0].src == imgcheck[1].src){ //Se tiver a mesma source =  true
                for(let i = 0; i < cardcheck.length; i++){
                    cardcheck[i].classList.remove(`toTurn`)
                    cardcheck[i].classList.add(`turned`)
                }
                rightcards += 2
            } else { // False - desvira as cartas
                setTimeout(unturned, 1000, cardcheck)
            }
            cardsTurned = 0  //Resetando todos os itens
            imgcheck = []  
            cardcheck = []
        }
        if(rightcards == ParrotCards.length){
           setTimeout(win, 1500, numberOfPlays) 
        } 
}
function unturned(cardcheck){
    for(let i = 0; i < cardcheck.length; i++){
        cardcheck[i].setAttribute(`onclick`, `seeBackFace(this)`)
        cardcheck[i].classList.remove(`toTurn`)
    }
}

function win(numberOfPlays){
        alert(`Você ganhou em ${numberOfPlays} jogadas!`)
        const answer = prompt(`Deseja jogar novamente? Responda "SIM" ou "NÃO"`)
        if(answer === "SIM"){
            let ParrotCards = document.querySelectorAll(`div`);
            for(let i = 0; i < ParrotCards.length; i++){
                ParrotCards[i].parentNode.removeChild(ParrotCards[i]);
            }
            rightcards = 0
            startGame()
        }
}


 