import { useNavigate} from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer,TileLayer,Marker,Popup, useMap, useMapEvent } from 'react-leaflet';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesContext';
import { useUrlPosition } from '../hooks/useUrlPosition';
import { useGeolocation } from '../hooks/useGeoLocation';

import Button from "./Button"



function Map() {
   // eslint-disable-next-line no-unused-vars
   const [mapPosition,setMapPosition] = useState([40,0])
   const {cities}=useCities();
   const {isLoading:isLoadingPostion,position:geoLocationPositon,getPosition}=useGeolocation();
   const [mapLat,mapLng]=useUrlPosition();
   
   
   useEffect(function(){
    if(mapLat&&mapLng) setMapPosition([mapLat,mapLng])

   },[mapLat,mapLng])
   

useEffect(

function(){
    if(geoLocationPositon) setMapPosition([geoLocationPositon.lat,geoLocationPositon.lng])
  },
[geoLocationPositon]

);



    return (
        <div className={styles.mapContainer}>
           
      {!geoLocationPositon&&<Button type="position" onClick={getPosition}>
      {
        isLoadingPostion?"Loading...":"Use your position"
      }
      </Button>}


     <MapContainer
           center={mapPosition}
           zoom={13} 
           scrollWheelZoom={true}
           className={styles.map}>

        <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {cities.map((city)=>(
                
            <Marker position={[city.position.lat,city.position.lng]} key={city.id}>

              <Popup>

                A pretty CSS3 popup. <br /> Easily customizable.

              </Popup>


            </Marker>
            
            ))
            
            }

        <ChangeCenter position={mapPosition}/>
        <DetectClick/> 
          </MapContainer>
        


        </div>
    )
}



// eslint-disable-next-line react/prop-types
function ChangeCenter({position}){
const map=useMap()
map.setView(position);
return null;
}


function DetectClick() {


    const navigate=useNavigate()

    useMapEvent({
        click:(e)=>{
            console.log(e);
            
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        },
    });
    
}


export default Map
