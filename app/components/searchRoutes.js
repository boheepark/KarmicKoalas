import React, { Component } from 'react'
import { View, StyleSheet, NavigatorIOS, Text, ListView, TextInput, TouchableHighlight } from 'react-native';

let routes = [
  {name: 'New York Historic'},
  {name: 'Metropolitan Boston'},
  {name: 'Fossil Treck in NJ'},
  {name: 'Hudson River Walk'},
  {name: 'Central Park NYC'},
  {name: 'Bear Mountain Hike Easy'},
  {name: 'NYC Midtown Pub Crawl'},
  {name: 'Lower East Side NYC Historic'}
]

class SearchRoutes extends Component {
   constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      search: '',
      dataSource: ds.cloneWithRows([
        'New York Historic', 'Metropolitan Boston', 'Fossil Treck in NJ', 'Hudson River Walk', 'Central Park NYC', 'Bear Mountain Hike Easy', 'NYC Midtown Pub Crawl', 'Lower East Side NYC Historic'
      ])
    };
  }
  render() {
    return (
      <View style={styles.navBar}>
        <TextInput
          style={{height: 70}}
          autoFocus = {true}
          value={this.state.search}
          placeholder="Enter keywords: "
          onChangeText={(text) => this.setState({search: text})}
        />

        <View style={{paddingTop: 15}}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text>{rowData}</Text>}
          />
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
    backgroundColor: 'grey',
    height: 50,
    top: 40,
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
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

module.exports =  SearchRoutes;
