const express= require('express');
const bcrypt =require('bcrypt-nodejs');
const cors = require('cors');
const knex= require('knex');

const register = require('./controllers/register');
const signin= require('./controllers/signin');
const profile = require('./controllers/profile');
const image= require('./controllers/image');


const db= knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL ,
     ssl: { rejectUnauthorized: false },
  }
});

const app = express();

//app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {res.send('success')});
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register',(req, res) =>{ register.handleRegister(req, res, db, bcrypt )})//injection of dependencies
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl',(req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () =>{
	console.log(`app is running on port ${process.env.PORT}`);
})





/*

how should my api look (initial ideas) :

/---> i will be having a root route
that responds with this is working

/--->signin route ---> POSTreq which will respond with either
successor fail

/---> register ---> POSTreq will return the new user object

/--->home screen to have the ability to access the profile of a user
     /profile/userid ----> GETreq = User
/---> Image enpoint that makes a PUTreq and returns the updated user obj


*/