import * as React from 'react'
import { View, Text, Button } from 'react-native'
import { Appearance } from '../__mocks__/react-native-appearance'
import { render, fireEvent, act } from '@testing-library/react-native'
import { style1, style2, themes1, themes2 } from './fixture'
import { createTheme } from '..'

beforeEach(() => {
  Appearance.preference = 'no-preference'
})

describe('With Common Prop and Auto Mode', () => {
  const { ThemeProvider, useStyle, useTheme } = createTheme(themes1)
  test('Create style with useStyle()', () => {
    const Component: React.FC = () => {
      const styles = useStyle(style1)
      return (
        <View style={{ flex: 1 }}>
          <Text style={styles.text} testID='text'>
            Some Text...
          </Text>
        </View>
      )
    }
    const { getByTestId } = render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    )
    const textElement = getByTestId('text')
    expect(textElement.props.style.color).toEqual('#ff0000')
    expect(textElement.props.style.fontSize).toEqual(12)
  })
  test('Create style with useTheme()', () => {
    const Component: React.FC = () => {
      const {
        theme: { textColor, fontSize }
      } = useTheme()
      return (
        <View style={{ flex: 1 }}>
          <Text style={{ color: textColor, fontSize }} testID='text'>
            Some Text...
          </Text>
        </View>
      )
    }
    const { getByTestId } = render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    )
    const textElement = getByTestId('text')
    expect(textElement.props.style.color).toEqual('#ff0000')
    expect(textElement.props.style.fontSize).toEqual(12)
  })
})

describe('With Common Prop and Dark Mode', () => {
  const { ThemeProvider, useStyle, useTheme } = createTheme(themes1, 'dark')
  test('Create style with useStyle()', () => {
    const Component: React.FC = () => {
      const styles = useStyle(style1)
      return (
        <View style={{ flex: 1 }}>
          <Text style={styles.text} testID='text'>
            Some Text...
          </Text>
        </View>
      )
    }
    const { getByTestId } = render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    )
    const textElement = getByTestId('text')
    expect(textElement.props.style.color).toEqual('#fff')
    expect(textElement.props.style.fontSize).toEqual(12)
  })
  test('Create style with useTheme()', () => {
    const Component: React.FC = () => {
      const {
        theme: { textColor, fontSize }
      } = useTheme()
      return (
        <View style={{ flex: 1 }}>
          <Text style={{ color: textColor, fontSize }} testID='text'>
            Some Text...
          </Text>
        </View>
      )
    }
    const { getByTestId } = render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    )
    const textElement = getByTestId('text')
    expect(textElement.props.style.color).toEqual('#fff')
    expect(textElement.props.style.fontSize).toEqual(12)
  })
})

describe('Without Common Prop and Auto Mode', () => {
  const { ThemeProvider, useStyle, useTheme } = createTheme(themes2)
  test('Create style with useStyle()', () => {
    const Component: React.FC = () => {
      const styles = useStyle(style2)
      return (
        <View style={{ flex: 1 }}>
          <Text style={styles.text} testID='text'>
            Some Text...
          </Text>
        </View>
      )
    }
    const { getByTestId } = render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    )
    const textElement = getByTestId('text')
    expect(textElement.props.style.color).toEqual('#ffff00')
  })
  test('Create style with useTheme()', () => {
    const Component: React.FC = () => {
      const {
        theme: { textColor }
      } = useTheme()
      return (
        <View style={{ flex: 1 }}>
          <Text style={{ color: textColor }} testID='text'>
            Some Text...
          </Text>
        </View>
      )
    }
    const { getByTestId } = render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    )
    const textElement = getByTestId('text')
    expect(textElement.props.style.color).toEqual('#ffff00')
  })
})

describe('Without Common Prop and Dark Mode', () => {
  const { ThemeProvider, useStyle, useTheme } = createTheme(themes2, 'dark')
  test('Create style with useStyle()', () => {
    const Component: React.FC = () => {
      const styles = useStyle(style2)
      return (
        <View style={{ flex: 1 }}>
          <Text style={styles.text} testID='text'>
            Some Text...
          </Text>
        </View>
      )
    }
    const { getByTestId } = render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    )
    const textElement = getByTestId('text')
    expect(textElement.props.style.color).toEqual('#fff')
  })
  test('Create style with useTheme()', () => {
    const Component: React.FC = () => {
      const {
        theme: { textColor }
      } = useTheme()
      return (
        <View style={{ flex: 1 }}>
          <Text style={{ color: textColor }} testID='text'>
            Some Text...
          </Text>
        </View>
      )
    }
    const { getByTestId } = render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    )
    const textElement = getByTestId('text')
    expect(textElement.props.style.color).toEqual('#fff')
  })
})

