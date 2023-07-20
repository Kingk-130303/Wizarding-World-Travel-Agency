const express = require('express')
const App = express()
const cors = require('cors')
const cookieParser = require('cookie-parser');
const fetchuser = require('./middleware/fetchuser')

// const cors = require('cors')
const connectToMongo = require('./database');

connectToMongo();

// App.use(cors())
App.use(express.json())
App.use(cookieParser())
App.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }));
  
App.use('/api/auth',require('./routes/auth'))
App.use('/api/private', require('./routes/private'));
App.use('/admin',require('./routes/admin'))
App.use('/user',require('./routes/user'))

App.listen(5000,()=>{
    // console.log('App listening at http://localhost:5000')
})


