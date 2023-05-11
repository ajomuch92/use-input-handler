
# Use Input Handler

A simple custom hook to use as input change event handler


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
    const [value, setValue] = useInputHandler(''); // pass desired initial value

    return <>
        <input type="text" onChange={setValue} />
        <p>
            { value }
        </p>
    </>
  }
```

#### Using a parser

```js
  import useInputHandler from 'use-input-handler';

  const myComponent = () => {
    const [value, setValue] = useInputHandler(0, {
        parser: (newValue: any) => parseFloat(value),
    });

    return <>
        <input type="number" onChange={setValue} />
        <p>
            { value }
        </p>
    </>
  }
```

#### Using a validator

```js
  import useInputHandler from 'use-input-handler';

  const myComponent = () => {
    const [value, setValue] = useInputHandler(0, {
        parser: (newValue: any) => parseFloat(value),
        validator: (valueToValidate: any) => {
            return typeof valueToValidate === 'number' && valueToValidate > 18;
        },
        onValidatorFail: () => {
            alert('Age must be greater than 18 years old');
        }
    });

    return <>
        <input type="number" onChange={setValue} placeholder="Age"/>
        <p>
            { value }
        </p>
    </>
  }
```




## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)


## Author

- [@ajomuch92](https://www.github.com/ajomuch92)

