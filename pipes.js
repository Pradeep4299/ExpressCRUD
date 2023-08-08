const fs=require('fs')


let myReadStream=fs.createReadStream('./index.txt')

myReadStream.addListener('data',(err,data)=>{
    let writeStream=fs.createWriteStream('./index1.txt')

    myReadStream.pipe(writeStream)
})