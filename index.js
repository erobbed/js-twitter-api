let access_token 

document.addEventListener("DOMContentLoaded", function() {
  let inputBox = document.getElementById("tweet-seach-input")
  let form = document.getElementById("tweet-seach-form")

  form.addEventListener('submit', function(event) {
    event.preventDefault()

    let username = inputBox.value.trim()

    getToken(() => fetchTweets(username))    
  })
})

function getQueryURL(searchText){
    return `https://api.twitter.com/1.1/search/tweets.json?q=from:${searchText}%20filter:images`
}

function fetchTweets(username){
    let url = getQueryURL(username)

    fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": `application/x-www-form-urlencoded;charset=UTF-8`
        },
        body: "grant_type=client_credentials"
    })
    .then(res => res.json())
    .then(json => showTweets(json))
}

function setToken(json, callback){
    // json.token_type should be "bearer"
    access_token = json.access_token
    callback()
}

function getToken(callback){
    //if the token exists dont make a new one
    let url = "https://api.twitter.com/oauth2/token"

    let options = {
        method: 'POST',
        dataType: 'jsonp',
        headers: {
            Authorization: `Basic ${getKeys()}`,
            "Content-Type": `application/x-www-form-urlencoded;charset=UTF-8`
        },
        //body: JSON.stringify("grant_type=client_credentials"),
        body: "grant_type=client_credentials",
        //mode: 'no-cors'
    }

    fetch(url, options)
    .then(function(res){
        debugger
        res => res.json()
    })
    .then(json => setToken(json, callback))
    .catch(function(error){
        console.log(error);
    })
}

function showTweets(json){
    let tweets = json.map(tweet => formatResult(tweet))

    var template = Handlebars.compile(document.getElementById("tweets-template").innerHTML);
    var html = template(tweets);
}

function formatResult(tweet){
  return {
    text: tweet.text,
    img_url: tweet.entities.media[0].media_url
  };
}

function getKeys(){
    //let consumer_key = "c5MhP1y0VvVqSlYgbRgRekNHC"
    //let consumer_secret = "gLA5IuaDFSTLFO2Pf05kYtvmodhSo1NBzwroBBKR2USyg8SchH"
    return "YzVNaFAxeTBWdlZxU2xZZ2JSZ1Jla05IQzpnTEE1SXVhREZTVExGTzJQZjA1a1l0dm1vZGhTbzFOQnp3cm9CQktSMlVTeWc4U2NoSA=="
}