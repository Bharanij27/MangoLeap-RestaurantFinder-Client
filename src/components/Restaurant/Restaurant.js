import React from 'react';
import { useHistory } from 'react-router-dom';
import './Restaurant.css';

const Restaurant = ({ restaurant }) => {
    
    const history = useHistory();

    const visitRestaurent = () => {
        history.push(`/restaurant/${restaurant._id}`)
    }

    return (
    <div className="restaurant">
        <span className="res-name link cursor">
            <h4 onClick={visitRestaurent}>{restaurant.name}</h4>
        </span>
        <span className="res-locality">{restaurant.address.locality}</span>
        <p id="cuisine-head">
            Cuisines:
            <span className="res-cuisine">
                {
                    restaurant.cuisine.length && restaurant.cuisine.map(cuisineType => {
                        return <span key={cuisineType} className="cuisineType ml-2">{cuisineType}</span>
                    })
                }
            </span> 
        </p>
    </div>
    )
}

export default Restaurant;