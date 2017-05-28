//extension to jQuery for animate.css
$.fn.extend({
    animateCss: function(animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

$(document).ready(function() {
    //Cookie for what comics they'd like to see
    $('input:checkbox').change(function() {
        saveCookies();
    });
    var checks = getCookie("checks");
    if (checks != "") {
        checkArray = checks.split(',');
        //unchecks boxes based on cookies
        //also has backwards compatability provided we only append to the list in landing.ejs/generator.js
        for (var i = 0; i < checkArray.length; i++) {
            if (checkArray[i] == "0" && $('input.comic-check').length > i) {
                var checkBox = $('input.comic-check')[i];
                $(checkBox).prop('checked', false);
            }
        }
    }
    $(".loader").css("display", "block");
    getNewImage();
    $('#refresh').click(function() {
        getNewImage();
    });
});

function getNewImage() {
    resetView();
    $('#refresh').animateCss('rubberBand');
    $(".loader").css("display", "block");
    var checkArray = [];
    $('input.comic-check').each(function() {
        if ($(this).is(':checked')) {
            checkArray.push(1);
        } else {
            checkArray.push(0);
        }
    });
    $.ajax({
        method: 'POST',
        url: "/RandomComic/rand",
        type: 'json',
        data: {
            checked: checkArray
        },
        success: showNewImage,
        error: function(data, code, jqXHR) {
            $(".loader").css("display", "none");
            $("#info").text("Error! Please try again.");
        }
    });
}

function showNewImage(data, code, jqXHR) {
    if (code === 'success' && jqXHR.status == 200 && data.hasOwnProperty('img')) {
        var img = document.getElementById("comic");
        img.src = data.img;
        $(".loader").css("display", "none");
        $("#comic").css("display", "initial");

        if (data.hasOwnProperty('publisherUrl') && data.hasOwnProperty('publisher')) {
            $("#publisher").html("<a href=\"" + data.publisherUrl + "\">" + data.publisher + "</a>");
        }

        if (data.hasOwnProperty('title')) {
            $("#title").text(data.title);
        }

        if (data.hasOwnProperty('alt')) {
            img.title = data.alt;
        }
    } else {
        $(".loader").css("display", "none");
        $("#info").text("Error! Please try again.");
    }
}

function resetView() {
    $("#comic").css("display", "none");
    $("#comic").attr("title", "");
    $("#publisher").html("");
    $("#info").text("Random Comics");
    $("#title").text("");
}

/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.body.style.backgroundColor = "white";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function saveCookies() {
    var checkArray = [];
    $('input.comic-check').each(function() {
        if ($(this).is(':checked')) {
            checkArray.push(1);
        } else {
            checkArray.push(0);
        }
    });
    document.cookie = "checks=" + checkArray;
}

//Refresh page on R
window.onkeyup = function(e) {
    var key = e.keyCode ? e.keyCode : e.which;
    if (key == 82) {
        getNewImage();
    }
};