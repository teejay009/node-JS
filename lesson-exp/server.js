const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 4500;



// app.get('/', (req, res) => {
//     res.sendFile('/views/index.html', {root: __dirname})
// });

app.get('^/$|/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
});

app.get('/new-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "new-page.html"))
});

// app.get('/testing', (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "testing.html"))
// });

// app.get('/new-page', (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "new-page.html"))
// });

// app.get('/testing', (req, res) => {
//     res.sendFile(path.join(__dirname, "views", "testing.html"))
// });

//REDIRECTORY

app.get('/new-page', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "new-page.html"))
});
//THIS
// app.get('/testing(.html)?', (req, res) => {
//     res.redirect(301, 'new-page.html')
// });

//OR THIS
app.get('/Aliyah(.html)?', (req, res) => {
    res.redirect(301, "new-page.html")
});

//ROUTE HANDLER

app.get('/hello(html)?', (req, res, next) => {
    console.log(' congrat we are moving');
    next()
    
    },(req, res) => {
        res.send(path.join("Hey boses how are you doing"))
})

// CHAINING ROUTE HANDLER

const cohort1 = (req, res, next) => {
    console.log('Kanas Rocco');
    next()
}

const cohort2 = (req, res, next) => {
    console.log('Muhammed Muas ');
    next()
}

const cohort3 = (req, res, next) => {
    console.log('KennyMax Quadri');
    next()
}

const cohort4 = (req, res, next) => {
    console.log('AliyahFather supreme');
    res.send('They are guru in tech')
}

app.get('/big-devs(.html)?', [cohort1, cohort2, cohort3, cohort4])


// app.listen(PORT, () => {
//     console.log(`seever is running on port ${PORT}`);
// })


app.listen(PORT, () => console.log(`server running on port ${PORT}`));


