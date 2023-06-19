const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const {promisify} = require ("util");
var nodemailer = require('nodemailer');
const math = require('mathjs');
const natural = require('natural');
const Stemmer = natural.PorterStemmer;

const path = require("path");
const dotenv = require("dotenv");
const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:8000', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }

dotenv.config({path: './.env'});
const app = express();
// app.use(express.static(path.join(__dirname, "./../public")));
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true }));
// app.set("json spaces", 2);
app.use(cors());
app.use(cookieParser());

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM_USER,
      pass: process.env.EMAIL_FROM_PASSWORD
    }
});

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,UPDATE,OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-PINGOTHER, Content-Type, Accept, Authorization, Requested-File");
//     next();
// });

// app.use('/api/create-user', require('./routes/login'))

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
})

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("mysql connected")
    }
})

// app.get("/", (req,res) => {
//     res.send("<h1>Homepage<h1>")
// })


// islogged api
app.post('/api/is-logged-in', async (req, res) => {
    console.log(req.cookies.jwt);
    return
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            console.log(decoded);

            db.query("SELECT * FROM users WHERE id = ?", [decoded.id], (error, result) => {
                if (!result) {
                    res.send({ results: false, error: "No account found" });
                }

                req.user = result[0];
                res.send({ results: true, error: "" });
                return
            });
        } catch (error) {
            res.send({ results: false, error: error });
            console.log(error);
            return
            // return next()
        }
    } else {
        // return next()
        res.send({ results: false, error: "No cookie found" });
        return

    }
})


// login user api
app.post('/api/user-login', async (req, res) => {
    try {
        // console.log(req.query);
        let password = req.query.password;
        let email = req.query.email;
        if (!email || !password || password === "") {
            return res.send({ results: "", error: "Please do not leave the fields empty" });
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error,results) =>{
            if (error) {
                console.log(error)
            }
            // console.log(results);
            // console.log(results[0]);
            // return

            if (results == undefined || !results || results[0] == undefined) {
                return res.send({ results: "", error: "The email or the password is incorrect!" });
            } else if (!(await bcrypt.compare(password, results[0].password))) {
                return res.send({ results: "", error: "The email or the password is incorrect!" });
            } else {
                const id = results[0].id;
                const token = jwt.sign({id: id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });
                // console.log(token);
                const cookieOptions = {
                    exipres: new Date(
                        Date.now + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true //????
                }
                res.cookie('jwt', token, cookieOptions);
                let user = {
                    email: results[0].email,
                    name: results[0].name
                }
                return res.send({ results: user, error: "" });
                // res.status(200).redirect("/dashboard") ?????????
            }
        });
    } catch (error) {
        console.log(error);
        throw error
        return
    }
});

// create user api
app.get('/api/create-user', (req, res) => {
    let password = req.query.newpass;
    let email = req.query.newemail;
    let passwordrep = req.query.newrepeatpass;
    let name = req.query.newname;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error,result) =>{
        if (error) {
            console.log(error)
        }
        if (result.length > 0) {
            return res.send({ results: "", error: "Email already in use" });
        } else if (password !== passwordrep) {
            return res.send({ results: "", error: "Passwords do not match" });
        }

        let hashpass = await bcrypt.hash(password, 8);
        // console.log(hashpass);

        db.query('INSERT INTO users SET ?', {name: name, email: email, password: hashpass}, (error, results) => {
            if (error) {
                console.log(error)
                return res.send({ results: "", error: error });
            } else {
                return res.send({ results: true, error: "" });
            }
        });

    });

    // console.log(password)
    // console.log(email)
    // console.log(passwordrep)
    // console.log(name)

    // // Do something with the data...
    // res.send('Data received');
});

//api logout
app.get('/api/logout-user', (req, res) => {
    res.cookie('jwt', 'logout', {
        expires: new Date(Date().now + 2 * 1000),
        httpOnly: true //???
    })

    // res.status(200).redirect('login')
    return res.send({ results: true, error: "" });

});

