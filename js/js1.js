var records, selectedItem, quoteItem, quoteOutput, total = 0;
const quoteRecord = {};
var quote = [];

function loadJson() {
    var x, i;
    console.log("loadJson() - 1.beginning");

    const data = '{"products":[{"productId": "001","productName": "Oblivion","productType": "Movie","newRelease": true,"productPrice": 6.50},{"productId": "002","productName": "Iron Man 3","productType": "Movie","newRelease": true,"productPrice": 6.50},{"productId": "003","productName": "Iron Man 3","productType": "Movie","newRelease": true,"productPrice": 6.50},{"productId": "004","productName": "Monty Pythons Meaning of Life","productType": "Movie","newRelease": false,"productPrice": 2.00},{"productId": "005","productName": "iRobot","productType": "Movie","newRelease": false,"productPrice": 3.50},{"productId": "006","productName": "Cant Hold Us (Macklemore)","productType": "Song","newRelease": true,"productPrice": 3.50},{"productId": "007","productName": "Mirrors (Justin Timberlake)","productType": "Song","newRelease": true,"productPrice": 3.50},{"productId": "008","productName": "Cant touch this (MC Hammer)","productType": "Song","newRelease": true,"productPrice": 1.50},{"productId": "009","productName": "Spirit Got Lost (Mental as Anything)","productType": "Song","newRelease": true,"productPrice": 0.99},{"productId": "010","productName": "Only Happy when it Rains (Garbage)","productType": "Song","newRelease": true,"productPrice": 0.99}, {"productId": "011","productName": "Bangarang (Skrillex)","productType": "Song","newRelease": true,"productPrice": 2.50},{"productId": "012","productName": "BSplinter (Savant)","productType": "Song","newRelease":true,"productPrice": 3.00}]}';


    console.log("loadJson() - 2.json uploaded");
    //set up data into array
    records = JSON.parse(data);

    //create menus from array
    for(i = 0; i < records.products.length; i++){
        //for movies
        if(records.products[i].productType == "Movie"){
            //html name
            x = '<a class="tooltip" href=# id="' + records.products[i].productId + '">' + records.products[i].productName + ' <span class="tooltiptext">Click to see more info</span> </a>';
            //get the right menu using its id
            var c = document.getElementById("movie");
            //create <li>
            var li = document.createElement("li");
            c.appendChild(li);
            li.innerHTML = x;
            console.log("loadJson() - 3.movie items done");
        }

        else if(records.products[i].productType == "Song"){
            //html name
            x = '<a class="tooltip" href=# id="' + records.products[i].productId + '">' + records.products[i].productName + ' <span class="tooltiptext">Click to see more info</span> </a>';
            //get the right menu using its id
            var c = document.getElementById("song");
            //create <li>
            var li = document.createElement("li");
            c.appendChild(li);
            li.innerHTML = x;
            console.log("loadJson() - 4.music items done");
        }
    }

}

function mySelectedLink(e) {

    //display the record of the menu item clicked
console.log("mySelectedLink() - 1. Start");
    var y = e.srcElement.id;
    if(document.activeElement.tagName != "BUTTON") {
        selectedItem = y;

        //remove leading 0s
        selectedItem = removeZeros(selectedItem);
        quoteItem = selectedItem;
console.log("mySelectedLink() - 2. Zeros removed");

        //set up HTML string & add button | id - 1 = index
        var myItem = "ID #: " + records.products[selectedItem-1].productId + "<br>"; myItem += "Name: " + records.products[selectedItem-1].productName + "<br>"; myItem += "Type: " + records.products[selectedItem-1].productType + "<br>"; myItem += "New release: " + records.products[selectedItem-1].newRelease + "<br><br>"; myItem += "<b>PRICE: " + records.products[selectedItem-1].productPrice + "</b><br><br>";

        document.getElementById("products").innerHTML = myItem;
console.log("mySelectedLink() - 3. HTML displayed");

        }
    }

function createQuote(e) {
    console.log("createQuote - 1. Start");
     
    if(document.activeElement.tagName == "BUTTON") {
        console.log("createQuote - 2. First if");
        var myButton = e.srcElement.id;

        if(myButton == "addToQuote") {
            console.log("createQuote - 3. 2nd if");
            quoteRecord.id = records.products[quoteItem - 1].productId;


            //save record for quote
            quote.push(quoteRecord.id)
            document.getElementById("quoteContent").innerHTML = quoteString(quote);
            console.log("createQuote - 4. Item added to quoteRecord");
        }
        if(myButton =="submit"){
            quoteString(quote);

        }

        if(myButton == "resetQuote"){
            resetQuote(quote);
        }
     }
    console.log("createQuote - 5. Done");
}

function resetQuote(q) {
    console.log("resetQuote - 1. Start");

    q.length = 0;
    console.log("resetQuote - 2. List emptied");

    total=0;
    console.log("resetQuote - 3. total reset")

    document.getElementById("quoteContent").innerHTML = quoteString(q);
    console.log("resetQuote - 4. Display reset");

}

function quoteString(q) {
    
console.log("quoteString() - 1. Start");
    //loop through all items from the shop
 console.log(q);   
    var s = "Here is your quote: </br></br>";
    for (i = 0;i <q.length; i++) {
        var n = removeZeros(q[i]);
        s += "Product ID: " + records.products[n].productId + "</br>";
        s += "Product Name: " + records.products[n].productName + "</br>";
        s += "Product Type: " + records.products[n].productType + "</br>";
        s += "Product Price: " + records.products[n].productPrice + "</br></br>";
        total += records.products[n].productPrice;
        console.log("quoteString() - 2. Loop done");
    }
    //addition of all prices
    s += "TOTAL: $" + total;

    return s;
    // confirm(s);
    console.log("quoteString() - 3. Total Done");
}



function removeZeros(n) {
    console.log("removeZeros() - 1. Start");
    return n.replace(/^0+/, '');
    console.log("removeZeros() - 2. Done");
}

function setupTips(id, msg) {
    let newID = id + "tip";

    document.getElementById(newID).innerHTML = msg;
    document.getElementById(newID).style.visibility = "hidden"
    }

window.onload = function() {
    'use strict';
console.log("window.onload - 1. Start");
        
        // load items
        loadJson();
console.log("window.onload - 2. loadJson done");
        
        // get id from link clicked
        document.addEventListener("click", mySelectedLink);
console.log("window.onload - 3. Event mySelectedLink");
        
        document.addEventListener("click", createQuote);
console.log("window.onload - 4. Event listener createQuote");

//     document.addEventListener("click", resetQuote);
// console.log("window.onload - 5. Event listener resetQuote");

}