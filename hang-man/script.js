let letters="abcdefghijklmnopqrstuvwxyz";
let lettersArray=letters.split('');
let lettersContainer=document.querySelector(".letters");
//Genrate letters in page
lettersArray.forEach((letter)=>{
 let span=document.createElement("span");
 span.innerHTML=letter;
 lettersContainer.append(span);
 span.classList.add("letter-box");
});

words={
 people:["ronaldo", "messi", "brad pitt", "neymar", "benzema",  "Dwayne Johnson",
  "Leonardo DiCaprio",
  "Tom Cruise",
  "Robert Downey Jr",
  "Johnny Depp",
  "Scarlett Johansson",
  "Angelina Jolie",
  "Brad Pitt",
  "Will Smith",
  "Keanu Reeves"],
 countries:["palestine", "syria", "lebanon", "jordan", "jamaica", "germany", "england", "oman", "kuwait"],
 movies:[   "Inception",
  "The Dark Knight",
  "Interstellar",
  "The Matrix",
  "Pulp Fiction",
  "The Shawshank Redemption",
  "Forrest Gump",
  "Fight Club",
  "The Godfather",]
}

// All Keys from words
let allKeys=Object.keys(words);

// Random number from 0-2
let keyNumber=Math.floor(Math.random() * allKeys.length);
// Get the name of the key randomly
let keyName=allKeys[keyNumber];

let keyValue=words[keyName];

let valueNumber=Math.floor(Math.random() * keyValue.length);
let valueValue=keyValue[valueNumber];

document.querySelector(".game-info .category span").innerHTML=keyName;

let letterGuess=document.querySelector(".letters-guess");

let valueValueArr=Array.from(valueValue);
// Generating the letters-guess input field
valueValueArr.forEach((letter)=>{
  let emptySpan=document.createElement("span");
  if(letter===' '){
    emptySpan.classList.add("space");
  }
  letterGuess.append(emptySpan);
});

let letterSpans=document.querySelectorAll(".letters-guess span");

let hangManDraw=document.querySelector(".hangman-draw");

let wrongAttempts=0;
let correctAttempts=0;

document.addEventListener("click", (event)=>{
  if(event.target.className === 'letter-box'){

    let status=false;

    event.target.classList.add("clicked");

    let clickedLetter=event.target.innerHTML.toLowerCase();

    let chosenWord=Array.from(valueValue);

    chosenWord.forEach((wordLetter, wordIndex)=>{ 
    if(wordLetter.toLowerCase()===clickedLetter){
      status=true;
      correctAttempts++;
      //Iterating on the empty spans
      letterSpans.forEach((span, spanIndex)=>{
        if(wordIndex===spanIndex){
          span.innerHTML=clickedLetter;
        } 
      })
      if(correctAttempts===valueValue.length){
        let div=document.createElement("div");
        div.className="win-popup";
        div.innerHTML=`Game Over, you won`;
        let container=document.querySelector(".container");
        container.append(div);
        lettersContainer.classList.add("finished");
      }
    }
  })
  if(status===false){
    //play failing sound
    document.getElementById("wrong").play(); 
    wrongAttempts++;
    hangManDraw.classList.add(`wrongAttempts-${wrongAttempts}`)
    if(wrongAttempts===8){
      endGame();
      lettersContainer.classList.add("finished");
    }
  }
  else{
    //play correct sound
    document.getElementById("correct").play(); 
  }

} 
})

function endGame(){
  let div=document.createElement("div");
  let container=document.querySelector(".container");
  div.innerHTML=`Game Over, the word is ${valueValue}`;
  div.className="lose-popup";
  container.append(div);
}