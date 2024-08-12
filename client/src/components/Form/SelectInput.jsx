import { useState } from "react";
import { Controller } from "react-hook-form";

import countryList from 'react-select-country-list'

export function SelectInput({inputKey, inputType, placeholder, error, errors, options, optional, control, setValue, className='form'}) {

    const [selectedValue, setSelectedValue] = useState("");

    return (
        <>
        <div key={inputKey} style={{display:'flex', flexDirection:'column' }}>
            <Controller
        name={inputKey}
        control={control}
        defaultValue={selectedValue}
        rules={!optional ? { required: error } : {}}
        render={({ field }) => (
            <>
            <select  {...field} value={selectedValue} 
                        onChange={(event) => {setSelectedValue(event.target.value); setValue(inputKey, event.target.value)}}  
                        style={{color: selectedValue ? className === 'form' ? '#fff' : '#000' : '#989898',}}>
                <option value="" disabled>{placeholder}</option>
                { inputType !== 'country'
                ? options.map((option) =>{
                    return <option key={option.value} value={option.value}>{option.text}</option>
                })
                : countryList().getData().map((country) => {
                    return (
                        <option key={country.value} value={country.label}>{country.label}</option>
                    )
                })
                }
            </select>
            </>
            
        )}
      />
            
        </div>
        {errors[inputKey] && <p className="errors">{errors[inputKey].message}</p>}
        </>
    )
}