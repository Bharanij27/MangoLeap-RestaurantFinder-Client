import React, { useState } from 'react';
import './CuisineList.css'

const CuisineList = ({ data, setData }) => {
    const [cuisine, setCuisine] = useState('');

    const handleCuisine = (e) =>{
        if(e.keyCode  === 52 && cuisine.trim().length){
            let allCuisine = data.cuisine;
            setData({...data, cuisine : [...new Set([...allCuisine, cuisine.substring(0, cuisine.length - 1)])]});
            setCuisine('')
        }
    }

    const deleteItem = (deleteCuisine) => {
        let allCuisine = data.cuisine.filter(cuisineName => cuisineName !== deleteCuisine);
        setData({...data, cuisine : [...allCuisine]}) 
    }

    return(
        <div className="form-group">
            <label htmlFor="restaurant-name">Cuisine</label>
            <div className="cuisine-list">
            {
                data.cuisine.map((cuisineType, index) => {
                        return <span key={cuisineType + index} className="cuisineType in-flex ml-2">
                        <span className="close" onClick={() => deleteItem(cuisineType)}>x</span>
                        {cuisineType}
                        </span>
                    })
            }
            </div>
            <input 
                type="text" className="form-control" id="restaurant-name" 
                onKeyUp={(e) => handleCuisine(e)}  value={cuisine} 
                onChange={(e) => setCuisine(e.target.value)} 
                placeholder="Enter $ to add cuisine" required={data.cuisine.length === 0}
            />
        </div>
    )
}

export default CuisineList;