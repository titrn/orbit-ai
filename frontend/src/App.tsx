import React, { useState, useEffect } from 'react';
import FlightTrajectory from './components/FlightTrajectory';
import './styles.css';

const App = () => {
  const [trajectory, setTrajectory] = useState([]);

  // Mock data for trajectory
  useEffect(() => {
    const mockTrajectory = [
      [0, 0, 0],
      [1, 2, 3],
      [2, 4, 6],
      [3, 6, 9],
      [4, 8, 12],
      [5, 10, 15],
    ];
    setTrajectory(mockTrajectory);
  }, []);

  return (
    <div>
      <h1>Aerospace Mission Optimization Simulator</h1>
      <FlightTrajectory trajectory={trajectory} />
    </div>
  );
};

export default App;
