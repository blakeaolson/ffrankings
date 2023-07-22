import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: props => ({
    body: {
      bg: mode('#f0e7db', '#202023')(props)
    }
  })
}

const fonts = {
  heading: "M PLUS Rounded 1c"
}
const components = {
  Heading: {
    variants: {
      'section-title': {
        textDecoration: 'underline',
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: '#525252',
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4
      }
    }
  },
}


const colors = {
  grassTeal: '#88ccca'
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme