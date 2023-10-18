//import { readFile } from 'node:fs';
const { error } = require("console");
const fs = require("fs")
const path = require("path");
const { text } = require("stream/consumers");

// fs.readFile(path.join(__dirname, "files","starter.txt"), "utf8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.readFile("./files/starter.txt", "utf8", (err, data) => {
//     if (err) throw err;
//     console.log(data);
// });

// Esisting o uncaught err

process.on("uncaughtException", err => {
    console.error(`there was an uncaught error; ${err}`
    ), process.exit(1)
    
})

console.log("Hello......");


// fs.writeFile and append

fs.writeFile(path.join(__dirname, "files", "text.txt"), "Here in DLT AFRICA", (err) => {
  if(err) throw err
  console.log("Write completed");


  fs.appendFile(path.join(__dirname, "files", "text.txt"), "\n\nTesting testing", (err) => {
    if (err) throw err;
    console.log("append done");

    fs.rename(path.join(__dirname, "files", "text.txt"), path.join(__dirname, "files", "rename.txt"), (err) => {
      if(err) throw err
      console.log("rename completed");
    })
  })
})

//fs.rename


fs.readFile("./files/text.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});


