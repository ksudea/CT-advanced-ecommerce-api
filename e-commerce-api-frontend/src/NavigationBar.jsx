import { NavLink } from "react-router-dom";

function NavigationBar() {
    return (
        <nav className="clearfix">
            <NavLink to='/' activeclassname="active">Home</NavLink>
            <NavLink to='/customers' activeclassname="active">Customer List</NavLink>
            <NavLink to='/add-customer' activeclassname="active">Register New Customer</NavLink>
            <NavLink to='/products' activeclassname="active">Product List</NavLink>
            <NavLink to='/add-product' activeclassname="active">Add New Product</NavLink>
        </nav>
    )
}

export default NavigationBar;