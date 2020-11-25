import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import callAPI from '../../common/callAPI';
import { getUser } from '../../common/user';
import CuisineList from '../CuisineList/CuisineList';
import MenuList from '../MenuList/MenuList';
import './Add.css'

const resState = {
    'Chennai' : 'TamilNadu',
    'Mumbai' : 'Maharastra',
    'NewDelhi' : 'Delhi',
    'Bangalore' : 'Kolkata',
}

const Add = () => {
    let formData = {
        name : '',
        street : '',
        locality : '',
        city : 'Chennai',
        state : resState['Chennai'],
        cuisine : [],
        menu : []
    }
    const userType = getUser();
    const [cookies] = useCookies(["resUser"]);
    const history = useHistory();
    const [data, setData] = useState(formData);
    const [cuisineList, setCuisineList] = useState([]);

    useEffect(()=>{
        if(!cookies || !cookies.resUser || !cookies.resUser.token) history.push('/');
        else if(!userType || userType === 'User') history.push('/selectCity');
    }, []);

    const setValue = (id, value) => {
        id === 'city' ? 
            setData({...data, 'city':value, 'state' : resState[value] }) 
            :setData({...data, [id] : value});
    }

    const submitData = (e) => {
        e.preventDefault();
        if(data.cuisine.length === 0 ){
            alert('Add cuisine available... Enter $ to add typed cuisine');
            return;
        }
        if(data.menu.length === 0){
            alert('Add some items to menu');
            return;
        }
        const addRestaurant = async () => {
            let response = await callAPI('https://restaurantfinder-server.herokuapp.com/restaurants/add', {
                token : cookies.resUser.token, newRestaurtant : data
            }, 'PUT')
            if(response.status === 200){
                setData(formData)
                // history.push('/selectCity')
            }
        }
        
        addRestaurant();
    }    

    useEffect(()=>{
        setCuisineList(cuisineList.map(cuisineType => {
            return <span key={cuisineType} className="cuisineType ml-2">{cuisineType}</span>
        }));
    }, [data.cuisine])

    return(
        <div className="content-container container mt-5">
            <div className="m-5">
                <div className="content-header mb-3">
                    Add Your Restaurant
                </div>
                <form onSubmit={submitData}>
                    <div className="form-group">
                        <label htmlFor="restaurant-name">Email address</label>
                        <input type="text" className="form-control" id="restaurant-name" value={data.name} onChange={(e) => setValue('name', e.target.value)} placeholder="Restaurant Name" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" className="form-control mb-2" value={data.street} placeholder="Street" onChange={(e) => setValue('street', e.target.value)} required/>
                        <input type="text" className="form-control mb-2" value={data.locality} placeholder="Locality" onChange={(e) => setValue('locality', e.target.value)} required/>
                        <select className="form-control mb-2" onChange={(e) => setValue('city', e.target.value)}>
                            <option value="Chennai">Chennai</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="NewDelhi">NewDelhi</option>
                            <option value="Bangalore">Bangalore</option>
                        </select>
                    </div>
                    <CuisineList data={data} setData={setData}/>
                    <MenuList data={data} setData={setData}/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Add;