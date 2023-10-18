const fs = require('fs')

fs.mkdir('./Kanas', (err) => {
    if(err) throw err
    console.log('fff');
})

if(!fs.existsSync('./new')) {
    fs.mkdir('./New', (err) => {
        if(err) throw err
        console.log('New Dir');
    })
}

if(fs.existsSync('./new')) {
    fs.rmdir('./New', (err) => {
        if(err) throw err
        console.log('Dir remove');
    })
}