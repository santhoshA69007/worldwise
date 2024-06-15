import CityItem from './CityItem';
import styles from './CityList.module.css'
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import Message from "./Message";


function CityList({cities,isLoading}) {

    if (isLoading) return <Spinner/>;
    
    if(!cities.length) return  <Message message="Add you first city by clicking on the app"/>

    return (
        <ul className={styles.cityList}>

           {cities.map(city=><CityItem city={city} key={city.id}/>)}

            
        </ul>
    )
}

CityList.propTypes = {
    cities: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      cityName: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      emoji: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      notes: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired
    })).isRequired,
    isLoading: PropTypes.bool.isRequired
  };
export default CityList
