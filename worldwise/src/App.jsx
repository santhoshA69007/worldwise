import { BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/Homepage.jsx"
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import City from "./components/City.jsx";
import CityList from "./components/CityList.jsx";
import { useEffect, useState } from "react"; // Import the 'useState' function from the 'react' package
import CountriesList from "./components/CountryList.jsx";
import Form from "./components/Form.jsx";



const BASE_URL = "http://localhost:8000";

function App() {
  const [cities,setCities]=useState([])
  const [isLoading,setIsLoading]=useState(false)


  useEffect(function(){
    async function fetchCities(){
      try{
        setIsLoading(true);
        const res=await fetch(`${BASE_URL}/cities`)
        const data= await res.json();
        setCities(data)
        console.log(data);
    }
    catch (error) {
      console.error("Error fetching data:", error);
      alert("There is an error when fetching the data!");
    } 

    finally{
      setIsLoading(false);
    }
    

    }

    fetchCities()
  },[])
  
  return (
    <BrowserRouter>

    <Routes>
           <Route path="product" element={<Product/>} />
           <Route path="pricing" element={<Pricing/>} />
           <Route index element={<Homepage/>} />
           <Route path="*" element={<PageNotFound/>} />

           <Route path="app" element={<AppLayout/>} >

             
            <Route path="cities/:id" element={<City/>}/>
             <Route index element={<Navigate replace to="cities" />} />
             <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
             <Route path="form" element={<Form/>}/>
             <Route path="countries" element={<CountriesList cities={cities} isLoading={isLoading}/>}/>

           </Route>


           <Route path="login" element={<Login/>} />


    </Routes>
      
    </BrowserRouter>
  )
}


export default App
