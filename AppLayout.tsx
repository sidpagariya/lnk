import React, { useState } from 'react'
import {
  ApplicationProvider,
  Divider,
  Icon,
  IconRegistry,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  Spinner,
} from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import {
  dark as themeDark,
  light as themeLight,
  mapping,
} from '@eva-design/eva'
import { StyleSheet } from 'react-native'
import { getLinkForRef } from './utils'
import { RouteComponentProps } from 'react-router-dom'

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

const MoonIcon = (props: any) => <Icon {...props} name="moon" />
const SunIcon = (props: any) => <Icon {...props} name="sun" />

interface MainRouteInfo {
  ref: string
}

interface MainProps extends RouteComponentProps<MainRouteInfo>{ }
const AppLayout: React.FC<MainProps> = (props) => {
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light')
  }
  const [themeName, setThemeName] = useState(
    localStorage.getItem('theme') || 'light'
  )
  const theme = themes[themeName].theme

  const changeTheme = () => {
    localStorage.setItem('theme', themeName === 'light' ? 'dark' : 'light')
    setThemeName(themeName === 'light' ? 'dark' : 'light')
  }

  const { icon: themeButtonIcon } =
    themeName === 'light' ? themes.dark : themes.light

  const RightAction = () => {
    const ThemeIcon = themeButtonIcon === 'moon' ? MoonIcon : SunIcon
    return (
      <React.Fragment>
        <TopNavigationAction icon={ThemeIcon} onPress={changeTheme} />
      </React.Fragment>
    )
  }

  const { ref } = props.match.params || {}

  if (ref && ref != '404') {
    getLinkForRef(ref).then((link) => {
      window.location = link
    })
  }

  console.log(props.match.params)

  return (
    <React.Fragment>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <TopNavigation
          alignment="center"
          title="Sid's Quick Links"
          accessoryRight={RightAction}
        />
        <Divider />
        <Layout level="2" style={styles.container}>
          {ref === undefined || ref === '404' ? null : <Spinner size="large" />}
          <Text style={styles.text} category="h1">
            {ref !== undefined ? ref !== '404' ? 'Redirecting you...' : 'ERROR 404 - Not found' : 'Welcome!'}
          </Text>
        </Layout>
      </ApplicationProvider>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: 30
  },
})

export default AppLayout