//api get books
app.get('/api/get-books', (req, res) => {
    let search = req.query.search;
    let searchauthor = req.query.searchauthor;
    let studyfield = req.query.studyfield;
    let studyyear = req.query.studyyear;
    let publisher = req.query.publisher;
    let category = req.query.category;

    let urlSearch = ""
    if (search != "" && search != undefined) {
        urlSearch = urlSearch + "AND title LIKE '%"+search+"%'"
    }
    if (searchauthor != "" && searchauthor != undefined) {
        urlSearch = urlSearch + "AND author LIKE '%"+searchauthor+"%'"
    }
    if (studyfield != "" && studyfield != undefined) {
        urlSearch = urlSearch + "AND studyfield='"+studyfield+"'"
    }
    if (studyyear != "" && studyyear != undefined) {
        urlSearch = urlSearch + "AND studyyear='"+studyyear+"'"
    }
    if (category != "" && category != undefined) {
        urlSearch = urlSearch + "AND category='"+category+"'"
    }
    if (publisher != "" && publisher != undefined) {
        urlSearch = urlSearch + "AND publisher LIKE '%"+publisher+"%'"
    }
    // console.log(urlSearch);
    let urlGetBooks = "SELECT * FROM books WHERE nrcopy > 0"
    
    if (urlSearch != "") {
        urlGetBooks = urlGetBooks + " " + urlSearch
    }
    // console.log(urlGetBooks);

    db.query(urlGetBooks, (error,result) =>{
        if (error) {
            console.log(error)
            res.send({ results: "", error: error });
            return 
        } else if (result == null || result == []) {
            res.send({ results: "", error: 'No books found' });
            return 
        } else {
            // console.log(result[0]);
            res.send({ results: result, error: "" });
            return 
        }
    });
});

//api add book
app.post('/api/add-book', (req, res) => {
    let title = req.query.title;
    let author = req.query.author;
    let publisher = req.query.publisher;
    let category = req.query.category;
    let studyfield = req.query.studyfield;
    let studyyear = req.query.studyyear;

    if (!title || !author || !publisher || !category) {
        return res.send({ results: "", error: "Please do not leave the fields empty" });
    }

    db.query('INSERT INTO books SET ?', {title: title, author: author, publisher: publisher, studyyear: studyyear, category: category, studyfield: studyfield}, (error,result) =>{
        if (error) {
            console.log(error)
            return res.send({ results: "", error: error });
        } else {
            return res.send({ results: true, error: "" });
        }
    });
});

//api edit book
app.post('/api/edit-book', (req, res) => {
    let title = req.query.title;
    let author = req.query.author;
    let publisher = req.query.publisher;
    let category = req.query.category;
    let studyfield = req.query.studyfield;
    let studyyear = req.query.studyyear;
    let id = req.query.id;

    if (!title || !author || !publisher || !category) {
        return res.send({ results: "", error: "Please do not leave the fields empty" });
    }

    db.query('UPDATE books SET ? WHERE id='+id, {title: title, author: author, publisher: publisher, studyyear: studyyear, category: category, studyfield: studyfield}, (error,result) =>{
        if (error) {
            console.log(error)
            return res.send({ results: "", error: error });
        } else {
            return res.send({ results: true, error: "" });
        }
    });
});

//api delete book
app.post('/api/delete-book', (req, res) => {
    let id = req.query.id;

    if (!id) {
        return res.send({ results: "", error: "Book id is null" });
    }

    db.query('DELETE FROM books WHERE id='+id, (error,result) =>{
        if (error) {
            console.log(error)
            return res.send({ results: "", error: error });
        } else {
            return res.send({ results: true, error: "" });
        }
    });
});

//get user info api
app.post('/api/get-info-user', (req, res) => {
    let email = req.query.email;
    // return
    db.query('SELECT name, email FROM users WHERE email = ?', [email], (error,result) =>{
        if (error) {
            console.log(error)
            res.send({ results: "", error: error });
            return 
        } else if (result == null || result == []) {
            res.send({ results: "", error: 'No users found with this email' });
            return 
        } else {
            res.send({ results: result, error: "" });
            return 
        }
    });
    return
});

