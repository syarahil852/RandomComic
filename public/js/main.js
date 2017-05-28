$.fn.extend({
    animateCss: function(animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
        });
    }
});

$(document).ready(function() {
    getNewImage();
    $('#refresh').click(function() {
        resetView();
        $('#refresh').animateCss('rubberBand');
        $(".loader").css("display", "block");
        getNewImage();
    });

});

function getNewImage() {
    $.ajax({
        method: 'GET',
        url: "/RandomComic/rand",
        type: 'json',
        success: showNewImage
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
            $("#title").text(data.title);
        }
    } else {
        $(".loader").css("display", "none");
        $("#publisher").html("Error! Please try again.");
    }
}

function resetView() {
    $("#comic").css("display", "none");
    $("#publisher").html("");
    $("#title").text("");
}