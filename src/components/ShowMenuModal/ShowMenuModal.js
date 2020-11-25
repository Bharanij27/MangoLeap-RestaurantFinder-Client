import React from 'react';

const ShowMenuModal = ({ dishDetails, handleChange, show, setShowModal, saveMenu }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    
    return(
        <>
        <div className={showHideClassName}>
        <section className="modal-main container p-5">
            <div className="form-group justify-content">
                <input type="text" className="form-control justify-center" value={dishDetails.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Dish Name" required/>
            </div>
            <div className="form-group justify-content">
                <input type="text" className="form-control justify-center" value={dishDetails.price} onChange={(e) => handleChange('price', e.target.value)} placeholder="Price" required/>
            </div>
            <button className="btn btn-secondary ml-3" onClick={() => setShowModal(false)}>Close</button>
            <button className="btn btn-primary" onClick={saveMenu}>Save</button>
      </section>
      </div>
      </>
    )
}

export default ShowMenuModal;