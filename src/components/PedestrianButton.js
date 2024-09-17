import React from 'react';
import { motion } from 'framer-motion';
import { useTrafficLight } from '../context/TrafficLightContext';
import { buttonStyles } from '../styles/styles';

const PedestrianButton = () => {
  const { state, dispatch } = useTrafficLight();

  const handleClick = () => {
    if (!state.pedestrianRequest) {
      dispatch({ type: 'REQUEST_CROSSING' });
    }
  };

  return (
    <motion.button
      style={buttonStyles.button}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      animate={{
        backgroundColor: state.pedestrianRequest ? '#4CAF50' : '#2196F3',
      }}
    >
      {state.pedestrianRequest ? 'Waiting to Cross' : 'Request Crossing'}
    </motion.button>
  );
};

export default PedestrianButton;