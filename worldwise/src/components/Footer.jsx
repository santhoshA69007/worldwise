import styles from "./SideBar.module.css";


function Footer() {
    return (
        <div>
            <p>List of cities</p>


<footer className={styles.footer}>

<p className={styles.copyright}>&copy; Copyright {new Date().getFullYear} WorldWise Inc.</p>

</footer>

        </div>
    )
}

export default Footer
