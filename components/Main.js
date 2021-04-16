import React, {Component} from 'react'
import {View, Text} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fecthUser} from '../redux/actions/index'

export class Main extends Component {
    componentDidMount()
    {
        this.props.fecthUser();
    }
   render(){
        return (
           <View style={{
                flex:1, justifyContent:'center'
                }}>
                <Text>User logged in</Text>
            </View>
        )
   }
}

const mapDispatchProps = (dispatch) => bindActionCreators({fecthUser}, dispatch)

export default connect(null, mapDispatchProps)(Main)
