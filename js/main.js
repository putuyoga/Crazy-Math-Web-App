var bestScore;
var bestTime;
var point;
var selectedType;
var sequenceQuest;
var answer;
var startDate;
var answerCount;
var wrongCount;

$(document).on("pageinit", "#mainPage", function () {
	if(typeof(Storage)!=="undefined") {
		if(localStorage.bestScore) {
			bestScore = localStorage.bestScore;
			bestTime = localStorage.bestTime;
			var totalSeconds = bestTime;
			var seconds = totalSeconds % 60;
			var minutes = Math.floor(totalSeconds / 60);
			//update the main menu
			$("#timeRecord").html( minutes +" minute(s) and " + seconds + " second(s)" );
			$("#wordRecord").html( bestScore + " word(s)" );
		} else {
			bestScore = 0;
			bestTime = 0;
		}
	} else {
		alert("Local storage not found");
	}
	
});


$(document).on("pageshow", "#guessPage", function () {
    
	point = 0;
	answerCount = 0;
	wrongCount = 0;
	startDate = new Date();
});

function checkAnswer(index, obj) {
	var choice = $("#cho" + index).text();
	if(answer == choice) {
		answerCount++;
		if(answerCount < 10) {
			generateQuest(selectedType);
			generateAnswer(selectedType);
		} else {
			done();
		}
		resetButton();
	} else {
		wrongCount++;
		$(obj).prop('disabled', true);
	}
}

function resetButton() {
	for(var i = 0; i < 4; i++){
		$("#cho" + i).prop('disabled', false);
	}
}

function done() {
	var elapsed = Math.abs(new Date() - startDate);
	var totalSeconds = Math.floor(elapsed / 1000) + (wrongCount * 10); //final time + pinalty
	var seconds = totalSeconds % 60;
	var minutes = Math.floor(totalSeconds / 60);
	if(totalSeconds < 10) {
		$("#note").html("awesome play dude !");
	} else {
		$("#note").html("not bad");
	}
	
	$("#timeRecord").html(minutes + " minute(s) " + seconds + " second(s)");
	
	$("body").pagecontainer("change", "#resultPage");
}

function startMath(type) {
	selectedType = type;
	$("body").pagecontainer("change", "#guessPage");
	generateQuest(selectedType);
	generateAnswer(selectedType);
	console.log(selectedType);	
}


function generateQuest(type) {
	var number1;
	var number2;
	var sign;
	switch(type) {
		case "add" : 
			number1 = Math.floor((Math.random()*20)+1);
			number2 = Math.floor((Math.random()*20)+1);
			answer = number1 + number2;
			sign = "+";
			break;
		case "min" : 
			number1 = Math.floor((Math.random()*20)+1);
			number2 = Math.floor((Math.random()*17)+1);
			answer = number1 - number2;
			sign = "-";
			break;
		case "mul" : 
			number1 = Math.floor((Math.random()*10)+1);
			number2 = Math.floor((Math.random()*10)+1);
			answer = number1 * number2;
			sign = "x";
			break;
		case "div" : 
			number1 = Math.floor((Math.random()*50)+1);
			number2 = Math.floor((Math.random()*50)+1);
			while(number1 % number2 != 0) {
				number2 = Math.floor((Math.random()*50)+1);
			}
			answer = number1 / number2;
			sign = "÷";
			break;
	}
	//update UI
	$("#mathQuestion").html(number1 + " " + sign + " " + number2);
}

function generateAnswer(type) {
	var choice = [];
	for(var i = 0; i < 3; i++) {
		if(i % 2 == 0) {
			choice.push( answer + Math.floor((Math.random()*3)+1) );
		} else {
			choice.push( answer - Math.floor((Math.random()*3)+1) );
		}
	}
	choice.push(answer);
	multipleChoice = shuffle(choice);
	
	//updateUI
	for(var j = 0; j < 4; j++) {
		$("#cho" + j).html(multipleChoice[j]);
	}
}

//------------------------------------------------
//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};