const parseResponse = async (response: Response) => {
  if (response.ok) {
    const responseData = await response.json();
    const { contentType, body } = responseData;

    if (
      contentType === 'application/json' &&
      body &&
      body.data &&
      Array.isArray(body.data)
    ) {
      const jsonString = String.fromCharCode.apply(null, body.data);
      const data = JSON.parse(jsonString);

      return data;
    } else {
      return '';
    }
  } else {
    return '';
  }
};
