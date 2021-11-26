// let map, infoWindow;

//         function getLocation() {

//             let latitude = 24.911236;
//             let longitude = 67.0829177

//             /*
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(showPosition);
//             } else {
//                 x.innerHTML = "Geolocation is not supported by this browser.";
//             }
//             */

//             $('#address-latitude').val(latitude);
//             $('#address-longitude').val(longitude);

//             myMap(latitude, longitude)

//         }

//         function showPosition(position) {
//             return position;
//         }

//         function myMap(latitude, longitude) {

//             var myCenter = new google.maps.LatLng(latitude, longitude);

//             var mapOptions = {
//                 center: myCenter,
//                 zoom: 17,
//                 disableDefaultUI: true,
//                 mapTypeId: google.maps.MapTypeId.ROADMAP
//             };

//             var mapCanvas = document.getElementById("map");
//             var map = new google.maps.Map(mapCanvas, mapOptions);
//             infoWindow = new google.maps.InfoWindow();

//             const locationButton = document.createElement("button");

//             locationButton.textContent = "Current Location";
//             locationButton.classList.add("btn");
//             locationButton.classList.add("btn-primary");
//             locationButton.classList.add("location-button");
//             locationButton.setAttribute('type', 'button');

//             map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(locationButton);

//             locationButton.addEventListener("click", () => {
//                 // Try HTML5 geolocation.
//                 if (navigator.geolocation) {
//                     navigator.geolocation.getCurrentPosition(
//                         (position) => {
//                             const pos = {
//                                 lat: position.coords.latitude,
//                                 lng: position.coords.longitude,
//                             };
//                             var currentPosition = new google.maps.Marker({ position: pos });

//                             map.setCenter(pos);
//                             currentPosition.setMap(map);
//                         },
//                         () => {
//                             alert('Location access is blocked. Please allow location access');
//                             //handleLocationError(true, infoWindow, map.getCenter());
//                         }
//                     );
//                 } else {
//                     // Browser doesn't support Geolocation
//                     handleLocationError(false, infoWindow, map.getCenter());
//                 }
//             });



//             var marker = new google.maps.Marker({ position: myCenter });

//             marker.setMap(map);

//             $(document).ready(function () {
//                 // click on map and set you marker to that position
//                 google.maps.event.addListener(map, 'click', function (event) {
//                     marker.setPosition(event.latLng);
//                     $('#address-longitude').val(event.latLng.lng().toFixed(6));
//                     $('#address-latitude').val(event.latLng.lat().toFixed(6));
//                 });
//             });
//         }        

//     </script>
//     <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAcVMG51SU_xSnFuTV0slIPLxSQCAKt5_E&libraries=geometry"></script>
