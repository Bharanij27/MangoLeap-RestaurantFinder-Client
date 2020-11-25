import React from 'react';

const MenuTable = ({ menu = [] }) => {
    return (
        <div>
            <p className="address-title">Menu</p>
            <table className="table table-striped text-center">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Item </th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
            {
                menu.map(menuItem =>{
                return(
                    <tr key={menuItem.name}>
                        <td>{menuItem.name}</td>
                        <td>{menuItem.price}</td>
                    </tr>
                )})
            }
                </tbody>                    
            </table>
        </div>
    )
}

export default MenuTable;