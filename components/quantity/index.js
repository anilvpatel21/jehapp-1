import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.testDb16') // returns Database object

function Page5({ navigation, route }) {

    const { billNumber, entry, brand, material, hardwareItem, size } = route.params ?? {};
    const [quantityValue, setQuantityValue] = useState('');
    const [priceValue, setPriceValue] = useState('');
    const [databaseData, setDataValue] = useState(null);
    const defaultQuantiyValues = ['+5', '+10', '+50', '+100', '+150', '+200', '+250'];
    const defaultPriceValues = ['+5', '+10', '+50', '+100', '+150', '+200', '+250'];
    const handleQuantityInputChange = (text) => {
        // Only accept numeric input
        // if (/^\d+$/.test(text)) {
        //     setQuantityValue(text);
        // }
        setQuantityValue(text);
    };
    const handlePriceInputChange = (text) => {
        // Only accept numeric input
        // if (/^\d+$/.test(text)) {
        //     setPriceValue(text);
        // }
        setPriceValue(text);
    };
    console.log('in quantity page , ', entry);
    const selectDefaultQuantityValue = (quantity) => {
        var updatedquantityValue = parseInt(quantity);
        if (quantityValue != '') {
            updatedquantityValue = parseInt(quantityValue) + parseInt(quantity);
        }


        setQuantityValue(updatedquantityValue.toString());
    }

    const selectDefaultPriceValue = (price) => {
        var updatedPriceValue = parseInt(price);
        if (priceValue != '') {
            updatedPriceValue = parseInt(priceValue) + parseInt(price);
        }


        setPriceValue(updatedPriceValue.toString());
    }

    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS data ( BillNumber INT,Entry TEXT,Brand TEXT, Material TEXT,HardwareItem TEXT,Size TEXT,Quantity INT,Price INT,Timestamp Date)'
        )
    })

    const addToDatabase = (text) => {
        console.log('timestamp in quantity is , ',Date());
        db.transaction(tx => {
            tx.executeSql('INSERT INTO data (BillNumber,ENTRY,Brand, Material, HardwareItem,Size, Quantity, Price,Timestamp) values (?,?,?,?,?,?,?,?,?)', [billNumber, entry, brand, material, hardwareItem, size, quantityValue, priceValue, Date()],
                // (txObj, resultSet) => this.setState({ data: this.state.data.concat(
                //     { id: resultSet.insertId, property: 'Brand', value: 'Plasto' }) }),
                (txObj, resultSet) => setDataValue(databaseData && databaseData.concat({ billNumber: billNumber, entry: entry, brand: brand, material: material, hardwareItem: hardwareItem, size: size, quantity: quantityValue, price: quantityValue, timestamp: Date() })),
                (txObj, error) => console.log('Error', error))
        })
        if(text == 'Continue')
            navigation.navigate('Page1', { billNumber: billNumber, entry: entry });
        else if(text == 'Finish')
            navigation.navigate('Page0');
    }

    const fetchData = () => {
        db.transaction(tx => {
          // sending 4 arguments in executeSql
          tx.executeSql('SELECT * FROM data', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, { rows: { _array } }) => console.log(_array) ,
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
           
        }) // end transaction
        
        console.log(databaseData);
      }

    return (
        <View style={styles.container}>
            <Text>Bill Number :{billNumber}</Text>
            <View style={styles.selectedItem}>
                <Text>{brand} </Text>
                <Text>{material} </Text>
                <Text>{hardwareItem} </Text>
                <Text>{size}</Text>
            </View>
            <Text>Select Quantity!!</Text>
            <TextInput
                style={styles.input}
                value={quantityValue}
                onChangeText={handleQuantityInputChange}
                keyboardType="numeric"
                placeholder="Enter Qty!"
            />

            <View style={styles.quantityContainer}>
                {defaultQuantiyValues.map((quantity, index) => (
                    <TouchableOpacity key={index} style={styles.button} onPress={() => selectDefaultQuantityValue(quantity)}>
                        <Text>{quantity}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text>Select Price!!</Text>
            <TextInput
                style={styles.input}
                value={priceValue}
                onChangeText={handlePriceInputChange}
                keyboardType="numeric"
                placeholder="Enter Price!"
            />

            <View style={styles.quantityContainer}>
                {defaultPriceValues.map((price, index) => (
                    <TouchableOpacity key={index} style={styles.button} onPress={() => selectDefaultPriceValue(price)}>
                        <Text>{price}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.submitContainer}>
                <TouchableOpacity style={styles.button} onPress={() => {addToDatabase('Continue')}}>
                    <Text>Submit & Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {addToDatabase('Finish')}}>
                    <Text>Finish</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={fetchData}>
                    <Text>FetchData</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
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
    input: {
        height: 40,
        width: '80%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        //width: '50%',
    },
    submitContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 50,
        //width: '50%',
    },
    button: {
        backgroundColor: 'rgb(33, 150, 243)',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
});


export default Page5;
