//GLOBAL VARIABLES
//===================================================
var response = localStorage.getItem("response");
var stringResponse = JSON.parse(response);
var hit = localStorage.getItem("hit");
var radioGenre = localStorage.getItem("genre");
var currentHit = stringResponse.hits[hit].recipe;
console.log(currentHit)
//FUNCTIONS
//===================================================

function playRadioStation() 
{
    if (radioGenre === "American") {
        getStationID("audiophile+jazz");
    }

    else if (radioGenre === "British") {
        getStationID("HOT+108+JAMZ");
    }

    else if (radioGenre === "Chinese") {
        getStationID("Sleeping+Pill");
    }

    else if (radioGenre === "French") {
        getStationID("Gem+Radio+New+Wave")
    }

    else if (radioGenre === "Greek") {
        getStationID("RadioEpirus")
    }

    else if (radioGenre === "Indian") {
        getStationID("All+60s+All+The+Time")
    }

    else if (radioGenre === "Italian") {
        getStationID("Italo+Disco+Classic")
    }

    else if (radioGenre === "Japanese") {
        getStationID("PARTY+VIBE+RADIO")
    }

    else if (radioGenre === "Mediterranean") {
        getStationID("AbacusFM+Mozart")
    }

    else if (radioGenre === "Spanish") {
        getStationID("ADR+202+Vintage+Soul")
    }

    else if (radioGenre === "Thai") {
        getStationID("Proton+Radio")
    }

    else if (radioGenre === "Mexican") {
        getStationID("Radio+Mariachi+Stream")
    }
}

function getStationID(keyword) 
{
  var radioID = "";
  var queryURL = "https://cors-everywhere.herokuapp.com/https://api.shoutcast.com/legacy/stationsearch?k=RCOfdplHbBaOMy1C&search=" + keyword + "&limit=1"
  console.log("This is the query URL: " + queryURL);
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
   console.log(response);
    //the response is in XML so we call a function that converts it to JSON (xmlToJson)
  var convertedResponse = xmlToJson(response);
  console.log(convertedResponse);
  radioID = convertedResponse.stationlist.station["@attributes"].id
  console.log("radio ID is " + radioID);
  callRadioStation(radioID);
  });
}

  // we need to take the response we just got back and grab the station ID.  i just added an id to the query for now so you can see it in action.  

// This API call uses the station ID we just got back and sends it to the HTML audio player
function callRadioStation(radioID) {
 var radioqueryURL = "https://cors-everywhere.herokuapp.com/https://yp.shoutcast.com/sbin/tunein-station.m3u?id=" + radioID;
 $.ajax({
   url: radioqueryURL,
   method: "GET"
 }).then(function(response) {
  console.log(response);

radioURL = response.substring(response.indexOf("http") - 1);
console.log(radioURL);

// // add the URL to the src of the HTML player
   $("#player").attr("src", "" + radioURL + "");
 });
};



  // // Changes XML to JSON
  function xmlToJson(xml) {
    
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for(var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    return obj;
  };


function displayProjectInfo()
{
    //Change recipe name
    $("#recipeName").text(currentHit.label);
    //Change recipe image
    $("#recipeImg").attr("src", currentHit.image);
    //Add ingredients list
    for(var i = 0; i < currentHit.ingredientLines.length; i++)
    {
        $("#ingredients").append("<li>" + currentHit.ingredientLines[i] + "</li>")
    }
    //calories
    var calories = currentHit.calories;
    calories = Math.floor(calories);
    $("#calories").text("Calories: " + calories);

    //protein
    var protein = currentHit.totalDaily.PROCNT.quantity;
    protein = Math.floor(protein);
    $("#protein").text("Protein: " + protein + " grams");

    // Fat
    var fat = currentHit.totalNutrients.FAT.quantity;
    fat = Math.floor(fat)
    $("#Fat").text("Fat: " + fat + " grams");

    // carbs
    var carbs = currentHit.totalDaily.CHOCDF.quantity;
    carbs = Math.floor(carbs)
    console.log(carbs);
    $("#Carbs").text("Carbs: " + carbs + " grams");

    // carb + protein + fat percentages
    var total = carbs + fat + protein;
    console.log(total);
    var fatPercentage = Math.floor((fat/total) * 100);
    console.log(fatPercentage + "%");
    var carbPercentage = Math.floor(carbs/total * 100);
    console.log(carbPercentage + "%");
    var proteinPercentage = Math.floor(protein/total * 100);
    console.log(proteinPercentage + "%");
    $("#breakdownPercentage").text("Carbs: " + carbPercentage + "%    Protein: " + proteinPercentage + "%   Fat: " + fatPercentage + "%");

    //fiber
    // var fiber = currentHit.totalDaily.FIBTG.quantity;
    // fiber = Math.floor(fiber);
    // $("#fiber").text("Fiber: " + fiber + " grams");

    //sugars
    var sugars = currentHit.totalNutrients.SUGAR.quantity;
    sugars = Math.floor(sugars);
    $("#sugar").text("Sugars: " + sugars + " grams");

    // // saturatedFat
    // var saturatedFat = currentHit.totalNutrients.FASAT.quantity;
    // saturatedFat = Math.floor(saturatedFat)
    // $("#saturatedFat").text("Saturated Fat: " + saturatedFat + " grams");

    // // monounsaturatedFat
    // var monounsaturatedFat = currentHit.totalNutrients.FAMS.quantity;
    // monounsaturatedFat = Math.floor(monounsaturatedFat)
    // $("#monounsaturatedFat").text("monounsaturatedFat: " + monounsaturatedFat + " grams");

    // // polyunsaturatedFat
    // var polyunsaturatedFat = currentHit.totalNutrients.FAPU.quantity;
    // polyunsaturatedFat = Math.floor(polyunsaturatedFat)
    // $("#polyunsaturatedFat").text("polyunsaturatedFat: " + polyunsaturatedFat + " grams");

    // //  transFat
    // var transFat = currentHit.totalNutrients.FATRN.quantity;
    // transFat = Math.floor(transFat)
    // $("#transFat").text("transFat: " + transFat + " grams");

    // URL for recipe page
    var recipeURL = currentHit.url;
    console.log(recipeURL);
    $("#recipeLink").text("Check out the recipe here!");
    $("#recipeLink").attr("href", recipeURL);
 

playRadioStation();

}
displayProjectInfo();
