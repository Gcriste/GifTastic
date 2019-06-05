$(document).ready(function() {
   
// topics for buttons (First created buttons for bands but changed to emotions)
//var topics = ["Metallica", "The Doors", "The Who", "The Beatles", "Pink Floyd", "Stevie Wonder", "Michael Jackson", "Phish", "The Grateful Dead", "Nirvana", "Red Hot Chili Peppers"]
var topics = ["sad", "angry", "happy", "confused", "excited", "awkward", "frustrated", "tired", "mind blown", "hungry", "embarassed", "scared"]


//displays buttons which is ran when page loads and also runs when you add another emotion
function displayButton(){
$("#buttonsection").empty();

//loops through the topics above and creates a button for each one
for (var i =0; i<topics.length; i++){
    var newButton = $("<button>").text(topics[i]);
      //gives the button a class of new button
          newButton.addClass("newbutton");
          //gives the data attribute of data-name
          newButton.attr("data-name", topics[i]);
          //puts button in button section
          $("#buttonsection").append(newButton);
    }
};



// when you type in a new emotion and press enter or click the button, the new emotion button will be added
$("#add-band").on("click", function(event){
    event.preventDefault();
    var band = $("#band-input").val().trim();
        //new emotion will be pushed to topics
    topics.push(band);
//display Button function runs which creates th
    displayButton();
    //empties out text box when button is clicked or enter is pressed
    $("#band-input").val("");
})


displayButton();




//when you click a gif button, the gifs will be displayed
$(document).on("click", ".newbutton", displayGif);

//instructions are displayed when button is clicked 
function displayGif(){
  $(".gifdirections").text("Now click on a picture to see the gif move!");

//clears previous gifs and finds the ajax database gif for new gif
clearImages();
var band = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/stickers/search?q=" + band + "&api_key=eq42y8d62sEJYuI4Mo0r7sjJaSey3WV8";

//database is called
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var results = response.data;

    //loops through 10 times finds gifs and puts them in new div
    //finds the rating and puts them in new div as well
    for (var i =0; i<10;i++){
       var bandDiv = $("<div>")
        var stillBandImage = $("<img>");
        var bandRating = $("<div>");

        //finds still and animated gifs and gives appropriate data state
        //gives data states for still vs animate, and linking those to the specific gif(still or animated)
        //adds a class of gif

        stillBandImage.attr("src", results[i].images.fixed_height_still.url);
        stillBandImage.attr("data-still", results[i].images.fixed_height_still.url);
        stillBandImage.attr("data-animate", results[i].images.fixed_height.url);
        stillBandImage.attr("data-state", "still");
        stillBandImage.addClass("gif");

        //gives class for the rating and gif
        bandDiv.addClass("bandDiv");

        //gives the rating
        bandRating.text("Rating: " + results[i].rating)

      //combines the gif and rating for each gif
        bandDiv.append(stillBandImage, bandRating)
        $("#images").append(bandDiv);
      
    }
  });
}

  //  when you click on a gif the state is changed from still to animate
  //animated gif will be displayed when clicked once
  //when clicked again the gif will go back to still 
    $(document).on("click", ".gif", function() {
     
      //this represents the gif you click on and looks at current data-state of that gif
        var state = $(this).attr("data-state");
      
      //if the data-state is still, run if statement
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
          
          //if data-state is animated, run this 
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        
        }
      });
    

//when gif is clicked it clears the previous gifs
function clearImages(){

  $("#images").empty();

}

});