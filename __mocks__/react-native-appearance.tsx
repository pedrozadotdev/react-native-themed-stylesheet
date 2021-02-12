import * as React from 'react'
import { View } from 'react-native'
import {
  AppearancePreferences,
  ColorSchemeName,
  AppearanceListener
} from 'react-native-appearance/src/Appearance.types'

type EventSubscription = {
  remove: () => void
}

export class Appearance {
  private static _preference: ColorSchemeName = 'no-preference'
  private static _listeners: AppearanceListener[] = []
  static getColorScheme (): ColorSchemeName {
    return this._preference
  }

  static get preference (): ColorSchemeName {
    return this._preference
  }

  static set preference (newPreference: ColorSchemeName) {
    this._preference = newPreference
    this._listeners.forEach(l => l({ colorScheme: this._preference }))
  }

  static set (_preferences: AppearancePreferences): void {}

  static addChangeListener (_listener: AppearanceListener): EventSubscription {
    this._listeners.push(_listener)
    return {
      remove: () => {
        this._listeners = this._listeners.filter(l => l !== _listener)
      }
    }
  }

  /**
   * Unused: some people might expect to remove the listener like this, but they shouldn't.
   */
  static removeChangeListener (_listener: AppearanceListener): void {}
}

export const AppearanceProvider = (props: any) => (
  <View style={{ flex: 1 }} {...props} />
)

export function useColorScheme (): ColorSchemeName {
  return 'no-preference'
}
