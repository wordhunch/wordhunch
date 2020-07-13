const bcryptjs = require('bcryptjs')
const {emailChecker} = require('../utils/emailChecker')


module.exports = {
    registerUser: async (req, res) => {
      const db = req.app.get('db')
      const { username, email, password, profile_picture} = req.body
  
      try {
        const existingUser = await db.get_user(email)
        
        if(existingUser[0]) {
          return res.status(409).send('Email already in use!')
        }

        if(existingUser[0] || !emailChecker(email)){
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
        const [user] = await db.get_user(loginValue)
  
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
        return res.sendStatus(200)
      }
  
      res.status(404).send('No user currently logged in.')
    },
  }