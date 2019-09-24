import React, { Component } from 'react';
import { ScrollView, FlatList, TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import { NavigationScreenProps, NavigationState } from 'react-navigation'

type Props = {
    navigation: any,
};
type State = {
    news: Array<ItemProps>
};
type ItemProps = {
    title: string,
    description: string,
    urlToImage: string,
    onPress?: () => void,
    url: string, 
}


function Item({title, description, urlToImage, onPress}: 
    ItemProps){
    return (
        <TouchableOpacity style={styles.item} onPress={onPress}>
            <View style={{flexDirection: 'row'}}>
                <View>
                    <Image style={styles.images} source={{uri: urlToImage}} />
                </View>
                <View style={{marginLeft: 5, flex: 1, flexWrap: 'wrap'}}>
                    <Text style={styles.title}>{title}</Text>
                    <Text>{description}</Text>
                </View>
            </View>
            
            
        </TouchableOpacity>
    );
}


export default class NewsListScene extends Component<Props, State> {
    state : State = {
        news: [],
    }


    static navigationOptions = (({navigation} : NavigationScreenProps<NavigationState>) => ({
        title: `${navigation.state.params.name}`
    }));

    async _fetchData(){
        const { navigation } = this.props;
        
        let id = navigation.getParam('id');
        let url = `https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=f22e7809ce4b46b7afbe1bc50ad09e51`;
        let result = await fetch(url);
        let jsonData = await result.json();
        this.setState({news: jsonData.articles});
    }

    componentDidMount() {
        this._fetchData();
    }

    render() {
        const {navigate} = this.props.navigation;
        let {news} = this.state;
        return(
            <ScrollView style={{alignSelf: 'stretch'}}>
                <FlatList
                    data={news}
                    renderItem={({item}) => (
                        <Item 
                            title={item.title} 
                            description={item.description}
                            urlToImage={item.urlToImage}
                            onPress={() => navigate('NewsContent', {title: item.title, url: item.url})}
                        />
                    )}
                    keyExtractor={item => item.url}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#fff',
      padding: 15,
      marginHorizontal: 8,
      alignSelf: 'stretch',
      borderWidth: 1,
      borderColor: '#ddd',
      position: 'relative',
    },
    images: {
        width: 80,
        height: 80,
    },
    title: {
        fontWeight: 'bold',
    }
  });