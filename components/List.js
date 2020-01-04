import React from 'react'
import { View, Text, ActivityIndicator, FlatList} from 'react-native'
import moment from 'moment'

import globalStyle from '../Style'
import WeatherRow from './weather/Row'

import config from '../config'

export default class List extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Météo à ' + navigation.state.params.city + ', ' + navigation.state.params.country,
        }
    }

    constructor (props) {
        super(props)
        this.state = {
            city: this.props.navigation.state.params.city,
            report: null,
            error: null,
            country: this.props.navigation.state.params.country,
            id:this.props.navigation.state.params.id
        }
        this.fetchWeather()
    }

    fetchWeather() {
        let url = 'http://api.openweathermap.org/data/2.5/forecast?id=' + this.state.id + '&units=metric&appid=' + config.app

        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                let tab = [];
                let last_date = ''
                if (responseJson.cod == '404') {

                    // City not found
                    this.setState({error: 'City not found'})

                } else {
                
                    for (let i = 0; i < responseJson.list.length; i++) {
                        const element = responseJson.list[i];
                        const date = moment(element.dt * 1000).format('ddd')
                        tab.push(element)
                        last_date = date
                        
                    }

                    setTimeout(() => {
                        this.setState({report: tab})
                    }, 100)
                
                }
            })
            .catch((error) => {
            console.error(error);
            });
    }

    renderTemp(temp) {
        return (
            <Text>Value: {temp}</Text>
        )
    }

    render() {
        if (this.state.error !== null) {
            return (
                <View style={{justifyContent: 'center', flex:1, alignItems:'center'}}>
                    <Text style={globalStyle.error}>Your city was not found</Text>
                </View>
            )
        } else if (this.state.report == null) {
            return (
                <ActivityIndicator color={globalStyle.color} size="large"/>
            )
        } else {
            return (
               <FlatList
					data={this.state.report}
                    renderItem={({ item, index }) => <WeatherRow day={item}  index={index}/>}
                    keyExtractor={item => item.dt.toString()}
				/>
            )
        }
    }

}