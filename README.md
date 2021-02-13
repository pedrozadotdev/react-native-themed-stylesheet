[![codecov](https://codecov.io/gh/andreppedroza/react-native-themed-stylesheet/branch/main/graph/badge.svg)](https://codecov.io/gh/andreppedroza/react-native-themed-stylesheet)
![](https://github.com/andreppedroza/react-native-themed-stylesheet/workflows/Release%20CI/badge.svg)

# react-native-themed-stylesheet

A package that allows you to create React Native StyleSheets with support for Dark/Light/Auto Themes.

- Depends on react-native-appearance to choose the theme based on OS preference(Android 10/iOS 13)
- Simple API
- Fully typed
- Builds on top of StyleSheets and Hooks

## Installation

**Using Expo**

```
expo install react-native-appearance react-native-themed-stylesheet
```

**Using Yarn**

```
yarn add react-native-appearance react-native-themed-stylesheet
```

**Using NPM**

```
npm install --save react-native-appearance react-native-themed-stylesheet
```

## Usage

Creating the theme:

```ts
// theme.ts

import { createTheme } from 'react-native-themed-stylesheet'

const themes = {
  light: {
    textColor: '#ff0000'
  },
  dark: {
    textColor: '#fff'
  },
  common: { // Optional
    fontSize: 12
  }
}

const { ThemeProvider, useStyle, useTheme } = createTheme(themes, 'auto') // Initial Mode is optional(Default: 'auto')

export { ThemeProvider, useStyle, useTheme }
```

Using the theme:

```tsx
// Components.tsx
import React from 'react'
import { View, Text, Button } from 'react-native'
import { ThemeProvider, useStyle, useTheme } from './theme'

const ComponentWithUseStyle: React.FC = () => {
  const styles = useStyle(theme => {
    text: {
      color: theme.textColor,
      fontSize: theme.fontSize
    }
  })

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.text}>Hello World</Text>
    </View>
  )
}

const ComponentWithUseTheme: React.FC = () => {
  const { theme, mode, setThemes, setMode } = useTheme()
  console.log('Current Mode:', mode)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: theme.textColor, fontSize: theme.fontSize }}>Hello World</Text>
      <Button title='Dark Mode' onPress={() => setMode('dark')}/>
      <Button title='Light Mode' onPress={() => setMode('light')}/>
      <Button title='Auto Mode' onPress={() => setMode('auto')}/>
      <Button title='Change Themes' onPress={
          () => setThemes({
            light: {
              textColor: '#ffff00'
            },
            dark: {
              textColor: '#C9C9C9'
            },
            common: {
              fontSize: 14
            }
          })
        }
      />
    </View>
  )
}
```

## API

### Function: `createTheme(themes, initialMode)`

Use this function to create the theme.

**Parameters**

- `themes`: An object containing light, dark and an optional common theme(Will be merge with boths themes).
- `initialMode`: A string('light', 'dark' or 'auto') specifying the initial mode(Default: 'auto').

**Returns**

```

ThemeObject

```

---

### Object: `ThemeObject`

An object containing the following properties:

- `ThemeProvider`: Theme Provider.
- `useStyle`: Hook to create Named StyleSheets.
- `useTheme`: Hook to get access to ThemeContext.

---

### React Component: `ThemeProvider`

A react component to provide ThemeContext.

---

### Function: `useStyle(createStyle)`

Hook to create themed stylesheets.

**Parameters**

- `createStyle`: A function that receives the current theme and returns an object of type `T`.

**Returns**

```

StyleSheet.NamedStyles<T>

```

---

### Function: `useTheme()`

Hook to get access to theme context.

**Returns**

```

{ theme, mode, setThemes, setMode }

```

An object containing the following properties:

- `theme`: The current theme.
- `mode`: The current mode.
- `setThemes`: Function to set the themes(The same type of `createTheme` `themes` param).
- `setMode`: Function to set the mode('light', 'dark' or 'auto').
