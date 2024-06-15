
import styles from './Button.module.css'
import PropTypes from 'prop-types'

function Button ({children,onClick,type}) {
    console.log(type)

    return (<button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>

        {children}
       
        </button>
    )
}
Button.propTypes = {
    children: PropTypes.node.isRequired, // children prop should be a valid React node and is required
    onClick: PropTypes.func.isRequired, // onClick prop should be a function and is required
    type: PropTypes.string // type prop should be a string, with a default value of 'button'
};

// Set default props
Button.defaultProps = {
    type: 'button' // default type is 'button'
};


export default Button


