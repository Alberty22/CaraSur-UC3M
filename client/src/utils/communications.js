export const sendData = async (data, url) => {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.error || 'Error in response');
      }
  
      const result = await res.json()
      console.log('Datos enviados correctamente:', result)
      return {code:result.success, result:result}

    } catch (error) {
      console.error('Error al enviar datos:', error);
      return {code:false, result:error}
    }
}

export const requestData = async (baseUrl, params) => {
  try {
    const url = new URL(baseUrl);
    url.searchParams.append('username', params)
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data
  } catch (error) {
    return
  }

}