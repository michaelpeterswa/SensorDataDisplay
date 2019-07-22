// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

const app = document.getElementById('root')


const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(logo)
app.appendChild(container)

var temp
var humidity
var pressure
var light
var voc
var time
var year
var month
var day
var hour
var minute
var second
var formattedTime

function parseTime(json){
    year = json[0].time.slice(0,4)
    month = json[0].time.slice(5,7)
    day = json[0].time.slice(8,10)
    hour = json[0].time.slice(11,13)
    minute = json[0].time.slice(14,16)
    second = json[0].time.slice(17,19)
    formattedTime = month + "." + day + "." + year
    formattedTime = formattedTime + ", " + hour + ":" + minute + ":" + second + "Z"
}

function parseData(response) {
    var data = JSON.parse(response)
    parseTime(data)
    temp = data[0].temperature
    humidity = data[0].humidity
    pressure = data[0].pressure
    light = data[0].light
    voc = data[0].gasses
}

function createContainer(name, data, suffix){
    const card = document.createElement('div')
    card.setAttribute('class', 'card')

    const h1 = document.createElement('h1')
    h1.textContent = name + " - " + formattedTime

    const p = document.createElement('p')
    p.textContent = data + suffix

    container.appendChild(card)
    card.appendChild(h1)
    card.appendChild(p)
}

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://as.northw.st/api', true)

request.onload = function () {
  parseData(this.response)
  createContainer("Temperature", temp, "F")
  createContainer("Pressure", pressure, " inHg")
  createContainer("Humidity", humidity, "%H")
  createContainer("Light", light, " lux")
  createContainer("VOC", voc, "")
}

request.send()

