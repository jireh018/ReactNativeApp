import React, {Component} from 'react'
import {View, Text} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchUser} from '../redux/actions/index'

import FeedScreen from './main/Feed'
import AddScreen from './main/Add'
import ProfileScreen from './main/Profile'

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return(null)
}

export class Main extends Component {
    componentDidMount()
    {
        this.props.fetchUser();
    }
   render(){
        return (
           <Tab.Navigator initialRouteName="Feed" labeled={false}>
               <Tab.Screen name="Feed" component={FeedScreen} 
                options={{
                    tabBarIcon:({color, size}) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
               }}  />
               {/*name=MainAdd pour eviter que ça navigue vers Add qui est le Tabscreen */}
               <Tab.Screen name="AddContainer" component={EmptyScreen} 
               listeners={({navigation}) => ({
                   tabPress: event => {
                       event.preventDefault();
                       navigation.navigate("Add")
                   }
               })}
                options={{
                    tabBarIcon:({color, size}) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                    ),
               }}  />
               <Tab.Screen name="Profile" component={ProfileScreen} 
                options={{
                    tabBarIcon:({color, size}) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                    ),
               }}  />
           </Tab.Navigator>
        )
   }
}

//sauver les valeurs de la data pour pouvoir les utiliser
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch)

export default connect(mapStateToProps, mapDispatchProps)(Main)
