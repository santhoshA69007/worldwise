import { createContext,useEffect, useContext, useReducer, useCallback } from "react"




const BASE_URL = "http://localhost:8000";

const CitiesContext=createContext();

// eslint-disable-next-line react/prop-types
const intialState={

    isLoading:false,
    cities:[],
    currentCity:{},
    error:""

}

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("Unknown action type");
  }
}



// eslint-disable-next-line react/prop-types
function CitiesProvider({children}) {


  const [{isLoading,cities,currentCity},dispatch]=useReducer(reducer,intialState)


  useEffect(function(){
    async function fetchCities(){
      dispatch({type:"loading"})
      try{
       
        const res=await fetch(`${BASE_URL}/cities`)
        const data= await res.json();
        dispatch({type:"cities/loaded",payload:data})
        console.log(data);
    }
    catch (error) {
      dispatch({type:"rejected",payload:"There is an error when fetching the data!"});
    } 

  

    }
    fetchCities()
  },[])



async function createCity(newCity){
  dispatch({type:"loading"})
      try{
        
        const res=await fetch(`${BASE_URL}/cities`,
          {
          method:"POST",
          body:JSON.stringify(newCity),
          headers:{"Content-Type": "application/json",

          },
        })
        const data= await res.json();
        
        dispatch({type:"cities/created",payload:data})
        
    }
    catch (error) {
      
      dispatch({type:"rejected",payload:"There is an error when fetching the data!"});
    } 

 

  }


const getCity=useCallback(async function getCity(id){

  if(Number(id)===currentCity.id)return
  dispatch({type:"loading"})
    try{
      
        const res=await fetch(`${BASE_URL}/cities/${id}`)
        const data= await res.json();
        dispatch({type:"city/loaded",payload:data})
        console.log(data);
    }
    catch (error) {
      dispatch({type:"rejected",payload:"There is an error when getCity the data!"});
    } 

   
    

    },[currentCity.id])


    async function deleteCity(id){
      dispatch({type:"cities/loading"})
      try{
       

        // eslint-disable-next-line no-unused-vars
        const res =await fetch(`${BASE_URL}/cities/${id}`,{
          method:"DELETE"
          },
        );

        dispatch({type:"deleted",payload:id})
    }

    catch (error) {
      dispatch({type:"rejected",payload:"There is an error when deletingCity the data!"});
    } 

    

  }


    return <CitiesContext.Provider value={
        {
            cities,
            isLoading,
            currentCity,
            getCity,
            createCity,
            deleteCity,
        }
    }>
    {children}


    </CitiesContext.Provider>
}



function useCities(){
    const context=useContext(CitiesContext);
    if(context===undefined)throw new Error("citiesCOntext used outside the provider")
        
    return context
}


export {CitiesProvider,useCities}
