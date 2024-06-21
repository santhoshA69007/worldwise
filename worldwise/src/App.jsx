import { BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/Homepage.jsx"
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import City from "./components/City.jsx";
import CityList from "./components/CityList.jsx";
import CountriesList from "./components/CountryList.jsx";
import Form from "./components/Form.jsx";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";




function App() {
  
  
  return (
    <CitiesProvider>

    <BrowserRouter>

    <Routes>
           <Route path="product" element={<Product/>} />
           <Route path="pricing" element={<Pricing/>} />
           <Route index element={<Homepage/>} />
           <Route path="*" element={<PageNotFound/>} />

           <Route path="app" element={<AppLayout/>} >

             
             <Route path="cities/:id" element={<City/>}/>
             <Route index element={<Navigate replace to="cities" />} />
             <Route path="cities" element={<CityList/>} />
             <Route path="form" element={<Form/>}/>
             <Route path="countries" element={<CountriesList/>}/>

           </Route>


           <Route path="login" element={<Login/>} />


    </Routes>
      
    </BrowserRouter>
    </CitiesProvider>
  )
}


export default App
