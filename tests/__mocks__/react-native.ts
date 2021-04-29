import { useState } from 'react'
import * as ReactNative from 'react-native'
import { Appearance } from '../fixture'

// eslint-disable-next-line import/export
export * from 'react-native'

export const useColorScheme = () => {
  const [value, setValue] = useState<'dark' | 'light' | null>(null)
  Appearance.listener = setValue
  return value
}

export default Object.setPrototypeOf({ useColorScheme }, ReactNative)
