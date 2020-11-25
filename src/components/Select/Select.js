import React from "react";

const Select = ({ setValue, options = [] }) => {
    return (
        <div className="input-group mb-3">
            <select className="custom-select b-20" id="inputGroupSelect01" onChange={(e) => setValue('type', e.target.value)}>
            {
                options.map(option => <option  key={option} value={option}>{option}</option>)
            }
            </select>
        </div>
  );
};

export default Select;
