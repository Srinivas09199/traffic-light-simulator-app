import React from 'react';
import { motion } from 'framer-motion';
import { useTrafficLight } from '../context/TrafficLightContext';
import { buttonStyles } from '../styles/styles';

const EmergencyOverride = () => {
  const { state, dispatch } = useTrafficLight();

  const handleToggle = () => {
    dispatch({ type: 'EMERGENCY_OVERRIDE', payload: !state.emergency });
  };

  return (
    <motion.button
      style={{...buttonStyles.button, backgroundColor: state.emergency ? '#FF0000' : '#FF9800'}}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggle}
    >
      {state.emergency ? 'Cancel Emergency' : 'Emergency Override'}
    </motion.button>
  );
};

export default EmergencyOverride;