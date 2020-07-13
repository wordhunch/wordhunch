module.exports = {
    getUser: async (req, res) => {
        const db = req.app.get('db');
        const { user_id } = req.params;

        db.get_user_info(user_id)
        .then((result) => {
            res.status(202).send(result)
        })
        .catch((err)=> {
            res.status(500).send(err);
        })
    }
}