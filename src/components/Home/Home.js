import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory, useLocation } from 'react-router-dom';
import callAPI from '../../common/callAPI';
import { getID } from '../../common/helperFunctions';
import Header from '../Header/Header';
import ListRestaurants from '../ListRestaurants/ListRestaurants';
import Loading from '../Loading/Loading';

const Home = () => {
    const location =  useLocation();
    const history = useHistory();
    const [cookies] = useCookies(["resUser"]);
    const [allRestaurants, setAllRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const city = getID(location.pathname);

    useEffect(()=>{
        if(!cookies || !cookies.resUser || !cookies.resUser.token) history.push('/')
        else if(!city || city === 'home') history.push('/selectCity')
        
        const getRestaurants = async () => {
            let response = await callAPI('https://restaurantfinder-server.herokuapp.com/restaurants', {
                token : cookies.resUser.token,
                city 
            }, 'POST')
            if(response.status === 200) setAllRestaurants(response.restaurants);
            setIsLoading(false)
        }

        setIsLoading(true)
        getRestaurants();
    }, [])
    
    return (
        <>
        {
            isLoading ? <Loading/> :        
            <>
                <Header/>
                <ListRestaurants allRestaurants={allRestaurants} city={city}/>            
            </>
        }
        </>
    )
}

export default Home;