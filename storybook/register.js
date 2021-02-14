/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import addons from '@storybook/addons'

const ADDON_ID = 'storybook-addon-ondevice-themed-stylesheet'
const PANEL_ID = `${ADDON_ID}/panel`

const Button = ({ mode, active, setMode }) => (
  <TouchableOpacity
    style={{
      borderRadius: 5,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.5)',
      padding: 10,
      marginHorizontal: 10,
      marginVertical: 5,
      backgroundColor: active ? 'black' : 'white'
    }}
    onPress={() => setMode(mode)}
  >
    <Text style={{ textAlign: 'center', color: active ? 'white' : 'black' }}>
      {mode.toUpperCase()}
    </Text>
  </TouchableOpacity>
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
  return currentMode ? (
    <View>
      {['auto', 'light', 'dark'].map(m => (
        <View key={m}>
          <Button
            mode={m}
            active={currentMode === m}
            setMode={setCurrentMode}
          />
        </View>
      ))}
    </View>
  ) : null
}

addons.register(ADDON_ID, () => {
  const channel = addons.getChannel()
  addons.addPanel(PANEL_ID, {
    title: 'Theme',
    render: () => <ThemePanel channel={channel} />
  })
})
