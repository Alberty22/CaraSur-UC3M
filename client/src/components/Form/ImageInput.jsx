import { useDropzone } from 'react-dropzone'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

export function ImageInput({ inputKey, placeholder, control, setValue, error, errors }) {
    const [fileName, setFileName] = useState('')

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length === 0) {
            return
        }

        const file = acceptedFiles[0]
        if (file.type.startsWith('image/')) {
            setValue(inputKey, file)
            setFileName(file.name)
        }
    }
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false
    })

    return (
        <>
        <div key={inputKey} className="dropzone" {...getRootProps()} style={{ display: 'flex', flexDirection: 'column', border: '2px dashed #ddd', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>
            <input {...getInputProps()} name={inputKey} style={{ display: 'none' }} />
            <p>{fileName || placeholder}</p>
            
            <Controller
                name={inputKey}
                control={control}
                rules={{ required: error }}
                render={({ field }) => (
                    <>
                        <input type="hidden"{...field}/>
                    </>
                )}
            />
        </div>
        {errors[inputKey] && <p className="errors">{errors[inputKey].message}</p>}
        </>
    )
}
