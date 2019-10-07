import React, { Component } from 'react';
import { WebView } from 'react-native';

type Props = {
  navigation: any;
};
type State = {
  url: string;
};

export default class NewsContentScene extends Component<Props, State> {
  state = {
    url: '',
  };

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  });

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({ url: navigation.getParam('url') });
  }

  render() {
    let { url } = this.state;
    return <WebView source={{ uri: url }} />;
  }
}
