import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';


function Page0({ navigation }) {

    const entryIN = 'IN';
    const entryOUT = 'OUT';
    const showData = 'Show Data!!';
    const [billNumber, setBillNumber] = useState('');

    const handleBillNumberValue = (text) => {
        setBillNumber(text);
    };

    return (


        <View style={styles.container}>
            <Text>This is Page 0</Text>
            <TextInput
                style={styles.input}
                value={billNumber}
                onChangeText={handleBillNumberValue}
                keyboardType="numeric"
                placeholder="Enter Bill Number!"
            />
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Page1',{entry:entryIN,billNumber:billNumber})}>
                <Text>{entryIN}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Page1',{entry:entryOUT,billNumber:billNumber})}>
                <Text>{entryOUT}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Page6')}>
                <Text>{showData}</Text>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        //width: '50%',
    },
    button: {
      backgroundColor: 'rgb(33, 150, 243)',
      padding: 10,
      borderRadius: 5,
      marginRight: 10,
      width: '20%',
      alignSelf: 'center'
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
  });

export default Page0;