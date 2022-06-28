const express = require('express')
const path = require('path')
const app = express()

app.use('/', express.static(path.join(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})

async function server() {
    try {
        app.listen(5000, () => {
            console.log('Server has been started')
        })
    } catch (e) {
        process.exit(1)
    }
}

server()