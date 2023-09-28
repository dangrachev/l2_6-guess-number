const messageElement = document.querySelector('.message');
const hintElement = document.querySelector('.hint');
const attemptsElement = document.querySelector('.attempts');
const title = document.querySelector('.title');
const guessInput = document.querySelector('#guess-input');

// Кнопка угадать
document.querySelector('.guess-btn').addEventListener('click', guessNumber);

// Кнопка начать заново
document.querySelector('.new-game-btn').addEventListener('click', startNewGame);

// Кнопка выбора диапозона загадываемого числа
document.querySelector('.choose-range-btn').addEventListener('click', changeRange);


// Загаданное число
let secretNumber;

// Счетчик попыток
let attempts;

// Диапазон чисел по умолчанию
let minNumber = 1;
let maxNumber = 100;


// Функция для генерации случайного числа в заданном диапазоне
function generateRandomNumber(min = 1, max = 100) {
    const number = Math.floor(Math.random() * (max - min + 1)) + min;
    title.textContent = `Я загадал число от ${min} до ${max}`;

    return number;
}

// Функция обновляет счетчик попыток на странице
function updateAttemptsCounter() {
    attemptsElement.textContent = `Количество попыток: ${attempts.toString()}`;
}

// Функция выводит сообщение для пользователя
function showMessage(message) {
    messageElement.textContent = message;
}

// Функция выводит подсказку для пользователя
function showHint(message) {
    hintElement.textContent = message;
}

// Функция начинает новую игру
function startNewGame() {
    secretNumber = generateRandomNumber();
    attempts = 0;
    guessInput.value = '';

    updateAttemptsCounter();
    showMessage('');
    showHint('');
}

// Функция обрабатывает попытку пользователя угадать число
function guessNumber() {
    const guess = parseInt(guessInput.value);

    // Если пользователь ввел число за пределами диапазона, выводим предупреждение
    if (guess < minNumber || guess > maxNumber || isNaN(guess)) {
        showMessage('Пожалуйста, введите число в допустимом диапазоне!');
        return;
    }

    attempts++;
    updateAttemptsCounter();

    // Если пользователь угадал
    if (guess === secretNumber) {
        if (confirm('О-о-о нет, Вы угадали! Сыграем еще раз?')) {
            startNewGame();
        }
        return;
    }

    // Подсказка после каждой неудачной попытки
    if (guess < secretNumber) {
        showMessage('Загаданное число больше');
    } else {
        showMessage('Загаданное число меньше');
    }

    // Подсказка после каждой 3-ей попытки: является число четным или нет
    if (attempts % 3 === 0) {
        if (secretNumber % 2 === 0) {
            showHint('Загаданное число четное');
        } else {
            showHint('Загаданное число нечетное');
        }
    }
}


function changeRange() {
    // Приводим значения к числовому типу и делаем их положительными,
    // если пользователь выбрал отрицательные значения
    const min = Math.abs(+prompt('Выберете минимальное число'));
    const max = Math.abs(+prompt('Выберете максимальное число'));

    if (!isNaN(min) && !isNaN(max)) {
        minNumber = min;
        maxNumber = max;
        secretNumber = generateRandomNumber(min, max);
    } else {
        alert('Выбранные значения должны быть числами!')
    }
}

// Начало новой игры при загрузке страницы
startNewGame();