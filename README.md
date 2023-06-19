This is a library management system.
The front end is written in VueJS and Vuetify in top of it, the back end is written in NodeJS/ExpressJS and the database is a MySQL server.
The user can see the library's books in a 3D way. This part was written in ThreeJS. The user can rotate, zoom in/out and read the selected book.
Upon selecting a book, the user will see with a short list of recommeded books based on the one selected.
For this recommendation system a couple of NLP techniques were used: Jaccard Similarity, Cosine Similarity, Bag of words, Stemming, Contend based filtering.

To be able ot run this code, these steps should be followed.
1. For the database, a local MySQL database server should be running.
Then, in a database manager like HeidiSQL import the databse.sql file which is in the zipped folder. This action should create the database and the tables with data inside of them.
2. For the back-end code, open the zip file and the server file within it and in the .env you should input the credentials to the local database in order to be able to connect to it. Then, open the server file which is in the zipped folder and once in it, run the command "npm i". When it is done installing all the necessary packages, run the command "nodemon app.js" and the server should start running. 
3. For the frontend code, open the app file which is in the zipped folder and once in it, run the command "npm i". When it is done installing all the necessary packages, run the command "npm run server" and the server should start running. Click on the local host link and the aplication should be ready to be used.