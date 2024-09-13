import React from 'react'
import styles from "./Header.module.css"
import { Link } from 'react-router-dom'
function Header() {
    return (
        <>
            <div className={styles.navbar}>

                <ul>
                    <img src="" alt="LOGO" />
                    <li><Link to=''>Home</Link></li>
                    <li><Link to='About'>About</Link></li>
                    <li><Link to='Contact'>Contact</Link></li>

                </ul>
                <div className={styles.content}>

                    <button type="button"><span></span>Sign In</button>
                    <button type="button"><span></span>Log In</button>

                </div>

            </div>
        </>
    )
}

export default Header
