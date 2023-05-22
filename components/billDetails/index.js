import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';

function Page7({ navigation, route }) {
    const { data, billNum } = route.params ?? {};
    console.log('Reached page 7');
    
    console.log('bill number is ', billNum);

    const newArray = data.filter(item => item.BillNumber.toString() === billNum.toString()).map(item => {
        const newItem = {
            //BillNumber: item.BillNumber,
            Item: `${item.Brand} ${item.HardwareItem} ${item.Material} ${item.Size}`,
            Price: item.Price,
            Quantity: item.Quantity
        };
        return newItem;
    });
    console.log(newArray);
    const Item = ({  hardwareItem, price, quantity }) => (
    
        <TouchableOpacity style={styles.itemHeader}>
    <View style={{flexDirection:'row'}}>
          {/* <Text style={styles.item}>{billnumber}</Text> */}
          <Text style={styles.item}>{hardwareItem}</Text>
          <Text style={styles.item}>{price}</Text>
          <Text style={styles.item}>{quantity}</Text>
        </View>
        </TouchableOpacity>
        
      );
    
    
      const renderItem = ({ item }) => <Item hardwareItem={item.Item} price={item.Price} quantity={item.Quantity}></Item>

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    };

    return (
        <View>
            <FlatList
                data={newArray}
                renderItem={renderItem}
                keyExtractor={item => item.BillNumber}
                ListHeaderComponent={
                    <View style={{ flexDirection: 'row' }}>
                        {/* <Text style={styles.itemHeader}>Billnumber</Text> */}
                        <Text style={styles.itemHeader}>Item</Text>
                        <Text style={styles.itemHeader}>Price</Text>
                        <Text style={styles.itemHeader}>Quantity</Text>
                    </View>
                }
                ItemSeparatorComponent={renderSeparator}
            />
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      //alignItems: 'flex-start',
      //justifyContent: 'center',
      //backgroundColor: '#f5fcff',
      //flex: 1,
      flexDirection: 'column',
      padding: 20,
      marginTop: 55,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      //width: '50%',
    },
    dateContainer: {
      flexDirection: 'row',
    },
    inoutContainer: {
      flexDirection: 'row',
    },
    button: {
      backgroundColor: 'rgb(33, 150, 243)',
      padding: 10,
      borderRadius: 5,
      marginRight: 10,
      width: '50%',
      alignSelf: 'center'
    },
    item: {
      //backgroundColor: '#f9c2ff',
      padding: 20,
      marginRight:50,
      //marginVertical: 8,
      //marginHorizontal: 16,
      fontSize:12,
      //flexDirection:'row'
    },
    itemHeader:{
      padding: 20,
      //marginVertical: 8,
      //marginHorizontal: 16,
      flex: 1, 
      fontWeight: "bold" ,
      flexDirection:'row'
    }
  });
  

export default Page7;