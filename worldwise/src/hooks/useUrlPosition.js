import { useSearchParams } from "react-router-dom";



export function useUrlPosition() {
    
       const [serachParams] =useSearchParams();
       const lat=serachParams.get('lat')
       const lng=serachParams.get('lng')
       console.log(lat,lng)

    return[lat,lng];
}

