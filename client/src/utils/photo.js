

export const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
})

export const changeFileName = (fileName, newBaseName) => {
    const lastDotIndex = fileName.lastIndexOf('.');
    const extension = fileName.substring(lastDotIndex);
    
    const newFileName = newBaseName + extension;
  
    return newFileName;
  }