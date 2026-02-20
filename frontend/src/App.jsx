import React from 'react'
import AllRoutes from './components/AllRoutes/AllRoutes';
import { ToastProvider } from './components/User/Common/Toast';

const App = () => {
  return (
    <ToastProvider>
      <AllRoutes />
    </ToastProvider>
  )
}

export default App;