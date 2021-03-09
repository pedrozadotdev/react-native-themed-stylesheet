/* eslint-disable dot-notation */
/* eslint-disable indent */
import React, {
  createElement,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react'
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Appearance, AppearanceProvider } from 'react-native-appearance'
import merge from 'ts-deepmerge'

export interface BaseTheme {}

type WithoutConstants = {
  theme: object
}

type WithConstants = {
  theme: object
  constants: object
}

type Theme = BaseTheme extends WithConstants
  ? BaseTheme['theme'] & BaseTheme['constants']
  : BaseTheme extends WithoutConstants
  ? BaseTheme['theme']
  : any
type Themes = BaseTheme extends WithConstants
  ? {
      light: BaseTheme['theme']
      dark: BaseTheme['theme']
      constants: BaseTheme['constants']
    }
  : BaseTheme extends WithoutConstants
  ? {
      light: BaseTheme['theme']
      dark: BaseTheme['theme']
    }
  : any

type ThemeMode = 'light' | 'dark' | 'auto'
type ThemeContext = {
  mode: ThemeMode
  setMode: (newMode: ThemeMode) => void
  setThemes: (newThemes: Themes) => void
  theme: Theme
  themes: Themes
}

type Styles = {
  [prop: string]: ViewStyle | TextStyle | ImageStyle
}

type UseMode = () => [ThemeContext['mode'], ThemeContext['setMode']]
type UseTheme = () => Theme
type UseThemes = () => [ThemeContext['themes'], ThemeContext['setThemes']]
type UseCreateStyles = <S extends Styles>(
  createStyles: (theme: Theme) => S
) => [StyleSheet.NamedStyles<S>, Theme]

type ThemeProviderProps = {
  themes: Themes
  mode?: ThemeMode
}

const themeContext = createContext<ThemeContext>({} as ThemeContext)

const generateTheme = (mode: ThemeMode, themes: Themes) => {
  if (
    typeof themes !== 'object' ||
    !themes ||
    typeof themes.light !== 'object' ||
    typeof themes.dark !== 'object' ||
    !themes.light ||
    !themes.dark
  ) {
    return {}
  }
  const constants = 'constants' in themes ? themes['constants'] : {}
  const systemColorScheme = Appearance.getColorScheme()
  const currentMode =
    mode !== 'auto'
      ? mode
      : systemColorScheme !== 'no-preference'
      ? systemColorScheme
      : 'light'
  return merge(constants, themes[currentMode])
}

const RawThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  mode: initialMode,
  themes: initialThemes
}) => {
  const [mode, setMode] = useState(initialMode ?? 'auto')
  const [themes, setThemes] = useState(initialThemes)
  const [theme, setTheme] = useState(generateTheme(mode, themes))
  useEffect(() => {
    let subscription: any
    setTheme(generateTheme(mode, themes))
    if (mode === 'auto') {
      subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setTheme(
          generateTheme(
            colorScheme !== 'no-preference' ? colorScheme : 'light',
            themes
          )
        )
      })
    }
    return () => {
      subscription && subscription.remove()
    }
  }, [mode, themes])
  return createElement(
    themeContext.Provider,
    {
      value: {
        mode,
        theme,
        themes,
        setMode,
        setThemes
      }
    },
    children
  )
}

export const ThemeProvider: typeof RawThemeProvider = ({
  children,
  ...props
}) =>
  createElement(
    AppearanceProvider,
    null,
    createElement(RawThemeProvider, props, children)
  )

export const useMode: UseMode = () => {
  const { mode, setMode } = useContext(themeContext)
  return [mode, setMode]
}
export const useTheme: UseTheme = () => useContext(themeContext).theme
export const useThemes: UseThemes = () => {
  const { themes, setThemes } = useContext(themeContext)
  return [themes, setThemes]
}
export const useCreateStyles: UseCreateStyles = cs => {
  const theme = useTheme()
  return [StyleSheet.create(cs(theme)), theme]
}
