
# Use Input Handler

A simple custom hook for React to use as input change event handler.


### New Features 💥
* Adding tests.
* Adding more usefull configurations to use the hook (number, trim).
* Removing allow null configuration.
* Returning setValue method to manipulate the value as you want(see example below)

## Installation

Install use-input-handler with NPM

```bash
  npm install use-input-handler
```
    
## How to use it

#### Simple use

```js
  import useInputHandler from 'use-input-handler';

  const myComponent = () => {
    const [value, changeHandler, setValue] = useInputHandler(''); // pass desired initial value

    const buttonClick = () => {
      setValue('');
    };

    return (
      <>
        <input type="text" value={value} onChange={changeHandler} />
        <p>
          { value }
        </p>
        <button onClick={buttonClick}>
          Clear
        </button>
      </>
    )
  }
```

#### Using a parser

```js
  import useInputHandler from 'use-input-handler';

  const myComponent = () => {
    const [value, changeHandler] = useInputHandler(0, {
      parser: (newValue: any) => parseFloat(value),
    });

    return (
      <>
        <input type="number" onChange={changeHandler} />
        <p>
          { value }
        </p>
      </>
    )
  }
```

#### Using a validator

```js
  import useInputHandler from 'use-input-handler';

  const myComponent = () => {
    const [value, changeHandler] = useInputHandler(0, {
      parser: (newValue: any) => parseFloat(value),
      validator: (valueToValidate: any) => {
        return typeof valueToValidate === 'number' && valueToValidate > 18;
      },
      onValidatorFail: () => {
        alert('Age must be greater than 18 years old');
      },
      allowNull: true,
    });

    return (
      <>
        <input type="number" onChange={changeHandler} placeholder="Age"/>
        <p>
          { value }
        </p>
      </>
    )
  }
```

See an example [here](https://github.com/ajomuch92/use-input-handler/tree/main/example)

### Config parameter 

| Name | Type | Description |
| --------- | --------- | --------- |
| validator | (str: UseInputType) => Boolean | Validator method before set the value. If validation is false, the value will not be set. |
| onValidatorSuccess | Function | Method call when validation was successfully. |
| onValidatorFail | Function | Method call when validation was not successfully. |
| parser | (str: String) => UseInputType | Method use to manipulate the value passed from input on change event. This event is executed before validation method. |
| asNumber | Boolean | Boolean value to transform the input into a number |
| trim | Boolean | Boolean value to trime the input result |

All these values are optional. The last two options are applied if there is no a parser method.

## To Do
* Add more tests

## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


## Author

- [@ajomuch92](https://www.github.com/ajomuch92)

