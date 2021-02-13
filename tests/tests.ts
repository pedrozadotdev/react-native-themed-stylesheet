import { renderHook, act } from '@testing-library/react-hooks/native'
import { Appearance } from '../__mocks__/react-native-appearance'
import { createTheme } from '..'
import { style1, style2, themes1, themes2 } from './fixture'
import { TextStyle } from 'react-native'

beforeEach(() => {
  Appearance.preference = 'no-preference'
})

describe('With Common Prop and Auto Mode', () => {
  const { ThemeProvider, useStyle, useTheme } = createTheme(themes1)
  test('Create style with useStyle()', () => {
    const { result } = renderHook(() => useStyle(style1), {
      wrapper: ThemeProvider
    })
    expect((result.current.text as TextStyle).color).toEqual('#ff0000')
    expect((result.current.text as TextStyle).fontSize).toEqual(12)
  })
  test('Create style with useTheme()', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    expect(result.current.theme.textColor).toEqual('#ff0000')
    expect(result.current.theme.fontSize).toEqual(12)
  })
})

describe('With Common Prop and Dark Mode', () => {
  const { ThemeProvider, useStyle, useTheme } = createTheme(themes1, 'dark')
  test('Create style with useStyle()', () => {
    const { result } = renderHook(() => useStyle(style1), {
      wrapper: ThemeProvider
    })
    expect((result.current.text as TextStyle).color).toEqual('#fff')
    expect((result.current.text as TextStyle).fontSize).toEqual(12)
  })
  test('Create style with useTheme()', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    expect(result.current.theme.textColor).toEqual('#fff')
    expect(result.current.theme.fontSize).toEqual(12)
  })
})

describe('Without Common Prop and Auto Mode', () => {
  const { ThemeProvider, useStyle, useTheme } = createTheme(themes2)
  test('Create style with useStyle()', () => {
    const { result } = renderHook(() => useStyle(style2), {
      wrapper: ThemeProvider
    })
    expect((result.current.text as TextStyle).color).toEqual('#ffff00')
  })
  test('Create style with useTheme()', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    expect(result.current.theme.textColor).toEqual('#ffff00')
  })
})
describe('Without Common Prop and Dark Mode', () => {
  const { ThemeProvider, useStyle, useTheme } = createTheme(themes2, 'dark')
  test('Create style with useStyle()', () => {
    const { result } = renderHook(() => useStyle(style2), {
      wrapper: ThemeProvider
    })
    expect((result.current.text as TextStyle).color).toEqual('#fff')
  })
  test('Create style with useTheme()', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    expect(result.current.theme.textColor).toEqual('#fff')
  })
})

describe('Change System Preference', () => {
  const { ThemeProvider, useTheme } = createTheme(themes2)
  test('To "no-preference" to Get Light Mode', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    act(() => {
      Appearance.preference = 'no-preference'
    })
    expect(result.current.theme.textColor).toEqual('#ffff00')
  })
  test('To Dark Mode', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    act(() => {
      Appearance.preference = 'dark'
    })
    expect(result.current.theme.textColor).toEqual('#fff')
  })
  test('To Light Mode and then Change Manually to Dark Mode', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    act(() => {
      Appearance.preference = 'light'
      result.current.setMode('dark')
    })
    expect(result.current.theme.textColor).toEqual('#fff')
  })
})

describe('Change ThemeContext', () => {
  const { ThemeProvider, useTheme } = createTheme(themes2)
  test('Change Themes', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    act(() => {
      result.current.setThemes(themes1)
    })
    expect(result.current.theme.textColor).toEqual('#ff0000')
    expect(
      (result.current.theme as { textColor: string; fontSize: number }).fontSize
    ).toEqual(12)
  })
  test('Change Mode to Dark', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    act(() => {
      result.current.setMode('dark')
    })
    expect(result.current.theme.textColor).toEqual('#fff')
  })
})

describe('No Changes Triggered', () => {
  const { ThemeProvider, useTheme } = createTheme(themes2)
  test('Change Mode to Current Mode', () => {
    const { result } = renderHook(() => useTheme(), { wrapper: ThemeProvider })
    expect(result.current.theme.textColor).toEqual('#ffff00')
    act(() => {
      result.current.setMode('auto')
    })
    expect(result.current.theme.textColor).toEqual('#ffff00')
  })
})
