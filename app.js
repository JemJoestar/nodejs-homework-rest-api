const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv');


const contactsRouter = require('./routes/api/contacts')
const authRouter = require('./routes/api/users')

const app = express()

dotenv.config({
  path:  './envs/development.env',
})


const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'


app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())



app.use('/api/contacts', contactsRouter)
app.use("/users", authRouter)

app.all('*', (req, res) => {
  res.status(404).json({
    msg: 'Oops! Resource not found.',
  });
});


app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})




module.exports = app  