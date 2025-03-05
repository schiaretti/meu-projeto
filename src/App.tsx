import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Maps from "./pages/Maps";


function App() {
 

  return (
   
      <BrowserRouter>

    <header className='bg-blue-900 text-center text-white p-4 shadow-md rounded-md '>
      <h1 className='text-2xl font-bold text-center'>Sistema de fretes</h1>
    </header>

      <Routes>
     
        <Route path='/'element={<Login/>}/>
        <Route path="/maps"element={<Maps/>}/>
       
      </Routes>
       
      </BrowserRouter>
     
  ) 
}

export default App
