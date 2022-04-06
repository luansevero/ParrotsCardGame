function startGame(){
    const arrayImgsdataBase = ["backCards/bobrossparrot.gif", "backCards/bobrossparrot.gif","backCards/explodyparrot.gif","backCards/explodyparrot.gif","backCards/fiestaparrot.gif","backCards/fiestaparrot.gif","backCards/metalparrot.gif","backCards/metalparrot.gif","backCards/revertitparrot.gif","backCards/revertitparrot.gif","backCards/tripletsparrot.gif","backCards/tripletsparrot.gif","backCards/unicorn.gif","backCards/unicorn.gif",]
    let arrayImgs = []
    let number = prompt("Quantas cartas você quer jogar?")
        number = Number(number)
    for(let i = 0; i == i; i++){
        if(number % 2 == 0 && number <= 14 && number >= 4){
            break
        }
        number = prompt("Quantas cartas você quer jogar?")
    }
    //Final do Verificador de Número
    //Embaralhador de Cartas
    for(let i = 0; i < number; i++){
        arrayImgs.push(arrayImgsdataBase[i])
    }
    arrayImgs.sort(comparador)
    function comparador() { 
	return Math.random() - 0.5; 
    }
    const cartas = document.querySelectorAll(`.card`); //Saber quantas cartas vão estar em jogo.
    const imgBackFace = document.querySelectorAll(`.imgBackFace`) //Pegar o src das cartas para poder mudar
    for(let i = 0; i < number; i++){ //Limitador = número de cartas digitada pelo usuário
        cartas[i].classList.add(`show`) //Dar classe para as cartas que vão aparecer.
        imgBackFace[i].src = arrayImgs[i] //Mudar src das image(Já sorteados)
    }
}
function rotateImg(element){
    element.querySelector(`.back-face`).style.transform = "rotateY(0deg)"
    element.querySelector(`.front-face`).style.transform = "rotateY(-180deg)"
}

 