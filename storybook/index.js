import { useEffect, Fragment, createElement } from 'react'
import addons, { makeDecorator } from '@storybook/addons'

const Wrapper = ({ children, useTheme, channel }) => {
  const { mode, setMode } = useTheme()
  useEffect(() => {
    const onModeChange = newMode => {
      setMode(newMode)
    }
    channel.on('setMode', onModeChange)
    return channel.removeListener(onModeChange)
  }, [mode])
  useEffect(() => {
    channel.emit('mode', mode)
  }, [mode])
  return createElement(Fragment, null, children)
}

export const withThemeHook = makeDecorator({
  name: 'withThemeHook',
  parameterName: 'useTheme',
  skipIfNoParametersOrOptions: true,
  allowDeprecatedUsage: true,
  wrapper: (getStory, context, { parameters }) => {
    const useTheme = parameters || (() => ({ mode: '', setMode: () => {} }))
    const channel = addons.getChannel()
    return createElement(Wrapper, { useTheme, channel }, getStory(context))
  }
})
