var xkcd = require('xkcd');
var request = require('request');

module.exports.getComic = function(returnRandomComic) {
    let numComics = 1;
    let selectedComic = getRandomIntInclusive(1, numComics);
    console.log("Selected comic: " + selectedComic);
    switch (selectedComic) {
        case 1:
            xkcd(532, function(data) {
                returnRandomComic(data);
            });
            break;
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