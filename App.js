import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';

// Import getNews from news.js
import { getNews } from './src/news';
import Article from './src/components/Article';
import { ListItem, SearchBar } from 'react-native-elements';
import SplashScreen from 'react-native-splash-screen';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], refreshing: true };
    this.arrayholder = [];
    this.fetchNews = this.fetchNews.bind(this);
  }

  componentDidMount() {
     SplashScreen.hide()
    this.fetchNews();
  }

  setdata = (articles) => {
    this.setState({ articles, refreshing: false })
    this.arrayholder = articles;
  }
  fetchNews() {
    getNews()
      .then(articles =>
        this.setdata(articles))
      .catch(() => this.setState({ refreshing: false }));
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => this.fetchNews()
    );
  }
  searchFilterFunction = text => {
   this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      console.log(item, 'item');
      const itemData = `${item.title}  ${item.description}`;
      const textData = text;

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      articles : newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() {
    console.log('articles', this.state.articles);
    return (
      <View style={styles.mainContainer}>
               <View style={styles.toolbar}>
                    <Text style={styles.toolbarButton}>Add</Text>
                    <Text style={styles.toolbarTitle}>This is the title</Text>
                    <Text style={styles.toolbarButton}>Like</Text>
                </View>
                <View style={styles.content}>
  
                    {/* START NEW CODE */}
 
                    <View style={styles.messageBox}>
                        <View>
                            <Text style={styles.messageBoxTitleText}>A simple mesage</Text>
                        </View>
                        <View>
                            <Text style={styles.messageBoxBodyText}>This is just a dummy sample it will help us to see the alignment in action.</Text>
                        </View>
                    </View>

              {/* END NEW CODE */}
  
                </View>
            </View>
      // <FlatList
      //   data={this.state.articles}
      //   renderItem={({ item }) => <Article article={item} />}
      //   keyExtractor={item => item.url}
      //   refreshing={this.state.refreshing}
      //   onRefresh={this.handleRefresh.bind(this)}
      //   ListHeaderComponent={this.renderHeader}
        
      // />
    );
  }
}
var styles = StyleSheet.create({
  toolbar:{
      backgroundColor:'#81c04d',
      paddingTop:30,
      paddingBottom:10,
      flexDirection:'row'    //Step 1
  },
  toolbarButton:{
      width: 50,            //Step 2
      color:'#fff',
      textAlign:'center'
  },
  toolbarTitle:{
      color:'#fff',
      textAlign:'center',
      fontWeight:'bold',
      flex:1                //Step 3
  },
  mainContainer:{
    flex:1                  //Step 1
},
content:{
    backgroundColor:'#ebeef0',
    flex:1                //Step 2
}
});
