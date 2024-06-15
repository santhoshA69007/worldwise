import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'


function Map() {
   // eslint-disable-next-line no-unused-vars
   const [serachParams,setSearchParams] =useSearchParams();
   const lat=serachParams.get("lat")
   const lng=serachParams.get("lng")

const navigate=useNavigate()
   

    return (
        <div className={styles.mapContainer} onClick={()=>navigate("form")}>
            <h1>{lat} {lng}</h1>
            <button onClick={()=>setSearchParams({lat:23,lng:50})}></button>
        </div>
    )
}

export default Map
