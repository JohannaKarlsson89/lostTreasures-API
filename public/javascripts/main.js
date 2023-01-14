"use strict";

var baseURL = "http://localhost:3000/products";

//När sidan laddas så körs funktion för att läsa ut kurser
document.addEventListener("DOMContentLoaded", function () {
    //url till vilket anropet görs
    let url = baseURL;
    //get-anrop 
    fetch(url, { method: 'GET' })
        .then(response => response.text())
        .then(data => {
            var jsonData = JSON.parse(data);

            var s = "<table><th>Kurs-namn</th>";
            //loop för att läsa ut kurser
            for (var i = 0; i < jsonData.length; i++) {
                s += "<tr><td>" + jsonData[i].productName + "";
                               }
            s += "</table>";
            document.getElementById("result").innerHTML = s;
        })
        .catch(error => {
            alert('there was an error ' + error);
        });
});