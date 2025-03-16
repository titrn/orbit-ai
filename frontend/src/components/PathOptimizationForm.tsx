import React, { useState } from 'react';
import axios from 'axios';

const PathOptimizationForm: React.FC = () => {
  const [grid, setGrid] = useState<string>('[[0, 0, 0], [0, 1, 0], [0, 0, 0]]');
  const [start, setStart] = useState<string>('0,0');
  const [goal, setGoal] = useState<string>('2,2');
  const [path, setPath] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const parsedGrid = JSON.parse(grid);
      const parsedStart = start.split(',').map(Number);
      const parsedGoal = goal.split(',').map(Number);

      // Validate grid format
      if (!Array.isArray(parsedGrid) || !Array.isArray(parsedGrid[0])) {
        setError('Grid must be a 2D array.');
        setPath([]);
        return;
      }

      // Validate start and goal points
      const rows = parsedGrid.length;
      const cols = parsedGrid[0].length;

      if (
        parsedStart[0] < 0 ||
        parsedStart[1] < 0 ||
        parsedStart[0] >= rows ||
        parsedStart[1] >= cols ||
        parsedGoal[0] < 0 ||
        parsedGoal[1] < 0 ||
        parsedGoal[0] >= rows ||
        parsedGoal[1] >= cols
      ) {
        setError('Start or goal point is out of bounds.');
        setPath([]);
        return;
      }

      const response = await axios.post('http://localhost:8000/optimize', {
        start: parsedStart,
        goal: parsedGoal,
        grid: parsedGrid,
      });

      setPath(response.data.path);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Invalid input or server error. Please check your inputs.');
    }
  };

  const renderGrid = () => {
    const parsedGrid = JSON.parse(grid);

    return (
      <table style={{ borderCollapse: 'collapse', marginTop: '20px' }}>
        <tbody>
          {parsedGrid.map((row: number[], rowIndex: number) => (
            <tr key={rowIndex}>
              {row.map((cell: number, colIndex: number) => {
                const isPath = path.some((point) => point[0] === rowIndex && point[1] === colIndex);
                const isStart = start === `${rowIndex},${colIndex}`;
                const isGoal = goal === `${rowIndex},${colIndex}`;

                return (
                  <td
                    key={colIndex}
                    style={{
                      width: '30px',
                      height: '30px',
                      textAlign: 'center',
                      border: '1px solid black',
                      backgroundColor: isStart
                        ? 'green'
                        : isGoal
                        ? 'red'
                        : isPath
                        ? 'yellow'
                        : cell === 1
                        ? 'black'
                        : 'white',
                    }}
                  >
                    {cell === 1 ? 'X' : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>Path Optimization</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Grid (2D Array):
          <textarea
            value={grid}
            onChange={(e) => setGrid(e.target.value)}
            placeholder='[[0, 0, 0], [0, 1, 0], [0, 0, 0]]'
          />
        </label>
        <label>
          Start Point (x,y):
          <input type='text' value={start} onChange={(e) => setStart(e.target.value)} placeholder='0,0' />
        </label>
        <label>
          Goal Point (x,y):
          <input type='text' value={goal} onChange={(e) => setGoal(e.target.value)} placeholder='2,2' />
        </label>
        <button type='submit'>Find Path</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {path.length > 0 && (
        <div>
          <h3>Optimal Path:</h3>
          {renderGrid()}
        </div>
      )}
    </div>
  );
};

export default PathOptimizationForm;
