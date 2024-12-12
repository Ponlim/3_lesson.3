document.getElementById('btn-get').addEventListener('click', function() {
    document.querySelector('.modal').style.display = 'block';
});

document.querySelector('.modal_close').addEventListener('click', function() {
    document.querySelector('.modal').style.display = 'none';
});

const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');

// Объекты игры
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    velocityX: 5,
    velocityY: 5,
    speed: 7,
    color: "WHITE"
}

const user = {
    x: 0,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    score: 0,
    color: "WHITE"
}

const com = {
    x: canvas.width - 10,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    score: 0,
    color: "WHITE"
}

// Сетка
const net = {
    x: (canvas.width - 2) / 2,
    y: 0,
    height: 10,
    width: 2,
    color: "WHITE"
}

// Рисование прямоугольника
function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

// Рисование круга
function drawCircle(x, y, r, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

// Рисование текста
function drawText(text, x, y, color) {
    context.fillStyle = color;
    context.font = "45px fantasy";
    context.fillText(text, x, y);
}

// Рисование сетки
function drawNet() {
    for (let i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// Отрисовка всей игры
function render() {
    // Очистка холста
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");

    // Отрисовка сетки
    drawNet();

    // Отрисовка счета
    drawText(user.score, canvas.width / 4, canvas.height / 5, "WHITE");
    drawText(com.score, 3 * canvas.width / 4, canvas.height / 5, "WHITE");

    // Отрисовка ракеток
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);

    // Отрисовка мяча
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

// Обновление игры
function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Простая ИИ для компьютера
    let comLevel = 0.1;
    com.y += (ball.y - (com.y + com.height / 2)) * comLevel;

    // Отражение мяча от стен
    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    // Проверка, кто владеет мячом
    let player = (ball.x < canvas.width / 2) ? user : com;

    // Проверка столкновения мяча с ракеткой
    if (collision(ball, player)) {
        // Где мяч ударился о ракетку
        let collidePoint = ball.y - (player.y + player.height / 2);

        // Нормализация
        collidePoint = collidePoint / (player.height / 2);

        // Вычисление угла в радианах
        let angleRad = collidePoint * (Math.PI / 4);

        // Направление мяча
        let direction = (ball.x < canvas.width / 2) ? 1 : -1;

        // Изменение скорости мяча
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);

        // Увеличение скорости мяча при каждом ударе
        ball.speed += 0.1;
    }

    // Обновление счета
    if (ball.x - ball.radius < 0) {
        com.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        user.score++;
        resetBall();
    }
}

// Сброс мяча
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speed = 7;
    ball.velocityX = -ball.velocityX;
}

// Проверка столкновения
function collision(b, p) {
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

// Управление пользователем
canvas.addEventListener('mousemove', movePaddle);

function movePaddle(evt) {
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height / 2;
}

// Основной игровой цикл
function game() {
    update();
    render();
}

// Установка интервала для игрового цикла
const framePerSecond = 50;
setInterval(game, 1000 / framePerSecond);

document.getElementById('change-photo-btn').addEventListener('click', function() {
    const gameBlock = document.getElementById('game-block');
    const message = document.getElementById('message');
    const photo = document.getElementById('photo');

    // Удаляем предыдущее фото, если оно есть
    if (photo) {
        gameBlock.removeChild(photo);
    }

    // Генерируем случайное число от 1 до 10
    const randomNumber = Math.floor(Math.random() * 10) + 1;

    // Создаем новый элемент img
    const newPhoto = document.createElement('img');
    newPhoto.id = 'photo';
    newPhoto.src = `../photos/photo${randomNumber}.jpg`; // Путь к фотографиям

    // Добавляем фото в блок
    gameBlock.appendChild(newPhoto);

    // Скрываем сообщение "Любовь это..."
    message.style.display = 'n3one';
});