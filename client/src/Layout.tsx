import Header from './components/Header.js'
import Footer from './components/Footer/Footer.js'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Layout