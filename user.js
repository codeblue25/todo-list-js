const form = document.querySelector(".js-form"),
      input = form.querySelector(".who"),
	  greeting = document.querySelector(".js-greetings");

const userLocalS = "currentUser";
const showingClassN = "showing";

function saveName(text){
    localStorage.setItem(userLocalS, text);
}

function handleName(event){
    event.preventDefault();
    const currentValue = input.value;
    paintName(currentValue);
    saveName(currentValue);
}

function askForName(event){
    form.classList.add(showingClassN);
    form.addEventListener("submit", handleName);
}

function paintName(text){
    form.classList.remove(showingClassN);
    greeting.classList.add(showingClassN);
    greeting.innerText = `Welcome, ${text}!`;
}

function getName(){
	const currentUser = localStorage.getItem(userLocalS);
	if(currentUser === null){
        askForName();
	}else{
        paintName(currentUser);
	}
}

function init() {
	getName();
}

init();