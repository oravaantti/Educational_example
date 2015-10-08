/*Ready function is called when DOM is ready*/
$(function() {
    console.log("We are ready");
    /*
     1. We need to make an ajax (http) request to our mongo database
     2. We need to generate UI dynamically from response data
     To use HTTP api start mongod with: mongod.exe --rest --jsonp
    */
    
    $.ajax({
      url: "http://localhost:28017/person/friends/",
      method: "GET",
      dataType: "jsonp",
      jsonp: "jsonp",
      beforeSend: function() { console.log("START"); },
      //success: function(data,text) { console.log(data); console.log(text); },
      //error: function(XHR,text,error) { console.log(XHR); console.log(text); console.log(error); }
    }).done(function(data) {
        console.log("DONE");
        
        var length = data.rows.length;


        for(var i = 0 ; i < data.rows.length ; i++) {

            var classToSet;

            if(data.rows[i].age < 30) classToSet = "young";
            else if(data.rows[i].age > 50) classToSet = "old";
            else classToSet = "middle-age";

            $("<tr></tr>").appendTo("#dataTable").addClass(classToSet);

            for(var key in data.rows[i]) {
                if(key != "_id")
                $("<td></td>").text(data.rows[i][key]).appendTo("#dataTable>tbody>tr:last-child");
            }
        }
        
        /*
        for(var i = 0 ; i < length ; i++) {
            $("#dataTable").append(
                "<tr><td>" + data.rows[i].name + "</td>" +
                "<td>" + data.rows[i].address + "</td>" +
                "<td>" + data.rows[i].age + "</td></tr>"
            );
        }
        */
        
        
        /*
        $.each(data.rows, function(i, item) {
            var classToAdd;
            
            if(item.age < 21) classToAdd = "young";
            else if(item.age > 50) classToAdd = "old";
            else classToAdd = "middle-age";
            
            var color = "#" + Math.round(item.age * 256 / 100).toString(16) + (256 - Math.round(item.age * 256 / 100)).toString(16) + "00";
            
            var $tr = $("<tr class='" + classToAdd + "'>").append(
            //var $tr = $("<tr style='background-color:" + color + "'>").append(
            $("<td>").text(item.name),
            $("<td>").text(item.address),
            $("<td>").text(item.age)
            ).appendTo("#dataTable");
        });
        */
    });
});

/*

$(document).ready(ready_yeah);

function ready_yeah() {

}

*/

/*
Browser api for DOM ready event
window.onload = function(event) {
    console.log(event);
    
    var temp = document.getElementById("my_title");
    temp.innerHTML = "Changed from JS";
    
    my_title.innerHTML = "Just the same";
}
*/