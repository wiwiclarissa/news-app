import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import NewsListScene from './NewsListScene';
import SourceListScene from './SourceListScene';
import NewsContentScene from './NewsContentScene';

const MainNavigator = createStackNavigator({
  NewsSource: {screen: SourceListScene},
  NewsList: {screen: NewsListScene},
  NewsContent: {screen: NewsContentScene},
});

const App = createAppContainer(MainNavigator);

export default App;

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="blue" hidden={false} barStyle="light-content" />
//       <Text>Source List</Text>
//       <SourceListScene />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
