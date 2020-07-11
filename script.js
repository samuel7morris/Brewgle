$(document).ready(function() {
	//Onclick to get value of input and store in variable
	$('#submit-button').on('click', function() {
		event.preventDefault();
		var latLong = [];
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
					var row = $('<tr>');
					var name = $('<td>').text(response.businesses[i].name);
					var rating = $('<td>').text('Stars: ' + response.businesses[i].rating);
					var phone = $('<td>').text('Phone: ' + response.businesses[i].phone);
					$('#top').append(row);
					row.append(name);
					name.append(phone);
					phone.append(rating);
					var latitude = response.businesses[i].coordinates.latitude;
					var longitude = response.businesses[i].coordinates.longitude;
					var pinName = response.businesses[i].name.toString();
					coordinates = { lat: latitude, lng: longitude };
					latLong.push(coordinates);
					map = new google.maps.Map(document.getElementById('map'), {
						center: coordinates,
						zoom: 12
					});
					//Loop through the array of responses and create a marker for each using their geographic location and displaying the name
					for (var i = 0; i < latLong.length; i++) {
						var marker = new google.maps.Marker({
							position: { lat: latLong[i].lat, lng: latLong[i].lng },
							map: map,
							center: coordinates,
							title: pinName
						});
					}
					marker.setMap(map);
				}
			});
		}
		//Google Maps API
		//Andrew's Key: AIzaSyB-advEZHzPU9oDy_THa6VyYKawF7ndVtQ
		searchYelp();
	});
});
var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: -34.397, lng: 150.644 },
		zoom: 10
	});
}
