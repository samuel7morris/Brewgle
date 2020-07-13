$(document).ready(function() {
	//Onclick to get value of input and store in variable
	$('#submit-button').on('click', function() {
		event.preventDefault();
		var latLong = [];
		var userInput = $('#user-input').val();

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
				$('#top').empty();
				//Loop through the response of businesses and pull necessary information to display on page
				for (var i = 0; i < response.businesses.length; i++) {
					var row = $('<tr>');
					var name = $('<td>').text(response.businesses[i].name);
					var rating = $('<td>').text('Stars: ' + response.businesses[i].rating);
					var phone = $('<td>').text('Phone: ' + response.businesses[i].phone);
					$('#top').append(row);
					row.append(name);
					name.append(phone);
					phone.append(rating);
					//Take coordinates from response and format data for Google maps
					var latitude = response.businesses[i].coordinates.latitude;
					var longitude = response.businesses[i].coordinates.longitude;
					coordinates = { lat: latitude, lng: longitude };
					latLong.push(coordinates);
					//Initialize a new map onto the page centered on the requested location
					map = new google.maps.Map(document.getElementById('map'), {
						center: coordinates,
						zoom: 12
					});
					//Loop through the array of responses and create a marker for each using their geographic location and displaying the name
					for (var i = 0; i < latLong.length; i++) {
						var pinName = response.businesses[i].name.toString();
						var marker = new google.maps.Marker({
							position: { lat: latLong[i].lat, lng: latLong[i].lng },
							map: map,
							center: coordinates,
							title: pinName
						});
					}
					//Set the markers on the map
					marker.setMap(map);
				}
			});
		}
		//Initiate Yelp search function
		searchYelp();
	});
});
//Initiates the map when page is loaded
var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: 53.349463, lng: -6.274780 },
		zoom: 12
	});
}
//Creates an array of major cities to be used for autocomplete
$( function() {
	var availableTags = ["New York","Denver","Austin","San Francisco","Los Angeles","Miami","London"];
    $( "#user-input" ).autocomplete({
      source: availableTags
    });
  } );
