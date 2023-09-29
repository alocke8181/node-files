const fs = require('fs');
const process = require('process');

function cat(path){
    fs.readFile(path, 'utf8',function(err,data){
        if (err){
            console.log(err);
        }
        else{
            console.log(data)
        }
    })
};
let file = process.argv[2];
cat(file);
