# react-native-dynamic-styles
an easy way to create dynamic styles for react-native/react-native-web apps

[![badge](https://img.shields.io/npm/v/react-native-dynamic-style.svg)](https://www.npmjs.com/package/react-native-dynamic-style) 

## Install

`npm install react-native-dynamic-styles`

## Declare Styles

- static styles

```
const dynamicStyles = DynamicStyleSheet.create({
    container: {
        width: 100
    }
});
```

- relative value

let constider on minimum screen (width: 375) the font size is 12

and on the maximum screen (width: 1440) the font size is 35

the relative font size will be calculated between those two values ex:

     375 --------- width --------- 1440

                    ^
                    |
                    v

     12 ---- relative fontSize --- 35

for this to work you must pass minWidth and maxWidth to useDynamicStyles

```
const styles = useDynamicStyles(dynamicStyles, { minWidth: 375, maxWidth: 1440 })
```

```
const dynamicStyles = DynamicStyleSheet.create({
    text: {
        fontSize: [12, 35]
    }
});
```

- breakpoints
    - on proberty
        ```
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
    - on style

        ```
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
    - combine with proberties

        ```
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
- custom function

```
const dynamicStyles = DynamicStyleSheet.create({
    container: {
        width: ({
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
        }) => isSmallAndUp ? 100 : 200
    }
});
```

## use styles

after declaring the styles you can use them by calling this hook

```
const styles = useDynamicStyles(dynamicStyles)
```

## hooks

- useBreakpoints

in case you want to customize the components instead of styles, you can use this hook

```
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
} = useBreakpoints()
```