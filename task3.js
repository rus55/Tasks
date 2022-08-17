// Задача 3. Быки и коровы
// Компьютер загадывает число из нескольких различающихся цифр(от 3 до 6).Игроку дается несколько попыток на то, чтобы угадать это число.
// После каждой попытки компьютер сообщает количество совпавших цифр стоящих не на своих местах, а также количество правильных цифр на своих местах.
// Например загаданное число: 56478 предположение игрока: 52976
// ответ: совпавших цифр не на своих местах - 1(6), цифр на своих местах - 2(5 и 7)
// игра ведется до окончания количества ходов либо до отгадывания

// Решение
const readlineSync = require('readline-sync');

let sizeNumber;
let bulls = [];
let cows = [];
let count = 10;

function getUserNumber() {
	let userNumber = readlineSync.question(`Игра: Быки и Коровы. Введите ${sizeNumber} значное число! Цифры не должны повторяться! У вас ${count} ходов: `);

	return userNumber;
}

function getRandomNumberDigits(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumber() {
	let randomNumber = '';
	let num;

	for (let i = 0; i < sizeNumber; i++) {
		do {
			num = getRandomNumberDigits(0, 9);
		} while (randomNumber.indexOf(num) >= 0);
		randomNumber += num;
	}
	return randomNumber;
}

function compare(userNumber, randomNumber) {
	cows = [];
	bulls = [];

	if (userNumber === randomNumber) {
		console.log('Вы угадали, соответственно, выиграли! Поздравляем!');
		return true;
	} else {
		for (let i = 0; i < userNumber.length; i++) {
			if (randomNumber[i] === userNumber[i]) {
				bulls.push(userNumber[i])
			}

			if (randomNumber.indexOf(userNumber[i]) !== -1 && bulls.indexOf(userNumber[i]) === -1) {
				cows.push(userNumber[i]);
			}
		}
		console.log('cows: ' + cows.join(','));
		console.log('bulls: ' + bulls.join(','));
		return false;
	}
}

function play() {
	sizeNumber = getRandomNumberDigits(3, 6);
	const randomNumber = generateRandomNumber();
	let resultCompare;
	do {
		let userNumber = getUserNumber();
		resultCompare = compare(userNumber, randomNumber);
		count--;
		if (!count) {
			console.log('Вы проиграли, так как использовали 10 ходов. Попробуйте снова сыграть!');
			break;
		}
	} while (!resultCompare);
}

play();