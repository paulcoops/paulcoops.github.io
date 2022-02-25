$(document).ready(function(){


$.ajax({
    url : "https://raw.githubusercontent.com/paulcoops/blender_pro-theme/master/README.md",
    success : function(result){
      document.getElementById('readme').innerHTML = marked(result);
    }
});


  /// IMGUR API

// var album_id = "3X55eiP";
var album_id = "mA7GiKl";
var api_key = "";
var request_url = "https://api.imgur.com/3/album/" + album_id;
function requestAlbum() {
  var req = new XMLHttpRequest();
  
  req.onreadystatechange = function() { 
     if (req.readyState == 4 && req.status == 200) {
       processRequest(req.responseText);
     } else {
       console.log("Error with Imgur Request.");
     }
  }
  req.open("GET", request_url, true); // true for asynchronous     
  req.setRequestHeader("Authorization", "Client-ID 570bdb2e600175c" + api_key);
  req.send(null);
}
function processRequest(response_text) {
  if (response_text == "Not found") {
    console.log("Imgur album not found.");
  } else {
    var json = JSON.parse(response_text);

    for (var i = 0; i < json.data.images_count; i++) {
      $(".fotorama").append('<div class="slide" data-img="' + json.data.images[i].link + '"><div class="overlay"><h1>' + $.trim(json.data.images[i].title) + '</h1><h2>' +  json.data.images[i].description + '</h2></div>');
    }

    var fotoram = $('.fotorama').fotorama();
    console.log(fotoram);

  }
}
requestAlbum();


  });