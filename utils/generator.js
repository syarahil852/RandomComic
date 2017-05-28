var xkcd = require('xkcd');
var request = require('request');
const cheerio = require('cheerio');

//fall back in case bottom fails
var latestComicNum = 1842;

//Sets most recent XKCD on init run
xkcd(function(data) {
    if (data) {
        latestComicNum = data.num;
    }
});
module.exports.getComic = function(returnRandomComic) {
    let numComics = 2;
    let selectedComic = getRandomIntInclusive(2, numComics);
    var comicObject = {};
    switch (selectedComic) {
        case 1:
            comicObject.publisher = "xkcd";
            comicObject.publisherUrl = "https://xkcd.com/";
            let selectedXKCD = getRandomIntInclusive(1, latestComicNum);
            xkcd(selectedXKCD, function(data) {
                comicObject.img = data.img;
                comicObject.title = data.safe_title;
                comicObject.alt = data.alt;
                returnRandomComic(comicObject);
            });
            break;
        case 2:
            comicObject.publisher = "Cyanide & Happiness";
            comicObject.publisherUrl = "https://explosm.net/";
            getCyanideAndHappiness(function(url, title) {
                comicObject.img = url;
                comicObject.title = title;
                returnRandomComic(comicObject);
            });
            break;
    }
};

function getCyanideAndHappiness(returnComic) {
    var url = 'http://explosm.net/comics/random';

    request({
        url: url
    }, function(err, res, body) {
        const $ = cheerio.load(body);
        let url = $("#main-comic").attr('src');
        console.log(url);
        let title = $(".author-credit-name").text();
        returnComic(url, title);
    });
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}