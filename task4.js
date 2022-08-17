// Задача 4. RPG баттл
// Боевой маг Евстафий сражается с лютым монстром.
// Бой идет по ходам.Каждый ход компьютер(Лютый) случайно выбирает одно из доступных действий и сообщает, что он собирается делать.В ответ на это игрок(Евстафий) должен выбрать свое действие.
// После происходит взаимное нанесение урона.Магическая броня блокирует магический урон, физическая броня блокирует физический урон.
// После совершения действия, оно не может быть повторно выбрано в течение cooldown ходов
// Бой идет до победы одного из противников.
// Перед началом боя игрок выбирает сложность(начальное здоровье Евстафия)

// Решение
const readlineSync = require('readline-sync');

const monster = {
	maxHealth: 10,
	name: "Лютый",
	moves: [
		{
			"name": "Удар когтистой лапой",
			"physicalDmg": 3, // физический урон
			"magicDmg": 0,    // магический урон
			"physicArmorPercents": 20, // физическая броня
			"magicArmorPercents": 20,  // магическая броня
			"cooldown": 0,     // ходов на восстановление
			"cooldownCurrent": 0 // оставшееся количество ходов для восстановления
		},
		{
			"name": "Огненное дыхание",
			"physicalDmg": 0,
			"magicDmg": 4,
			"physicArmorPercents": 0,
			"magicArmorPercents": 0,
			"cooldown": 3,
			"cooldownCurrent": 0 // оставшееся количество ходов для восстановления
		},
		{
			"name": "Удар хвостом",
			"physicalDmg": 2,
			"magicDmg": 0,
			"physicArmorPercents": 50,
			"magicArmorPercents": 0,
			"cooldown": 2,
			"cooldownCurrent": 0 // оставшееся количество ходов для восстановления
		},
	]
}

const player = {
	maxHealth: 10,
	name: "Евстафий",
	moves: [
		{
			"name": "Удар боевым кадилом",
			"physicalDmg": 2,
			"magicDmg": 0,
			"physicArmorPercents": 0,
			"magicArmorPercents": 50,
			"cooldown": 0,
			"cooldownCurrent": 0 // оставшееся количество ходов для восстановления
		},
		{
			"name": "Вертушка левой пяткой",
			"physicalDmg": 4,
			"magicDmg": 0,
			"physicArmorPercents": 0,
			"magicArmorPercents": 0,
			"cooldown": 4,
			"cooldownCurrent": 0 // оставшееся количество ходов для восстановления
		},
		{
			"name": "Каноничный фаербол",
			"physicalDmg": 0,
			"magicDmg": 5,
			"physicArmorPercents": 0,
			"magicArmorPercents": 0,
			"cooldown": 3,
			"cooldownCurrent": 0 // оставшееся количество ходов для восстановления
		},
		{
			"name": "Магический блок",
			"physicalDmg": 0,
			"magicDmg": 0,
			"physicArmorPercents": 100,
			"magicArmorPercents": 100,
			"cooldown": 4,
			"cooldownCurrent": 0 // оставшееся количество ходов для восстановления
		},
	]
};

const gameDifficulty = [
	{ name: 'hard', value: 5 },
	{ name: 'average', value: 7 },
	{ name: 'light', value: 10 }
]

function getRandomNumberDigits(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getStartHealth() {
	let level;

	do {
		level = readlineSync.question('Напишите цифру для выбора уровня сложности игры: Трудный - 1, Средний - 2, Легкий - 3  ');
		if (!gameDifficulty[level - 1]) {
			console.log('Можно ввести только 1, 2 или 3! Ничего другого нельзя ввести');
		}
	} while (!gameDifficulty[level - 1]);

	return gameDifficulty[level - 1].value;
}

function getNewHealth(health, enemyAction, myAction) {
	return health - (enemyAction.physicalDmg - (myAction.physicArmorPercents / 100 * enemyAction.physicalDmg)) - (enemyAction.magicDmg - (myAction.magicArmorPercents / 100 * enemyAction.magicDmg));
}

function updateCooldown() {	
	player.moves = player.moves.map((item) => {
		item.cooldownCurrent = item.cooldownCurrent > 0 ? --item.cooldownCurrent : item.cooldownCurrent;
		return item;
	})

	monster.moves = monster.moves.map(item => {
		item.cooldownCurrent = item.cooldownCurrent > 0 ? --item.cooldownCurrent : item.cooldownCurrent;
		return item;
	})
}

function play() {
	player.maxHealth = getStartHealth();
	monster.maxHealth = player.maxHealth;

	while (player.maxHealth > 0 && monster.maxHealth > 0) {
		let monsterAction;
		do {
			const randomNumber = getRandomNumberDigits(0, 2);
			monsterAction = monster.moves[randomNumber];
		} while (monsterAction.cooldownCurrent > 0);
		monsterAction.cooldownCurrent = monsterAction.cooldown;
		console.log('Монстер выполнил: ', monsterAction.name);

		let userAction;
		do {
			const userActionNumber = readlineSync.question('Для отражения атаки монстра Евстафием выберите действие (Урон(Физический, Магический), Щит(Физический, Магический))\n 1.Удар боевым кадилом - Урон(2,0), Щит(0,50),\n 2.Вертушка левой пяткой - Урон(4,0), Щит(0,0),\n 3.Каноничный фаербол - Урон(0,5), Щит(0,0),\n 4.Магический блок  - Урон(0,0), Щит(100,100)\n Введите номер своего действия: ');

			userAction = player.moves[userActionNumber - 1];
			if (userAction.cooldownCurrent > 0) {
				console.log(`Это действие заблокировано на ${userAction.cooldownCurrent} ходов.`);
			}
		} while (userAction.cooldownCurrent > 0);
		userAction.cooldownCurrent = userAction.cooldown;

		player.maxHealth = getNewHealth(player.maxHealth, monsterAction, userAction);
		monster.maxHealth = getNewHealth(monster.maxHealth, userAction, monsterAction);

		updateCooldown();

		console.log('Текущее здоровье Евстафия: ', player.maxHealth);
		console.log('Текущее здоровье Монстра: ', monster.maxHealth);
	}

	if (monster.maxHealth <= 0 && player.maxHealth <= 0) {
		console.log('Ничья или оба проиграли, так как закончилось здоровье.');
	} else if (player.maxHealth <= 0) {
		console.log('Выиграл: Монстер.');
	} else if (monster.maxHealth <= 0) {
		console.log('Выиграл: Ефставий.');
	}
}

play();
