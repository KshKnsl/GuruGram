import React from 'react'
import styles from "./Header.module.css"
import { Link } from 'react-router-dom'
import Logo_img from '../../assets/Logo.gif'
function Header() {
    return (
        <>
            <div className={styles.navbar}>
                <ul>
                    <img src={Logo_img} alt="LOGO" style={{ width: '120px', height: '80px' }} />
                    <li><Link to=''>Home</Link></li>
                    <li><Link to='About'>About</Link></li>
                    <li><Link to='Contact'>Contact</Link></li>
                    <li><Link to='call'>Call</Link></li>
                    <li><Link to='profile'>Profile</Link></li>
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
