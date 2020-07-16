module.exports = {
    getHighScores: async (req, res) => {
        const db = req.app.get('db')
        const { userId } = req.params

        try {
            //get high scores using sql file and send back the returned high scores
            db.get_high_scores(+userId)
            .then(highScore => {
                res.status(200).send(highScore)
            })
        } catch (error) {
            res.status(404).send(error)
        }
    },
    getTopScores: async (req, res) => {
        const db = req.app.get('db')
        try {
        db.get_top_scores()
        .then(topScores => {
            res.status(200).send(topScores)
        })
    } catch (error) {
        res.status(404).send(error)
    }
    },
    newGame: async (req, res) => {
        const db = req.app.get('db')
        const { targetWord, difficulty } = req.body
        const {user_id} = req.session.user
        

        try {
            //instantiate a new game in the games database
            const gameId = await db.game.insert({ user_id, word_id: targetWord, difficulty_game: difficulty })
            res.status(200).send(gameId)
        } catch (error) {
            console.log(error)
        }
    },
    moveToHistory: async (req, res) => {
        const db = req.app.get('db')
        const { gameId, score } = req.body
        const {user_id} = req.session.user

        try {
            //instantiate a new game history in the games history database

            const history_id = await db.game_history.insert({ user_id, score })

            //if successful, destroy the game info from the game database
            if (history_id) {
                await db.game.destroy({ game_id: gameId })
                res.status(200).send(history_id)
            }

        } catch (error) {
            console.log(error)
        }
    }
}