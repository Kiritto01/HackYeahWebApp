import React, { useEffect, useState } from "react";
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FormControlLabel from "@mui/material/FormControlLabel";
import './MainForm.css';
import './Requests.js'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import Card from './Card';

const MainForm = () => {
  const [pointA, setPointA] = useState({ lat: null, lng: null, address: "" });
  const [loading, setLoading] = React.useState(false)
  const [isCards, setIsCards] = React.useState(false)
  const [cards, setCards] = React.useState([]);

  const types = {
    "1": "jednolite magisterskie", 
    "2": "pierwszego stopnia",
    "3": "drugiego stopnia"
  };

  async function postEndpoint(endpoint, postData, toJSON = false) {
    if(toJSON) {postData = JSON.stringify(postData);}
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: postData,
        timeout: 5000
    };
    return await fetchEndpoint(endpoint, options);
  }
  
  async function getEndpoint(endpoint) {
  
    const options = {
        method: 'GET',
        mode: 'cors',
        headers: {'Accept': 'application/json'},
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        timeout: 5000
    };
    return await fetchEndpoint(endpoint, options);
  }
  
  async function fetchEndpoint(endpoint, fetchOptions) {
    endpoint = "http://34.116.145.9:2137/"+endpoint;
    try{
        const response = await fetch(endpoint, fetchOptions);
  
        return {
            body: await response.json(),
            status: response.status
        }
    } catch {
        return {
            body: {message: "unable to connect to server"},
            status: 503
        }
    }
  }

  const theme = createTheme({
    palette: {
      primary: {
        light: '#0061c2',
        main: '#0052A5',
        dark: '#004285',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

  const [type, setType] = React.useState('');
  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const [form, setForm] = React.useState('');
  const handleChangeForm = (event) => {
    setForm(event.target.value);
  };
  const category = React.useRef('');
  const region = React.useRef('');
  const addresRef = React.useRef('');
  var price = 0;

  const priceMarks = [
    {
      value: 0,
      label: '0 zł',
    },
    {
      value: 1000,
      label: '1 000 zł',
    },
    {
      value: 5000,
      label: '5 000 zł',
    },
    {
      value: 10000,
      label: '10 000 zł',
    },
  ];

  function priceText(value) {
    return `${value}zł`;
  }

  const timeMarks = [
    {
      value: 0,
      label: '0 min',
    },
    {
      value: 30,
      label: '30 min',
    },
    {
      value: 60,
      label: '1 h',
    },
    {
      value: 120,
      label: '2 h',
    },
  ];
  
  function timeText(value) {
    return `${value} min`;
  }


  const [address, setAddress] = useState('');

  const handleAddressChange = (event) => {
    console.log(event);
    setAddress(event);
  }

  
  return (
    <form id="browser">
      <ThemeProvider theme={theme}>
        <Autocomplete
          disablePortal
          id="category"
          options={categories}
          sx={{ width: 600 }}
          renderInput={(params) => 
            <TextField {...params}
            inputRef={category}
              label="Interesująca Cię kategoria"
              sx={{
                "& .MuiInputLabel-root": { color: '#0052A5AA'},
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": { borderColor: "#0052A5AA" },
                  '&:hover fieldset': { borderColor: '#0052A5'},
                },
                '.MuiSvgIcon-root ': { fill: "#0052A5 !important"}
              }}
            />
          }
        />


        <div style={{display: 'flex', gap: '20px'}}>
          <FormControl>
            <InputLabel
              id="type-label"
              sx={{
                color: "#0052A5AA"
              }}
            >
              Typ studiów
            </InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={type}
              label="Typ studiów"
              onChange={handleChangeType}
              sx={{
                width: 290,
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#0052A5AA'},
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#0052A5'},
                '.MuiSvgIcon-root ': { fill: "#0052A5 !important"}
              }}
            >
              <MenuItem value={""}><i>-</i></MenuItem>
              <MenuItem value={1}>jednolite magisterskie</MenuItem>
              <MenuItem value={2}>pierwszego stopnia</MenuItem>a
              <MenuItem value={3}>drugiego stopnia</MenuItem>
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel
              id="form-label"
              sx={{
                color: "#0052A5AA"
              }}
            >
              Forma studiów
            </InputLabel>
            <Select
              labelId="form-label"
              id="form"
              value={form}
              label="Forma studiów"
              onChange={handleChangeForm}
              sx={{
                width: 290,
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#0052A5AA'},
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#0052A5'},
                '.MuiSvgIcon-root ': { fill: "#0052A5 !important"}
              }}
            >
              <MenuItem value={""}><i>-</i></MenuItem>
              <MenuItem value={1}>Stacjonarne</MenuItem>
              <MenuItem value={2}>Nie stacjonarne</MenuItem>a
            </Select>
          </FormControl>
        </div>
              
        <Autocomplete
          disablePortal
          id="region"
          options={regions}
          sx={{ width: 600 }}
          renderInput={(params) =>
            <TextField {...params}
              inputRef={region}
              label="Województwo"
              sx={{
                "& .MuiInputLabel-root": { color: '#0052A5AA'},
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": { borderColor: "#0052A5AA" },
                  '&:hover fieldset': { borderColor: '#0052A5'},
                },
                '.MuiSvgIcon-root ': { fill: "#0052A5 !important"}
              }}
            />
          }
        />
        <div>
        <PlacesAutocomplete
          value={address}
          onChange={handleAddressChange}
        > 
      {({ getInputProps, suggestions, getSuggestionItemProps}) => (
        <div className="autocomplete-container">
          <input
            {...getInputProps({
              placeholder: 'Podaj adres zamieszkania',
              className: 'autocomplete-input',
            })}
          />
          <div className="suggestions-container">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.placeId}
                {...getSuggestionItemProps(suggestion)}
                className="suggestion"
              >
                {suggestion.description}
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
    </div>
        <Box sx={{ width: 600 }} style={{display: "flex", padding: "0 40px 0 20px", "box-sizing": "border-box", "margin-top": "20px"}}>
          <span style={{width: "90px", "font-family": "Helvetica"}}>Czesne</span>
          <Slider
            onChange={ (e, val) => {price=val}}
            id="price"
            aria-label="Always visible"
            defaultValue={0}
            getAriaValueText={priceText}
            step={100}
            marks={priceMarks}
            valueLabelDisplay="on"
            max="10000"
            sx={{ width: 450 }}
          />
        </Box>

        <Box sx={{ width: 600 }} style={{display: "flex", padding: "0 40px 0 20px", "box-sizing": "border-box", "margin-top": "20px"}}>
          <span style={{width: "90px", "font-family": "Helvetica"}}>Dojazd</span>
          <Slider
            id="time"
            aria-label="Always visible"
            defaultValue={30}
            getAriaValueText={timeText}
            step={5}
            marks={timeMarks}
            valueLabelDisplay="on"
            max="120"
            sx={{ width: 450 }}
          />
        </Box>
        
        <Button
          variant="contained"
          onClick={async () => {
            setCards(cards => []);
            setIsCards(isCards => false);
            setLoading(true);
            const response = await postEndpoint("course", {
              "wojewodztwo": region.current.value,
              "forma": form.toString(),
              "poziom": type.toString(),
              "kategoria": category.current.value,
              "isAbroad": false,
              "maxPrice": price.toString()
            }, true);
            let res = response.body
            let c = []
            console.log(address)
            for (let key in res) {
              let row = res[key];
              c.push(row);
            }
              c.push(pointA.address);
            
            
            
            
            
            console.log(c)
            setCards(cards => c);
            setIsCards(isCards => true);
            setLoading(false);
          }}
          
        > 
          Dopasuj uczelnie!
        </Button>
      </ThemeProvider>
      {() => {
        if(loading == true) {
          return (
            <div className="loading">Ładowanie</div>
          );
        }
      }}
      {cards.map((card) => {
        return (
          <Card
            name={card.leadingInstitutionName}
            course={card.courseName}
            price={card.amount}
            address={card.address}
            type={types[card.level]}
            logoUrl={"https://aplikacje.edukacja.gov.pl/app/assets/logos/university/"+card.iconId+".png"}
            home={address}
          />
        );
      })}
    </form>
  );
}

const categories = [
  {
      "label": "archeologia",
      "code": "DS010101N"
  },
  {
      "label": "architektura i urbanistyka",
      "code": "DS010201N"
  },
  {
      "label": "astronomia",
      "code": "DS010607N"
  },
  {
      "label": "automatyka, elektronika, elektrotechnika i technologie kosmiczne",
      "code": "DS010213N"
  },
  {
      "label": "biologia medyczna",
      "code": "DS010305N"
  },
  {
      "label": "biotechnologia",
      "code": "DS010608N"
  },
  {
      "label": "ekonomia i finanse",
      "code": "DS010501N"
  },
  {
      "label": "etnologia i antropologia kulturowa",
      "code": "DS010108N"
  },
  {
      "label": "filozofia",
      "code": "DS010102N"
  },
  {
      "label": "geografia społeczno-ekonomiczna i gospodarka przestrzenna",
      "code": "DS010502N"
  },
  {
      "label": "historia",
      "code": "DS010103N"
  },
  {
      "label": "informatyka",
      "code": "DS010601N"
  },
  {
      "label": "informatyka techniczna i telekomunikacja",
      "code": "DS010204N"
  },
  {
      "label": "inżynieria bezpieczeństwa",
      "code": "DS010210N"
  },
  {
      "label": "inżynieria biomedyczna",
      "code": "DS010202N"
  },
  {
      "label": "inżynieria chemiczna",
      "code": "DS010205N"
  },
  {
      "label": "inżynieria lądowa, geodezja i transport",
      "code": "DS010212N"
  },
  {
      "label": "inżynieria materiałowa",
      "code": "DS010207N"
  },
  {
      "label": "inżynieria mechaniczna",
      "code": "DS010208N"
  },
  {
      "label": "inżynieria środowiska, górnictwo i energetyka",
      "code": "DS010209N"
  },
  {
      "label": "językoznawstwo",
      "code": "DS010104N"
  },
  {
      "label": "literaturoznawstwo",
      "code": "DS010105N"
  },
  {
      "label": "matematyka",
      "code": "DS010602N"
  },
  {
      "label": "nauki biblijne",
      "code": "DS010702N"
  },
  {
      "label": "nauki biologiczne",
      "code": "DS010603N"
  },
  {
      "label": "nauki chemiczne",
      "code": "DS010604N"
  },
  {
      "label": "nauki farmaceutyczne",
      "code": "DS010301N"
  },
  {
      "label": "nauki fizyczne",
      "code": "DS010605N"
  },
  {
      "label": "nauki leśne",
      "code": "DS010405N"
  },
  {
      "label": "nauki medyczne",
      "code": "DS010304N"
  },
  {
      "label": "nauki o bezpieczeństwie",
      "code": "DS010503N"
  },
  {
      "label": "nauki o komunikacji społecznej i mediach",
      "code": "DS010504N"
  },
  {
      "label": "nauki o kulturze fizycznej",
      "code": "DS010302N"
  },
  {
      "label": "nauki o kulturze i religii",
      "code": "DS010106N"
  },
  {
      "label": "nauki o polityce i administracji",
      "code": "DS010505N"
  },
  {
      "label": "nauki o rodzinie",
      "code": "DS010901N"
  },
  {
      "label": "nauki o sztuce",
      "code": "DS010107N"
  },
  {
      "label": "nauki o zarządzaniu i jakości",
      "code": "DS010506N"
  },
  {
      "label": "nauki o zdrowiu",
      "code": "DS010303N"
  },
  {
      "label": "nauki o Ziemi i środowisku",
      "code": "DS010606N"
  },
  {
      "label": "nauki prawne",
      "code": "DS010507N"
  },
  {
      "label": "nauki socjologiczne",
      "code": "DS010508N"
  },
  {
      "label": "nauki teologiczne",
      "code": "DS010701N"
  },
  {
      "label": "ochrona dziedzictwa i konserwacja zabytków",
      "code": "DS010211N"
  },
  {
      "label": "pedagogika",
      "code": "DS010509N"
  },
  {
      "label": "polonistyka",
      "code": "DS010109N"
  },
  {
      "label": "prawo kanoniczne",
      "code": "DS010510N"
  },
  {
      "label": "psychologia",
      "code": "DS010511N"
  },
  {
      "label": "rolnictwo i ogrodnictwo",
      "code": "DS010401N"
  },
  {
      "label": "stosunki międzynarodowe",
      "code": "DS010512N"
  },
  {
      "label": "sztuki filmowe i teatralne",
      "code": "DS010801N"
  },
  {
      "label": "sztuki muzyczne",
      "code": "DS010802N"
  },
  {
      "label": "sztuki plastyczne i konserwacja dzieł sztuki",
      "code": "DS010803N"
  },
  {
      "label": "technologia żywności i żywienia",
      "code": "DS010402N"
  },
  {
      "label": "weterynaria",
      "code": "DS011001N"
  },
  {
      "label": "zootechnika i rybactwo",
      "code": "DS010404N"
  }
]

const regions = [
  {label: "dolnośląskie"},
  {label: "kujawsko-pomorskie"},
  {label: "lubelskie"},
  {label: "lubuskie"},
  {label: "łódzkie"},
  {label: "małopolskie"},
  {label: "mazowieckie"},
  {label: "opolskie"},
  {label: "podkarpackie"},
  {label: "podlaskie"},
  {label: "pomorskie"},
  {label: "śląskie"},
  {label: "świętokrzyskie"},
  {label: "warmińsko-mazurskie"},
  {label: "wielkopolskie"},
  {label: "zachodniopomorskie"}
]

export default MainForm;

