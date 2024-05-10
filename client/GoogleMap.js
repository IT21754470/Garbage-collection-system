import { LoadScript, GoogleMap } from '@react-google-maps/api';

const MyComponent = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Ensure this is defined

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '400px' }}
        center={{ lat: 37.7749, lng: -122.4194 }}
        zoom={12}
      >
        {/* Map content */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MyComponent;
