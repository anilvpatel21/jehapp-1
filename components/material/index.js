import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, FlatList } from 'react-native';



function Page2({ navigation, route }) {

  const { billNumber, entry, brand } = route.params ?? {};
  const [selectedButton, handleButtonPress] = useState();
  //console.log(brand.title);
  //console.log(brand.id);
  const DATA = [
    { id: '1', title: 'cPVC' },
    { id: '2', title: 'uPVC' },
    { id: '3', title: 'Brass' },
  ];
  console.log('in material page , ', entry);
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => {
      //alert(`Pressed ${item.title}`);
      navigation.navigate('Page3', { billNumber: billNumber, entry: entry, brand: brand, material: item.title })
    }
    }>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text>Bill Number :{billNumber}</Text>
      <View style={styles.selectedItem}>
        <Text>{brand}</Text>
      </View>
      {/* <Button title="Go to Page 3" onPress={() => navigation.navigate('Page3')} /> */}
      <Text>Select Material!!</Text>
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
  item: {
    backgroundColor: 'rgb(33, 150, 243)',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  selectedItem: {
    flexDirection: 'row',

  },
  title: {
    fontSize: 16,
  },
});

export default Page2;
