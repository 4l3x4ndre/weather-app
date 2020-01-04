import React from 'react'
import {View, StatusBar, AsyncStorage, TouchableOpacity, Text} from 'react-native'
import Autocomplete from 'react-native-autocomplete-input';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import globalStyle from '../Style'
import List from './List'
import config from '../config';

class Search extends React.Component {

    static navigationOptions = {
        title: 'Rechercher une ville',
        /*tabBarIcon: () => {
            return <Image
            source={require('./img/icon.png')}
            style={{ width: 30, height: 30 }}
          />
        }*/
    }

    _storeData = async () => {
        try {
          await AsyncStorage.setItem('city', this.state.city);
        } catch (error) {
          // Error saving data
        }
    };

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('city');
          if (value !== null) {
            this.setCity(value)
          }
        } catch (error) {
          // Error retrieving data
        }
    };

    constructor (props) {
      super(props)
      this.state = {
          city: '',
          cities: []
      }
      this._retrieveData()
    }
  
    setCity (city) {
        this.setState({
            city: city
        })
    }

    submit_info(country, id) {
        this.props.navigation.push('Result', {city: this.state.city, country: country, id: id})
        this._storeData()
    }

    getCitiesByName(name) {
        const url1 = 'https://openweathermap.org/data/2.5/find?&q='
        const url2 = '&type=like&sort=population&cnt=30&appid='+config.appid
        let url = url1 + name + url2

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({cities: data.list})
                
            })
            .catch(error => console.log(error))
        

    }

    render() {

        return (
            <View style={globalStyle.container}>
                
                <StatusBar hidden={true}/>


                <Autocomplete
                        autoCapitalize="none"
                        autoCorrect={false}
                        containerStyle={globalStyle.autocompleteContainer}
                        data={this.state.cities}
                        defaultValue={this.state.city}
                        onChangeText={text => {
                            this.setCity(text)
                            this.getCitiesByName(text)
                        }}
                        placeholder="Your city name"
                        renderItem={({item}) => (
                            <TouchableOpacity 
                                onPress={() => {
                                    this.setCity(item.name)
                                    this.submit_info(item.sys.country, item.id)
                                }}>
                                <Text style={globalStyle.item}>
                                    <Text style={globalStyle.item_name}>{item.name}, </Text> 
                                    <Text>{item.sys.country}</Text>
                                </Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={ (item, i)=> ("x"+i)}
                    />
            </View>
        )
    }
}


const navigationOptionsStack = {
    headerStyle: globalStyle.header,
    headerTitleStyle: globalStyle.headerStyle,
    headerTintColor: globalStyle.headerTintColor,
}
  

const MainStack = createStackNavigator(
    {
        Search: {
            screen: Search,
            navigationOptions: navigationOptionsStack,
        },
        Result: {
            screen: List,
            navigationOptions: navigationOptionsStack,
        },
    },
    {
      initialRouteName: 'Search',
      
      defaultNavigationOptions: navigationOptionsStack
    }
);



const RootStack = createStackNavigator(
    {
        Main: {
            screen: MainStack,
            navigationOptions: navigationOptionsStack
        },
        MyModal: {
            screen: List,
            navigationOptionsStack
        },
    },
    {
        mode: 'modal',
        headerMode: 'true',
    }
)


export default createAppContainer(RootStack)