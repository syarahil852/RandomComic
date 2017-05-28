var xkcd = require('xkcd');
var request = require('request');
const cheerio = require('cheerio');
const debug = true;
//fall back in case most recent check fails. This is the xkcd on 5/28/17
var latestComicNum = 1842;

//Sets most recent XKCD on init run
xkcd(function(data) {
    if (data) {
        latestComicNum = data.num;
    }
});

//To check for valid random dates
Date.prototype.isValid = function() {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return this.getTime() === this.getTime();
};

module.exports.getComic = function(returnRandomComic) {
    let numComics = 5;
    let selectedComic = getRandomIntInclusive(5, numComics);
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
                if (title === ' - Dilbert by Scott Adams') {
                    comicObject.title = 'By Scott Adams';
                }
                comicObject.publisherUrl = origUrl;
                returnRandomComic(comicObject);
            });
        case 4:
            comicObject.publisher = "SMBC";
            getSMBC(function(url, title, origUrl) {
                comicObject.img = url;
                comicObject.title = title;
                comicObject.publisherUrl = origUrl;
                returnRandomComic(comicObject);
            });
        case 5:
            comicObject.publisher = "Penny Arcade";
            getPennyArcade(function(url, title, origUrl) {
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
        if (debug) {
            console.log(url);
        }
        const $ = cheerio.load(body);
        let comicUrl = $("#main-comic").attr('src');
        let title = $(".author-credit-name").text();
        returnComic(comicUrl, title, res.request.uri.href);
    });
}

function getDilbert(returnComic) {
    //generate random date, from 1989
    var now = new Date();
    var year = getRandomIntInclusive(1989, now.getFullYear());
    var month = getRandomIntInclusive(1, 12);
    var day = getRandomIntInclusive(1, 31);
    var dateString = year + '-' + month + '-' + day;
    var testDate = new Date(dateString);
    //If it's a valid date OR if it's in the future
    while (!testDate.isValid() || testDate > now) {
        year = getRandomIntInclusive(1989, now.getFullYear());
        month = getRandomIntInclusive(1, 12);
        day = getRandomIntInclusive(1, 31);

        dateString = year + '-' + month + '-' + day;
        testDate = new Date(dateString);
    }
    var url = 'http://dilbert.com/strip/' + dateString;
    if (debug) {
        console.log(url);
    }
    request({
        url: url
    }, function(err, res, body) {
        const $ = cheerio.load(body);
        let comic = $("img.img-comic");
        let comicUrl = $(comic).attr('src');
        let title = $(comic).attr('alt');
        if (comic == undefined) {
            getDilbert(returnComic);
            return;
        }
        returnComic(comicUrl, title, url);
    });
}

function getSMBC(returnComic) {
    var url = 'http://www.smbc-comics.com/random.php';

    request({
        url: url
    }, function(err, res, body) {
        if (debug) {
            console.log(url);
        }
        const $ = cheerio.load(body);
        let comicUrl = $("#cc-comic").attr('src');
        let title = $("#cc-comic").attr('title');
        if (comicUrl == undefined) {
            getSMBC(returnComic);
            return;
        }
        returnComic(comicUrl, title, res.request.uri.href);
    });
}

function getPennyArcade(returnComic) {
    var now = new Date();
    var year = getRandomIntInclusive(1999, now.getFullYear());
    var month = getRandomIntInclusive(1, 12);
    var day = getRandomIntInclusive(1, 31);
    var dateString = year + '/' + month + '/' + day;
    var testDate = new Date(dateString);
    //If it's a valid date OR if it's in the future OR if it's a weekend
    while (!testDate.isValid() || testDate > now || testDate.getDay() == 0 || testDate.getDay() == 6) {
        year = getRandomIntInclusive(1999, now.getFullYear());
        month = getRandomIntInclusive(1, 12);
        //So that I don't have to deal with months with different nums, just limit to first 28 days
        day = getRandomIntInclusive(1, 31);
        dateString = year + '/' + month + '/' + day;
        testDate = new Date(dateString);
    }
    var url = 'https://www.penny-arcade.com/comic/' + dateString;
    request({
        url: url
    }, function(err, res, body) {
        if (debug) {
            console.log(url);
        }
        const $ = cheerio.load(body);
        let comic = $("#comicFrame > a > img");
        let comicUrl = $(comic).attr('src');
        let title = $(comic).attr('alt');
        if (comicUrl == undefined) {
            getPennyArcade(returnComic);
            return;
        }
        returnComic(comicUrl, title, url);
    });
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}