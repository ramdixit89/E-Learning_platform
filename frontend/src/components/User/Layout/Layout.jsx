import React from 'react'
import Header from '../Screens/Header'
import Footer from '../Screens/Footer'
import Chatbot from '../Chatbot/Chatbot'

const Layout = ({ children }) => {
  return ( 
    <div>
        <Header/>
        {
            children
        }
        <Chatbot/>
        <Footer/>
    </div>
  )
}

export default Layout;