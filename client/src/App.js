import {Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Pagenotfound from './pages/Pagenotfound';
import { Toaster } from 'react-hot-toast';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';

function App() {
  return (
     <>
     <Toaster/>
     <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/orders" element={<OrderPage/>}/>
      <Route path="*" element={<Pagenotfound/>} />
     </Routes>
       
     </>
    
  );
}

export default App;
