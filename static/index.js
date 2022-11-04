//url of the ISS coordinates
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

//function to wait
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




let map;
//initializing the map
function initMap() {
  //applying the style of the map
  stylers = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ec3b9"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1a3646"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#64779e"
        }
      ]
    },
    {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#4b6878"
        }
      ]
    },
    {
      "featureType": "landscape.man_made",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#334e87"
        }
      ]
    },
    {
      "featureType": "landscape.natural",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6f9ba5"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3C7680"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#304a7d"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2c6675"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#255763"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#b0d5ce"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#023e58"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#98a5be"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1d2c4d"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#283d6a"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3a4762"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#0e1626"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#4e6d70"
        }
      ]
    }
  ]
  ISSmap = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.7484, lng: -73.9857 },
    zoom: 2,
    minZoom: 2,
    styles:stylers
  });

  //make a custom icon
  const icon = {
    url : "/static/pictures/iss_icon.png",
    anchor: new google.maps.Point(40, 40),
  }

  //function to update the coordinates of the ISS
  async function getISS() {
    const response = await fetch(api_url);
    const data = await response.json();
    const { latitude, longitude } = data;
    var latlng = new google.maps.LatLng(latitude, longitude);
    var view = new google.maps.LatLng(0, longitude);
    issMarker.setPosition(latlng);
    issMarker.setVisible(true);
    ISSmap.setCenter(view);
    const zoom = ISSmap.zoom;
    if (zoom == 2) {
      var view = new google.maps.LatLng(0, longitude);
      ISSmap.setCenter(view);
    }
    else if (zoom > 2) {
      var view = new google.maps.LatLng(latitude, longitude);
      ISSmap.setCenter(view);
    }
  }
  getISS();
  //update the position of the ISS icon every three seconds
  setInterval(getISS, 3000);
  

  //make a new marker with the custom icon
  const issMarker = new google.maps.Marker({
     position : { lat: 40.7484, lng: -73.9857 },
     map: ISSmap,
     icon: icon,
     visible: false,
  });

  //making some useless coordinates to create a polyline not visible, which will then be visible and going through calculated coordinates
  const uselesscoord = [
    { lat: 37.772, lng: -122.214 }
  ];
  //creation of the polyline
  const ISSpath = new google.maps.Polyline({
    path: uselesscoord,
    geodesic: true,
    strokeColor: "#FFFF00",
    strokeOpacity: 1.0,
    strokeWeight: 2,
    visible: false, 
  });
  ISSpath.setMap(ISSmap);

  //get the data of the past 45 minutes and 45 next minutes
    async function getData() {
      const response2 = await fetch(api_url);
      const data2 = await response2.json();
      const time = data2["timestamp"];
      console.log(time);
      
      //creating an empy array that will then be used to store dicts of sets of coordinates
      const coordinates = [];
      const ISScoordinates = [];
       // going from t minus 45 mins then going 90 mins ahead
       for (let i = 0; i < 18; i++){
         const api_url1 = 'https://api.wheretheiss.at/v1/satellites/25544/positions?timestamps='
         const ts1 = time - 2700 + 30 + i*300;
         const ts2 = time - 2700 + 60 + i*300;
         const ts3 = time - 2700 + 90 + i*300;
         const ts4 = time - 2700 + 120 + i*300;
         const ts5 = time - 2700 + 150 + i*300;
         const ts6 = time - 2700 + 180 + i*300;
         const ts7 = time - 2700 + 210 + i*300;
         const ts8 = time - 2700 + 240 + i*300;
         const ts9 = time - 2700 + 270 + i*300;
         const ts10 = time - 2700 + 300 + i*300;
         //console.log(ts1, ts2, ts3, ts4, ts5, ts6, ts7, ts8, ts9, ts10);
         const api_url2 = '&units=kilometers';
         const api_url_final = api_url1 + ts1 + ',' + ts2 + ',' + ts3 + ',' + ts4 + ',' + ts5 + ',' + ts6 + ',' + ts7 + ',' + ts8 + ',' + ts9 + ',' + ts10 + api_url2;
         //request the final url
         const response_final = await fetch(api_url_final);
         const data_final = await response_final.json();
         for (let i = 0; i < data_final.length; i++){
          coordinates[i] = { lat: data_final[i]["latitude"], lng: data_final[i]["longitude"]};
          ISScoordinates.push(coordinates[i])
         }
        }
        console.log(ISScoordinates);
       //make the initial path visible and make it go through the coordinates obtained
       ISSpath.setPath(ISScoordinates);
       ISSpath.setVisible(true);
     }
  getData();
  //update the path every two minutes
  setInterval(getData, 200000);

  
}
