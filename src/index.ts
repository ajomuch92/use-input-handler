import { useState, ChangeEvent, SetStateAction, Dispatch } from 'react';

type Config<T> = {
  parser?: (value: string) => T;
  validator?: (value: T) => boolean;
  onValidatorSuccess?: () => void;
  onValidatorFail?: () => void;
  debounce?: number;
  asNumber?: boolean;
  trim?: boolean;
};

const useInputHandler = <T>(initialValue: T, config: Config<T> = {}): [
  T,
  (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => void,
  Dispatch<SetStateAction<T>>
] => {
  const [value, setValue] = useState<T>(initialValue);
  const [debounce, setDebounce] = useState<NodeJS.Timeout | undefined>(undefined);

  const onChangeEventHandler = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { value: inputValue } = event.target;
    const newValue: T = isFunction(config.parser) ? config.parser(inputValue) : transformInput(inputValue);

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
  };

  const isFunction = (valueToTest: any): valueToTest is Function => {
    return typeof valueToTest === 'function';
  };

  const setGlobalValue = (newValue: T) => {
    if (typeof config.debounce === 'number') {
      if (debounce !== undefined) {
        clearTimeout(debounce);
      }
      const debounceId = setTimeout(() => {
        setValue(newValue);
        setDebounce(undefined);
      }, config.debounce);
      setDebounce(debounceId);
    } else {
      setValue(newValue);
    }
  };

  const transformInput = (valueToTransform: string): T => {
    if (config.asNumber) {
      return parseFloat(valueToTransform) as unknown as T;
    }
    if (config.trim) {
      return valueToTransform.trim() as unknown as T;
    }
    return valueToTransform as unknown as T;
  };

  return [value, onChangeEventHandler, setValue];
};

export default useInputHandler;
export { Config };
