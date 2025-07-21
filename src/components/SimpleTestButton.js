import React from 'react';
import { SimpleTest } from 'simple-test-plugin';

const SimpleTestButton = () => {
  const testPlugin = async () => {
    try {
      const result = await SimpleTest.hello({ name: 'Capacitor' });
      alert(result.message);
      console.log('Simple plugin result:', result);
    } catch (error) {
      console.error('Simple plugin error:', error);
      alert('Plugin error: ' + error.message);
    }
  };

  return (
    <button onClick={testPlugin} style={{ padding: '10px', margin: '10px' }}>
      Test Simple Plugin
    </button>
  );
};

export default SimpleTestButton;