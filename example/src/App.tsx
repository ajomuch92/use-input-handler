import useInputHandler from 'use-input-handler';
import './App.css'
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [value, setValue] = useInputHandler('', { debounce: 800 });
  const [value2, setValue2] = useInputHandler(0, {
    parser: (newValue: any) => parseFloat(newValue),
    validator: (valueToValidate: any) => {
      return typeof valueToValidate === 'number' && valueToValidate > 18;
    },
    onValidatorFail: () => {
      setMessage('Age must be greater than 18 years old');
    },
    onValidatorSuccess: () => {
      setMessage('');
    },
    allowNull: true,
  });

  return (
    <>
      <input type="text" onChange={setValue} placeholder="Any text..." />
      <p>
          Value: { value?.toString() }
      </p>
      <input type="number" onChange={setValue2} placeholder="Age..." />
      <p>
          Age: { value2?.toString() }
      </p>
      <p>Message: { message }</p>
    </>
  )
}

export default App
