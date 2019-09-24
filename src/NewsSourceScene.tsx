import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text, View, ScrollView } from 'react-native';

type Source = {
    id: string,
    name: string,
    url: string,
}

type Props = {};
type State = {
    sourceList: Array<Source>,
}

function Item({name}){
    return (
        <TouchableOpacity style={styles.item}>
            <Text>{name}</Text>
        </TouchableOpacity>
    );
}


export default class NewsSourceScene extends Component<Props, State>{
    state = {
        sourceList: [],
    }

    async _fetchData(){
        let url = 'https://newsapi.org/v2/sources?apiKey=f22e7809ce4b46b7afbe1bc50ad09e51';
        let result = await fetch(url);
        let jsonData = await result.json();
        this.setState({sourceList: jsonData.sources});
        // return jsonData.sources;
    }

    componentDidMount(){
        this._fetchData();
    }

    render() {
        return(
            <ScrollView style={{alignSelf: 'stretch'}}>
                <FlatList 
                    data={this.state.sourceList}
                    renderItem={({item}) => (
                        <Item name={item.name} />
                    )}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    item: {
      backgroundColor: '#f7f7ff',
      padding: 20,
      marginHorizontal: 8,
      alignSelf: 'stretch',
      borderWidth: 1,
      borderColor: '#ddd',
    },
  });