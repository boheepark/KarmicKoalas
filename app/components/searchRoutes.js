import React, { Component } from 'react'
import { View, StyleSheet, NavigatorIOS, Text, ListView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';

let routes = [
  'New York Historic',
  'Metropolitan Boston',
  'Fossil Treck in NJ',
  'Hudson River Walk',
  'Central Park NYC',
  'Bear Mountain Hike Easy',
  'NYC Midtown Pub Crawl',
  'Lower East Side NYC Historic'
]

class SearchRoutes extends Component {
   constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      search: '',
      dataSource: ds.cloneWithRows(routes)
    };
  }
  showData(item) {
    console.log("Route: ", item);
  }

  renderRow(route) {
    return (
      <TouchableOpacity onPress={(event) => this.showData(route)}>
      <View>
        <Text>{'\n'}{route}{'\n'}</Text>
        <View style={{height: 1, backgroundColor: '#dddddd' }} />
      </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.navBar}>
        <TextInput
          style={{height: 40}}
          autoFocus = {true}
          value={this.state.search}
          placeholder="Enter keywords: "
          onChangeText={(text) => this.setState({search: text})}/>
        <View style={{paddingTop: 2}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(route) => { return this.renderRow(route) }}/>
          </View>
         <View style={styles.button}>
          <Text>Add To My Routes</Text>
        </View>
      </View>
      );
   }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  navBar: {
    height: 50,
    top: 15,
    paddingTop: 50
  },
  buttonText: {
    fontSize: 18,
    color: 'green',
    alignSelf: 'center'
  },
  button: {
    height: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports =  SearchRoutes;
