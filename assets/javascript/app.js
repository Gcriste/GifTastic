$(document).ready(function() {
   

//var topics = ["Metallica", "The Doors", "The Who", "The Beatles", "Pink Floyd", "Stevie Wonder", "Michael Jackson", "Phish", "The Grateful Dead", "Nirvana", "Red Hot Chili Peppers"]
var topics = ["sad", "angry", "happy", "confused", "excited", "awkward", "frustrated", "tired", "mind blown", "hungry", "embarassed", "scared"]

function displayButton(){
$("#buttonsection").empty();


for (var i =0; i<topics.length; i++){
    var newButton = $("<button>").text(topics[i]);
          newButton.addClass("newbutton");
          newButton.attr("data-name", topics[i]);
          $("#buttonsection").append(newButton);

}
};


$("#add-band").on("click", function(event){
    event.preventDefault();
    var band = $("#band-input").val().trim();
    topics.push(band);
    displayButton();
    $("#band-input").val("");
})



displayButton();





$(document).on("click", ".newbutton", displayGif);
function displayGif(){
  $(".gifdirections").text("Now click on a picture to see the gif move!");

clearImages();
var band = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/stickers/search?q=" + band + "&api_key=eq42y8d62sEJYuI4Mo0r7sjJaSey3WV8";


$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
        console.log(response)
    var results = response.data;

    for (var i =0; i<10;i++){
       var bandDiv = $("<div>")
        var stillBandImage = $("<img>");
        var bandRating = $("<div>");

        stillBandImage.attr("src", results[i].images.fixed_height_still.url);
        stillBandImage.attr("data-still", results[i].images.fixed_height_still.url);
        stillBandImage.attr("data-animate", results[i].images.fixed_height.url);
        stillBandImage.attr("data-state", "still");
        stillBandImage.addClass("gif");

        bandDiv.addClass("bandDiv");

        bandRating.text("Rating: " + results[i].rating)


        bandDiv.append(stillBandImage, bandRating)
        $("#images").append(bandDiv);
      
    }
  });
}


    $(document).on("click", ".gif", function() {
     
      
        var state = $(this).attr("data-state");
      
      console.log(state)
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
          
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        
        }
      });
    





function clearImages(){

  $("#images").empty();

}

});