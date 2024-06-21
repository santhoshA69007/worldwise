import { useEffect, useState } from "react";

import Button from "./Button";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import {useUrlPosition} from "../hooks/useUrlPosition.js"
import {convertToEmoji} from "../hooks/util"; 


  








const BASE_URL="https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

function Form() {
  const [cityName, setCityName] = useState("");   
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [country,setCountry] = useState();
  const [lat,lng]=useUrlPosition();
  const navigate=useNavigate();
  const [isLoadingGeocoding,setIsLoadingGeocoding] = useState(false)
  const [emoji,setEmoji]=useState("")

console.log(date);

useEffect(
  function (){

  async function fetchCityData(){

    try{
         setIsLoadingGeocoding(true)
         const res=await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
         const data=await res.json();
         console.log(data);
         setCityName(data.city || data.locality || " ")
         setCountry(data.countryName)
         setDate(date)
         setEmoji(convertToEmoji(data.countryCode))

    }
    catch(err){
      console.log(err);
    }

    finally{
      setIsLoadingGeocoding(false);
  }
}

fetchCityData();

},[lat,lng,date]);

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          type="date" // Ensure proper input type for date
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />

      </div>

      <div className={styles.buttons}>
      
        <Button type="primary" > Add</Button>


       <BackButton/>


      </div>

    </form>
  );
}

export default Form;
