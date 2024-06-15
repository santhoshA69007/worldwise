import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./Form.module.css";

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1); // This will navigate back
  };

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


        <Button onClick={handleBack} type="back">
          &larr; Back
        </Button>


      </div>

    </form>
  );
}

export default Form;
