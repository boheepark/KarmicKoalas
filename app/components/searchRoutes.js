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

  getRoutes(){
    // TODO: get request to server /routes and save results in an array
  }

  renderRow(rowData: string, sectionID: number, rowID: number,
    highlightedRow: (sectionID: nunber, rowID: number) => void) {
    return (
      <TouchableOpacity style={styles.routeRow} onPress={(event) => this.showData(rowData)}>
      <View>
        <Text style={{alignItems: 'center', padding: 3}}>{'\n'}{rowData}{'\n'}</Text>
      </View>
      </TouchableOpacity>
    );
  }

  renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#E0DFDF' : '#073AD2',
        }}
      />
    );
   }

  render() {
    return (
      <View style={styles.navBar}>
        <TextInput
          style={{height: 50}}
          autoFocus = {true}
          multiline = {true}
          numberOfLines = {8}
          borderWidth={2}
          fontSize={20}
          padding={10}
          value={this.state.search}
          placeholder="Enter keywords: "
          onChangeText={(text) => this.setState({search: text})}/>
        <View style={{paddingTop: 2}}>
        <TouchableHighlight onPress={() => this.getRoutes()} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
          <ListView
            initialListSize={10}
            dataSource={this.state.dataSource}
            renderRow={(route) => { return this.renderRow(route) }}
            renderSeparator={this.renderSeparator}/>
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
    backgroundColor: '#E0DFDF'
  },
  navBar: {
    height: 50,
    top: 15,
    paddingTop: 50
  },
  routeRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 40,
    backgroundColor: 'skyblue',
    paddingHorizontal: 30,
    paddingVertical: 12,
    padding: 5,
    marginTop: 4
  }
});

module.exports =  SearchRoutes;
