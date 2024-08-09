

export function TextInput({inputKey, inputType, placeholder, error, errors, register}) {
    return (
        <>
        <div key={inputKey} style={{display:'flex', flexDirection:'column' }}>
            <input type={inputType} placeholder={placeholder}
            {...register(inputKey, { required: error })}/>
        </div>   
        {errors[inputKey] && <p className="errors">{errors[inputKey].message}</p>}
        </>
    )
}