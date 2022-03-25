//Задание №2
const fs = require('fs');
const readLine = require('readline');
const reader = readLine.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
);

const start = () => {
    reader.question("Хотите посмотреть статистику? print please Y or N  ", (data) => {
        if (data.startsWith("Y") || data.startsWith("y")) {
            readStatistics();
        } else {
            console.log("Не удается отобразить статистику!");
            reader.close();
        }
    });
}

const readStatistics = () => {
    reader.question("Напечатайте имя файла статистики или нажмите <ENTER>  ", (data) => {
        const file = data === null || undefined || data.length < 3 ? "statistics.txt" : data;
        const fileReaded = fs.readFileSync(file, "utf-8");
        const {count, victory} = JSON.parse(fileReaded);
        if (+count > 0 && +victory > 0) {
            console.log("общее количество партий = " + count);
            console.log("количество выигранных партий  = " + victory);
            console.log("количество проигранных партий  = " + (count - victory));
            console.log("процентное соотношение выигранных партий = " + (victory / count * 100) + "%");
            reader.close();
        } else {
            console.log("Не удается отобразить статистику!");
            reader.close();
        }
    });
}


start();
