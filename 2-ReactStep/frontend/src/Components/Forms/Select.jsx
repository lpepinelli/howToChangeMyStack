import React from 'react';

const Select = ({value, onChange, error, label, required, data, ...props}) => {
  return <>
    {label && <label>{label} {required && <span className="text-danger">*</span>}</label>}
    <select value={value} onChange={onChange} className={'form-control '+(error && 'invalido')}>
        <option disabled value="0">Selecione</option>
        {data && data.map((val) => {
            return <option key={val.id} value={val.id}>{val.name}</option>;
        })}
    </select>
    {error && <div className="text-danger">{error}</div>}
  </>
};

export default Select;
