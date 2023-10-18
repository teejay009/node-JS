const fsPromises = require('fs').promises
const { promises } = require('dns');
const { appendFile, fstat } = require('fs');
const path = require('path')

const fileOps = async () => {
    try {
        const data = await fsPromises.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8')
        console.log(data);
        //await fsPromises.unlink(path.join(__dirname, 'files', 'starter.txt'), 'utf8') to delete file
        await fsPromises.writeFile(path.join(__dirname, "files", "index.txt"), data)
        await fsPromises.appendFile(path.join(__dirname, "files", "index.txt"), '\n\nThanks bro')
        await fsPromises.rename(path.join(__dirname, "files", "index.txt"), path.join(__dirname, "files", "newPromise"))

        const newData = await fsPromises.readFile(path.join(__dirname, 'files', 'newPromise' ), 'utf8')

        console.log(newData)

    }catch(err) {
        console.log(err);       
    }

}


fileOps()



