const {emailChecker} = require('../utils/emailChecker')
const bcryptjs = require('bcryptjs')
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
    

    },
    updatePassword: async (req, res) => {
        const db = req.app.get("db");
    
        if (!req.session.user) {
          return res.status(401).send("Please log in");
        }
        const {user_id} = req.params
        const { password, newPassword1 } = req.body;

        
        const [passwordChecker] = await db.get_password(user_id)
        .catch(err => res.status(500).send(err))

        const isAuthenticated = bcryptjs.compareSync(password,passwordChecker.password)
        
         
        if(!isAuthenticated){
            return res.status(406).send("Password was incorrect.")
        }
        
        // const { username } = req.session.user;
    
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(newPassword1, salt);
        // console.log(user_id, hash);
        db.edit_password([user_id, hash])
          .then(() => res.status(200).send("Password updated"))
          .catch((err) => res.status(500).send('Something went wrong please try again later.',
          console.log(err)));
          

      }
}

