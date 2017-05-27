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
        $('#refresh').animateCss('rubberBand');
        $("#comic").css("display", "none");
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
    $(".loader").css("display", "none");
    $("#comic").css("display", "initial");
    console.log(data);
    var img = document.getElementById("comic");
    img.src = data.img;
}