//change user full name api
app.post('/api/change-name', (req, res) => {
    let email = req.query.email;
    let name = req.query.name

    let url = "UPDATE users SET name = '" + name + "' WHERE email = '" + email + "'"
    // console.log(url);
    // return
    // return
    db.query(url, (error,result) =>{
        if (error) {
            console.log(error)
            res.send({ results: "", error: error });
            return 
        } else {
            var mailOptions = {
                from: process.env.EMAIL_FROM_USER,
                to: email,
                subject: 'Your Full Name has been changed',
                text: 'This is an email to inform you that your full name has been changed.\n If this action was not done by you, please contact us.'
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.send({ results: true, error: "" });
            return 
        }
    });
    return
});

//change user email api
app.post('/api/change-email', (req, res) => {
    let email = req.query.email;
    let newemail = req.query.newemail

    let url = "UPDATE users SET email = '" + newemail + "' WHERE email = '" + email + "'"

    db.query(url, (error,result) =>{
        if (error) {
            console.log(error)
            res.send({ results: "", error: error });
            return 
        } else {
            var mailOptions = {
                from: process.env.EMAIL_FROM_USER,
                to: email,
                subject: 'Your Email has been changed',
                text: 'This is an email to inform you that your email has been changed.\n If this action was not done by you, please contact us.'
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.send({ results: true, error: "" });
            return 
        }
    });
    return
});

//change user password api
app.post('/api/change-password', (req, res) => {
    let email = req.query.email;
    let newpassword = req.query.newpassword
    let oldpassword = req.query.oldpassword


    db.query('SELECT * FROM users WHERE email = ?', [email], async (error,results) =>{
        if (error) {
            console.log(error)
        }

        if ((await bcrypt.compare(newpassword, results[0].password))) {
            return res.send({ results: "", error: "The password cannot be the same as the previous one" });
        } else {
            let hashpass = await bcrypt.hash(newpassword, 8);
            let url = "UPDATE users SET password = '" + hashpass + "' WHERE email = '" + email + "'"
            db.query(url, (error,result) =>{
                if (error) {
                    console.log(error)
                    res.send({ results: false, error: error });
                    return 
                } else {
                    var mailOptions = {
                        from: process.env.EMAIL_FROM_USER,
                        to: email,
                        subject: 'Your Password has been changed',
                        text: 'This is an email to inform you that your password has been changed.\n If this action was not done by you, please contact us.'
                    };
                    
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    res.send({ results: true, error: "" });
                    return 
                }
            });
        }
    });
    return
});

//api get orders pick up
app.get('/api/get-orders-pick-up', (req, res) => {
    let search = req.query.search;
    let id = req.query.searchID;


    let urlSearch = ""
    if (search != "" && search != undefined) {
        urlSearch = "AND uemail LIKE '%"+search+"%'"
    }
    if (id != "" && id != undefined) {
        urlSearch = "AND id LIKE '%"+id+"%'"
    }
    // console.log(urlSearch);
    let urlGetBooks = "SELECT * FROM orders WHERE description = 'PICK UP'"
    
    if (urlSearch != "") {
        urlGetBooks = urlGetBooks + " " + urlSearch
    }
    // console.log(urlGetBooks);

    urlGetBooks = urlGetBooks + " ORDER BY timestamp DESC"

    db.query(urlGetBooks, (error,result) =>{
        if (error) {
            console.log(error)
            res.send({ results: "", error: error });
            return 
        } else if (result == null || result == []) {
            res.send({ results: "", error: 'No orders found' });
            return 
        } else {
            // console.log(result[0]);
            res.send({ results: result, error: "" });
            return 
        }
    });
});

//api get orders lent
app.get('/api/get-orders-lent', (req, res) => {
    let id = req.query.searchID;
    let search = req.query.search;

    let urlSearch = ""
    if (search != "" && search != undefined) {
        urlSearch = "AND uemail LIKE '%"+search+"%'"
    }
    if (id != "" && id != undefined) {
        urlSearch = "AND id LIKE '%"+id+"%'"
    }
    // console.log(urlSearch);
    let urlGetBooks = "SELECT * FROM orders WHERE description = 'LENT'"
    
    if (urlSearch != "") {
        urlGetBooks = urlGetBooks + " " + urlSearch
    }
    // console.log(urlGetBooks);

    urlGetBooks = urlGetBooks + " ORDER BY timestamp DESC"

    db.query(urlGetBooks, (error,result) =>{
        if (error) {
            console.log(error)
            res.send({ results: "", error: error });
            return 
        } else if (result == null || result == []) {
            res.send({ results: "", error: 'No orders found' });
            return 
        } else {
            // console.log(result[0]);
            res.send({ results: result, error: "" });
            return 
        }
    });
});

//order books api
app.post('/api/order-books', (req, res) => {
    let booksArray = req.query.books.split(',');
    let booksString = req.query.books
    let email = req.query.email;
    let name = req.query.name;

    let updatesql1 = ""
    let updatesql2 = ""
    let updatesql3 = ""

    if (booksArray.length == 3) {
        updatesql1 = "UPDATE books SET nrcopy = nrcopy - 1, timesordered = timesordered + 1 WHERE title = '" + booksArray[0] +"';";
        updatesql2 = "UPDATE books SET nrcopy = nrcopy - 1, timesordered = timesordered + 1 WHERE title = '" + booksArray[1] +"';";
        updatesql3 = "UPDATE books SET nrcopy = nrcopy - 1, timesordered = timesordered + 1 WHERE title = '" + booksArray[2] +"';";
    } else if (booksArray.length == 2) {
        updatesql1 = "UPDATE books SET nrcopy = nrcopy - 1, timesordered = timesordered + 1 WHERE title = '" + booksArray[0] +"';";
        updatesql2 = "UPDATE books SET nrcopy = nrcopy - 1, timesordered = timesordered + 1 WHERE title = '" + booksArray[1] +"';";
    } else {
        updatesql1 = "UPDATE books SET nrcopy = nrcopy - 1, timesordered = timesordered + 1 WHERE title = '" + booksArray[0] +"';";
    }

    let description = "PICK UP"
    
    var mailOptions = {
        from: process.env.EMAIL_FROM_USER,
        to: email,
        subject: 'Thank you for ordering books with us',
        text: 'Good day ' + name + '!\n\nThe book/s ordered are: ' + booksString + '\n Please provide the email sent and an ID card when collecting the book/s.\n\nKind regards,\nFYP Team'
    };
    let timestamp = Date.now()

    db.query('INSERT INTO orders SET ?', {uemail: email, description: description, timestamp: timestamp, orderedbooks: booksString}, async (error,result) =>{
        if (error) {
            console.log(error)
        } else {
                await transporter.sendMail(mailOptions,  async function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                        if (updatesql1 != "") {
                            db.query(updatesql1, async (error,result) =>{
                                if (error) {
                                    console.log(error)
                                } else {
                                    console.log('nrcopy updatesql1');
                                }
                            });
                        }
                        if (updatesql2 != "") {
                            db.query(updatesql2, async (error,result) =>{
                                if (error) {
                                    console.log(error)
                                } else {
                                    console.log('nrcopy updatesql2');
                                }
                            });
                        }
                        if (updatesql3 != "") {
                            db.query(updatesql3, async (error,result) =>{
                                if (error) {
                                    console.log(error)
                                } else {
                                    console.log('nrcopy updatesql3');
                                }
                            });
                        }
                        return res.send({ results: true, error: "" });
                    }
                });
            return
        }
    });
    return
});

