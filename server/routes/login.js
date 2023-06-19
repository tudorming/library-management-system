const express = require("express");
const authController = require('..controllers/auth')
const router = express.Router();

router.get('/api/login-user', (req, res) => {

});

router.get('/api/create-user', authController.register)

// router.get('/api/create-user', (req, res) => {
//     let password = req.query.newpass;
//     let email = req.query.newemail;
//     let passwordrep = req.query.newpassrep;
//     let name = req.query.newname;

//     console.log(password)
//     console.log(email)
//     console.log(passwordrep)
//     console.log(name)

//     // Do something with the data...
//     res.send('Data received');
// });

module.exports = router;