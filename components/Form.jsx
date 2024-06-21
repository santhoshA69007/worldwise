// 




import { useEffect, useState } from "react";
import { convertToEmoji } from "./utils";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";








const BASE_URL="https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

function Form() {
  const [cityName, setCityName] = useState("");   
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [country,setCountry] = useState();
  const [lat,lng]=useUrlPosition();
  const navigate=useNavigate();
  const [isLoadingGeocoding,setIsLoadingGeocoding] = useState(false)



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
    }

    catch(err){
    }

    finally{
      setIsLoadingGeocoding(false);
  }
}

fetchCityData();

},[lat,lng]);



  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
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
        <Button>Add</Button>
        <Button onClick={(e)=>{
          e.preventDefault();
          navigate(-1);
          
        }}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;
