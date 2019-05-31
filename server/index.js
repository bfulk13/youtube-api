require('dotenv').config()
const express = require('express')
const consola = require('consola')
const session = require('express-session')
const { Nuxt, Builder } = require('nuxt')
const app = require('express')()

// parser to access req.body
app.use(express.json())

// destructure api key & session secret
const { SESSION_SECRET } = process.env

// sessions to create `req.session`
app.use(
  session({
    secret: `${SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  })
)

// POST `/api/login` to log in the user and add him to the `req.session.authUser`
app.post('/api/login', function(req, res) {
  if (req.body.email && req.body.password) {
    req.session.user = { user: email }
    return res.json({ user: email })
  }
  res.status(401).json({ error: 'Bad credentials' })
})

// POST `/api/logout` to log out the user and remove it from the `req.session`
app.post('/api/logout', function(req, res) {
  delete req.session.user
  res.json({ ok: true })
})

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
