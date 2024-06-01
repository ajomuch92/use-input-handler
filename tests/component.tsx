import React from 'react';
import useInputHandler, { Config } from '../src';

interface InputComponentProps extends Config<string | number> {}

const InputComponent: React.FC<InputComponentProps> = (props: InputComponentProps) => {
  const [value, onChangeHandler] = useInputHandler(props.asNumber ? 0 : '', props);

  return (
    <input
      type="text"
      value={value?.toString()}
      onChange={onChangeHandler}
    />
  );
};

const NumberInputComponent: React.FC = () => {
  const [value, onChangeHandler] = useInputHandler(0, { asNumber: true });

  return (
    <>
      <input type="text" value={value.toString()} onChange={onChangeHandler} />
      <p role="out" title={typeof value}>{value}</p>
    </>
  );
};

export {
  InputComponent,
  NumberInputComponent,
};
