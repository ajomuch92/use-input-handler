import React from 'react';
import useInputHandler, { Config } from '../src';

const InputComponent = (props: Config = {}): React.JSX.Element => {
  const [value, onChangeHandler] = useInputHandler(props.asNumber ? 0 : '', props);

  return (<input type="text" value={value?.toString()} onChange={onChangeHandler} />);
}

const NumberInputComponent = (): React.JSX.Element => {
  const [value, onChangeHandler] = useInputHandler(0, { asNumber : true});

  return (
    <>
      <input type="text" onChange={onChangeHandler} />
      <p role="out" title={typeof value}></p>
    </>
  )
}

export {
  InputComponent,
  NumberInputComponent,
};