//set lent api
app.get('/api/lend-books', (req, res) => {
    let id = req.query.id;
    let description = "LENT"
    let timestamp = Date.now()
    let url = "UPDATE orders SET description = '" + description + "', timestamp = '"+ timestamp + "'WHERE id = '" + id + "'"

    db.query(url, async (error,result) =>{
        if (error) {
            console.log(error)
            return res.send({ results: false, error: error });
        } else {
            return res.send({ results: true, error: "" });
        }
    });
    return
});

//set return api
app.get('/api/return-books', (req, res) => {
    let id = req.query.id;
    let books = req.query.books.split(',');
    let description = "RETURNED"
    let timestamp = Date.now()
    let url = "UPDATE orders SET description = '" + description + "', timestamp = '"+ timestamp + "' WHERE id = '" + id + "';"

    let updatesql1 = ""
    let updatesql2 = ""
    let updatesql3 = ""

    if (books.length == 3) {
        updatesql1 = "UPDATE books SET nrcopy = nrcopy + 1 WHERE title = '" + books[0] +"';";
        updatesql2 = "UPDATE books SET nrcopy = nrcopy + 1 WHERE title = '" + books[1] +"';";
        updatesql3 = "UPDATE books SET nrcopy = nrcopy + 1 WHERE title = '" + books[2] +"';";
    } else if (books.length == 2) {
        updatesql1 = "UPDATE books SET nrcopy = nrcopy + 1 WHERE title = '" + books[0] +"';";
        updatesql2 = "UPDATE books SET nrcopy = nrcopy + 1 WHERE title = '" + books[1] +"';";
    } else {
        updatesql1 = "UPDATE books SET nrcopy = nrcopy + 1 WHERE title = '" + books[0] +"';";
    }

    db.query(url, async (error,result) =>{
        if (error) {
            console.log(error)
            return res.send({ results: false, error: error });
        } else {
            if (updatesql1 != "") {
                db.query(updatesql1, async (error,result) =>{
                    if (error) {
                        console.log(error)
                    } else {
                        console.log('nrcopy updatesql1');
                    }
                });
            }
            if (updatesql2 != "") {
                db.query(updatesql2, async (error,result) =>{
                    if (error) {
                        console.log(error)
                    } else {
                        console.log('nrcopy updatesql2');
                    }
                });
            }
            if (updatesql3 != "") {
                db.query(updatesql3, async (error,result) =>{
                    if (error) {
                        console.log(error)
                    } else {
                        console.log('nrcopy updatesql3');
                    }
                });
            }
            return res.send({ results: true, error: "" });
        }
    });
    return
});

