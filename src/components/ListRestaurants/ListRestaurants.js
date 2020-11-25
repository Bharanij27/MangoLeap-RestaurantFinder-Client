import React, { useEffect, useState } from 'react';
import Restaurant from '../Restaurant/Restaurant';
import './ListRestaurants.css';

const ListRestaurant = ({ allRestaurants = [], city }) => {
    const [pageNum, setPageNum] = useState(1);
    const totalPage = Math.round(allRestaurants.length / 2) || 1;
    let originalNum = (pageNum - 1) * 2 ;
    const [restaurantToShow, setRestaurantToShow] = useState(allRestaurants.slice(originalNum , originalNum + 2))
    
    useEffect(() => {
        let originalNum = (pageNum - 1) * 2;
        setRestaurantToShow(allRestaurants.slice(originalNum, originalNum + 2))
    }, [pageNum])
    return (
        <div className="container">
            <div className="pagination mt-3">
                    <button className="btn btn-dark mr-3" type="button" disabled={pageNum <= 1} onClick={() => setPageNum(pageNum - 1)}>Prev</button>
                    <div className="show m-1">{pageNum} / {totalPage}</div>
                    <button className="btn btn-dark ml-3" type="button" disabled={pageNum * 2 >= allRestaurants.length} onClick={() => setPageNum(pageNum + 1)}>Next</button>
            </div>
            <div className="restaurants-data p-5 mt-3">
            <div className="text-center mb-4">
                <h3>Restaurant in {city}</h3>
            </div>
                {restaurantToShow.length !== 0 ? restaurantToShow.map(restaurant => {
                    return <Restaurant key={restaurant._id} restaurant={restaurant}/>
                }) : 
                <div className="text-center">No Data Avaialable</div>}
            </div>
        </div>
    )
}

export default ListRestaurant;