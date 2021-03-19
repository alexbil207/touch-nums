'use strict';

function resetNums() {
	gGameNums = [];
	for (var i = 1; i <= gLevel; i++) {
		gGameNums.push(i);
	}
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is inclusive and the minimum is inclusive
}
