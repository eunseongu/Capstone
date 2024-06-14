import { useState, useEffect, useRef } from "react"
import './../styles/Map.css';
import markerImg from './../img/3d-map.png';
import { useTranslation } from "react-i18next";


const Mapcustom = ({ value, language, markerLocation, zoom }) => {
  const [map, setMap] = useState(null);
  const ref = useRef();
  const { t, i18n } = useTranslation();
console.log('lan',language);
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
        let contentString =  `<h4>${t("Map.marker")}</h4>`;
        if (markerLocation.lat === 37.5388428 && markerLocation.lng === 127.0555061) {
          contentString = `<h4><a href="https://map.naver.com/p/search/%EA%B0%80%EB%82%98%EC%B4%88%EC%BD%9C%EB%A6%BF%ED%95%98%EC%9A%B0%EC%8A%A4/place/1917155862?isCorrectAnswer=true&c=15.00,0,0,0,dh" target="_blank">
          가나초콜릿하우스</a><br><br>${t("Map.naverlocation1")}<br>${t("Map.naverlocation2")}</h4>`;
      }
      // 가나초콜릿
      
      if (markerLocation.lat === 37.5460472 && markerLocation.lng === 127.0492498) {
          contentString = `<h4><a href="https://map.naver.com/p/search/%EC%98%A4%EC%A7%80%EC%83%81%20%EC%84%B1%EC%88%98/place/1051537771?c=15.00,0,0,0,dh&isCorrectAnswer=true" target="_blank">
          오지상 성수</a><br><br>${t("Map.naverlocation1")}<br>${t("Map.naverlocation2")}</h4>`;
      }
      // 오지상 성수
      
      if (markerLocation.lat === 37.5463552 && markerLocation.lng === 127.0470476) {
          contentString = `<h4><a href="https://map.naver.com/p/entry/place/1937156788?c=15.00,0,0,0,dh" target="_blank">
          헤이든 성수점</a><br><br>${t("Map.naverlocation1")}<br>${t("Map.naverlocation2")}</h4>`;
      }
      
        //헤이든 성수점       
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