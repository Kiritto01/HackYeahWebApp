import logo from './logo.svg';
import './App.css';
import TravelTime from './Distance';
import googleMapsApiKey from './config';


function App() {
  return (
    <div>
      <h1>Przewidywany czas podróży</h1>
      <TravelTime/>
    </div>
  );
}

export default App;
