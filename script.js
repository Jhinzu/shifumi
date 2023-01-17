const shi = document.getElementById('shi');
const fu = document.getElementById('fu');
const mi = document.getElementById('mi');
const player = document.getElementById('player');
const ia = document.getElementById('ia');
const command = document.getElementById('command');
const tryAgainElt = document.getElementById("restart");
const scoreElt = document.querySelector(".score");

console.log (scoreElt);
shi.addEventListener('click', () => play('shi'));

fu.addEventListener('click', () => play('fu'));

mi.addEventListener('click', () => play('mi'));

// Pour le reste, a vous de jouer
function play(userChoice)
{
    ia.classList.remove('translate-right');
    player.classList.remove('translate-left');

    reset_animation();

    console.log(userChoice)
    const choices = ["shi", "fu", "mi"];

    const randomIndex = Math.floor(Math.random() * choices.length);
    const iaChoice = choices[randomIndex];
    console.log(iaChoice);

    ia.src = "img/"+iaChoice+".png";
    ia.classList.add("translate-right");

    player.src = "img/"+userChoice+".png";
    player.classList.add("translate-left");

    let scorePlayerElt = document.querySelector("#score-player");
    let scoreIaElt = document.querySelector("#score-ia");
    const h3Add = document.createElement("h3");

    //gagner
    if (userChoice == "shi" && iaChoice == "fu" || userChoice == "fu" && iaChoice == "mi" || userChoice == "mi" && iaChoice == "shi" )
    {
        console.log("gagner");
        scorePlayerElt.innerHTML++;

        //fin de partie si gagner 
        if(scorePlayerElt.innerHTML == 3)
        {
            command.className= "hidden";
            tryAgainElt.className = "btn-restart";
            scoreElt.insertAdjacentElement("afterend",h3Add);
            h3Add.append("win !");

            //reset avec le bouton
            tryAgainElt.addEventListener("click",()=>
            {
                scoreIaElt.innerHTML = "0" ;
                scorePlayerElt.innerHTML = "0";
                command.className = "show";
                tryAgainElt.className = "hidden";
                h3Add.remove();
            })
        }
        
    }
    //perdu
    else if (userChoice == "shi" && iaChoice == "mi" || userChoice == "fu" && iaChoice == "shi" || userChoice == "mi" && iaChoice == "fu")
    {
        console.log("perdu");
        scoreIaElt.innerHTML++;

        //fin de partie si perdu
        if (scoreIaElt.innerHTML == 3)
        {
            command.className= "hidden";
            tryAgainElt.className = "btn-restart";
            scoreElt.insertAdjacentElement("afterend",h3Add);
            h3Add.append("Loose !");
            
            tryAgainElt.addEventListener("click",()=>
            {
                scoreIaElt.innerHTML = "0" ;
                scorePlayerElt.innerHTML = "0";
                command.classList.add("show");
                tryAgainElt.className = "hidden";
                h3Add.remove();

            })
        }
    }
    //égaliter
    else if (userChoice == iaChoice)
    {
        scorePlayerElt.innerHTML++;
        scoreIaElt.innerHTML++;

        //fin de partie si égaliter joueurs et player
        if(scorePlayerElt.innerHTML == 3)
        {
            command.className= "hidden";
            tryAgainElt.className = "btn-restart";
            scoreElt.insertAdjacentElement("afterend",h3Add);
            h3Add.append("Match null !");
            tryAgainElt.addEventListener("click",()=>
            {
                scoreIaElt.innerHTML = "0" ;
                scorePlayerElt.innerHTML = "0";
                command.classList.add("show");
                tryAgainElt.className = "hidden";
                h3Add.className = "hidden";
                h3Add.remove();

            })

        }
        else if (scoreIaElt.innerHTML == 3)
        {
            command.className= "hidden";
            tryAgainElt.className = "btn-restart";
            scoreElt.insertAdjacentElement("afterend",h3Add);
            h3Add.append("Match null !");
            tryAgainElt.addEventListener("click",()=>
            {
                scoreIaElt.innerHTML = "0" ;
                scorePlayerElt.innerHTML = "0";
                command.classList.add("show");
                h3Add.className = "hidden";
                h3Add.remove();
            })
        }
    }
    
}

function reset_animation()
{
    ia.style.animation = 'none';
    ia.offsetHeight; /* trigger reflow */
    ia.style.animation = null; 
    player.style.animation = 'none';
    player.offsetHeight; /* trigger reflow */
    player.style.animation = null;
}
