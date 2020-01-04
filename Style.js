import {StyleSheet} from 'react-native'

const primeColor = '#2763a0' //A2273C

export default{
    color: primeColor,
    container: {
        margin: 30,
        flex: 1,
    },
    title: {
        fontSize: 22,
        marginBottom: 20
    },
    button: {
        backgroundColor: primeColor,
        color: '#FFFFFF'
    },
    input: {
        borderColor: '#5d7fe5',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal:10
    },
    header: {
        backgroundColor: primeColor
    },
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerTintColor: '#FFF',
    error: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    autocompleteContainer: {
      marginLeft: 10,
      marginRight: 10,
    },
    item_name: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    }
    
}