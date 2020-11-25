import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import './SelectCity.css'

const SelectCity = () => {

    const [cookies] = useCookies(["resUser"]);
    const history = useHistory();
    
    useEffect(()=>{
        if(!cookies || !cookies.resUser || !cookies.resUser.token){
            history.push('/')
        }
    }, [])

    const visitCity = (city) => {
        history.push(`/home/${city}`);
    }

    return(
        <>
            <Header/>
            <div className="city-container mt-5">
                <div className="m-5 mt-0">
                <div className="city-header mb-4">Select City</div>
                <div className="button-container">
                    <button className="city-button" onClick={() => visitCity('Chennai')}>Chennai</button>
                    <button className="city-button" onClick={() => visitCity('Mumbai')}>Mumbai</button>
                    <button className="city-button" onClick={() => visitCity('NewDelhi')}>NewDelhi</button>
                    <button className="city-button" onClick={() => visitCity('Bangalore')}>Bangalore</button>
                </div>
                </div>
            </div>
        </>
    )
}

export default SelectCity;