import React, { useState } from 'react';

const TestComponent: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className='p-4 bg-gray-100 rounded-xl shadow-md'>
      <h2 className='text-lg font-semibold'>Test Component</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} className='px-4 py-2 bg-blue-500 text-white rounded-md mt-2'>
        Increment
      </button>
    </div>
  );
};

export default TestComponent;