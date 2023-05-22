import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

function Page3({ navigation, route }) {

  const { billNumber, entry, brand, material } = route.params ?? {};
  const [selectedButton, handleButtonPress] = useState();

  const DATA = [
    { id: '1', title: 'Elbow' },
    { id: '2', title: 'Tee' },
    { id: '3', title: 'FTA' },
    { id: '4', title: 'MTA' },
    { id: '5', title: 'Reducer' },
    { id: '6', title: 'End Cap' },
    { id: '7', title: 'Ball Valve' },
  ];
  console.log('in items page , ', entry);
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => {
      //alert(`Pressed ${item.title}`);
      navigation.navigate('Page4', { billNumber: billNumber, entry: entry, brand: brand, material: material, hardwareItem: item.title })
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
        <Text>{material}</Text>
      </View>
      {/* <Button title="Go to Page 4" onPress={() => navigation.navigate('Page4')} /> */}
      <Text>Select Item!!</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  selectedItem: {
    flexDirection: 'row',

  },
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
  title: {
    fontSize: 16,
  },
});


export default Page3;
