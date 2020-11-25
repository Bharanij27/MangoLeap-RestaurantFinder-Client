import React, { useState } from 'react';
import ShowMenuModal from '../ShowMenuModal/ShowMenuModal';
import './MenuList.css'; 

const MenuList = ({ data, setData }) => {
    const [showModal, setShowModal] = useState(false);
    const [dishDetails, setDishDetails] = useState({name : '', price : ''});
    
    const handleChange = (id, value) => setDishDetails({...dishDetails, [id] : value})

    const saveMenu = () => {
        if(dishDetails.name && dishDetails.price){
            let menus = data.menu
            let dataExists = menus.filter(menu => menu.name === dishDetails.name).length
            if(!dataExists){
                setData({...data, menu : [...menus, dishDetails]})
                setDishDetails({name : '', price : ''})
            }
            setShowModal(false)
        }
    }

    const deleteItem = (item) => {
        let menus = data.menu.filter(menuItem => menuItem.name !== item.name)
        setData({...data, menu : menus});
    }

    return (
        <div className="form-group">
            <label htmlFor="Menu">Menu</label>
            <div className="cuisine-list">
            {
                data.menu.map((menuItem, index) => {
                        return (
                            <span key={menuItem + index} className="cuisineType in-flex ml-2">
                            <span className="close" onClick={() => deleteItem(menuItem)}>x</span>
                                {menuItem.name} - {menuItem.price}
                            </span>
                        )
                    })
            }
            </div>
            <p className="add-menu-btn" onClick={() => setShowModal(!showModal)}>
                <span className="circle plus"></span>
                Add Dishes
            </p>
                { showModal && <ShowMenuModal saveMenu={saveMenu} show={showModal} dishDetails={dishDetails} setShowModal={setShowModal} handleChange={handleChange}/> }
        </div>
    )
}

export default MenuList;