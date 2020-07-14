const bcryptjs = require('bcryptjs')
const {emailChecker} = require('../utils/emailChecker')


module.exports = {
    registerUser: async (req, res) => {
      const db = req.app.get('db')
      const { username, email, password, profile_picture} = req.body
  
      
        const [existingUser] = await db.get_user({username, email})
        .catch(err => res.status(500).send(err))
        try {
        if (existingUser && existingUser.username === username) {
          return res
          .status(409)
          .send("User already exists. Please pick another username.");
        } else if (existingUser && existingUser.email === email) {
          return res.status(409).send("Email already exists. Please log in.");
        
        }

        if(existingUser || !emailChecker(email)){
            return res.status(409).send('Not a valid email!')
        }
  
        const salt = bcryptjs.genSaltSync(10)
        const hash = bcryptjs.hashSync(password, salt)
  
        const [newUser] = await db.register_user([
          username,
          email,
          hash,
          profile_picture
        ])
  
        
        delete newUser.password
        req.session.user = newUser
        res.status(201).send(newUser)
      } catch (err) {
          console.log(username, email, password, profile_picture)
        console.log(err)
        res.status(500).send('An error was encountered while processing your registration request. Please try again later.')
      }
    },




    loginUser: async (req, res) => {
      const db = req.app.get('db')
      const { loginValue, password }= req.body
  
      try {
        const [user] = await db.login_user(loginValue)
  
        if(!user){
          return res.status(404).send('No account is associated with those credentials. Please register.')
        }
  
        const isAuthenticated = bcryptjs.compareSync(password, user.password)
  
        if(isAuthenticated){
        //   delete user.password
          req.session.user = user
          return res.status(200).send(user)
        }
  
        res.status(409).send('Incorrect password.')
      } catch (err) {
        console.log(err)
        res.status(500).send('An error was encountered while processing your login request. Please try again later.')
      }
    },


    // getUser: (req, res) => {
    //   if(req.session.user){
    //     return res.status(200).send(req.session.user)
    //   }
  
    //   res.status(404).send('No user currently logged in.')
    // },


    logoutUser: (req, res) => {
      if(req.session.user){
        req.session.destroy()
        return res.status(200).send('')
      }
  
      res.status(404).send('No user currently logged in.')
    },
  }