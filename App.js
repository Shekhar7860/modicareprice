import React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableHighlight } from 'react-native';

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
                    <Text style={styles.toolbarButton}></Text>
                    <Text style={styles.toolbarTitle}>Home</Text>
                    <Text style={styles.toolbarButton}></Text>
                </View>
                <View style={styles.content}>
  
                    {/* START NEW CODE */}
 
                    <View style={styles.messageBox}>
                       
                            <Text style={styles.topText}>Welcome Mesage</Text>
                       
                            <Text style={styles.messageBoxBodyText}>Hello everyone, Here is an application that can help you knowing about specific prices list, business volume points and quantity of modicare products. You can check the pictures of products as well as search for a specific modicare product. All of these products are available at the modicare distribution point. So, To get started, click on the button below</Text>
                            <TouchableHighlight style={styles.fullWidthButton} onPress={this.buttonPressed}>
            <Text style={styles.fullWidthButtonText}>Let's get started</Text>
            </TouchableHighlight>
            <Text style={styles.messageBoxBodyText2}>If you have any query related to modicare, you can call me +919646407363</Text>
                    </View>
                    {/* <View style={styles.inputsContainer}>
          
</View> */}

                       
                          
                       
                        
                       
     
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
      paddingTop:20,
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
      flex:1,
      fontSize:20                //Step 3
  },
  mainContainer:{
    flex:1                  //Step 1
},
content:{
    backgroundColor:'#ebeef0',
    flex:1                //Step 2
},
messageBox:{
  alignItems : 'center'
},
messageBoxBodyText:{
  margin:10,
  fontSize:15
},
messageBoxBodyText2:{
  margin:10,
  fontSize:18
},
topText:{
  fontSize:20,
  marginTop : 10
},
topText2:{
  fontSize:20,
  marginTop : 10,
  marginLeft:10
},
inputsContainer: {
  flex: 1,
  alignItems : 'center'
},
fullWidthButton: {
  backgroundColor: 'blue',
  height:70,
  width:'80%',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
},
fullWidthButtonText: {
  fontSize:24,
  color: 'white'
}
});
