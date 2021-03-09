import { createElement } from 'react'
import { renderHook } from '@testing-library/react-hooks/native'
import { Appearance } from '../__mocks__/react-native-appearance'
import { ThemeProvider, useTheme } from '../src/index'
import { themes3 } from './fixture'

declare module '../src/index' {
  type Themes3 = typeof themes3
  export interface BaseTheme extends Themes3 {}
}

beforeEach(() => {
  Appearance.preference = 'no-preference'
})

describe('Without Constants', () => {
  const wrapper: typeof ThemeProvider = ({ children }) =>
    createElement(ThemeProvider, { themes: themes3 }, children)
  test('Create style with useTheme()', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.colors.primary).toEqual('#c1c1c1')
  })
})
