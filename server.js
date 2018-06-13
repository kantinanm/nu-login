var Nightmare = require('nightmare')
var url = 'https://login3.nu.ac.th:1000/portal?'
var duration = 1000 * 10

var auto = function () {
    console.log('goto site...')
    var nightmare = Nightmare({ show: false, waitTimeout: duration / 2 })
    nightmare
        .goto(url)
        .wait('input[type=submit]')
        .insert('#ft_un', 'ecpe-software')
        .insert('#ft_pd', '7890')
        .click('input[type=submit]')
        .end()
        .then(function (body) {
            console.log('----------login done----------')
        })
        .catch(function (error) {
            if (typeof (error) === 'object') {
                if (error.code) {
                    console.log('No internet connection, try again in ' + (duration / 2) + 's.')
                }
            }
            else if (typeof (error) === 'string') {
                if (error.indexOf('focus') !== -1) {
                    console.log('------already logged in-------')
                }
                else {
                    console.log(error)
                }
            }
            else {
                console.log(error)
            }
        })
}

setInterval(() => { auto() }, duration)
