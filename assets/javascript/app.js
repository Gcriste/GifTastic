$(document).ready(function() {
   

var topics = ["Led Zeppelin", "The Doors", "The Who", "The Beatles", "Pink Floyd", "Stevie Wonder", "Michael Jackson", "Phish", "The Grateful Dead"]


function displayButton(){
$("#buttonsection").empty();


for (var i =0; i<topics.length; i++){
    var newButton = $("<button>").text(topics[i]);
          newButton.addClass("btn1");
          newButton.attr("data-name", topics[i]);
          $("#buttonsection").append(newButton);

}
};


$("#add-band").on("click", function(event){
    event.preventDefault();

    var band = $("#band-input").val().trim();
    topics.push(band);
    displayButton();
})

displayButton();


function displayGif(){
var band = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/stickers/search?q=" + band + "&api_key=eq42y8d62sEJYuI4Mo0r7sjJaSey3WV8";


$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
        console.log(response)
    var results = response.data

    for (var i =0; i<results.length;i++){
       var bandDiv = $("<div>")
        var animatedBandImage = $("<img>");
        var stillBandImage = $("<img>");
        var bandRating = $("<div>");

        animatedBandImage.attr("src", results[i].images.original.url);
        animatedBandImage.attr("data-animate", results[i].images.original.url);
        animatedBandImage.attr("data-still", results[i].images.original_still.url);
        animatedBandImage.attr("data-state", "animate");
        animatedBandImage.addClass("gif");


        bandRating.text("Rating: " + results[i].rating)


        bandDiv.prepend(animatedBandImage, bandRating)
        $("#images").prepend(bandDiv);
      
    }
  });

    $(document).on("click", ".gif", function() {
    
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
      
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
          
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        
        }
      });
    


}





//for (var i = 0; i < results.length; i++) {
    //var animalDiv= $("<div>")
   //var p = $("<p>").text(results[i].rating)

    // var animalImage = $("<img>")
     //animalImage.attr("src", results[i].images.fixed_height.url)
       
    // animalDiv.append(p)
     //animalDiv.append(animalImage)
     //$("#gifs-appear-here").prepend(animalDiv)

   //}

$(document).on("click", ".btn1", displayGif);

});