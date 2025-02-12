import React, { useState } from 'react';
import { runSimulation } from '../../api/simulation';
import axios from 'axios';
import LineChartComponent from './LineChartComponent';

const SimulationForm: React.FC = () => {
  // State management
  const [params, setParams] = useState({ mass: 1, thrust: 10, angle: 45 });
  const [simulationResult, setSimulationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ ...params, [e.target.name]: parseFloat(e.target.value) });
  };

  // Reset inputs
  const handleReset = () => {
    setParams({ mass: 1, thrust: 10, angle: 45 });
  };

  // Handles Simulation Results
  // const handleSimulation = async () => {
  //   const response = await fetch('http://localhost:8000/simulate', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ mass: 1, thrust: 10, angle: 45 }),
  //   });

  //   const data = await response.json();
  //   if (data.status === 'success') {
  //     setSimulationResult(data.data); // ✅ Save the simulation data
  //   }
  // };

  const handleRunSimulation = async () => {
  setLoading(true); // Indicate loading
  try {
    const response = await axios.post('http://localhost:8000/simulate', params);
    
    console.log("Raw API Response:", response.data);

    const { time, trajectory } = response.data.data;

    const formattedResult = time.map((t: number, index: number) => ({
      time: t,
      altitude: trajectory[0][index],
      velocity: trajectory[2][index],
    }));

    console.log("Formatted Data for Chart:", formattedResult);

    setSimulationResult(formattedResult);
  } catch (error) {
    console.error("Error running simulation:", error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <h2>Run Flight Simulation</h2>
      <label>
        Mass (kg): <input type='number' name='mass' value={params.mass} onChange={handleChange} />
      </label>
      <label>
        Thrust (N): <input type='number' name='thrust' value={params.thrust} onChange={handleChange} />
      </label>
      <label>
        Angle (°): <input type='number' name='angle' value={params.angle} onChange={handleChange} />
      </label>

      <button onClick={handleRunSimulation} disabled={loading}>
        {loading ? 'Running...' : 'Run Simulation'}
      </button>
      <button onClick={handleReset}>Reset</button>

      {Array.isArray(simulationResult) && simulationResult.length > 0 ? (
        <div>
          <h3>Simulation Results:</h3>
          <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Time (s)</th>
                <th>Altitude (m)</th>
                <th>Velocity (m/s)</th>
              </tr>
            </thead>
            <tbody>
              {simulationResult.map((data, index) => (
                <tr key={index}>
                  <td>{data.time.toFixed(4)}</td>
                  <td>{data.altitude.toFixed(4)}</td>
                  <td>{data.velocity.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <LineChartComponent data={simulationResult} />
        </div>
      ) : (
        <p>No simulation data available.</p>
      )}
    </div>
  );
};

export default SimulationForm;
