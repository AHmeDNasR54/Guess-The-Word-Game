// Setting Game Name
let gameName="Guess A Football Word";
document.title=gameName;
document.querySelector("h1").innerHTML=gameName;
document.querySelector("footer").innerHTML=`${gameName} Game Created By Elzero Web School`;

// setting game options
let numberOfTries=5;
let numberOfLetters=6;
let currentTry=1;
let numberOfHints=3;
// Manage Words
let wordToGuess="";
const footballWords = ["tackle", "header", "injury", "assist", "yellow", "season", "strike", "attack", "defend", "passer"];
wordToGuess=footballWords[Math.floor(Math.random()*footballWords.length)].toLowerCase();
let messageArea=document.querySelector(".message");

// Manage Hints
document.querySelector(".hint span").innerHTML=numberOfHints;
const getHintButton=document.querySelector(".hint");
getHintButton.addEventListener("click",getHint);



function generateInput(){
    const inputsContainer=document.querySelector(".inputs");
    
    // create main Try Div
    for(let i=1;i<=numberOfTries;i++){
        const tryDiv=document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML=`<span>Try ${i}</span>`;

        if(i!==1){
            tryDiv.classList.add("disabled-inputs");
        }

        // create Inputs
        for(let j=1;j<=numberOfLetters;j++)
        {
            const input =document.createElement("input");
            input.type="text";
            input.id=`guess-${i}-letter${j}`;
            input.setAttribute("maxlength","1");
            tryDiv.appendChild(input);
        }

        inputsContainer.appendChild(tryDiv);
    } 
    inputsContainer.children[0].children[1].focus();

    // Disable all inputs except first one 
    const inputsDisableDiv=document.querySelectorAll(".disabled-inputs input");
    inputsDisableDiv.forEach((input)=>input.disabled=true);

    const inputs=document.querySelectorAll("input");
    inputs.forEach((input,index)=>{
        
        // convert input to upper case
        input.addEventListener("input",function(){
            this.value=this.value.toUpperCase();
            // console.log(index);
            const nextInput=inputs[index+1];
            if(nextInput)nextInput.focus();
        });

        // nav with keyboard
        input.addEventListener("keydown",function(event){
            // console.log(event);
            const currentIndex=Array.from(inputs).indexOf(event.target);
            // console.log(currentIndex);
            // console.log(event.target);
            // console.log(event.key);

            if (event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                if (nextInput < inputs.length) inputs[nextInput].focus();
              }

            if(event.key=="ArrowLeft"){
                const prevInput=currentIndex-1;
                if(prevInput>=0)
                    inputs[prevInput].focus();
            }
            
        });

    });

}
console.log(wordToGuess);

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click",handleGuesses);
function handleGuesses(){
    let successGuess=true;
    console.log(wordToGuess);
    
    for(let i=1;i<=numberOfLetters;i++){
        
        const inputField = document.querySelector(`#guess-${currentTry}-letter${i}`);
        const letter = inputField.value.toLowerCase();
        const actualLetter= wordToGuess[i-1];

        // Game Logic
        if(letter==actualLetter){
            console.log("corrrrrrrrrect");
            // Letter is correct and in place
            inputField.classList.add("yes-in-place");
        }
        else if(wordToGuess.includes(letter) && letter!=="")
        {
            console.log("goood");
            
            
            inputField.classList.add("not-in-place");
            successGuess=false;
        }
        else{
            // if(letter!==""){
            console.log("poadaaaaa");

            inputField.classList.add("wrong");
            successGuess = false;
        // }
    }
    }

    // check If User Win Or Lose
    if(successGuess){
        messageArea.innerHTML=`You Win , The Word Is <span>${wordToGuess}</span>`;
        if (numberOfHints === 3) {
            messageArea.innerHTML = `<p>Congratz You Didn't Use Hints</p>`;
          }
        //Add Disabled Class On All Try Dives 
        let AllTries =document.querySelectorAll(".inputs > div");
        AllTries.forEach((tryDiv)=>tryDiv.classList.add("disabled-inputs"));
        // by ahmed nasr , make opacity one of current try
        let currentTryDiv=document.querySelector(`.try-${currentTry}`);
        currentTryDiv.style.opacity = "1";

        // Disable Guess Button
        guessButton.disabled=true;
        getHintButton.disabled=true;

    }
    else{
        document.querySelector(`.try-${currentTry}`).classList.add("disabled-inputs");
        const currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
        currentTryInputs.forEach((input)=>input.disabled=true);
        
        currentTry++;

        const nextInputs=document.querySelectorAll(`.try-${currentTry} input`);
        nextInputs.forEach((input) => (input.disabled = false));

        let el = document.querySelector(`.try-${currentTry}`);
        if(el){
            document.querySelector(`.try-${currentTry}`).classList.remove("disabled-inputs");
            el.children[1].focus();

        }
        else {
             // Disable Guess Button
            guessButton.disabled = true;
            getHintButton.disabled = true;
            messageArea.innerHTML = `You Lose , The Word Is <span>${wordToGuess}</span>`;

        }
        
    }
}
    function getHint(){
        if(numberOfHints > 0){
            numberOfHints--;
            document.querySelector(".hint span").innerHTML=numberOfHints;
        }
        if(numberOfHints==0){
            getHintButton.disabled=true;
        }

        const enabledInputs =document.querySelectorAll("input:not([disabled])");
        console.log(enabledInputs);
        
        const emptyEnabledInputs=Array.from(enabledInputs).filter((input)=>input.value==="");
        console.log(emptyEnabledInputs);
        
        if(emptyEnabledInputs.length > 0)
        {
            const randomIndex = Math.floor(Math.random()*emptyEnabledInputs.length);
            const randomInput = emptyEnabledInputs[randomIndex];
            const indexToFill=Array.from(enabledInputs).indexOf(randomInput);
            // console.log(randomIndex);
            // console.log(randomInput);
            // console.log(indexToFill);

            if (indexToFill !== -1) {
                randomInput.value = wordToGuess[indexToFill].toUpperCase();
              }
                    
        
        }

    }

    function handleBackspace(event){
        if(event.key=="Backspace"){
            const inputs = document.querySelectorAll("input:not([disabled])");
            const currentIndex = Array.from(inputs).indexOf(document.activeElement);
            console.log(currentIndex);
            
            if(currentIndex > 0){
                const currentInput = inputs[currentIndex];
                const prevInput = inputs[currentIndex - 1];
                currentInput.value="";
                prevInput.value="";
                prevInput.focus();
            }
        }
    }

    document.addEventListener("keydown", handleBackspace);



window.onload=generateInput;
