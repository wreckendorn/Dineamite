$(document).ready(function()
{
    //GLOBAL VARIABLES
    //===================================================
    var imageResponse = localStorage.getItem("response");
    var stringResponse = JSON.parse(imageResponse);
    console.log(stringResponse);
    //Run for loop across 8 hits in ajax call
    for (var i = 0; i < 9; i++)
    {
        //Change header on page to ajax response
        var recipeName = stringResponse.hits[i].recipe.label;
        $("#header" + [i]).text(recipeName)
        //Change image on page to ajax response
        var recipeImage = stringResponse.hits[i].recipe.image;
        $("#image" + [i]).attr("src", recipeImage);
        console.log (recipeImage);
    };
    $(".project-text-holder").on("click", function(){
        var hit = $(this).attr("data-num");
        localStorage.setItem("hit", hit)
    })
});

