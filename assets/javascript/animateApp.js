$(document).ready(function(){

    $('.categories').hide();
    $('.cuisineDisplay').hide();
    $('#dietSelect').hide();
    $('#submit').hide();
    $('#needCuisine').hide();
    
    $('#get-started').on('click', () => {
        $('.categories').show();
        $('#dietSelect').show();
        $('.cuisineDisplay').hide();
        $('.cuisineSubmit').hide();
        $("html, body").animate({
            scrollTop: $(".categories").offset().top
        }, 800);
      });
    })
    
    $('#dietSelect').on('click', () => {
        event.preventDefault()
        $('.categories').hide();
        $('.cuisineDisplay').show();
        $('#submit').show();
        $("html, body").animate({
            scrollTop: $(".cuisines").offset().top
        }, 800);

        // $('.dietSubmit').hide();
        // alert("this gone");
    });
