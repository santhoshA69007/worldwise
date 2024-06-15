import { NavLink } from "react-router-dom"
import styles from "./PageNav.module.css"
import Logo from "./Logo";

function Pagenav() {
    return (
        <div className={styles.nav}>
    <Logo/>
        <ul>



     
      <li>

        <NavLink to="/pricing">PRICING</NavLink>
      </li>
      <li>

        <NavLink to="/product">PRODUCTS</NavLink>
      </li>
         <li>

            <NavLink to="/login" className={styles.ctaLink}>LOGIN</NavLink>
         </li>

        </ul>
            
        </div>
    )
}

export default Pagenav
