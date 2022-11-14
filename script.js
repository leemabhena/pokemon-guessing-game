let weight = document.querySelector(".weight");
let height = document.querySelector(".height");
let abilities = document.querySelector(".abilities");
let type = document.querySelector(".type");
let weakness = document.querySelector(".weakness");
let img = document.querySelector("img");
let btn = document.querySelector("button");
let guess = document.querySelector(".guess");
let userInput = document.querySelector("input");
let changeScore = document.querySelector(".score");
let clue = document.querySelector(".clue");
let rules = document.querySelector(".rules");
let overlay = document.querySelector(".overlay");
let score = 0;
let index = 0;

let count = 0;
// make rules appear for 20 secs
let int = setInterval(load, 50);

function load(){
  count ++;
  if (count > 99){
    clearInterval(int);
    overlay.style.zIndex = -100;
    rules.style.zIndex = -12;
    overlay.style.backgroundImage = "url(https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg)";
  }
  rules.style.opacity = scale(count, 0, 100, 1, 0);
  
}




function scale (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}


const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://pokedex2.p.rapidapi.com/pokedex/uk",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "pokedex2.p.rapidapi.com",
		"x-rapidapi-key": "194502b32cmshad2f3b591a68a1dp151864jsndd72ca8cee17"
	}
};


$.ajax(settings).done(function (response) {
  // generate random number from 0 to length of response array - 1
  let rnd = Math.floor(Math.random() * response.length);
  rnd = update(response, rnd);
  // Event Listener on the button to check for clicks
  btn.addEventListener("click", function(){
    // check if the user guessed correctly
    if (userInput.value.toLowerCase() == response[rnd].slug){
      guess.innerHTML = "You guessed correctly !!!!!";
      // clear the text field
      userInput.value = "";
      score ++;
      changeScore.innerHTML = `Score: ${score}`;
      rnd = update(response,Math.floor(Math.random() * response.length));
  }else{
    guess.innerHTML = "Try Again!";
    index ++;
    if (index > response[rnd].name.length){
      rnd = update(response, Math.floor(Math.random() * response.length));
      clue.innerHTML = "Hint: ";
      index = 0;
    }else{
      clue.innerHTML =  clue.innerHTML + response[rnd]?.name[index - 1];
    }
  }
  })
  
	console.log(response[rnd]);
});

function update(response, rnd){
  
  // change the picture of the pokemon
  img.setAttribute("src", response[rnd].ThumbnailImage);
  // changing the Html contents based on the random number
  weight.innerHTML = `Weight: ${response[rnd].weight}`;
  height.innerHTML = `Height: ${response[rnd].height}`;
  abilities.innerHTML = `Abilities: ${formatStr(response[rnd].abilities)}`;
  weakness.innerHTML = `Weakness: ${formatStr(response[rnd].weakness)}`;
  type.innerHTML = `Type: ${formatStr(response[rnd].type)}`;
  return rnd;
}

function formatStr(str) {
  str = String(str);
  const arrStr = str.split(",");
  let finalStr = "";
  arrStr.forEach(el => {
    finalStr += el.charAt(0).toUpperCase() + el.substr(1).toLowerCase() + ", ";
  });
  return finalStr.substring(0, finalStr.length - 2);
}