/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import { useEffect, useState, createElement } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import addons from '@storybook/addons'

const ADDON_ID = 'storybook-addon-ondevice-themed-stylesheet'
const PANEL_ID = `${ADDON_ID}/panel`

const Button = ({ mode, active, setMode }) =>
  createElement(
    TouchableOpacity,
    {
      style: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        backgroundColor: active ? 'black' : 'white'
      },
      onPress: () => setMode(mode)
    },
    createElement(
      Text,
      { style: { textAlign: 'center', color: active ? 'white' : 'black' } },
      mode.toUpperCase()
    )
  )

const ThemePanel = ({ channel }) => {
  const [currentMode, setCurrentMode] = useState(null)
  useEffect(() => {
    const onModeChange = newMode => setCurrentMode(newMode)
    channel.on('mode', onModeChange)
    return channel.removeListener(onModeChange)
  }, [])
  useEffect(() => {
    currentMode && channel.emit('setMode', currentMode)
  }, [currentMode])
  return currentMode
    ? createElement(
        View,
        null,
        ['auto', 'light', 'dark'].map(m =>
          createElement(
            View,
            { key: m },
            createElement(Button, {
              mode: m,
              active: currentMode === m,
              setMode: setCurrentMode
            })
          )
        )
      )
    : null
}

addons.register(ADDON_ID, () => {
  const channel = addons.getChannel()
  addons.addPanel(PANEL_ID, {
    title: 'Theme',
    render: () => createElement(ThemePanel, { channel }, null)
  })
})