//api get orders all
app.get('/api/get-orders-all', (req, res) => {
    let search = req.query.search;
    let id = req.query.searchID;

    let urlSearch = ""
    if (search != "" && search != undefined) {
        if (urlSearch == "") {
            urlSearch = "WHERE uemail LIKE '%"+search+"%'"
        } else {
            urlSearch = urlSearch + "AND uemail LIKE '%"+search+"%'"
        }
    }
    if (id != "" && id != undefined) {
        if (urlSearch == "") {
            urlSearch = "WHERE id LIKE '%"+id+"%'"
        } else {
            urlSearch = urlSearch + "AND id LIKE '%"+id+"%'"
        }
    }
    // console.log(urlSearch);
    let urlGetBooks = "SELECT * FROM orders"
    
    if (urlSearch != "") {
        urlGetBooks = urlGetBooks + " " + urlSearch
    }
    // console.log(urlGetBooks);

    urlGetBooks = urlGetBooks + " ORDER BY timestamp DESC"

    db.query(urlGetBooks, (error,result) =>{
        if (error) {
            console.log(error)
            res.send({ results: "", error: error });
            return 
        } else if (result == null || result == []) {
            res.send({ results: "", error: 'No orders found' });
            return 
        } else {
            // console.log(result[0]);
            res.send({ results: result, error: "" });
            return 
        }
    });
});

















//recommendations api content based filtering
app.get('/api/get-recommendedBooks', (req, res) => {
    let title = req.query.title;
    let author = req.query.author;
    let publisher = req.query.publisher;
    let category = req.query.category;

    let selectedbook= {
        title: title,
        author: author,
        publisher: publisher,
        category: category
    }
    selectedbook.category = selectedbook.category.split(', ');

    db.query('SELECT * FROM books WHERE nrcopy > 0', (error,result) =>{
        if (error) {
            console.log(error)
            return res.send({ results: "", error: error });
        } else {
            //baga cod aici de recomandare
            // Calculate the similarity score between the selected book and each book in the result array
            const similarityScores = result.map(book => {

                book.category = book.category.split(', ');
                // Compute the number of common categories
                const commonCategories = selectedbook.category.filter(category => book.category.includes(category)).length;
                
                // Compute the number of common words
                const titleWords = selectedbook.title.toLowerCase().split(' ');
                const authorWords = selectedbook.author.toLowerCase().split(' ');
                const publisherWords = selectedbook.publisher.toLowerCase().split(' ');
                
                const commonTitleWords = titleWords.filter(word => book.title.toLowerCase().includes(word)).length;
                const commonAuthorWords = authorWords.filter(word => book.author.toLowerCase().includes(word)).length;
                const commonPublisherWords = publisherWords.filter(word => book.publisher.toLowerCase().includes(word)).length;
                
                // Compute the similarity
                const similarityScore = (2 * commonCategories + commonTitleWords + commonAuthorWords + commonPublisherWords) / (2 * (selectedbook.category.length + book.category.length) + titleWords.length + authorWords.length + publisherWords.length);
                
                return {
                book,
                similarityScore
                };
            });
            
            // descending order
            similarityScores.sort((a, b) => b.similarityScore - a.similarityScore);
            
            const recommendedBooks = similarityScores.slice(1, 4).map(score => score.book);
            
            // console.log(recommendedBooks);
            return res.send({ results: recommendedBooks, error: "" });
        }
    });
    return
});

