import React,{useState} from 'react';
import { View, Text, Button,TouchableOpacity,StyleSheet,FlatList } from 'react-native';


function Page1({ navigation,route}) {
  
  const [selectedButton, handleButtonPress] = useState();
  const { billNumber,entry } = route.params ?? {};
  const DATA = [
    { id: '1', title: 'Plasto' },
    { id: '2', title: 'Local' },
  ];
  console.log('in brands page , ',entry);
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => {
      //alert(`Pressed ${item.title}`);
      navigation.navigate('Page2',{ billNumber:billNumber,entry:entry,brand:item.title})}
      
      }>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  
  return (
    

    <View style={styles.container}>
      <Text>Bill Number :{billNumber}</Text>
      
       {/* <Button title="Go to Page 2" onPress={() => navigation.navigate('Page2')} /> */}
       <Text>Select Brand!!</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'flex-start',
    //justifyContent: 'center',
    //backgroundColor: '#f5fcff',
    //flex: 1,
     padding: 20,
    marginTop: 55,
  },
  selectedItem: {
    flexDirection: 'row',
  },
  item: {
    backgroundColor: 'rgb(33, 150, 243)',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
});

export default Page1;
