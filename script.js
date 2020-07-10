<<<<<<< HEAD
$(document).ready(function(){
//Onclick to get value of input and store in variable

$('#submit-button').on('click', function() {
  event.preventDefault();
  var userInput = $('#user-input').val();
  console.log(userInput);
  


var searchTerm = "breweries";
// var searchLocation = "80301";

function searchYelp() {
  $.ajax({
    url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchTerm}&location=${userInput}`,
    method: "GET",
    headers: {
      "Authorization": "Bearer AmvxFoRRCm1gPrumi5fAr7uEGkpOAeDoFKKAjJ_zhHo4uB4-RFb2GLyvQ-CBbVvdi7syTFO5y2WIgTYOqfWdaUp6duFzLRfCGh5-0o6Blh3AQlKgvy-jGqvLui8HX3Yx"
    }
  }).then(function (response) {
    console.log(response);
    $("#top").empty()
    for (var i = 0; i < response.businesses.length; i++){
       var row = $("<tr>")
       var name = $("<td>").text(response.businesses[i].name)
       var rating = $("<td>").text("Stars: " + response.businesses[i].rating)
       var phone = $("<td>").text("Phone: " + response.businesses[i].phone)
       $("#top").append(row)
       row.append(name)
       name.append(phone)
       phone.append(rating)
    }
  });
}
searchYelp()

=======
$(document).ready(function() {
	//Onclick to get value of input and store in variable

	$('#submit-button').on('click', function() {
		event.preventDefault();
		var userInput = $('#user-input').val();
		console.log(userInput);

		var searchTerm = 'breweries';
		// var searchLocation = "80301";

		function searchYelp() {
			$.ajax({
				url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${searchTerm}&location=${userInput}`,
				method: 'GET',
				headers: {
					Authorization:
						'Bearer AmvxFoRRCm1gPrumi5fAr7uEGkpOAeDoFKKAjJ_zhHo4uB4-RFb2GLyvQ-CBbVvdi7syTFO5y2WIgTYOqfWdaUp6duFzLRfCGh5-0o6Blh3AQlKgvy-jGqvLui8HX3Yx'
				}
			}).then(function(response) {
				console.log(response);
				$('#top').empty();
				for (var i = 0; i < response.businesses.length; i++) {
					var name = $('<li>').text(response.businesses[i].name);
					var rating = $('<li>').text(response.businesses[i].rating);
					var phone = $('<li>').text(response.businesses[i].phone);
					$('#top').append(name, phone, rating);
					var lats = response.businesses[i].coordinates.latitude;
					var longs = response.businesses[i].coordinates.longitude;
					var latLong = { lat: lats, lng: longs };
					console.log(latLong);
					//Google Maps API
					//Andrew's Key: AIzaSyB-advEZHzPU9oDy_THa6VyYKawF7ndVtQ
					var map;

					function initMap() {
						map = new google.maps.Map(document.getElementById('map'), {
							center: { lat: lats[0], lng: longs[0] },
							zoom: 8
						});

						var marker = new google.maps.Marker({
							position: latLong,
							map: map,
							title: name
						});
					}
					//End of Google Maps API
				}
				initMap();
			});
		}
		searchYelp();
	});
>>>>>>> master
});
