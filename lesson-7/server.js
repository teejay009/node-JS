const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors')
const { logger } = require('./middleware/longEvents');
const errorHandler = require('./middleware/errorHandler');
const { type } = require('os');
const PORT = process.env.PORT || 5500; 

// app.use(express.urlencoded({extended: false}))
// app.use(express.json());

// //static routes
app.use(express.static(path.join(__dirname, "public")))

app.use(logger)

const whiteList = ['https://www.aa.com', 'http://127.0.0.1:5500', 'http://localhost:3100']

const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)

        } else {
            callback(new Error('NOT ALLOW BY CORs'))
        }
    }
}
app.use(cors(corsOptions))



//REDIRECTORY
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"))
})
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

}, (req, res) => {
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

app.use(errorHandler)


// app.listen(PORT, () => {
//     console.log(`seever is running on port ${PORT}`);
// })

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));

    }else if (req.accepts('json')) {
        res.json({"error": "404 Not Found"});

    }else {
        res.type('txt').send("404 Not Found");
    }
});
app.use(errorHandler)


app.listen(PORT, () => console.log(`server running on port ${PORT}`));