describe('Change System Preference', () => {
  const { ThemeProvider, useStyle, useTheme } = createTheme(themes2)
  test('To "no-preference" to Get Light Mode', () => {
    const Component: React.FC = () => {
      const styles = useStyle(style2)
      return (
        <View style={{ flex: 1 }}>
          <Text style={styles.text} testID='text'>
            Some Text...
          </Text>
        </View>
      )
    }
    const { getByTestId } = render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    )
    act(() => {
      Appearance.preference = 'no-preference'
    })
    const textElement = getByTestId('text')
    expect(textElement.props.style.color).toEqual('#ffff00')
  })
  test('To Dark Mode', () => {
    const Component: React.FC = () => {
      const styles = useStyle(style2)
      return (
        <View style={{ flex: 1 }}>
          <Text style={styles.text} testID='text'>
            Some Text...
          </Text>
        </View>
      )
    }
    const { getByTestId } = render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    )
    act(() => {
      Appearance.preference = 'dark'
    })
    const textElement = getByTestId('text')
    expect(textElement.props.style.color).toEqual('#fff')
  })
  test('To Light Mode and then Change Manually to Dark Mode', () => {
    const Component: React.FC = () => {
      const { setMode } = useTheme()
      const styles = useStyle(style2)
      return (
        <View style={{ flex: 1 }}>
          <Text style={styles.text} testID='text'>
            Some Text...
          </Text>
          <Button
            title='Change Mode'
            onPress={() => setMode('dark')}
            testID='button'
          />
        </View>
      )
    }
    const { getByTestId } = render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    )
    act(() => {
      Appearance.preference = 'light'
    })
    const buttonElement = getByTestId('button')
    fireEvent.press(buttonElement)
    const textElement = getByTestId('text')
    expect(textElement.props.style.color).toEqual('#fff')
  })
})

describe('Change ThemeContext', () => {
  const { ThemeProvider, useStyle, useTheme } = createTheme(themes2)
  test('Change Themes', () => {
    const Component: React.FC = () => {
      const { setThemes } = useTheme()
      const styles = useStyle(style2)
      return (
        <View style={{ flex: 1 }}>
          <Text style={styles.text} testID='text'>
            Some Text...
          </Text>
          <Button
            title='Change Mode'
            onPress={() => setThemes(themes1)}
            testID='button'
          />
        </View>
      )
    }
    const { getByTestId } = render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    )
    const buttonElement = getByTestId('button')
    fireEvent.press(buttonElement)
    const textElement = getByTestId('text')
    expect(textElement.props.style.color).toEqual('#ff0000')
  })
  test('Change Mode to Dark', () => {
    const Component: React.FC = () => {
      const { setMode } = useTheme()
      const styles = useStyle(style2)
      return (
        <View style={{ flex: 1 }}>
          <Text style={styles.text} testID='text'>
            Some Text...
          </Text>
          <Button
            title='Change Mode'
            onPress={() => setMode('dark')}
            testID='button'
          />
        </View>
      )
    }
    const { getByTestId } = render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    )
    const buttonElement = getByTestId('button')
    fireEvent.press(buttonElement)
    const textElement = getByTestId('text')
    expect(textElement.props.style.color).toEqual('#fff')
  })
})

describe('No Changes Triggered', () => {
  const { ThemeProvider, useStyle, useTheme } = createTheme(themes2)
  test('Change Mode to Current Mode', () => {
    const Component: React.FC = () => {
      const { setMode } = useTheme()
      const styles = useStyle(style2)
      return (
        <View style={{ flex: 1 }}>
          <Text style={styles.text} testID='text'>
            Some Text...
          </Text>
          <Button
            title='Change Mode'
            onPress={() => setMode('auto')}
            testID='button'
          />
        </View>
      )
    }
    const { getByTestId } = render(
      <ThemeProvider>
        <Component />
      </ThemeProvider>
    )
    const textElement = getByTestId('text')
    const buttonElement = getByTestId('button')
    expect(textElement.props.style.color).toEqual('#ffff00')
    fireEvent.press(buttonElement)
    expect(textElement.props.style.color).toEqual('#ffff00')
  })
})
