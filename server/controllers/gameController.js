module.exports = {
    getHighScores: async (req, res) => {
        const db = req.app.get('db')
        const { userId } = req.params

        try {
            //get high scores using sql file and send back the returned high scores
            const [highScores] = await db.get_high_scores(+userId)

            res.status(200).send(highScores)
        } catch (error) {
            console.log(error)
        }
    },
    newGame: async (req, res) => {
        const db = req.app.get('db')
        const { targetWord, userId, difficulty } = req.body

        try {
            //instantiate a new game in the games database
            const gameId = await db.game.insert({ user_id: userId, word_id: targetWord, difficulty_game: difficulty })
            res.status(200).send(gameId)
        } catch (error) {
            console.log(error)
        }
    },
    moveToHistory: async (req, res) => {
        const db = req.app.get('db')
        const { gameId, userId, score } = req.body

        try {
            //instantiate a new game history in the games history database

            const history_id = await db.game_history.insert({ user_id: userId, score })

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