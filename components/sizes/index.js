import React,{useState} from 'react';
import { View, Text, Button,TouchableOpacity,StyleSheet,FlatList  } from 'react-native';

function Page4({ navigation ,route}) {

  const { billNumber,entry,brand,material,hardwareItem } = route.params ?? {};
  const [selectedButton, handleButtonPress] = useState();

  const DATA = [
    { id: '1', title: '1"' },
    { id: '2', title: '1/2"' },
    { id: '3', title: '3/4"' },
    { id: '4', title: '2"' },
    { id: '5', title: '2 1/2"' },
    { id: '6', title: '3"' },
  ];
  console.log('in size page , ',entry);
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => {
      navigation.navigate('Page5',{billNumber:billNumber,entry:entry,brand:brand,material:material,hardwareItem:hardwareItem,size:item.title})
    }
      }>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
    <Text>Bill Number :{billNumber}</Text>
      <View style={styles.selectedItem}>
        <Text>{brand} </Text>
        <Text>{material} </Text>
        <Text>{hardwareItem}</Text>
      </View>
     {/* <Button title="Go to Page 5" onPress={() => navigation.navigate('Page4')} /> */}
     <Text>Select Size!!</Text>
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


export default Page4;
