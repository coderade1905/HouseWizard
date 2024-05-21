function getCoordinates() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function getLocation() {
  try {
    const position = await getCoordinates();
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    return {longitude: longitude, latitude : latitude};
  } catch (error) {
    return false;
  }
}

export default getLocation;