/*Importing libraries that we need*/
let $ = require('jquery');

/*Add functionality to the sliders to allow them to display 
their values to the user.
*/
$("#fameLabel").text("Fame: " + document.getElementById("fameSlider").value);
document.getElementById("fameSlider").addEventListener('input', function(){
    $("#fameLabel").text("Fame: " + document.getElementById("fameSlider").value);
});

$("#repLabel").text("Reputation: " + document.getElementById("repSlider").value);
document.getElementById("repSlider").addEventListener('input', function(){
    $("#repLabel").text("Reputation: " + document.getElementById("repSlider").value);
});

$("#compLabel").text("Competition: " + document.getElementById("compSlider").value);
document.getElementById("compSlider").addEventListener('input', function(){
    $("#compLabel").text("Competition: " + document.getElementById("compSlider").value);
});

