import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './components/Products'; 
import ProductsCreate from './components/Products/Create'; 
import ProductsEdit from './components/Products/Edit'; 

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="products" element={<Products />} />
            <Route path="products/create" element={<ProductsCreate />} />
            <Route path="products/edit/:id" element={<ProductsEdit />} />
        </Routes>
      </Router>      
    </div>
  );
}

export default App;
