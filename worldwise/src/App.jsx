import { BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import { Suspense, lazy } from "react";

import City from "./components/City.jsx";
import CityList from "./components/CityList.jsx";
import CountriesList from "./components/CountryList.jsx";
import Form from "./components/Form.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import { AuthProvider } from "./contexts/FakeAuthContext.jsx";
import Protected from "./pages/Protected.jsx";

const Product= lazy(()=>import("./pages/Product.jsx"));
const Pricing =lazy(()=>import ("./pages/Pricing.jsx"));
const Homepage =lazy(()=>import( "./pages/Homepage.jsx"))
const PageNotFound =lazy(()=>import( "./pages/PageNotFound.jsx"));
const AppLayout =lazy(()=>import ("./pages/AppLayout.jsx"));
const Login=lazy(()=>import("./pages/Login.jsx"));



function App() {
  
 
  return (
    




  <AuthProvider>

    <CitiesProvider>

    <BrowserRouter>
<Suspense fallback={<SpinnerFullPage/>}>

    <Routes>
           
           <Route path="product" element={<Product/>} />
           <Route path="pricing" element={<Pricing/>} />
           <Route index element={<Homepage/>} />
           <Route path="*" element={<PageNotFound/>} />



           <Route path="app" element={
          <Protected>

           <AppLayout/>

         </Protected>

           } >

             
             <Route path="cities/:id" element={<City/>}/>
             <Route index element={<Navigate replace to="cities" />} />
             <Route path="cities" element={<CityList/>} />
             <Route path="form" element={<Form/>}/>
             <Route path="countries" element={<CountriesList/>}/>

           </Route>


         

           <Route path="login" element={<Login/>} />

        



    </Routes>
      
</Suspense>
    </BrowserRouter>
    </CitiesProvider>

  </AuthProvider>
 
  )
}


export default App
