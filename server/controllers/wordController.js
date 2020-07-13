const inputWords = require('../utils/inputWords.json')

module.exports = {
    getTargetWord: (req, res) => {
        const db = req.app.get("db")
        const {difficulty} = req.params

        db.get_target_word(+difficulty)
        .then(word => {
            res.status(200).send(word)
        })
        .catch(err => {
            res.status(500).send(err)
            console.log(err)
        })
    },
    checkInputWord: async (req, res) => {
        const {inputWord} = req.body

        if (await inputWords.findIndex(item => item.word === inputWord) !== -1) {
            res.status(200).send(true)
        } else {
            res.status(200).send(false)
        }
    }
}