import React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { AppTabNavigator } from './appTabNavigator'
import { CustomSideBarMenu } from './customSideBarMenu'
import SettingScreen from '../screens/settingScreen'
import MyDonations from '../screens/myDonations'

export const AppDrawerNavigator = createDrawerNavigator(
    { Home: { screen: AppTabNavigator } ,Setting:{screen: SettingScreen}, MyDonations:{screen:MyDonations}}, { contentComponent: CustomSideBarMenu }, { initialRouteName: 'Home' }
)


