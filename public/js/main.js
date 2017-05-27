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
        $(".loader").css("display", "block");
        getNewImage();
    });

});

function getNewImage() {
    $.ajax({
        method: 'POST',
        url: "/RandomComic/rand",
        type: 'json',
        success: showNewImage
    });
}

function showNewImage(data, code, jqXHR) {
    console.log(data);
}