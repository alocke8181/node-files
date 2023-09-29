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
        };
    });
};

function catWrite(outFile, inFile){
    fs.readFile(inFile,'utf8',function(err,data){
        if(err){
            console.log(err);
            process.exit(1);
        }else{
            fs.appendFile(outFile,data,function(err){
                if(err){
                    console.log(err);
                    process.exit(1);
                }else{
                    console.log(`Successfully written to ${outFile}`);
                }
            });
        };
    });
};

async function webCatWrite(outFile, url){
    let res;
    try{
        res = await axios.get(url);
    }catch(err){
        console.log(err);
        process.exit(1);
    };
    fs.appendFile(outFile,res.data,function(err){
        if(err){
            console.log(err);
            process.exit(1);
        }else{
            console.log(`Successfully written to ${outFile}`);
        };
    });
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

function isURL(path){
    if(path.includes('http')){
        return true;
    }else{
        return false;
    };
};

if (process.argv[2] === '--out'){
    outFile = process.argv[3];
    inFile = process.argv[4];
    if(isURL(inFile)){
        webCatWrite(outFile,inFile);
    }else{
        catWrite(outFile,inFile);
    }
}
else if (process.argv[2].includes('http')){
    webCat(process.argv[2]);
}else{
    cat(process.argv[2]);
};