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
    let numComics = 3;
    let selectedComic = getRandomIntInclusive(2, numComics);
    var comicObject = {};
    switch (selectedComic) {
        case 1:
            comicObject.publisher = "xkcd";
            let selectedXKCD = getRandomIntInclusive(1, latestComicNum);
            xkcd(selectedXKCD, function(data) {
                comicObject.publisherUrl = "https://xkcd.com/" + selectedXKCD;
                comicObject.img = data.img;
                comicObject.title = data.safe_title;
                comicObject.alt = data.alt;
                returnRandomComic(comicObject);
            });
            break;
        case 2:
            comicObject.publisher = "Cyanide & Happiness";
            getCyanideAndHappiness(function(url, title, origUrl) {
                comicObject.img = url;
                comicObject.title = title;
                comicObject.publisherUrl = origUrl;
                returnRandomComic(comicObject);
            });
            break;
        case 3:
            comicObject.publisher = "Dilbert";
            getDilbert(function(url, title, origUrl) {
                comicObject.img = url;
                comicObject.title = title;
                comicObject.publisherUrl = origUrl;
                returnRandomComic(comicObject);
            });
    }
};

function getCyanideAndHappiness(returnComic) {
    var url = 'http://explosm.net/comics/random';

    request({
        url: url
    }, function(err, res, body) {
        const $ = cheerio.load(body);
        let comicUrl = $("#main-comic").attr('src');
        let title = $(".author-credit-name").text();
        returnComic(comicUrl, title, res.request.uri.href);
    });
}

function getDilbert(returnComic) {
    var year = getRandomIntInclusive(1989, 2017);
    var month = getRandomIntInclusive(1, 12);
    //So that I don't have to deal with months with different nums, just limit to first 28 days
    var day = getRandomIntInclusive(1, 28);
    var url = 'http://dilbert.com/strip/' + year + '-' + month + '-' + day;
    request({
        url: url
    }, function(err, res, body) {
        const $ = cheerio.load(body);
        let comic = $("img.img-comic");
        let comicUrl = $(comic).attr('src');
        let title = $(comic).attr('alt');
        returnComic(comicUrl, title, url);
    });
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}