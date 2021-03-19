'use strict';

var WINNING_AUDIO = new Audio('./sounds/win.mp3');
var WRONG_AUDIO = new Audio('./sounds/wrong.mp3');
var gLevel = 16;
var gSavedTable = [];
var gGameNums = [];
var gElTable = document.querySelector('table'); // will hold all the contant for us.
var guessNum;
var gGuessCount = 0;
var gTable;
var gTimeInterval;
var isGameOn = true;
var gStartTime;
var gTimer = document.querySelector('.time p');

window.addEventListener('load', init); // play everything when page loaded

function init() {
	isGameOn = true;
	if (gTimeInterval) clearInterval(gTimeInterval);
	gSavedTable = [];
	gGuessCount = 0;
	gTimeInterval = 0;
	resetNums();
	createNums();
	createTable();
	renderTable();
	resetNums();
	generateNum();
}

function createNums() {
	var size = Math.sqrt(gLevel);
	for (var i = 0; i < size; i++) {
		gSavedTable.push([]);
		for (var j = 0; j < size; j++) {
			gSavedTable[i].push({
				value: +gGameNums.splice(getRandomInt(0, gGameNums.length), 1)
			});
		}
	}
}

function createTable() {
	var size = Math.sqrt(gLevel);
	var strHTML = '';
	for (var i = 0; i < size; i++) {
		strHTML += '<tr>';
		for (var j = 0; j < size; j++) {
			strHTML += `<td data-num="${gSavedTable[i][j].value}" onclick="numberClick(this)"> ${gSavedTable[i][j]
				.value} </td>`;
		}
		strHTML += '</tr>';
	}
	gTable = strHTML;
}

function renderTable() {
	gElTable.innerHTML = gTable;
}

function levelClick(level) {
	isGameOn = true;
	gLevel = +level.dataset.num;
	init();
}

function generateNum() {
	var nextNumScreen = document.querySelector('.next-number p');
	guessNum = +gGameNums.splice(getRandomInt(0, gGameNums.length), 1);
	nextNumScreen.innerText = guessNum;
}

function numberClick(clickedCell) {
	if (!gStartTime) gStartTime = Date.now();
	if (!isGameOn) return;
	stopWatch();
	if (guessNum === +clickedCell.dataset.num) {
		clickedCell.classList.add('right');
		clickedCell.removeAttribute('onclick');
		gGuessCount++;
		winningCheck(gGuessCount);
		generateNum();
	} else {
		isGameOn = false;
		clickedCell.classList.add('wrong');
		WRONG_AUDIO.play();
		setTimeout(function() {
			isGameOn = true;
			clickedCell.classList.remove('wrong');
		}, 500);
	}
}

function winningCheck(guessCount) {
	var gameTable = document.querySelector('table');
	var restartBtn = document.querySelector('.restart-button');
	if (guessCount === gLevel) {
		isGameOn = false;
		clearInterval(gTimeInterval);
		WINNING_AUDIO.play();
		setTimeout(function() {
			gameTable.classList.add('hidden');
			restartBtn.classList.remove('none');
		}, 1000);
	}
}
function stopWatch() {
	if (!isGameOn) clearInterval(gTimeInterval);
	if (!gTimeInterval) gTimeInterval = setInterval(timerUpdate, 100);
}

function timerUpdate() {
	var currTime = Date.now();
	gTimer.innerText = `${(currTime - gStartTime) / 1000}s`;
}
function restartBtn() {
	var gameTable = document.querySelector('table');
	var restartBtn = document.querySelector('.restart-button');
	gameTable.classList.remove('hidden');
	restartBtn.classList.add('none');
	gTimer.innerText = `${'00.000'}`;
	gStartTime = 0;
	init();
}