//recommendations api cosine similarity
app.get('/api/get-recommendedBooks-cosine', (req, res) => {
    let title = req.query.title;
    let author = req.query.author;
    let publisher = req.query.publisher;
    let category = req.query.category;

    let selectedbook= {
        title: title,
        author: author,
        publisher: publisher,
        category: category,
        rating: parseFloat((Math.random() * (5 - 3) + 3).toFixed(1)),
    }

    db.query('SELECT * FROM books WHERE nrcopy > 0', async (error,result) =>{
        if (error) {
            console.log(error)
            return res.send({ results: "", error: error });
        } else {
            result.forEach(book => {
                book.rating = parseFloat((Math.random() * (5 - 3) + 3).toFixed(1));
            });
            function recommendBooks(selectedbook, result) {
                // calculate the cosine similarity
                function cosineSimilarity(book1, book2) {
                  // Define the properties
                  const properties = ['title', 'author', 'category', 'publisher', 'rating'];
                  // Calculate the dot product
                  const dotProduct = properties.reduce((acc, property) => {
                    if (property === 'rating') {
                      return acc + (book1[property] * book2[property]);
                    } else {
                      return acc + (book1[property] === book2[property] ? 1 : 0);
                    }
                  }, 0);
                  // Calculate the magnitude
                  const mag1 = Math.sqrt(properties.reduce((acc, property) => {
                    if (property === 'rating') {
                      return acc + (book1[property] ** 2);
                    } else {
                      return acc + 1;
                    }
                  }, 0));
                  const mag2 = Math.sqrt(properties.reduce((acc, property) => {
                    if (property === 'rating') {
                      return acc + (book2[property] ** 2);
                    } else {
                      return acc + 1;
                    }
                  }, 0));
                  // Calculate the cosine similarity
                  return dotProduct / (mag1 * mag2);
                }
              
                //encoding the string values as numbers
                const encoders = {};
                ['title', 'author', 'category', 'publisher'].forEach(property => {
                  const uniqueValues = [...new Set(result.map(book => book[property]))];
                  const encoder = {};
                  uniqueValues.forEach((value, index) => {
                    encoder[value] = index;
                  });
                  encoders[property] = encoder;
                });
                const preprocessedResult = result.map(book => {
                  const encodedBook = {};
                  ['title', 'author', 'category', 'publisher'].forEach(property => {
                    encodedBook[property] = encoders[property][book[property]];
                  });
                  encodedBook.rating = book.rating;
                  return encodedBook;
                });
                const preprocessedSelectedBook = {};
                ['title', 'author', 'category', 'publisher'].forEach(property => {
                  preprocessedSelectedBook[property] = encoders[property][selectedbook[property]];
                });
                preprocessedSelectedBook.rating = selectedbook.rating;
              
                // Calculate the cosine similarity
                const similarities = preprocessedResult.map(book => {
                  const similarity = cosineSimilarity(preprocessedSelectedBook, book);
                  return { book, similarity };
                });
              
                // descending order
                similarities.sort((a, b) => b.similarity - a.similarity);
              
                // Return the top 3 
                const recommendedBooks = similarities.slice(1, 4).map(similarity => {
                  const book = similarity.book;
                  const recommendedBook = {};
                  ['title', 'author', 'category', 'publisher'].forEach(property => {
                    recommendedBook[property] = Object.keys(encoders[property]).find(key => encoders[property][key] === book[property]);
                  });
                  recommendedBook.rating = book.rating;
                  return recommendedBook;
                });
                return recommendedBooks;
            }
            const rbooks = await recommendBooks(selectedbook, result)
            return res.send({ results: rbooks, error: "" });
        }
    });
    return
});

