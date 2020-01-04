import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'

import About from './components/About'
import RootStack from './components/Search'
import globalStyle from './Style'


const Tabs = createBottomTabNavigator(
  {
    Météo: {
      screen: RootStack,
      defaultNavigationOption: {}
    },
    Info: {
        screen: About,
        defaultNavigationOption: {}
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#FFF',
      showIcon: false,
      showLabel: true,
      indicatorStyle: {
        height: 2,
        backgroundColor: '#FFF'
      },
      labelStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlignVertical: 'center'
      },
      style: {
        backgroundColor: globalStyle.color,
        borderTopWidth: 1,
        borderColor: '#3f101c'
      }
    }
  }
)

export default createAppContainer(Tabs);
