function isANumber(){
    let number = prompt("Quantas cartas você quer jogar?")
        number = Number(number)
    for(let i = 0; i == i; i++){
        if(number % 2 == 0 && number <= 14 && number >= 4){
            break
        }
        number = prompt("Quantas cartas você quer jogar?")
    }
    const cartas = document.querySelectorAll(`.card`);
    for(let i = 0; i < number; i++){
        cartas[i].classList.add(`show`)
    }
}
