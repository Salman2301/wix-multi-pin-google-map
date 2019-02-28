	
window.onmessage = (event) => { 
    if (event.data) { 
        let receivedData = event.data; 
        initMap(receivedData);
    } 
};

 function initMap(receivedData) {
    
		var locations = receivedData;

	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 10,
		center: new google.maps.LatLng(-32.849159, 115.923557),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var infowindow = new google.maps.InfoWindow({});

var markerIcon = {
	  url: 'https://i.imgur.com/50GSB8T.png',
	  scaledSize: new google.maps.Size(40, 40),
	  origin: new google.maps.Point(0, 0),
	  anchor: new google.maps.Point(32,65)
};

	var markerLabel = " "

	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			map: map,
			animation: google.maps.Animation.DROP,
			icon: markerIcon,
			position: new google.maps.LatLng(locations[i].lat, locations[i].long),			
			label: {
			    text: markerLabel,
			    fontSize: "16px",
    			fontWeight: "bold"
			  },
			labelAnchor: new google.maps.Point(18, 12),
  			labelClass: "my-custom-class-for-label"

		});

		google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
			return function () {
				window.parent.postMessage("Hover|" + locations[i].info, "*");
			}
		})(marker, i));

		google.maps.event.addListener(marker, 'mouseout', (function (marker, i) {
			return function () {
				window.parent.postMessage("HoverOut|" + locations[i].info, "*");
			}
		})(marker, i));

		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				window.parent.postMessage("Click|" + locations[i].info, "*");
			}
		})(marker, i));
	}
}