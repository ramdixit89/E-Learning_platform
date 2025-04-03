import React from 'react'
import Header from '../Screens/Header'
import Footer from '../Screens/Footer'

const Layout = ({ children }) => {
  return ( 
    <div>
        <Header/>
        {
            children
        }
        <Footer/>
    </div>
  )
}

export default Layout;