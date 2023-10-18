const {format} = require('date-fns')  // for data npm
const {v4:uuid} = require('uuid');


const fs = require('fs');
const fsPromises  = require('fs').promises;
const path = require('path');

const logEvents = async(message, LogName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    console.log(logItem);

    try{
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', LogName), logItem)

        // testing
    }catch(error){
        console.log(error)
    }

}

module.exports = logEvents;