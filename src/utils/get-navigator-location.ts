export const getNavigatorLocation = async (): Promise<
  { lat: number; lng: number } | undefined
> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (geoPosition: GeolocationPosition) => {
        const position = {
          lat: geoPosition.coords.latitude,
          lng: geoPosition.coords.longitude,
        };
        resolve(position);
      },
      () => {
        reject();
      }
    );
  });
};
