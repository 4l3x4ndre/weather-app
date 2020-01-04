import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'
import PropTypes from 'prop-types';
import moment from 'moment'
import 'moment/locale/fr'

moment.locale('fr')

import FadeInView from '../animations/fadeInView'

export default class Row extends React.Component {

    static propTypes = {
        day: PropTypes.object,
        index: PropTypes.number
    }

    day() {
        let day = moment(this.props.day.dt * 1000).format('dddd')
        return (
            <Text>
                <Text style={[style.bold, style.white]}>{day.toUpperCase()}</Text>
            </Text>
        )
    }

    date() {
        let date = moment(this.props.day.dt * 1000).format('DD/MM')
        return (
            <Text>
                <Text style={style.white}> {date} </Text>
            </Text>
        )
    }

    hour() {
        let hour = ''
        for (let i = 0; i < this.props.day.dt_txt.length; i++) {
            const element = this.props.day.dt_txt[i];
            if (i >= 11 && i <= 15) {
                hour += element
            }            
        }
        return (
            <Text style={[style.white]}>{hour}</Text>
        )
    }

    icon (size = 50) {
        const type = this.props.day.weather[0].main.toLowerCase()
        
        let image
        switch (type) {
            case 'clouds':
                image = require('./icons/clouds.png')
                break
            case 'rain':
                image = require('./icons/rain.png')
                break
            default:
                let h = moment(this.props.day.dt*1000).format('H') 
                if (h < 19 && h > 6) {
                    image = require('./icons/sun.png')
                } else {
                    image = require('./icons/moon.png')
                }
        }
        return (
            <Image source={image} style={{width: size, height: size}}/>
        )
    }

    render() {
        const temps = {
            main: Math.round(this.props.day.main.temp),
            min: Math.round(this.props.day.main.temp_min),
            max : Math.round(this.props.day.main.temp_max),
        }
        if (this.props.index == 0) {
            return (
                <FadeInView delay={this.props.index * 50}> 
                    <View style={[style.view, style.flex, style.firstView]}>
                        <View>
                            <Text style={style.big}>{this.day()}</Text>
                            <Text style={style.big}>{this.date()}</Text>
                            <Text style={style.big}>{this.hour()}</Text>
                        </View>
                        <View style={style.align}>
                            {this.icon(90)}
                            <Text style={style.big}>{temps.main}°C</Text>
                        </View>
                    </View>
                </FadeInView>
            )
        } else {
            return (
                <FadeInView delay={this.props.index * 120}> 
                    <View style={[style.view, style.flex]}>
                        <View>
                            <Text>{this.day()} {this.date()}</Text>
                            <Text>{this.hour()}</Text>
                        </View>
                        <View style={style.align}>
                            {this.icon()}
                            <Text style={style.temp}>{temps.main}°C</Text>
                        </View>
                    </View>
                </FadeInView>
            )
        }
    }

}

const style = StyleSheet.create({
    white: {
        color: '#FFF'
    },
    bold: {
        fontWeight: 'bold'
    },
    align: {
        alignItems: 'center',
    },
    flex: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    justify: {
        justifyContent: 'space-between',
    },
    firstView: {
        backgroundColor: '#5da1e5',
    },
    view: {
        backgroundColor: '#394163',
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    big: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 30
    },  
    temp: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 22
    }
})