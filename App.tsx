import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AccessibilityRole, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
  ApplicationProvider,
  Button,
  Icon,
  IconRegistry,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Divider,
} from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import {
  mapping,
  light as themeLight,
  dark as themeDark,
} from '@eva-design/eva'

const heartIcons = ['😻', '💖', '😍', '🥰', '😍', '💝', '😘', '💓', '💕', '🐱']
const themes: any = {
  light: {
    theme: themeLight,
    icon: 'sun',
    text: 'LIGHT',
  },
  dark: {
    theme: themeDark,
    icon: 'moon',
    text: 'DARK',
  },
}

type IconProps = {
  name: string
  props?: any
}

type CustomButtonWithIconProps = {
  accessibilityRole: AccessibilityRole
  accessibilityLabel: string
  icon: string
  iconProps?: any
  onPress: () => void
  text: string
  style: any
}

const renderIcon = ({ name, props }: IconProps) => (
  <Icon {...props} name={name} style={styles.customIcon} />
)

const CustomButtonWithIcon = ({
  accessibilityRole,
  accessibilityLabel,
  icon,
  iconProps,
  onPress,
  text,
  style,
}: CustomButtonWithIconProps) => {
  const ButtonIcon = () => renderIcon({ name: icon, props: iconProps })
  return (
    <Button
      style={style}
      accessoryLeft={ButtonIcon}
      onPress={onPress}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
    >
      {text}
    </Button>
  )
}

const InfoIcon = (props: any) => <Icon {...props} name="info" />

const MoonIcon = (props: any) => <Icon {...props} name="moon" />

const SunIcon = (props: any) => <Icon {...props} name="sun" />

const showInfo = () => {
  console.log('Hello!')
}

const App = (): React.ReactFragment => {
  const [icon, setIcon] = useState(heartIcons[0])
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light')
  }
  const [themeName, setThemeName] = useState(
    localStorage.getItem('theme') || 'light'
  )
  const theme = themes[themeName].theme

  const changeIcon = () => {
    const index = Math.floor(Math.random() * heartIcons.length)
    setIcon(heartIcons[index])
  }

  const changeTheme = () => {
    localStorage.setItem('theme', themeName === 'light' ? 'dark' : 'light')
    setThemeName(themeName === 'light' ? 'dark' : 'light')
  }

  const { icon: themeButtonIcon, text: themeButtonText } =
    themeName === 'light' ? themes.dark : themes.light

  const RightAction = () => {
    const ThemeIcon = themeButtonIcon === 'moon' ? MoonIcon : SunIcon
    return (
      <React.Fragment>
        <TopNavigationAction icon={ThemeIcon} onPress={changeTheme} />
        <TopNavigationAction icon={InfoIcon} onPress={showInfo} />
      </React.Fragment>
    )
  }

  return (
    <NavigationContainer>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <TopNavigation
          alignment="center"
          title="Quick Links"
          accessoryRight={RightAction}
        />
        <Divider />
        <Layout level="2" style={styles.container}>
          <Text style={styles.text} category="h1">
            Welcome to UI Kitten {icon}
          </Text>
          <Text style={styles.text} category="s1">
            It works great in the browser and as a native app!
          </Text>
          <Text style={styles.text} appearance="hint">
            Click some buttons to see it working.
          </Text>
          <Button
            accessibilityRole="button"
            accessibilityLabel="Change Icon"
            style={styles.iconButton}
            onPress={changeIcon}
          >
            CHANGE ICON
          </Button>
          <CustomButtonWithIcon
            accessibilityRole="button"
            accessibilityLabel="UI Kitten Change Theme"
            style={styles.iconButton}
            text={`SWITCH TO ${themeButtonText} THEME`}
            icon={themeButtonIcon}
            onPress={changeTheme}
          />
        </Layout>
      </ApplicationProvider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  containerOld: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  iconButton: {
    marginVertical: 16,
  },
  nativeButton: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  customIcon: {
    height: '20px',
    marginRight: '10px',
    marginLeft: '10px',
    width: '20px',
    fill: 'rgb(255, 255, 255)',
  },
  addClassFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addClassButton: {
    marginLeft: 16,
  },
  input: {
    flex: 1,
    margin: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  checkbox: {
    margin: 2,
  },
  formHeader: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: -6,
  },
})

export default App
