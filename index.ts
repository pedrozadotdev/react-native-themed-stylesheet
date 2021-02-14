/* eslint-disable indent */
import {
  createElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { Appearance, AppearanceProvider } from 'react-native-appearance'
type Themes<T, C> = {
  light: T
  dark: T
  common?: C
}
type ThemeMode = 'light' | 'dark' | 'auto'
type ThemeContext<T, C> = {
  theme: T & C
  mode: ThemeMode
  setMode: (newMode: ThemeMode) => void
  setThemes: (newThemes: Themes<T, C>) => void
}
type UseTheme<T, C> = () => ThemeContext<T, C>
type ThemeObject = {
  [props: string]: ViewStyle | TextStyle | ImageStyle
}
type UseStyle<T, C> = <S extends ThemeObject, O>(
  createStyleSheet: (theme: T & C, options?: O) => S,
  options?: O
) => StyleSheet.NamedStyles<S>
type CreateTheme = <T, C>(
  themes: Themes<T, C | undefined>,
  initialMode?: ThemeMode
) => {
  ThemeProvider: React.FC
  useTheme: UseTheme<T, C | undefined>
  useStyle: UseStyle<T, C | undefined>
}

const createTheme: CreateTheme = (ts, initialMode = 'auto') => {
  type Theme = typeof ts.light
  type Common = typeof ts.common
  const generateTheme = (mode: ThemeMode, themes: typeof ts) => {
    const common = (themes.common ?? {}) as Common
    const systemColorScheme = Appearance.getColorScheme()
    const currentMode =
      mode !== 'auto'
        ? mode
        : systemColorScheme !== 'no-preference'
        ? systemColorScheme
        : 'light'
    return { ...common, ...themes[currentMode] } as Theme & Common
  }
  const ThemeContext = createContext<ThemeContext<Theme, Common>>({
    theme: generateTheme(initialMode, ts),
    mode: initialMode,
    setMode /* istanbul ignore next */: () => {},
    setThemes /* istanbul ignore next */: () => {}
  })

  const RawThemeProvider: React.FC = ({ children }) => {
    const [themes, setThemes] = useState(ts)
    const [mode, setMode] = useState<ThemeMode>(initialMode)
    const [theme, setTheme] = useState<Theme & Common>(
      generateTheme(initialMode, themes)
    )
    const memoizedSetMode = useCallback(
      (newMode: ThemeMode) => {
        if (newMode !== mode) {
          setMode(() => {
            setTheme(generateTheme(newMode, themes))
            return newMode
          })
        }
      },
      [themes, mode]
    )
    useEffect(() => setTheme(generateTheme(mode, themes)), [themes])
    useEffect(() => {
      let subscription: any
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
      ThemeContext.Provider,
      { value: { theme, mode, setMode: memoizedSetMode, setThemes } },
      children
    )
  }

  const ThemeProvider: React.FC = ({ children }) =>
    createElement(
      AppearanceProvider,
      null,
      createElement(RawThemeProvider, null, children)
    )

  const useTheme: UseTheme<Theme, Common> = () => useContext(ThemeContext)
  const useStyle: UseStyle<Theme, Common> = (createStyledObject, options) => {
    const { theme } = useTheme()
    return StyleSheet.create(createStyledObject(theme, options))
  }

  return { ThemeProvider, useStyle, useTheme }
}
export { createTheme }
