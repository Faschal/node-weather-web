const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/4bb7286987b2541b8e51f88016db2cca/${latitude},${longitude}?units=si`

  request({url, json:true}, (error, {body}) => {
    if(error) {
      callback('Unable to connect to the weather service !' ,undefined)
    } else if (body.error) {
      callback('Unable to find the location !', undefined)
    } else {
      callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`)
    }
  })
}

module.exports = forecast