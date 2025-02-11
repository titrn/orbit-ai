import React, { useState } from 'react';
import { runSimulation } from '../../api/simulation';
import axios from 'axios';

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

  // Run simulation
  // const handleRunSimulation = async () => {
  //   setLoading(true);
  //   try {
  //     console.log('Clicked Run Simulation...');
  //     const response = await runSimulation(params);
  //     setResult(response); // Set result correctly
  //   } catch (error) {
  //     console.error('SimulationForm error:', error);
  //   }
  //   setLoading(false);
  // };
  const handleRunSimulation = async () => {
    try {
      const response = await axios.post('http://localhost:8000/simulate', {
        mass: 1,
        thrust: 10,
        angle: 45,
      });

      console.log('Raw API response:', response.data);

      // Extracting relevant data
      const { time, trajectory } = response.data.data;

      // Transform into an array of objects
      const formattedResult = time.map((t: number, index: number) => ({
        time: t,
        altitude: trajectory[0][index], // Assuming trajectory[0] is altitude
        velocity: trajectory[2][index], // Assuming trajectory[2] is velocity
      }));

      console.log('Formatted Simulation Result:', formattedResult);

      setSimulationResult(formattedResult);
    } catch (error) {
      console.error('Error running simulation:', error);
    };
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
        </div>
      ) : (
        <p>No simulation data available.</p>
      )}
    </div>
  );
};

export default SimulationForm;
