import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const Container = styled('div')({
  padding: '20px',
});

const TravelTime = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [apiKey] = useState('AIzaSyBcYR05-2mAHVR2SE4Se8saryGiqDe9plc');
  const [durationByCar, setDurationByCar] = useState(null);
  const [durationByTransit, setDurationByTransit] = useState(null);
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const handleOriginChange = (event, value) => {
    setOrigin(value);
  };

  const handleDestinationChange = (event, value) => {
    setDestination(value);
  };

  const fetchSuggestions = (searchTerm, isOrigin) => {
    const placesAutocompleteUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchTerm}&key=${apiKey}`;

    axios
      .get(placesAutocompleteUrl)
      .then((response) => {
        if (isOrigin) {
          setOriginSuggestions(response.data.predictions);
        } else {
          setDestinationSuggestions(response.data.predictions);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (origin && destination) {
      const directionsUrlByCar = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=driving&key=${apiKey}`;

      const directionsUrlByTransit = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=transit&key=${apiKey}`;

      axios
        .all([
          axios.get(directionsUrlByCar),
          axios.get(directionsUrlByTransit)
        ])
        .then((responses) => {
          const carRoute = responses[0].data.routes[0].legs[0].duration.text;
          const transitRoute = responses[1].data.routes[0].legs[0].duration.text;

          setDurationByCar(carRoute);
          setDurationByTransit(transitRoute);
        })
        .catch((error) => {
          console.error(error);
          setDurationByCar(null);
          setDurationByTransit(null);
        });
    }
  }, [origin, destination, apiKey]);

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Autocomplete
            id="origin"
            options={originSuggestions.map((suggestion) => suggestion.description)}
            renderInput={(params) => <TextField {...params} label="Lokalizacja A" />}
            onInputChange={(event, value) => fetchSuggestions(value, true)}
            onChange={handleOriginChange}
            value={origin}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id="destination"
            options={destinationSuggestions.map((suggestion) => suggestion.description)}
            renderInput={(params) => <TextField {...params} label="Lokalizacja B" />}
            onInputChange={(event, value) => fetchSuggestions(value, false)}
            onChange={handleDestinationChange}
            value={destination}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h6">Czas podróży samochodem: {durationByCar}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">Czas podróży komunikacją miejską: {durationByTransit}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TravelTime;
