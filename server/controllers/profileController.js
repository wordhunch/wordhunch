const {emailChecker} = require('../utils/emailChecker')
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
    },

    editUser: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.params
        const {newUsername, newProfilePicture, newEmail} = req.body

    const [existingUser] = await db
    .check_user({ user_id, newUsername, newEmail })
    .catch((err) => res.status(500).send(err));
    
    

    if (existingUser && existingUser.username === newUsername) {
      return res
      .status(409)
      .send("Username already exists. Please pick another username.");
    } else if (existingUser && existingUser.email === newEmail) {
      return res.status(409).send("Email already exists. Please choose another email.");
    }else if (existingUser || !emailChecker(newEmail)){
        return res.status(409).send('Not a valid email!')
    }

        
        // console.log(newUsername, newProfilePicture, newEmail);
        const [registered] = await db.edit_user([user_id, newUsername, newProfilePicture, newEmail])

        if (registered) {
            return res.sendStatus(200)
        }
        console.log(error)
        res.status(500).send("Error encountered");
    

    }
}

