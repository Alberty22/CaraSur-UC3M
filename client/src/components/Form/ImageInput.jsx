import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

export function ImageInput({ inputKey, placeholder, control, setValue}) {

    const [fileName, setFileName] = useState('');

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            if (file.type.startsWith('image/')) {
                setValue('image', file);
                setFileName(file.name);
            } else {
                console.error(`Skipped '${file.type}' because it is not a valid MIME type.`);
            }
        }
    };
      
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
      });

    return (
        <>
        <div key={inputKey} className="dropzone" {...getRootProps()} style={{display:'flex', flexDirection:'column' }}>
            <input {...getInputProps()} name="image" />
            <p>{fileName || placeholder}</p>
        </div>   
        <Controller
        name="image"
        control={control}
        defaultValue={ null }
        render={({ field }) => (
        <input
            type="hidden"
            {...field}
        />
        )}
    />
        </>
        
    )
}