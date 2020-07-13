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
					var phoneIcon = $('<img>').attr('src','https://img.icons8.com/android/24/000000/phone.png');
					var beerIcon = $('<img>').attr('src','https://img.icons8.com/pastel-glyph/64/000000/beer.png');
					var starIcon = $('<img>').attr('src','https://img.icons8.com/ios-glyphs/30/000000/star.png');
					var rating = $('<td>').html(starIcon).append(response.businesses[i].rating);
					var phone = $('<td>').html(phoneIcon).append(response.businesses[i].phone);
					$('#top').append(row);
					row.html(beerIcon).append(name);
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
					for (var j = 0; j < latLong.length; j++) {
						var pinName = response.businesses[j].name.toString();
						var marker = new google.maps.Marker({
							position: { lat: latLong[j].lat, lng: latLong[j].lng },
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
