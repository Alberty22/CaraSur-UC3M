export const requestData = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return;
  }

}

export const deleteData = async (url) => {
  try {
    const res = await fetch(url, {
      method: 'DELETE',
    })

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    
    const result = await res.json();
    return {code:result.success, result:result.message};
  } 
  catch (error) {
    console.error('Error during DELETE request:', error);
    return {code:false, result:error};
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

    const result = await res.json();
    return {code:result.success, result:result.message};

  } catch (error) {
    console.error('Error sending data:', error);
    return {code:false, result:error};
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
      return { code: result.success, result: result.message };

  } catch (error) {
      console.error('Error updating data:', error);
      return { code: false, result: error.message || error };
  }
}
