import { useState } from 'react';
import Config, { UseInputType } from './types';

const useInputHandler = (initialValue: UseInputType, config: Config = {}): [UseInputType, (event: React.ChangeEvent<HTMLInputElement>) => void, React.Dispatch<React.SetStateAction<string | number | String | Number | Date>>] => {
  const [value, setValue] = useState(initialValue);

  const onChangeEventHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newValue: UseInputType = isFunction(config.parser) ? config.parser(value) : transformInput(value);
    if (!value && config.allowNull) {
      setValue(null);
    } else if (isFunction(config.validator)) {
      const isValid = config.validator(newValue);
      if (isValid) {
        setValue(newValue);
        if (isFunction(config.onValidatorSuccess)) {
          config.onValidatorSuccess();
        }
      } else if (isFunction(config.onValidatorFail)) {
        config.onValidatorFail();
      }
    } else {
      setValue(newValue);
    }
  }

  const isFunction = (valueToTest: any): Boolean => {
    return typeof valueToTest === 'function';
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

export { UseInputType };