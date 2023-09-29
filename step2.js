const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(file){
    fs.readFile(file, 'utf8',function(err,data){
        if (err){
            console.log(err);
        }
        else{
            console.log(data)
        }
    })
};

async function webCat(url){
    try{
        let res = await axios.get(url);
        console.log(res.data);
    }catch(err){
        console.log(err);
        process.exit(1);
    };
};
let path = process.argv[2];
if (path.includes('http')){
    webCat(path);
}else{
    cat(path);
};