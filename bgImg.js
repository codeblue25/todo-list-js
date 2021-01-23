const body = document.querySelector("body"),
      IMAGES = 4;

function paintImg(imgNum){
	const img = new Image();
	img.src = `bgImgs/${imgNum+1}.jpg`;
	img.classList.add('bgImg');
	body.appendChild(img);
}

function getRandom(){
	const number = Math.floor(Math.random()*IMAGES);
	return number;
}

function init(){	
	const randomNumber = getRandom();
	paintImg(randomNumber);
}

init();