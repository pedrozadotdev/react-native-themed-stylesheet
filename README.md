[![codecov](https://codecov.io/gh/andreppedroza/react-native-themed-stylesheet/branch/main/graph/badge.svg)](https://codecov.io/gh/andreppedroza/react-native-themed-stylesheet)
![](https://github.com/andreppedroza/react-native-themed-stylesheet/workflows/Release%20CI/badge.svg)
[![Version][npm-version]][npm-link] [![NPM Downloads][npm-downloads]][npm-link] [![License][npm-license]](https://github.com/andreppedroza/react-native-themed-stylesheet/blob/master/LICENSE)

[npm-version]: https://img.shields.io/npm/v/react-native-themed-stylesheet.svg
[npm-downloads]: https://img.shields.io/npm/dt/react-native-themed-stylesheet.svg
[npm-license]: https://img.shields.io/npm/l/react-native-themed-stylesheet.svg
[npm-link]: https://www.npmjs.com/package/react-native-themed-stylesheet

# react-native-themed-stylesheet

A package that allows you to create React Native StyleSheets with support for Dark/Light/Auto Themes.

- Depends on react-native-appearance to choose the theme based on OS preference(Android 10/iOS 13)
- Simple API
- Fully typed
- Builds on top of StyleSheets and Hooks
- Storybook addon to change Theme Mode

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

Create a type declaration file to merge BaseTheme declaration:

```ts
// react-native-themed-stylesheet.d.ts
import 'react-native-themed-stylesheet'

declare module 'react-native-themed-stylesheet' {
  export interface BaseTheme {
    theme: {
      colors: {
        primary: string
      }
    },
    constants: {  // This is optional. If declared/defined, it will be merge with the current theme.
      colors: {
        accent: string
      }
    }
  }
}
```

Using the theme:

```tsx
// App.tsx
import React from 'react'
import { View, Text, Button } from 'react-native'
import { ThemeProvider, useCreateStyles, useMode, useTheme, useThemes } from 'react-native-themed-stylesheet'

const DefaultComponent: React.FC = () => {
  const { colors } = useTheme()
  const [mode, setMode] = useMode()
  const [themes, setThemes] = useThemes()
  console.log('Current Mode:', mode)
  console.log('Themes:', themes)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: colors.primary, backgroundColor: colors.accent }}>Hello World</Text>
      <Button title='Dark Mode' onPress={() => setMode('dark')}/>
      <Button title='Light Mode' onPress={() => setMode('light')}/>
      <Button title='Auto Mode' onPress={() => setMode('auto')}/>
      <Button title='Change Themes' onPress={
          () => setThemes({
            light: {
              colors: { primary: '#c1c1c1' }
            },
            dark: {
              colors: { primary: '#c2c2c2' }
            },
            constants: {
              colors: { accent: '#c3c3c3' }
            }
          })
        }
      />
    </View>
  )
}

const ComponentWithUseCreateStyles: React.FC = () => {
  const styles = useCreateStyles(({ colors }) => {
    text: {
      color: colors.primary,
      backgroundColor: colors.accent
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.text}>Hello World</Text>
    </View>
  )
}

const themes = {
  dark: {
    colors: {
      primary: '#000'
    }
  },
  light: {
    colors: {
      primary: '#fff'
    }
  },
  constants: {
    colors: {
      accent: '#c0c0c0'
    }
  }
}

const App: React.FC = () => (
  <ThemeProvider themes={themes}>
    <DefaultComponent />
    <ComponentWithUseCreateStyles />
  </ThemeProvider>
)
```
## Storybook Addon

### Installation:

```js
// storybook.js
import {
  getStorybookUI,
  configure
} from '@storybook/react-native'
import 'react-native-themed-stylesheet/storybook/register'

configure(() => {
  require('path/to/some/story')
}, module)

const StorybookUIRoot = getStorybookUI()

export default StorybookUIRoot // Make sure to use this component within ThemeProvider.
```

## API

### React Component: `ThemeProvider`

Component to provide ThemeContext.

**Props**

- `themes`: An object of type `Themes`:

```ts
type Themes = {
  dark: BaseTheme['theme']
  light: BaseTheme['theme']
  constants?: BaseTheme['constants']
}
```

- `mode`: An optional string of type `ThemeMode`: (Default: 'auto')

```ts
type ThemeMode = 'auto' | 'dark' | 'light'
```

---

### Function: `useCreateStyle(createStyles)`

Hook to create themed stylesheets.

**Parameters**

- `createStyles`: A function that receives the current theme and returns an object of type `Styles`.

```ts
type Styles  = {
  [prop: string]: ViewStyle | TextStyle | ImageStyle
}
type Theme = (BaseTheme['constants'] & BaseTheme['theme']) | BaseTheme['theme']
```

**Returns**

```
[styles: StyleSheet.NamedStyles<Styles>, theme: Theme]
```

---

### Function: `useMode()`

Hook to get access to current mode.

**Returns**

```ts
[mode, setMode]: [ThemeMode, (newMode: ThemeMode) => void]
```

---

### Function: `useTheme()`

Hook to get access to current theme.

**Returns**

```ts
theme: Theme
```

---

### Function: `useThemes()`

Hook to get access to themes.

**Returns**

```ts
[themes, setThemes]: [Themes, (newThemes: Themes) => void]
```
