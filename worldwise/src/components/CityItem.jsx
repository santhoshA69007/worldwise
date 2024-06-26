import PropTypes from 'prop-types';
 // Import the Link component from the appropriate library
 import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import { useCities } from '../contexts/CitiesContext';


const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

function CityItem({city}) {
    const {currentCity,deleteCity}=useCities();

    const {cityName,emoji,date,id,position}=city;
    console.log(currentCity)

function handleDelete(e) {
    
    e.preventDefault();

      deleteCity(id)


    
}




    return (
        <li >
        <Link className={`${styles.cityItem} ${id===currentCity.id ? styles['cityItem--active']:""}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
           <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.name}>{cityName} </h3>
            <time className={styles.date}>{formatDate(date)}</time>
            <button className={styles.deleteBtn} onClick={handleDelete}>&times;</button>
        </Link>
           
        </li>
    )
}

CityItem.propTypes = {
    city: PropTypes.shape({
      id: PropTypes.number.isRequired,
      cityName: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      emoji: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      notes: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired
    }).isRequired
}
  

export default CityItem
