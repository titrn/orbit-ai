import React from 'react';
import SimulationForm from './components/SimulationForm';
import PathOptimizationForm from './components/PathOptimizationForm';
import './styles.css';
import { Path } from 'three';

const App: React.FC = () => {
  return (
    <div>
      <h1>Aerospace Mission Optimization Simulator</h1>
      <SimulationForm />
      <PathOptimizationForm />
    </div>
  );
};

export default App;
