import React from 'react';
import useInputHandler, { Config } from '../src';

interface InputComponentProps extends Config<string | number> {}

const InputComponent: React.FC<InputComponentProps> = (props: InputComponentProps) => {
  const [value, onChangeHandler] = useInputHandler(props.asNumber ? 0 : '', props);

  return (
    <input
      type="text"
      value={value}
      onChange={onChangeHandler}
    />
  );
};

const NumberInputComponent: React.FC = () => {
  const [value, onChangeHandler] = useInputHandler(0, { asNumber: true });

  return (
    <>
      <input type="text" value={value} onChange={onChangeHandler} />
      <p role="out" title={typeof value}>{value}</p>
    </>
  );
};

const SelectComponent: React.FC = () => {
  const [value, onChangeHandler] = useInputHandler(0);

  const frameworks = [
    {id: 1, name: 'React'},
    {id: 2, name: 'Vue'},
    {id: 3, name: 'Preact'},
    {id: 4, name: 'Svelte'},
    {id: 5, name: 'Solid'},
    {id: 6, name: 'Qwik'},
    {id: 7, name: 'Angular'},
  ]

  return (
    <>
      <select role="textbox" value={value} onChange={onChangeHandler}>
        {frameworks.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
      </select>
      <p role="out">{value}</p>
    </>
  );
};


const TextareaComponent: React.FC = () => {
  const [value, onChangeHandler] = useInputHandler('');

  return (
    <textarea
      role="textbox"
      value={value}
      onChange={onChangeHandler}
    />
  );
};


export {
  InputComponent,
  NumberInputComponent,
  SelectComponent,
  TextareaComponent,
};
