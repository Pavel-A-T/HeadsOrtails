const fs = require('fs');


module.exports = {
    writeFile: function writeFile(file, fileCount, fileVictory) {
        fs.stat(file, function(err, stat) {
            if(err == null) {
                const fileReaded = fs.readFileSync(file, "utf-8");
                let {count, victory} = JSON.parse(fileReaded);
                count = Number(count) + fileCount;
                victory = Number(victory) + fileVictory;
                fileRecord(file, count, victory);
            } else if(err.code === 'ENOENT') {
                // file does not exist
                fileRecord(file, fileCount, fileVictory);
            } else {
                console.log('Some other error: ', err.code);
            }
        });
    }
}

function fileRecord(file, count, victory) {
    const json = JSON.stringify({count, victory});
    fs.writeFileSync(file, json);
}
