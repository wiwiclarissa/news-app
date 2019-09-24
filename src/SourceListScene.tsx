import React, { Component } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text, View, ScrollView } from 'react-native';

type Source = {
    id: string,
    name: string,
    url: string,
}

type Props = {
    navigation: any,
};
type State = {
    sourceList: Array<Source>,
}
type ItemProps = {
    name: string,
}

function Item({name}: ItemProps){
    return (
        <TouchableOpacity style={styles.item}>
            <Text>{name}</Text>
        </TouchableOpacity>
    );
}


export default class SourceListScene extends Component<Props, State>{
    state: State = {
        sourceList: [],
    }

    static navigationOptions = {
        title: 'Source List',
    };

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
        const {navigate} = this.props.navigation;

        return(
            <ScrollView style={{alignSelf: 'stretch'}}>
                <FlatList 
                    data={this.state.sourceList}
                    renderItem={({item}) => {return (
                        <TouchableOpacity style={styles.item} onPress={ () => navigate('NewsList', {id: item.id, name: item.name})}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    )}}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    item: {
      backgroundColor: '#fff',
      padding: 20,
      marginHorizontal: 8,
      alignSelf: 'stretch',
      borderWidth: 1,
      borderColor: '#ddd',
    },
  });