// api nlp techniques
app.get('/api/get-recommendedBooks-nlp', (req, res) => {
    let title = req.query.title;
    let author = req.query.author;
    let publisher = req.query.publisher;
    let category = req.query.category;

    let selectedbook= {
        title: title,
        author: author,
        publisher: publisher,
        category: category
    }

    db.query('SELECT * FROM books WHERE nrcopy > 0', async (error,result) =>{
        if (error) {
            console.log(error)
            return res.send({ results: "", error: error });
        } else {
            // preprocess text
            function preprocessText(text) {
                
                text = text.toLowerCase();
                // Remove all non-word characters
                text = text.replace(/\W/g, " ");
                // Remove all whitespace characters
                text = text.replace(/\s+/g, " ");
                // Remove all stopwords
                let stopwords = ["a", "an", "the", "and", "but", "or", "for", "nor", "on", "at", "to", "from", "by", "so", "yet", "with"];
                text = text.split(" ").filter(word => !stopwords.includes(word)).join(" ");
                // Apply stemming
                text = text.split(" ").map(word => Stemmer.stem(word)).join(" ");
                return text;
            }
            
            // extract features from a book object
            function extractFeatures(book) {
                
                let title = preprocessText(book.title);
                let author = preprocessText(book.author);
                let publisher = preprocessText(book.publisher);
                let category = preprocessText(book.category);
                
                let features = [title, author, publisher, category];
                return features;
            }
            
            // Define a function to calculate the similarity between two books
            function calculateSimilarity(book1, book2) {
                
                let features1 = extractFeatures(book1);
                let features2 = extractFeatures(book2);
                // intersection of the features
                let intersection = features1.filter(feature => features2.includes(feature));
                // union of the features
                let union = [...new Set([...features1, ...features2])];
                // Calculate the Jaccard similarity coefficient
                let similarity = intersection.length / union.length;
                return similarity;
            }
            
            function recommendBooks(selectedBook, books) {
                // Calculate the similarity
                let similarities = books.map(book => {
                return {
                    book: book,
                    similarity: calculateSimilarity(selectedBook, book)
                };
                });
                //descending order
                similarities.sort((a, b) => b.similarity - a.similarity);
                
                let recommendedBooks = similarities.slice(1, 4).map(similarity => similarity.book);
                return recommendedBooks;
            }
            const rbooks = await recommendBooks(selectedbook, result)
            return res.send({ results: rbooks, error: "" });
        }
    });
    return
});

// api jacaard similarity
app.get('/api/get-recommendedBooks-jaccard', (req, res) => {
    let title = req.query.title;
    let author = req.query.author;
    let publisher = req.query.publisher;
    let category = req.query.category;

    let selectedbook= {
        title: title,
        author: author,
        publisher: publisher,
        category: category
    }
    // console.log(selectedbook);
    // selectedbook.category = selectedbook.category.split(', ');

    db.query('SELECT * FROM books WHERE nrcopy > 0', (error,result) =>{
        if (error) {
            console.log(error)
            return res.send({ results: "", error: error });
        } else {
            function jaccard(obj1, obj2) {
                const props1 = Object.keys(obj1);
                const props2 = Object.keys(obj2);
                const intersection = props1.filter(prop => props2.includes(prop));
                const union = Array.from(new Set([...props1, ...props2]));
                return intersection.length / union.length;
            }

            const similarities = result.map(book => [book, jaccard(selectedbook, book)]);

            similarities.sort((a, b) => b[1] - a[1]);

            const top4 = similarities.slice(1, 4).map(tuple => tuple[0]);
            // console.log(top4);
            return res.send({ results: top4, error: "" });
        }
    });
    return
});

app.listen(3008, () => {
    console.log("Server started on Port 3008")
})