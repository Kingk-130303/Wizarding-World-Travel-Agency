const express = require('express')
const App = express()
// const cors = require('cors')
const connectToMongo = require('./database');
connectToMongo();

// App.use(cors())
App.use(express.json())
App.use('/api/auth',require('./routes/auth'))

App.listen(5000,()=>{
    console.log('App listening at http://localhost:5000')
})


