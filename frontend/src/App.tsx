import React from 'react';
import SimulationForm from './components/SimulationForm';
import './styles.css';

const App: React.FC = () => {
  return (
    <div>
      <h1>Aerospace Mission Optimization Simulator</h1>
      <SimulationForm />
    </div>
  );
};

export default App;
