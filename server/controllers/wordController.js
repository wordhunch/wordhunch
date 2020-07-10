module.exports = {
    getTargetWord: (req, res) => {
        const db = req.app.get("db")
        const {difficulty} = req.params
        console.log(difficulty)

        db.get_target_word(+difficulty)
        .then(word => {
            res.status(200).send(word)
        })
        .catch(err => {
            res.status(500).send(err)
            console.log(err)
        })
    }
}