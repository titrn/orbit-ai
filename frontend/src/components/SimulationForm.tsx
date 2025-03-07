import React, { useState } from 'react';
import axios from 'axios';
import LineChartComponent from './LineChartComponent';

const SimulationForm: React.FC = () => {
  // State management
  const [params, setParams] = useState({
    mass: 1,
    thrust: 10,
    angle: 45,
    drag_coefficient: 0.5,
    area: 1.0,
    air_density: 1.225,
    wind_speed: 0.0,
  });
  const [errors, setErrors] = useState<any>({});
  const [simulationResult, setSimulationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Mock data for testing
  const mockData = [
    { time: 0, altitude: 0, velocity: 0 },
    { time: 1, altitude: 10, velocity: 15 },
    { time: 2, altitude: 20, velocity: 30 },
    { time: 3, altitude: 30, velocity: 45 },
    { time: 4, altitude: 40, velocity: 60 },
    { time: 5, altitude: 50, velocity: 75 },
  ];

  // Handle input changes with validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const floatValue = parseFloat(value);

    // Validate inputs
    let error = '';
    if (isNaN(floatValue) || floatValue < 0) {
      error = 'Value must be a positive number';
    }

    setParams({ ...params, [name]: floatValue });
    setErrors({ ...errors, [name]: error });
  };

  // Reset inputs
  const handleReset = () => {
    setParams({
      mass: 1,
      thrust: 10,
      angle: 45,
      drag_coefficient: 0.5,
      area: 1.0,
      air_density: 1.225,
      wind_speed: 0.0,
    });
    setErrors({});
  };

  // Run simulation
  const handleRunSimulation = async () => {
    console.log('Running simulation with params:', params);

    // Check for errors before running simulation
    const hasErrors = Object.values(errors).some((error) => error !== '');
    if (hasErrors) {
      alert('Please fix the input errors before running the simulation.');
      return;
    }

    setLoading(true); // Indicate loading
    try {
      const response = await axios.post('http://localhost:8000/simulate', params);

      console.log('Raw API Response:', response.data);

      const { time, trajectory } = response.data.data;

      const formattedResult = time.map((t: number, index: number) => ({
        time: t,
        altitude: trajectory[2][index], // Assuming z-axis is altitude
        velocity: trajectory[5][index], // Assuming vz is velocity
      }));

      console.log('Formatted Data for Chart:', formattedResult);

      setSimulationResult(formattedResult);
    } catch (error) {
      console.error('Error running simulation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Run Flight Simulation</h2>
      <label>
        Mass (kg): <input type='number' name='mass' value={params.mass} onChange={handleChange} />
        {errors.mass && <span style={{ color: 'red' }}>{errors.mass}</span>}
      </label>
      <label>
        Thrust (N): <input type='number' name='thrust' value={params.thrust} onChange={handleChange} />
        {errors.thrust && <span style={{ color: 'red' }}>{errors.thrust}</span>}
      </label>
      <label>
        Angle (°): <input type='number' name='angle' value={params.angle} onChange={handleChange} />
        {errors.angle && <span style={{ color: 'red' }}>{errors.angle}</span>}
      </label>
      <label>
        Drag Coefficient:{' '}
        <input type='number' name='drag_coefficient' value={params.drag_coefficient} onChange={handleChange} />
        {errors.drag_coefficient && <span style={{ color: 'red' }}>{errors.drag_coefficient}</span>}
      </label>
      <label>
        Area (m²): <input type='number' name='area' value={params.area} onChange={handleChange} />
        {errors.area && <span style={{ color: 'red' }}>{errors.area}</span>}
      </label>
      <label>
        Air Density (kg/m³):{' '}
        <input type='number' name='air_density' value={params.air_density} onChange={handleChange} />
        {errors.air_density && <span style={{ color: 'red' }}>{errors.air_density}</span>}
      </label>
      <label>
        Wind Speed (m/s): <input type='number' name='wind_speed' value={params.wind_speed} onChange={handleChange} />
        {errors.wind_speed && <span style={{ color: 'red' }}>{errors.wind_speed}</span>}
      </label>

      <button onClick={handleRunSimulation} disabled={loading}>
        {loading ? 'Running...' : 'Run Simulation'}
      </button>
      <button onClick={handleReset}>Reset</button>

      {Array.isArray(mockData) && mockData.length > 0 ? (
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
              {mockData.map((data, index) => (
                <tr key={index}>
                  <td>{data.time.toFixed(4)}</td>
                  <td>{data.altitude.toFixed(4)}</td>
                  <td>{data.velocity.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <LineChartComponent data={mockData} />
        </div>
      ) : (
        <p>No simulation data available.</p>
      )}
    </div>
  );
};

export default SimulationForm;
