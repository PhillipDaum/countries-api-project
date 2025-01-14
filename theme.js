import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light", // Default mode
    useSystemColorMode: false, // Set to `true` to use the user's OS preference
  },
  colors: {
    light: "#FAFAFA",
    lighter: "#FFFF",
    dark: "#2b3844",
    darker: "#202c36",
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "dark" : "light",
        color: props.colorMode === "dark" ? "lighter" : "darker",
      },
    }),
  },
});

export default theme;
