const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const directoryPublicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(directoryPublicPath))


app.get('', (reg, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Alex'
  })
})

app.get('/about', (reg, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Alex'
  })
})

app.get('/help', (reg, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Alex',
    helpMessage: 'What can i help ?'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({
        error
      })
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({
          error
        })
      }

      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
      })

    })
  })


  // res.send({
  //   forecast: 'It is snowing',
  //   location: req.query.address
  // })
})


app.get('/help/*', (reg, res) => {
  res.render('error',{
    title: '404',
    name: 'Alex',
    message: 'Help article not found'
  })
})

app.get('*', (reg, res) => {
  res.render('error',{
    title: '404',
    name: 'Alex',
    message: 'Page not found'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})