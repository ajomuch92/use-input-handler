import { useState } from 'react';
import Config, { UseInputType } from './types';

const useInputHandler = (initialValue: UseInputType, config: Config = {}): [
  UseInputType,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  React.Dispatch<React.SetStateAction<string | number | String | Number | Date>>
] => {
  const [value, setValue] = useState(initialValue);
  const [debounce, setDebounce] = useState(undefined);

  const onChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newValue: UseInputType = isFunction(config.parser) ? config.parser(value) : transformInput(value);
    if (isFunction(config.validator)) {
      const isValid = config.validator(newValue);
      if (isValid) {
        setGlobalValue(newValue);
        if (isFunction(config.onValidatorSuccess)) {
          config.onValidatorSuccess();
        }
      } else if (isFunction(config.onValidatorFail)) {
        config.onValidatorFail();
      }
    } else {
      setGlobalValue(newValue);
    }
  }

  const isFunction = (valueToTest: any): Boolean => {
    return typeof valueToTest === 'function';
  }

  const setGlobalValue = (newValue: UseInputType) => {
    if (typeof config.debounce === 'number') {
      if (debounce) {
        clearTimeout(debounce);
      }
      const debounceId = setTimeout(() => {
        setValue(newValue);
        clearTimeout(debounce);
      }, config.debounce);
      setDebounce(debounceId);
    } else {
      setValue(newValue);
    }
  }

  const transformInput = (valueToTransform: UseInputType): Number | String | UseInputType => {
    if (config.asNumber) {
      return parseFloat(valueToTransform.toString())
    }
    if (config.trim) {
      return `${valueToTransform}`.trim();
    }
    return valueToTransform;
  }

  return [value, onChangeEventHandler, setValue];
}

export default useInputHandler;

export { UseInputType, Config };