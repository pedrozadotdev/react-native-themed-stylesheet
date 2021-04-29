import { createElement } from 'react'
import { TextStyle } from 'react-native'
import { renderHook, act } from '@testing-library/react-hooks/native'
import {
  ThemeProvider,
  useCreateStyles,
  useMode,
  useTheme,
  useThemes
} from '../src/index'
import { Appearance, createStyles, themes1, themes2 } from './fixture'
declare module '../src/index' {
  type Themes1 = typeof themes1
  export interface BaseTheme extends Themes1 {}
}

describe('Auto Mode', () => {
  const wrapper: typeof ThemeProvider = ({ children }) =>
    createElement(ThemeProvider, { themes: themes1 }, children)
  test('Create style with useStyle()', () => {
    const { result } = renderHook(() => useCreateStyles(createStyles), {
      wrapper
    })
    expect((result.current[0].text as TextStyle).color).toEqual('#a1a1a1')
    expect((result.current[0].text as TextStyle).backgroundColor).toEqual(
      '#a0a0a0'
    )
  })
  test('Create style with useTheme()', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.colors.primary).toEqual('#a1a1a1')
    expect(result.current.colors.accent).toEqual('#a0a0a0')
  })
})

describe('Dark Mode', () => {
  const wrapper: typeof ThemeProvider = ({ children }) =>
    createElement(ThemeProvider, { themes: themes1, mode: 'dark' }, children)
  test('Create style with useStyle()', () => {
    const { result } = renderHook(() => useCreateStyles(createStyles), {
      wrapper
    })
    expect((result.current[0].text as TextStyle).color).toEqual('#a2a2a2')
    expect((result.current[0].text as TextStyle).backgroundColor).toEqual(
      '#a0a0a0'
    )
  })
  test('Create style with useTheme()', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.colors.primary).toEqual('#a2a2a2')
    expect(result.current.colors.accent).toEqual('#a0a0a0')
  })
})

describe('Change System Preference', () => {
  const wrapper: typeof ThemeProvider = ({ children }) =>
    createElement(ThemeProvider, { themes: themes1 }, children)
  test('To "no-preference" to Get Light Mode', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    act(() => {
      Appearance.set(null)
    })
    expect(result.current.colors.primary).toEqual('#a1a1a1')
  })
  test('To Dark Mode', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    act(() => {
      Appearance.set('dark')
    })
    expect(result.current.colors.primary).toEqual('#a2a2a2')
  })
  test('To Light Mode and then Change Manually to Dark Mode', () => {
    const { result } = renderHook(
      () => {
        const theme = useTheme()
        const [, setMode] = useMode()
        return { theme, setMode }
      },
      { wrapper }
    )
    act(() => {
      Appearance.set('light')
      result.current.setMode('dark')
    })
    expect(result.current.theme.colors.primary).toEqual('#a2a2a2')
  })
})

describe('Change ThemeContext', () => {
  test('Change Themes', () => {
    const wrapper: typeof ThemeProvider = ({ children }) =>
      createElement(ThemeProvider, { themes: themes1 }, children)
    const { result } = renderHook(
      () => {
        const theme = useTheme()
        const [, setThemes] = useThemes()
        return { setThemes, theme }
      },
      { wrapper }
    )
    act(() => {
      result.current.setThemes(themes2)
    })
    expect(result.current.theme.colors.primary).toEqual('#b1b1b1')
  })
  test('Change Mode to Dark', () => {
    const wrapper: typeof ThemeProvider = ({ children }) =>
      createElement(ThemeProvider, { themes: themes2 }, children)
    const { result } = renderHook(
      () => {
        const theme = useTheme()
        const [, setMode] = useMode()
        return { setMode, theme }
      },
      { wrapper }
    )
    act(() => {
      result.current.setMode('dark')
    })
    expect(result.current.theme.colors.primary).toEqual('#b2b2b2')
  })
})

describe('No Changes Triggered', () => {
  const wrapper: typeof ThemeProvider = ({ children }) =>
    createElement(ThemeProvider, { themes: themes2 }, children)
  test('Change Mode to Current Mode', () => {
    const { result } = renderHook(
      () => {
        const theme = useTheme()
        const [, setMode] = useMode()
        return { setMode, theme }
      },
      { wrapper }
    )
    expect(result.current.theme.colors.primary).toEqual('#b1b1b1')
    act(() => {
      result.current.setMode('auto')
    })
    expect(result.current.theme.colors.primary).toEqual('#b1b1b1')
  })
})
