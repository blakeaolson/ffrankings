import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  IconButton,
  useColorMode,
} from "@chakra-ui/react";

const SwitchTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      icon={colorMode === "light" ? <SunIcon/> : <MoonIcon/>}
      variant= "outline"
      colorScheme= "cyan"
      aria-label="Color mode switcher"
      onClick={toggleColorMode}
    >
      Switch Mode
    </IconButton>
  )
}

export default SwitchTheme;