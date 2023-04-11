import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProductList from './components/ViewProduct/ProductList';
import AddProducts from './components/AddProduct/AddProducts';
import NotFound from './components/res/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/add-product" element={<AddProducts />} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  );
}

export default App;
