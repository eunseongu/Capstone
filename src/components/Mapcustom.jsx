import { useState, useEffect, useRef } from "react"
import './../styles/Map.css';
import markerImg from './../img/3d-map.png';
import { useTranslation } from "react-i18next";


const Mapcustom = ({ value, language, markerLocation, zoom }) => {
  const [map, setMap] = useState(null);
  const ref = useRef();
  const { t, i18n } = useTranslation();

 const APIKEY='AIzaSyDUzFkPYEmC_-khUwbIA1HjXXhbobh7nZ0';
  useEffect(() => { 
    const loadGoogleMaps = (language) => {
      const existingScript = document.getElementById('googleMapsScript');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.id = 'googleMapsScript';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${APIKEY}&language=${language}&callback=initMap`;
      document.head.appendChild(script);
    };

    const initMap = () => {

      const newMap = new window.google.maps.Map(ref.current, { // 지도가 한 번만 로드되도록
        center: markerLocation,
        zoom: zoom,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
      });

      const markerIcon = new window.google.maps.MarkerImage(markerImg, null, null, null, new window.google.maps.Size(60, 64));
      const marker = new window.google.maps.Marker({
        position: markerLocation,
        icon: markerIcon,
      });

      marker.setMap(newMap);
      if (zoom !== 15) {
        const contentString =  `<h4>${t("Map.marker")}</h4>`;

        const infoWindow = new window.google.maps.InfoWindow({
          content: contentString,
          maxWidth: 600 

        });


        infoWindow.open(map, marker);
      }


    };

    window.initMap = initMap;
    loadGoogleMaps(language);
  }, [language, value, markerLocation]);
  if(zoom===15){
  console.log(zoom);

    return (
    
      <div ref={ref} className="map__nonClick"></div>
    )
  }
  else if(zoom===23){
    return (
    
      <div ref={ref} className="map"></div>
    )
  }
 
}

export default Mapcustom