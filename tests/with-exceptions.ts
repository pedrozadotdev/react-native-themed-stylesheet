import { createElement } from 'react'
import { renderHook } from '@testing-library/react-hooks/native'
import { ThemeProvider, useTheme } from '../src/index'

describe('With Exceptions', () => {
  test('Themes as null', () => {
    const wrapper: typeof ThemeProvider = ({ children }) =>
      createElement(
        ThemeProvider,
        {
          themes: {
            light: null,
            dark: null
          }
        },
        children
      )
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(Object.keys(result.current).length).toEqual(0)
  })
  test('Themes as primitive', () => {
    const wrapper: typeof ThemeProvider = ({ children }) =>
      createElement(
        ThemeProvider,
        {
          themes: {
            light: 1,
            dark: 'a'
          }
        },
        children
      )
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(Object.keys(result.current).length).toEqual(0)
  })
  test('Themes as undefined', () => {
    const wrapper: typeof ThemeProvider = ({ children }) =>
      createElement(
        ThemeProvider,
        {
          themes: {}
        },
        children
      )
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(Object.keys(result.current).length).toEqual(0)
  })
  test('Without themes', () => {
    const wrapper: typeof ThemeProvider = ({ children }) =>
      createElement(ThemeProvider, null, children)
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(Object.keys(result.current).length).toEqual(0)
  })
  test('Constants as undefined', () => {
    const wrapper: typeof ThemeProvider = ({ children }) =>
      createElement(
        ThemeProvider,
        {
          themes: {
            constants: undefined,
            dark: { color: '#a1a1a1' },
            light: { color: '#a2a2a2' }
          }
        },
        children
      )
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(Object.keys(result.current).length).toEqual(1)
  })
})
