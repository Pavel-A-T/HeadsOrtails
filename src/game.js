const readLine = require('readline');
const writeFile = require("./write");
const game = readLine.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
);
//количество сыгранных партий
let count = 0;
//количество выигранных партий
let victory = 0;
//файл для логирования
let file = null;

const continueGame = () => {
    game.question("Хотите продолжить? print please Y or N  ", (data) => {
        if (data.startsWith("N") || data.startsWith("n")) {
            writeFile.writeFile(file, count, victory);
            game.close();
        }
        else if (data.startsWith("Y") || data.startsWith("y")) {
            start();
        }
        else {
            console.log("Некорректный ввод");
            continueGame();
        }
    });
}

const start = () => {
    console.log("Старт игры Орел (1) - решка (2)");
    const random = Math.floor(Math.random() * 2) + 1;
    game.question("Ваше число 1 или 2: ", (data) => {
        count++;
        if (random == data) {
            console.log("Отгадано число " + random);
            victory++;
        }
        else {
            console.log("Вы не угадали");
        }
        continueGame();
    })
}

const getFileName = () => {
    game.question("Напечатайте имя файла для логирования и нажмите <ENTER> ", (data) => {
        file = data === null || undefined || data.length < 3 ? "statistics.txt" : data;
        start();
    });
}

getFileName();
