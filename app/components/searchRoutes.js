import React, { Component } from 'react'
import { View, StyleSheet, NavigatorIOS, Text, ListView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native';

import createEvent from './createEvent';

let routes = [
  {
    "title": "\"swim in Dallas Park\"",
    "start": "{\"latitude\":37.33756603,\"longitude\":-122.02681114}",
    "end": "{\"latitude\":37.34756603,\"longitude\":-122.02581114}",
    "points_of_interest": null,
    "id": 177
  },
  {
    "title": "\"swim in Austin Park\"",
    "start": "{\"latitude\":37.33756603,\"longitude\":-122.02681114}",
    "end": "{\"latitude\":37.34756603,\"longitude\":-122.02581114}",
    "points_of_interest": null,
    "id": 175
  }
]
//   {title: 'New York Historic'},
//   {title: 'Metropolitan Boston'},
//   {title: 'Fossil Treck in NJ'},
//   {title: 'Hudson River Walk'},
//   {title: 'Central Park NYC'},
//   {title: 'Bear Mountain Hike Easy'},
//   {title: 'NYC Midtown Pub Crawl'},
//   {title: 'Lower East Side NYC Historic'}
// ]

let routes2 = [];

class SearchRoutes extends Component {
   constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      keywords: '',
      dataSource: ds.cloneWithRows(routes)
    };
  }

  handleItemClick(item) {
    console.log("Route: ", item);
    this.props.navigator.push({
      component: createEvent,
      title: "Create Event"
    });
  }

  getRoutes(){
    // var keysToSearch = this.state.search.trim().split(',');
		fetch("https://wegotoo.herokuapp.com/searchKeywords", {
    // fetch("https://localhost:8000/searchKeywords", {
		method: 'POST',
		headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			keywords: this.state.search.trim().split(',')
		})
	}).then((response) => response.json())
		.then((responseData) => {
			console.log('DATA FROM SERVER', responseData);
        for (var i = 0; i < responseData.length; i++){
          routes2.push(responseData[i]);
        }
			//update Asynch storage
	 }).catch((error) => {
     console.error(error);
   })
	 .done();
  }

  renderRow(rowData: string, sectionID: number, rowID: number,
    highlightedRow: (sectionID: nunber, rowID: number) => void) {
    return (
      <TouchableOpacity style={styles.routeRow} onPress={(event) => this.handleItemClick(rowData)}>
      <View>
        <Text style={{alignItems: 'center', padding: 3}}>{'\n'}{rowData.title}{'\n'}</Text>
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
          fontSize={15}
          padding={10}
          value={this.state.search}
          placeholder="Enter keywords: ex. NYC,Atlanta,City-Of-Love"
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
