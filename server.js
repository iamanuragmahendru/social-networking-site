const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const userRoute = require('./routes/user')
const adminRoute = require('./routes/admin')

app.use(express.static('public'))
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))