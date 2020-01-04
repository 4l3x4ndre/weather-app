import React from 'react'
import {View, Text, StyleSheet, Image,  Button, StatusBar} from 'react-native'

import globalStyle from '../Style'

export default class About extends React.Component {

    static navigationOptions = {
    }

    search() {
        this.props.navigation.navigate('Search')
    }

    render() {
        return (
            <View style={globalStyle.container}>
                <StatusBar hidden={true}/>
                <Text style={globalStyle.title}>A propos</Text>
                <Text>Merci à 
                    <Text >{" "}</Text>
                    <Text style={style.refs}>
                    icon lauk
                    <Text >{" "}</Text>
                    </Text>
                    pour les icônes, à retrouver sur
                    <Text >{" "}</Text>
                    <Text style={style.refs}>
                    iconfinder.com
                    </Text>
                    <Text >{" "}</Text>
                </Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    refs: {
        fontStyle: 'italic',
        fontWeight: 'bold'
    },
})
