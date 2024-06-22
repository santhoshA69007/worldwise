import { useEffect, useState } from "react";

import Button from "./Button";
import styles from "./Form.module.css";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import {useUrlPosition} from "../hooks/useUrlPosition.js"
import {convertToEmoji} from "./utils.js"; 
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext.jsx";



  








const BASE_URL="https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

function Form() {
  const [cityName, setCityName] = useState("");  

  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [country,setCountry] = useState();
  const {createCity}=useCities();
  const [lat,lng]=useUrlPosition();
  const [isLoadingGeocoding,setIsLoadingGeocoding] = useState(false)
  const [emoji,setEmoji]=useState("")
  const [geoCodingError,setGeoCodingError] = useState()
console.log(date);

useEffect(
  function (){

    if(lat&&lng)return;
    async function fetchCityData(){

    try{
         setIsLoadingGeocoding(  true)
         const res=await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
         const data=await res.json();
         console.log("this from from data da !!!!!!!!!!!!!!!!!!!!"+data);
         setCityName(data.city || data.locality || " ")
         setCountry(data.countryName)
         
         setEmoji(convertToEmoji(data.countryCode))
         console.log(data.city);
         

         if(!data.countryCode)throw new Error("Thats not a country select somewhere else !🤔")

    }
    catch(err){
      setGeoCodingError(err)
    }

    finally{
      setIsLoadingGeocoding(false);
  }
}

fetchCityData();

},[lat,lng]);


if(isLoadingGeocoding){
  return <Spinner/>
}
if(geoCodingError){
  return <Message message={geoCodingError}/>
}

if(!lat&&!lng)return <Message message="Start by Clicking on the map"/>

function handleSubmit(e) {
  e.preventDefault();
  if(!cityName || !date){

    const newCity={
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {lat,lng}
    };
    console.log(newCity);
    
    createCity(newCity)

  }

  
}

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
      {/* <input
        id="date"
          // Ensure proper input type for date
        onChange={(e) => setDate(e.target.value)}
        value={date}
      /> */}
      <DatePicker id="date" onChange={date=>setDate(date)} selected={date} dateFormat="dd/MM/yyyy"/>
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
