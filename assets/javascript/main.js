
// Important Parameters to remember.

// q - search query term or phrase
// limit - (optional) number of results to return, maximum 100. Default 25. We need 10
// offset - (optional) results offset, defaults to 0.
// rating - (optional) limit results to those rated (y,g, pg, pg-13 or r).
// lang - (optional) specify default country for regional content; format is 2-letter ISO 639-1 country code. See list of supported languages here
// fmt - (optional) return results in html or json format (useful for viewing responses as GIFs to debug/test)

$(function() {
    // An array of initial topics
    var topics = ['Family Guy', 'Futurama', 'South Park', 'Rugrats',
                  'The Simpsons', 'SpongeBob SquarePants', 'Scooby-Doo'];

    // function for generate buttons for each item in variable "topics"
    function generateBtn(){
        // previous elements are empty, so we don't have to repeat buttons
        $("#btnArea").empty();
        // Looping through an array topics 
        for (var i = 0; i < topics.length; i++) {
            // Dynamicly generating a button for each item in topics.
            var btn = $("<button>");
            // adding a class gifBtn to our buttons
            btn.addClass("gifBtn");
            // adding a data-attribute
            btn.attr("data", topics[i]);
            // adding initial text for button
            btn.text(topics[i]);
            // appending button to out button area in htl
            $("#btnArea").append(btn);
        }
    }
    generateBtn();

    // function to grab 10 static images when button is clicked.
    $("#btnArea").on("click", ".gifBtn", function(){
        var topic = $(this).attr('data');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=kP1oozQaPaHNYw4I64U8IP0iD5TyzsTM&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function(response){
            console.log(response);
            
            var results = response.data;

            for (var i = 0; i < results.length; i++){
                // div yo hold gifs
                var $div = $("<div>");
                // display the rating under each gif
                var $p = $("<p>Rating: " + results[i].rating + "</p>");
                // creating image tag and adding a class in order to design it in css later
                var $img = $("<img>").addClass("images");
                // append images and p to our main div
                $div.append($img, $p);

                // adding states on still and animate 
                $img.attr("src", results[i].images.fixed_height_still.url)
                    .attr("data-still", results[i].images.fixed_height_still.url)
                    .attr("data-animate", results[i].images.fixed_height.url)
                    .attr("data-state", "still");

                $("#gifArea").prepend($div); 


            }
            
        });
        
    });









});