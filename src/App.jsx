import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import DataProvider from "./context/DataProvider"

function App() {

  return (
    <>
      <DataProvider>
        <Header/>
        <div>
          <Outlet/>
        </div>
        <Footer/>
      </DataProvider>
    </>
  )
}

export default App
