import React, { createContext, useContext, useReducer, useEffect } from 'react';

const TrafficLightContext = createContext();

const initialState = {
  currentLight: 'red',
  pedestrianRequest: false,
  countdown: 7,
  emergency: false,
  pedestrianCrossingTime: 0,
};

const getLightDuration = (light) => {
  switch (light) {
    case 'green': return 10;
    case 'yellow': return 3;
    case 'red': return 7;
    default: return 0;
  }
};

const getNextLight = (currentLight) => {
  switch (currentLight) {
    case 'green': return 'yellow';
    case 'yellow': return 'red';
    case 'red': return 'green';
    default: return 'red';
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_LIGHT':
      return { ...state, currentLight: action.payload, countdown: getLightDuration(action.payload) };
    case 'REQUEST_CROSSING':
      return { ...state, pedestrianRequest: true };
    case 'RESET_TIMER':
      return { ...state, countdown: getLightDuration(state.currentLight) };
    case 'DECREMENT_TIMER':
      return { ...state, countdown: state.countdown - 1 };
    case 'EMERGENCY_OVERRIDE':
      return { ...state, emergency: action.payload, currentLight: 'red', countdown: 0 };
    case 'SET_PEDESTRIAN_CROSSING_TIME':
      return { ...state, pedestrianCrossingTime: action.payload };
    default:
      return state;
  }
};

export const TrafficLightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let timer;
    if (state.countdown > 0 && !state.emergency) {
      timer = setTimeout(() => {
        dispatch({ type: 'DECREMENT_TIMER' });
      }, 1000);
    } else if (state.countdown === 0 && !state.emergency) {
      if (state.currentLight === 'red' && state.pedestrianRequest) {
        dispatch({ type: 'SET_PEDESTRIAN_CROSSING_TIME', payload: 5 });
      } else if (state.pedestrianCrossingTime > 0) {
        dispatch({ type: 'SET_PEDESTRIAN_CROSSING_TIME', payload: state.pedestrianCrossingTime - 1 });
      } else {
        const nextLight = getNextLight(state.currentLight);
        dispatch({ type: 'CHANGE_LIGHT', payload: nextLight });
        if (nextLight === 'green') {
          dispatch({ type: 'REQUEST_CROSSING', payload: false });
        }
      }
    }
    return () => clearTimeout(timer);
  }, [state.countdown, state.currentLight, state.pedestrianRequest, state.emergency, state.pedestrianCrossingTime]);

  return (
    <TrafficLightContext.Provider value={{ state, dispatch }}>
      {children}
    </TrafficLightContext.Provider>
  );
};

export const useTrafficLight = () => {
  const context = useContext(TrafficLightContext);
  if (!context) {
    throw new Error('useTrafficLight must be used within a TrafficLightProvider');
  }
  return context;
};