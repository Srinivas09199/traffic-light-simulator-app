import React from 'react';
import Light from './Light';
import { useTrafficLight } from '../context/TrafficLightContext';
import { trafficLightStyles } from '../styles/styles';

const TrafficLight = () => {
  const { state } = useTrafficLight();

  return (
    <div style={trafficLightStyles.container}>
      <Light color="red" active={state.currentLight === 'red'} countdown={state.currentLight === 'red' ? state.countdown : 0} />
      <Light color="yellow" active={state.currentLight === 'yellow'} countdown={state.currentLight === 'yellow' ? state.countdown : 0} />
      <Light color="green" active={state.currentLight === 'green'} countdown={state.currentLight === 'green' ? state.countdown : 0} />
    </div>
  );
};

export default TrafficLight;