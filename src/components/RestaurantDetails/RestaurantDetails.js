import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory, useLocation } from 'react-router-dom';
import callAPI from '../../common/callAPI';
import { getID } from '../../common/helperFunctions';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import MenuTable from '../MenuTable/MenuTable';
import './RestaurantDetails.css';

const RestaurantDetails = () => {

    const history = useHistory();
    const [cookies] = useCookies(["resUser"]);
    const location =useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const[restaurantInfo, setRestaurantInfo] = useState({});
 
    useEffect(()=>{
        let restaurantId = getID(location.pathname);
        if(!cookies || !cookies.resUser || !cookies.resUser.token) history.push('/')
        else if(!restaurantId || restaurantId === 'restaurant') history.push('/selectCity')
        
        const getRestaurantDetail = async () => {
            let response = await callAPI(`http://localhost:3030/restaurants/${restaurantId}`, {
                token : cookies.resUser.token,
                restaurantId 
            }, 'POST')
            if(response.status === 200) setRestaurantInfo(response.restaurantDetail);
            setIsLoading(false);
        }
        
        setIsLoading(true)
        getRestaurantDetail();
    }, [])


    return(
        <>
        {
            isLoading ? <Loading/> :        
            <>
                <Header/>          
                <div className="container mt-5">
                    <div className="restaurants-data p-5 mt-3">
                        <span className="text-center">
                            <h2> {restaurantInfo.name} </h2>
                        </span>
                        {restaurantInfo.address && 
                            <div className="address">
                                <p className="address-title"> Address </p>
                                <p> {restaurantInfo.address.street} </p>
                                <p> {restaurantInfo.address.locality} </p>
                                <p> 
                                    {restaurantInfo.address.city}, 
                                    {restaurantInfo.address.state},
                                    {restaurantInfo.address.country} 
                                </p>
                            </div>
                        }
                        {
                            restaurantInfo.cuisine && restaurantInfo.cuisine.length && 
                            <div>
                                <p className="address-title">Cuisine</p>
                                {
                                    restaurantInfo.cuisine.map(cuisineType => {
                                        return <span key={cuisineType} className="cuisineType ml-2">{cuisineType}</span>
                                    })
                                }
                            </div>
                        }
                        {
                            restaurantInfo.menu && restaurantInfo.menu.length && 
                                <MenuTable menu={restaurantInfo.menu}/>
                        }
                    </div>
                </div>
            </>
        }
        </>
    )
}

export default RestaurantDetails;