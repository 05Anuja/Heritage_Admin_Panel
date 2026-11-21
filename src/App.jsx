import React from 'react'
import { Toaster } from 'react-hot-toast'
import AppContent from './AppContent'

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <AppContent />
    </>
  )
}

export default App