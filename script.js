let currentTeam = 0;
let scores = [0, 0, 0];
let currentCard = null;
let timer;
let timeLeft = 90;

// Добавляем усложнение к задачам и перемешиваем их
const cards = [
    { question: "Решите уравнение: x² - 5x + 6 = 0", answer: "2 и 3", points: 20, meme: "https://cs9.pikabu.ru/post_img/big/2019/12/10/9/1575988681137424675.jpg" },
    { question: "Найдите дискриминант для уравнения: x² + 4x + 4 = 0", answer: "0", points: 20, meme: "https://img-webcalypt.ru/storage/memes/mqwB4mvLlUe4N20VT1zvRarlVTqxhQVP9PdcZaecu4zPsRQofOGwK7tJilIQxEwC6m71RnKILxdHnexpqTfaFj1uHFouJPDzKLpnvDONWzfWOdFTkNjQaKZgKfjUjwIA.jpeg" },
    { question: "Разложите на множители: x² - 9", answer: "(x - 3)(x + 3)", points: 20, meme: "https://media.tenor.com/FKiHuAtsDTMAAAAe/%D0%BC%D0%B0%D1%82%D0%B5%D0%BC%D0%B0%D1%82%D0%B8%D0%BA%D0%B0-%D0%BC%D0%B5%D0%BC.png" },
    { question: "Решите уравнение: x² - 4x - 5 = 0", answer: "5 и -1", points: 20, meme: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_6666efcbaea53213e25405bb_6666fc78bdac467014d30db6/scale_1200" },
    { question: "Найдите корни уравнения: x² + 2x - 8 = 0", answer: "2 и -4", points: 20, meme: "https://memozg.ru/img/posts/574_64df966c14168.webp" },
    { question: "Удвоение очков", type: "double" },
    { question: "Обмен баллами с другой командой", type: "swap" },
    { question: "Найдите корни уравнения: x² - x - 12 = 0", answer: "4 и -3", points: 20, meme: "https://kartinkof.club/uploads/posts/2022-03/thumbs/1648262498_16-kartinkof-club-p-matematik-mem-19.jpg" },
    { question: "Решите: (x + 2)(x - 5) = 0", answer: "-2 и 5", points: 20, meme: "https://kartinkof.club/uploads/posts/2022-03/thumbs/1648262502_20-kartinkof-club-p-matematik-mem-23.jpg" },
    { question: "Найдите дискриминант: x² - 6x + 9 = 0", answer: "0", points: 20 },
    { question: "Факторизируйте выражение: x² + 5x + 6", answer: "(x + 2)(x + 3)", points: 20 },
    { question: "Решите уравнение: 2x² - 8x + 6 = 0", answer: "1 и 3", points: 20 },
    { question: "Найдите дискриминант для: 3x² - 6x + 3 = 0", answer: "0", points: 20 },
    { question: "Решите уравнение: x² + x - 12 = 0", answer: "3 и -4", points: 20 },
    { question: "Факторизируйте: x² - 10x + 25", answer: "(x - 5)²", points: 20 }
].sort(() => Math.random() - 0.5); // Перемешиваем массив

// Таймер
function startTimer() {
    timer = setInterval(function() {
        document.getElementById("timeLeft").textContent = `Осталось времени: ${timeLeft} секунд`;
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timer);
            alert("Время вышло!");
            nextTurn();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

// Рисование карточки
function drawCard(index) {
    if (!cards[index] || document.getElementsByTagName('button')[index].disabled) return;

    document.getElementsByTagName('button')[index].disabled = true;
    currentCard = cards[index];
    document.getElementById("question").textContent = currentCard.question;

    if (currentCard.type === "double") {
        alert("Эта карта удваивает ваши очки!");
        scores[currentTeam] *= 2; // Удваиваем очки текущей команды
        updateScores(); // Обновляем отображение очков
        nextTurn(); // Переходим к следующему ходу
        return;
    } else if (currentCard.type === "swap") {
        alert("Эта карта меняет баллы с другой командой!");
        openSwapModal();
        return;
    }

    if (currentCard.meme) {
        document.getElementById("meme").style.display = "block";
        document.getElementById("memeImage").src = currentCard.meme;
    } else {
        document.getElementById("meme").style.display = "none";
    }

    document.getElementById("checkButtons").style.display = "block";
    startTimer();
}

// Функции ответов
function answerCorrect() {
    playSound("correctSound");
    scores[currentTeam] += currentCard.points;
    alert("Ответ засчитан как правильный! +" + currentCard.points + " очков");
    nextTurn();
}

function answerIncorrect() {
    playSound("incorrectSound");
    alert("Ответ засчитан как неправильный. Очки не добавлены.");
    nextTurn();
}

function showAnswer() {
    if (currentCard) {
        alert("Правильный ответ: " + currentCard.answer);
    }
}

function nextTurn() {
    stopTimer();
    timeLeft = 90;
    document.getElementById("question").textContent = "";
    document.getElementById("meme").style.display = "none";
    document.getElementById("checkButtons").style.display = "none";
    updateScores();
    currentTeam = (currentTeam + 1) % 3;
    document.getElementsByClassName("team")[currentTeam].classList.add("active");
}

function updateScores() {
    for (let i = 0; i < scores.length; i++) {
        document.getElementById("score" + (i + 1)).textContent = scores[i];
    }
}

function openSwapModal() {
    document.getElementById("swapModal").style.display = "flex";
}

function closeSwapModal() {
    document.getElementById("swapModal").style.display = "none";
}

function swapScores(teamIndex) {
    if (teamIndex === currentTeam) {
        alert("Нельзя обменяться очками с собственной командой!");
        return;
    }

    let temp = scores[currentTeam];
    scores[currentTeam] = scores[teamIndex];
    scores[teamIndex] = temp;
    updateScores();
    closeSwapModal();
    nextTurn();
}

function playSound(soundId) {
    document.getElementById(soundId).play();
}
