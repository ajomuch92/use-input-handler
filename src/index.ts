import { useState } from 'react';
import Config, { UseInputType } from './types';

const useInputHandler = (initialValue: UseInputType, config: Config = {}) => {
  const [value, setValue] = useState(initialValue);

  const setValueModified = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as any;
    const newValue: UseInputType = isFunction(config.parser) ? config.parser(value) : value;
    if (!value && config.allowNull) {
      setValue(null);
    } else if (isFunction(config.validator)) {
      const isValid = config.validator(value);
      if (isValid) {
        setValue(newValue);
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

  return [value, setValueModified];
}

export default useInputHandler;

export { UseInputType };