
export const getActualDate = () => {

    const date = new Date();
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const checkRenewDate = (date) => {
    const todayDate = new Date();

    const expirationDate = new Date(date);

    const checkDate = new Date(date);
    checkDate.setDate(checkDate.getDate() - 5);
    
    return todayDate >= checkDate && todayDate <= expirationDate;
}

export const newRenewDate = (date) => {
    const dateObjetive = new Date(date);
    dateObjetive.setFullYear(dateObjetive.getFullYear() + 1);

    const year = dateObjetive.getFullYear();
    const month = String(dateObjetive.getMonth() + 1).padStart(2, '0');
    const day = String(dateObjetive.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}