//importing required files.
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Login = require('./controllers/login_ejs');
const Signup = require('./controllers/signup_ejs');
const Home = require('./controllers/home_ejs');
const LoginHandler = require('./controllers/login_handler');
const SignupHandler = require('./controllers/signup_handler');
const HomeHandler = require('./controllers/home_handler');
const ResultsHandler = require('./controllers/results_handler');
const Logout = require('./controllers/logout');
const Auth = require('./controllers/auth');
const PopupChairs = require('./controllers/popup.chairs');
const PopupTables = require('./controllers/popup.tables');
const TablesHandler = require('./controllers/tables_handler');
const Chairs = require('./controllers/chairs_ejs');
const Tables = require('./controllers/tables_ejs');
const PopupShare = require('./controllers/popup.share');
const PopupShareEjs = require('./controllers/popup.share.ejs');
const path = require('path');

//setting middlewares
app.set('view engine', 'ejs');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//setting session middleware.
app.use(session({
        secret: 'scrapper',
        resave: false,
        saveUninitialized: false,
        cookie:{
            maxAge: 2 * 60 * 60 * 1000
        }
    })
);

//all routes
app.get('/', Home); //login route
app.get('/signup', Signup); //signup page route
app.get('/home', Home); //protected homepage route
app.post('/login', LoginHandler); //route to handle login post request
app.post('/signup', SignupHandler); //route to handle signup post request
app.get('/scrap', HomeHandler); //route to handle scrapping of the sites
app.get('/tables', Tables); //tables page route
app.get('/chairs', Chairs); //tables page route
app.get('/tables/data', TablesHandler); //route to get table data from the db.
app.get('/scrap/:id', PopupChairs); //route for popup window for chair data
app.get('/tables/:id', PopupTables); //route for popup window for table data
app.post('/results', ResultsHandler); //route for search results data
app.get('/mail/:id/:type', PopupShareEjs);
app.post('/sendmail', PopupShare);
app.get('/logout', Logout); //logout route



//connecting to mongodb cloud service and once successful connection is established, starting the node server.
mongoose.connect(`mongodb+srv://admin:admin619@cluster0.hjhif.mongodb.net/provider?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(result => {
    app.listen(7000, ()=> console.log('server started on port 7000'));
}).catch(error => console.log(error));
