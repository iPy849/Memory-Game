var imgPath = [
    {
        name:'Alejandro',
        img:'img/Alejandro.png'
    },
    {
        name:'Camila',
        img:'img/Camila.png'
    },
    {
        name:'Daleska',
        img:'img/Daleska.png'
    },
    {
        name:'Kirill',
        img:'img/Kirill.png'
    },
    {
        name:'Miguel',
        img:'img/Miguel.png'
    },
    {
        name:'Nestor',
        img:'img/Nestor.png'
    },  
    {
        name:'Sebastian',
        img:'img/Sebastian.png'
    },
    {
        name:'Vicente',
        img:'img/Vicente.png'
    }     
];

document.addEventListener('DOMContentLoaded', () => {

    

    const board = document.querySelector('#content');
    const backCardImg = "img/card-back.png";
    let distribution = [];
    let cardChosen = [];
    let score = 0;

    //Restarting Game
    const resetButton = document.querySelector('#dialog > button');
    resetButton.addEventListener('click', function(){
        window.location.replace(document.URL);
    });


    //Check for matches
    function CheckForMatch() {
        let card1 = cardChosen[0];
        let card2 = cardChosen[1];

        if(card1.dataset.id === card2.dataset.id){
            score += 1;
            document.querySelector('#score').innerHTML = score;
            if(score === 8)
                document.querySelector('#dialog').style.display = "flex";
        }
        else{
            cardChosen.forEach(card => card.setAttribute('src', backCardImg));
        }
        cardChosen = []
    }
    
    //Flip Card
    function FlipCard() {
        if(cardChosen.length < 2){
            let imgID = this.dataset.id;
            console.log(imgID)
            this.setAttribute('src', imgPath[imgID].img);
            cardChosen.push(this);
    
            if(cardChosen.length === 2)
                setTimeout(CheckForMatch, 500);
        }
    }

    //Assign random position
    function RandomPositioning(i, img) {

        return undefined;
    }

    //Create board
    function CreateDistribution(){
        let taken = []
        let completed = []

        for(let i = 0; i < imgPath.length * 2; i++){

            let randInt = (MAX_VALUE) => Math.floor( Math.random() * MAX_VALUE );
            
            //Agarra un carta cualquiera de las posibles en imgPath
            let randomImgIndex = randInt(imgPath.length)

            //Toma una carta y verifica si está repetida o ya se puso dos veces
            if(taken.indexOf(randomImgIndex) === -1)
                taken.push(randomImgIndex);
            else if(completed.indexOf(randomImgIndex) === -1)
                completed.push(randomImgIndex);
            else{
                i -= 1;
                continue;
            }

            //Agrega la carta al tablero distribuido
            distribution.push(imgPath[randomImgIndex]);
        }
    }

    //Show game board
    function CreateBoard(){
        for (let i = 0; i < distribution.length; i++) {
            let img = document.createElement('img');
            img.setAttribute('src', backCardImg);
            img.setAttribute('class', 'card');

            let index = imgPath.indexOf(distribution[i]);
            img.setAttribute('data-id', index );
            img.addEventListener('click', FlipCard);

            board.appendChild(img);
        }
    }

    CreateDistribution();
    CreateBoard();
});