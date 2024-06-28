import CountryItem from './CountryItem';
import styles from './CountryList.module.css'
import Spinner from './Spinner'

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




  
export default CountryList
