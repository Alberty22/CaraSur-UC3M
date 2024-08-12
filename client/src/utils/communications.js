export const requestData = async (url) => {
  try {
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
      console.log('Data sended correctly:', result)
      return {code:result.success, result:result.message}

    } catch (error) {
      console.error('Error sending data:', error);
      return {code:false, result:error}
    }
}

export const updateData = async (data, url) => {
  try {
      const res = await fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });

      if (!res.ok) {
          const errorResponse = await res.json();
          throw new Error(errorResponse.error || 'Error in response');
      }

      const result = await res.json();
      console.log('Data updated correctly:', result);
      return { code: result.success, result: result.message };

  } catch (error) {
      console.error('Error updating data:', error);
      return { code: false, result: error.message || error };
  }
}
