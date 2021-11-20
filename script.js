let score = 0;
let snakeArr = [{ x: 10, y: 6 }];
let speed = 5;
let lastTime = 0;
let direction = { x: 0, y: 0 };
let food = { x: 5, y: 10 };
//Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastTime) / 1000 <= 1 / speed) {
        return;
    }
    //console.log(ctime);
    lastTime = ctime;
    gameEngine();
}

function snakeCollide(snake) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }

    }
    if (snakeArr[0].x <= 0 || snakeArr[0].y <= 0 || snakeArr[0].x >= 18 || snakeArr[0].y >= 18) {
        return true;
    }

    return false;
}

function gameEngine() {

    if (snakeCollide(snakeArr)) {
        score = 0;
        snakeArr = [{ x: 10, y: 6 }];
        lastTime = 0;
        direction = { x: 0, y: 0 };
        food = { x: 5, y: 10 };
    }

    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.x });
        score += 1;
        if (score > highScoreVal) {
            highScoreVal = score;
            localStorage.setItem('hiscore', JSON.stringify(highScoreVal));
            document.querySelector(".hiscore").innerHTML = "High Score : " + highScoreVal;
        }
        document.querySelector('.scoreboard').innerHTML = "Score : " + score
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {...snakeArr[i] };
    }
    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;

    let board = document.querySelector(".board");
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


let highScore = localStorage.getItem('hiscore');
if (highScore === null) {
    let highScoreVal = 0;
    localStorage.setItem('hiscore', JSON.stringify(highScoreVal));
} else {
    highScoreVal = JSON.parse(highScore);
    document.querySelector(".hiscore").innerHTML = "High Score : " + highScoreVal;
}

//Game Logic
window.requestAnimationFrame(main);
if (window.innerWidth > 600) {
    window.addEventListener('keydown', e => {

        direction = { x: 0, y: 1 };
        switch (e.key) {
            case "ArrowUp":
                console.log('Arrow Up');
                direction.x = 0;
                direction.y = -1;
                break;
            case 'ArrowDown':
                console.log('Arrow Down');
                direction.x = 0;
                direction.y = 1;
                break;
            case 'ArrowLeft':
                console.log('Arrow Left');
                direction.x = -1;
                direction.y = 0;
                break;
            case 'ArrowRight':
                console.log('Arrow Right');
                direction.x = 1;
                direction.y = 0;
                break;
            default:
                break;
        }
    })
} else {

    document.querySelector('.up').addEventListener('click', e => {
        direction = { x: 0, y: 1 };
        direction.x = 0;
        direction.y = -1;
    })
    document.querySelector('.down').addEventListener('click', e => {
        direction = { x: 0, y: 1 };
        direction.x = 0;
        direction.y = 1;
    })
    document.querySelector('.left').addEventListener('click', e => {
        direction = { x: 0, y: 1 };
        direction.x = -1;
        direction.y = 0;
    })
    document.querySelector('.right').addEventListener('click', e => {
        direction = { x: 0, y: 1 };
        direction.x = 1;
        direction.y = 0;
    })
}