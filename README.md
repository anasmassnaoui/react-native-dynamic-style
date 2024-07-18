# react-native-dynamic-styles

An intuitive solution for creating dynamic and responsive styles in React Native and React Native Web applications.

[![badge](https://img.shields.io/npm/v/react-native-dynamic-style.svg)](https://www.npmjs.com/package/react-native-dynamic-style) 

## Installation

Install the package using npm:
```bash
npm install react-native-dynamic-style
```

## Usage

### Importing DynamicStyleSheet

Start by importing `DynamicStyleSheet`:
```javascript
import DynamicStyleSheet from 'react-native-dynamic-style';
```

### Declaring Styles

You have multiple options for declaring dynamic styles:

#### Static Styles
Define styles that remain constant regardless of screen size:
```javascript
const dynamicStyles = DynamicStyleSheet.create({
    container: {
        width: 100
    }
});
```

#### Relative Values
Define styles that adjust relative to screen width. For example, if the font size is 12 on a minimum screen width of 375 and 35 on a maximum screen width of 1440, the font size will be calculated relatively between these values.

```javascript
const styles = useDynamicStyles(dynamicStyles, { minWidth: 375, maxWidth: 1440 });

const dynamicStyles = DynamicStyleSheet.create({
    text: {
        fontSize: [12, 35]
    }
});
```

#### Breakpoints
Define styles for different breakpoints, either on individual properties or entire style objects:

- On a property:
    ```javascript
    const dynamicStyles = DynamicStyleSheet.create({
        container: {
            width: {
                xs: 20,
                s: 30,
                m: 40,
                l: 50,
                xl: 60,
                xxl: 70
            }
        }
    });
    ```
- On a style:
    ```javascript
    const dynamicStyles = DynamicStyleSheet.create({
        container: {
            xs: {
                width: 20
            },
            s: {
                width: 30
            },
            m: {
                width: 40
            },
            l: {
                width: 50
            },
            xl: {
                width: 60
            },
            xxl: {
                width: 70
            }
        }
    });
    ```
- Combining properties:
    ```javascript
    const dynamicStyles = DynamicStyleSheet.create({
        container: {
            width: {
                xs: 20,
                s: 30,
            },
            m: {
                width: 40
            }
        }
    });
    ```

#### Custom Functions
Define styles using custom functions that dynamically calculate values based on screen dimensions and breakpoints.

```javascript
const dynamicStyles = DynamicStyleSheet.create({
    container: {
        width: ({
            isSmallAndUp
        }) => isSmallAndUp ? 100 : 200
    }
});
```

### Using Styles

After declaring the styles, apply them by calling the `useDynamicStyles` hook:
```javascript
import DynamicStyleSheet, { useDynamicStyles } from 'react-native-dynamic-style';

const styles = useDynamicStyles(dynamicStyles);
```

### Hooks

#### useBreakpoints
If you need to customize components instead of styles, use the `useBreakpoints` hook to access current screen dimensions and breakpoints:

```javascript
import { useBreakpoints } from 'react-native-dynamic-style';

const {
    width,
    height,
    isExtraSmallAndUp,
    isExtraSmall,
    isSmallAndUp,
    isSmall,
    isSmallAndDown,
    isMediumAndUp,
    isMedium,
    isMediumAndDown,
    isLargeAndUp,
    isLarge,
    isLargeAndDown,
    isExtraLargeAndUp,
    isExtraLarge,
    isExtraLargeAndDown,
    isExtraExtraLarge,
    isExtraExtraLargeAndDown,
} = useBreakpoints();
```

This README provides a detailed guide to implementing dynamic styles in your React Native and React Native Web applications, enhancing responsiveness and adaptability across various screen sizes. With `react-native-dynamic-styles`, you can easily create and manage styles that adjust seamlessly to provide a consistent user experience.
