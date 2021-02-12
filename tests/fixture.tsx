export const themes1 = {
  light: {
    textColor: '#ff0000'
  },
  dark: {
    textColor: '#fff'
  },
  common: {
    fontSize: 12
  }
}

export const themes2 = {
  light: {
    textColor: '#ffff00'
  },
  dark: {
    textColor: '#fff'
  }
}

export const style1 = (
  theme: typeof themes1.light & typeof themes1.common
) => ({
  text: {
    color: theme.textColor,
    fontSize: theme.fontSize
  }
})

export const style2 = (theme: typeof themes2.light) => ({
  text: {
    color: theme.textColor
  }
})
