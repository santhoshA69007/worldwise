import CountryItem from './CountryItem';
import styles from './CountryList.module.css'
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import Message from "./Message";
import { useCities } from '../contexts/CitiesContext';


function CountryList() {
  const {cities,isLoading}=useCities();

    if (isLoading) return <Spinner/>;
    
    if(!cities.length) return  <Message message="Add you first city by clicking on the app"/>
 
 
 
  const countries=cities.reduce((arr,city)=>{  
  if(!arr.map(el=>el.country).includes(city.country))
    return[...arr,{country:city.country,emoji:city.emoji} ]
  
  else return arr;
},[])

    return (
        <ul className={styles.CountriesList}>

           {countries.map(country=><CountryItem country={country} key={country.id}/>)}
 
            
        </ul>
    )
}

CountryList.propTypes = {
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


  
export default CountryList
