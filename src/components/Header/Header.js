import React from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { getUser, setUser } from '../../common/user';
import './Header.css';

const Header = () => {

    const [cookies, setCookie, removeCookie] = useCookies(["resUser"]);
    const history = useHistory();
    const userType = getUser();

    const logout = () =>{
        cookies && removeCookie("resUser", null, { path: "/" });
        setUser(null)
        history.push("/");
    }

    const addRestaurant = () => {
        history.push('/add')
    }
    
    return(
        <nav className="navbar navbar-expand-md sticky-top navr-bar p-2 top">
        <a href="/selectCity" className="nav-item nav-link f-left">
            <h5>Restaurant Finder</h5>
        </a>
        <div className=" f-right">
            { userType === 'Admin' && <button className="btn btn-success mr-2" onClick={addRestaurant}>Add Restaurant</button> }
            <button className="btn btn-dark" onClick={logout}>Logout</button>
        </div>
    </nav>
    )
}

export default Header;