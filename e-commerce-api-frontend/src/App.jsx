import { Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './HomePage'
import NotFound from './NotFound'
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import ProductDetail from './ProductDetail';
import CustomerList from './CustomerList';
import CustomerDetail from './CustomerDetails';
import CustomerForm from './CustomerForm';
import OrderForm from './OrderForm';
import NavigationBar from './NavigationBar';
function App() {
  return (
    <div className='app-container'>
      <NavigationBar />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='*' element={<NotFound />} />
      <Route path='/add-product' element={<ProductForm />} />
      <Route path='/edit-product/:id' element={<ProductForm />} />
      <Route path='/products' element={<ProductList />} />
      <Route path='/products/:id' element={<ProductDetail />} />
      <Route path='/customers' element={<CustomerList />} />
      <Route path='/customer-details/:id' element={<CustomerDetail />} />
      <Route path='/add-customer' element={<CustomerForm />}/>
      <Route path='/edit-customer/:id' element={<CustomerForm />}/>
      <Route path='/add-order/:id' element={<OrderForm />}/>
    </Routes>
    </div>
  )
}

export default App
