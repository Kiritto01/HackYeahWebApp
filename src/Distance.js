import React, { useState } from "react";
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

function DistanceCalculator() {
  const [pointA, setPointA] = useState({ lat: null, lng: null, address: "" });
  const [pointB, setPointB] = useState({ lat: null, lng: null, address: "" });
  const apiKey = "AIzaSyBcYR05-2mAHVR2SE4Se8saryGiqDe9plc";

  const handleSelectPointA = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setPointA({ lat, lng, address });
      })
      .catch((error) => console.error("Error in geocoding request: " + error));
  };

  const handleSelectPointB = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setPointB({ lat, lng, address });
      })
      .catch((error) => console.error("Error in geocoding request: " + error));
  };

  const calculateDistance = () => {
    if (!pointA.lat || !pointB.lat) {
      console.error("Both addresses must be valid to calculate distance.");
      return;
    }

    const rad = (x) => {
      return (x * Math.PI) / 180;
    };

    const R = 6378137; // Earth's mean radius in meters
    const dLat = rad(pointB.lat - pointA.lat);
    const dLong = rad(pointB.lng - pointA.lng);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(pointA.lat)) *
        Math.cos(rad(pointB.lat)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in meters

    console.log(`Distance between A and B: ${distance} meters`);
  };

  return (
    <div>
      <PlacesAutocomplete
        value={pointA.address}
        onChange={(address) => setPointA({ ...pointA, address })}
        onSelect={handleSelectPointA}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Enter Point A Address",
              })}
            />
            <div>
              {suggestions.map((suggestion) => (
                <div {...getSuggestionItemProps(suggestion)}>
                  {suggestion.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <PlacesAutocomplete
        value={pointB.address}
        onChange={(address) => setPointB({ ...pointB, address })}
        onSelect={handleSelectPointB}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Enter Point B Address",
              })}
            />
            <div>
              {suggestions.map((suggestion) => (
                <div {...getSuggestionItemProps(suggestion)}>
                  {suggestion.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
      <button onClick={calculateDistance}>Calculate Distance</button>
    </div>
  );
}

export default DistanceCalculator;
