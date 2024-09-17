import React from 'react';
import { TrafficLightProvider } from './context/TrafficLightContext';
import TrafficLight from './components/TrafficLight';
import PedestrianButton from './components/PedestrianButton';
import EmergencyOverride from './components/EmergencyOverride';

const App = () => {
  return (
    <TrafficLightProvider>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
        <h1>Traffic Light Simulator</h1>
        <TrafficLight />
        <div style={{ marginTop: '20px' }}>
          <PedestrianButton />
          <EmergencyOverride />
        </div>
      </div>
    </TrafficLightProvider>
  );
};

export default App;