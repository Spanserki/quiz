import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  fonts: {
    heading: "Roboto",
    body: "Roboto"
  },
  styles: {
    global: {
      body: {
        bgColor: 'gray.900',
        color: 'gray.50',
        fontFamily: 'Roboto, sans-serif'
      },
    },
  },
  colors: {
    "whiteGreen": {
      "50": "#F2F9EB",
      "100": "#DAEFC8",
      "200": "#C2E5A4",
      "300": "#ABDB80",
      "400": "#93D05C",
      "500": "#7BC639",
      "600": "#639F2D",
      "700": "#4A7722",
      "800": "#314F17",
      "900": "#19280B"
    },
    "gray": {
      "50": "#F2F2F2",
      "100": "#DBDBDB",
      "200": "#C4C4C4",
      "300": "#ADADAD",
      "400": "#969696",
      "500": "#808080",
      "600": "#666666",
      "700": "#4D4D4D",
      "800": "#333333",
      "900": "#242424"
    },

  }
});