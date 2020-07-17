require("dotenv").config();
const massive = require("massive");
const express = require("express");
const session = require("express-session");
const app = express();
const authCtrl = require("./controllers/authController");
const gameCtrl = require("./controllers/gameController");
const wordCtrl = require("./controllers/wordController");
const profileCtrl = require("./controllers/profileController")

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
})
  .then((db) => {
    app.set("db", db);
    console.log("db connected");
    app.listen(SERVER_PORT, () =>
      console.log(`Listening on port ${SERVER_PORT}`)
    );
  })
  .catch((err) => console.log(err));

app.use(express.static(`${__dirname}/../build`));
app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);

// auth endpoints
app.get('/auth/getUser', authCtrl.getUser)
app.post('/auth/register', authCtrl.registerUser)
app.post('/auth/login', authCtrl.loginUser)
app.delete('/auth/logout', authCtrl.logoutUser)


// game endpoints
app.get('/game/getHighScores/:userId', gameCtrl.getHighScores)
app.get('/game/getTopScores', gameCtrl.getTopScores)
app.post('/game/newGame', gameCtrl.newGame)
app.post('/game/moveToHistory', gameCtrl.moveToHistory)
// word endpoints
app.get('/api/targetword/:difficulty', wordCtrl.getTargetWord)
app.post('/word', wordCtrl.checkInputWord)

//profile endpoints
app.get('/profile/view/:user_id', profileCtrl.getUser )
app.put('/profile/edit/:user_id', profileCtrl.editUser)
app.put('/profile/password/:user_id', profileCtrl.updatePassword)


