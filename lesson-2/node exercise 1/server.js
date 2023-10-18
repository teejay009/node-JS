const fs = require("fs")
const path = require("path");


// fs.readFile("./reg/test.txt", (err, data) => {
//       if (err) throw err;
//       console.log(data.tostring());
    

    fs.readFile(path.join(__dirname, "reg","text.txt"), "utf8", (err, data) => {
        if (err) throw err;
        console.log(data);
      });

      fs.writeFile(path.join(__dirname, "reg", 'node.txt'), 'welcome to DLT', (err) => {
        if (err) throw err
        console.log("write completed");

        fs.rename(path.join(__dirname, "reg", 'node.txt'),path.join(__dirname, "reg", 'ten.txt') , (err) => {
          if (err) throw err;
          console.log('Rename completed');
        })
      })

