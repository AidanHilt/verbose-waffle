/*Importing libraries that we need*/
const {ipcRenderer, remote} = require('electron');
const $ = require('jquery');
const fs = require('fs');

//Setting global values that we will later use
business = null;
loadBusiness();

/*Add functionality to the sliders to allow them to display 
their values to the user.
*/
$("#fameLabel").text("Fame: " + document.getElementById("fameSlider").value);
document.getElementById("fameSlider").addEventListener('input', function(){
    $("#fameLabel").text("Fame: " + document.getElementById("fameSlider").value);
    business.fame = document.getElementById("fameSlider").value;
});

$("#repLabel").text("Reputation: " + document.getElementById("repSlider").value);
document.getElementById("repSlider").addEventListener('input', function(){
    $("#repLabel").text("Reputation: " + document.getElementById("repSlider").value);
    business.reputation = document.getElementById("repSlider").value;
});

$("#compLabel").text("Competition: " + document.getElementById("compSlider").value);
document.getElementById("compSlider").addEventListener('input', function(){
    $("#compLabel").text("Competition: " + document.getElementById("compSlider").value);
    business.competition = document.getElementById("compSlider").value;
});


//===================
//UI Update Functions
//===================

/**
 * 
 * @param {*} business A business object loaded from a JSON file that represents
 * a business, its expenses, its products, and its general reputation in the city.
 * 
 * Updates the UI with new information about a business loaded from a file, or generated
 * if no file could be found.
 */

 //TODO Add functionality to update the item and expense areas
function updateUI(business){
    document.getElementById("fameSlider").value = business.fame;
    $("#fameLabel").text("Fame: " + document.getElementById("fameSlider").value);

    document.getElementById("repSlider").value = business.reputation;
    $("#repLabel").text("Reputation: " + document.getElementById("repSlider").value);

    document.getElementById("compSlider").value = business.competition;
    $("#compLabel").text("Competition: " + document.getElementById("compSlider").value);

    $("h1").text(business.name);

    updateItemMenu(business);
}

function updateItemMenu(business){
  $("#menuListTop").empty();
  $.each(business["products"], function(index, value){
    $("#menuListTop").append("<li class=menuListTopItem data-index=" + index + ">" + value["itemName"] + ": " + value["itemPrice"] + "</li>");
  });
}

//========================== 
//UI Setup & Event Listeners
//==========================

//Adding listeners for events from main
ipcRenderer.on("add-item-forward", function(event, arg){
  if(arg["itemName"] != "" && arg["itemPrice"] != ""){
    business["products"].push(arg);
    updateItemMenu(business);
    console.log(business);
  }
});

ipcRenderer.on("update-edited-item-forward", function(event, arg){
  let index = arg["index"];

  business["products"][index]["itemName"] = arg["itemName"];
  business["products"][index]["itemPrice"] = arg["itemPrice"];

  updateItemMenu(business);
});

ipcRenderer.on("delete-item-forward", function(event, arg){
  business["products"].splice(arg, 1);
  console.log(arg);

  updateItemMenu(business);
});

//UI event listeners
$("#menuListTop").on("dblclick", "li", function(e){
  index = $(this).attr("data-index");
  let payload = business["products"][index];
  payload.index = index;
  ipcRenderer.send("edit-item", payload);
});

/*Adding functionality to open the menus for adding items for sale
and adding expenses.
*/
$("#addItem").on("click", function(){
  const BrowserWindow = remote.BrowserWindow;
  let win = new BrowserWindow({
    width: 400,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.removeMenu();
  win.loadFile('addItems.html');
});


//Adding in the information of the loaded business
updateUI(business);


//================
//Helper functions 
//================

function loadBusiness() {
    if(fs.existsSync("default_business.json")){
      business = JSON.parse(fs.readFileSync("default_business.json").toString());
    }else{
        business = {
        name: "Default name",
        debts: [],
        products: [],
        fame: 10,
        reputation: 0,
        competition: 0 //This value is unused in the current build 
      }
    }
  }