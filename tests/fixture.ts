type AppearanceType = {
  listener: null | ((v: 'dark' | 'light' | null) => void)
  set: (v: 'dark' | 'light' | null) => void
}

export const Appearance: AppearanceType = {
  listener: null,
  set (v) {
    typeof this.listener === 'function' && this.listener(v)
    this.listener = null
  }
}

export const themes1 = {
  light: {
    colors: {
      primary: '#a1a1a1'
    }
  },
  dark: {
    colors: {
      primary: '#a2a2a2'
    }
  },
  constants: {
    colors: {
      accent: '#a0a0a0'
    }
  }
}

export const themes2 = {
  light: {
    colors: {
      primary: '#b1b1b1'
    }
  },
  dark: {
    colors: {
      primary: '#b2b2b2'
    }
  },
  constants: {
    colors: {
      accent: '#b0b0b0'
    }
  }
}

export const themes3 = {
  light: {
    colors: {
      primary: '#c1c1c1'
    }
  },
  dark: {
    colors: {
      primary: '#c2c2c2'
    }
  }
}

export const createStyles = ({
  colors
}: typeof themes1.constants & typeof themes1.light) => ({
  text: {
    backgroundColor: colors.accent,
    color: colors.primary
  }
})
