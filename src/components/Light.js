import React from 'react';
import { motion } from 'framer-motion';
import { lightStyles } from '../styles/styles';

const Light = ({ color, active, countdown }) => (
  <motion.div
    style={lightStyles.light}
    animate={{
      backgroundColor: active ? color : '#555',
      boxShadow: active ? `0 0 20px ${color}` : 'none',
    }}
  >
    {active && <div style={lightStyles.countdown}>{countdown}</div>}
  </motion.div>
);

export default Light;