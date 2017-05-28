var xkcd = require('xkcd');
var request = require('request');
//fall back in case bottom fails
var latestComicNum = 1842;

//Sets most recent XKCD on init run
xkcd(function(data) {
    if (data) {
        latestComicNum = data.num;
    }
});
module.exports.getComic = function(returnRandomComic) {
    let numComics = 1;
    let selectedComic = getRandomIntInclusive(1, numComics);
    var comicObject = {};
    switch (selectedComic) {
        case 1:
            comicObject.publisher = "xkcd";
            comicObject.publisherUrl = "https://xkcd.com/";
            let selectedXKCD = getRandomIntInclusive(1, latestComicNum);
            xkcd(selectedXKCD, function(data) {
                comicObject.img = data.img;
                comicObject.title = data.safe_title;
                returnRandomComic(comicObject);
            });

            break;
        case 2:
            comicObject.publisher = "Cyanide & Happiness";
            comicObject.publisherUrl = "https://explosm.net/";
    }
};

function getCyanideAndHappiness() {
    var url = 'http://explosm.net/comics/random';

    request({
        url: url,
        followRedirect: false
    }, function(err, res, body) {
        //gives us the URL of the random comic
        console.log(res.headers.location);
    });
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}