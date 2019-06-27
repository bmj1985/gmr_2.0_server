const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const PORT = process.env.PORT || 3333
const app = express()

app.use(cors())
app.use(morgan('dev'))

// Router files

app.get('/api/test', (req, res, next) => {
    res.json({ message: 'Route working' })
})

app.use(notFound)
app.use(errorHandler)

function notFound(req, res, next) {
    res.status(404).send({
        error: 'Not found!',
        status: 404,
        url: req.originalUrl,
    })
}

function errorHandler(err, req, res, next) {
    console.error('ERROR', err)
    const stack = process.env.NODE_ENV !== 'production' ? err.stack : undefined
    res.status(500).send({ error: err.message, stack, url: req.originalUrl })
}

app.listen(PORT)
    .on('error', console.error.bind(console))
    .on('listening', console.log.bind(console, `Listening on port: ${PORT}`))
