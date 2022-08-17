// Задача 2
// https://jsbin.com/deyoteb/edit?html,css,js,output - исправить код таким образом, чтобы при фокусе у инпутов добавлялась красная рамка. Обработка событий должна происходить на formElement.

// Решение по ссылке: https://output.jsbin.com/gutugem/1

// Измененный код:
// var formElement = document.forms['formElement'];
// formElement.addEventListener("focus", (evt) => {
// 	var activeElement = formElement.querySelector('.focused');
// 	if (activeElement) {
// 		activeElement.classList.remove('focused');
// 	}
// 	evt.target.classList.add('focused');
// }, true);

// formElement.addEventListener("blur", (evt) => {
// 	var activeElement = formElement.querySelector('.focused');
// 	if (activeElement) {
// 		activeElement.classList.remove('focused');
// 	}
// }, true);