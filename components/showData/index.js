import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as SQLite from 'expo-sqlite'
const db = SQLite.openDatabase('db.testDb16') // returns Database object

function Page6({ navigation, route }) {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showData, setShowData] = useState(false);
  const [inData, setINData] = useState([]);
  const [outData, setOUTData] = useState([]);
  const [selectedOperation, setselectedOperation] = useState('');
  const [calculatedSum, setCalculatedSum] = useState('');
  const [calculatedSumForEachBill, setCalculatedSumForEachBill] = useState([]);
  const entryIN = 'IN';
  const entryOUT = 'OUT';

  const trialData = [{ "BillNumber": 845, "Item": "Local FTA Brass 2\"", "Value": 75 }, { "BillNumber": 845, "Item": "Plasto Tee Brass 2\"", "Value": 7500 }, { "BillNumber": 159, "Item": "Plasto Ball Valve Brass 2\"", "Value": 250 }, { "BillNumber": 159, "Item": "Local Reducer cPVC 3\"", "Value": 7500 }];



  useEffect(() => {
    // This will run every time `myState` changes.
    // Here you can perform the operations that you need to do after the state has been updated.
    //console.log(`myState has been updated to ${inData}`);
    //console.log(inData);
    calculateData('IN');
  }, [inData]);

  useEffect(() => {
    // This will run every time `myState` changes.
    // Here you can perform the operations that you need to do after the state has been updated.
    //console.log(`myState has been updated to ${outData}`);
    //console.log(inData);
    calculateData('OUT');
  }, [outData]);

  useEffect(() => {
    // This will run every time `myState` changes.
    // Here you can perform the operations that you need to do after the state has been updated.
    // console.log(`calculatedSumForEachBill has been updated to ${calculatedSumForEachBill}`);
    console.log('the changed value is ', calculatedSumForEachBill);
    setShowData(true);
  }, [calculatedSumForEachBill]);

  const onValueChange = (value) => {
    setSelectedItem(value);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
    setShowData(false);
    setCalculatedSumForEachBill([]);
  };

  const showDatepicker = () => {
    setShowPicker(true);
    setShowData(false);
    setCalculatedSumForEachBill([]);
  };

  const calculateData = (text) => {
    if (text == 'IN' && inData != []) {

      const result = inData.reduce((acc, item) => {
        const { BillNumber, Quantity, Price } = item;
        acc[BillNumber] = (acc[BillNumber] || 0) + Quantity * Price;
        return acc;
      }, {});

      const transformedData = Object.entries(result).map(([key, value]) => ({
        BillNumber: key,
        Value: result[key],
      }));
      //console.log(uniqueBills);
      setCalculatedSumForEachBill(transformedData);
      // console.log('The final in data is  ',calculatedSumForEachBill); // {123: 260, 124: 585}

    }
    else if (text == 'OUT' && outData != []) {

      // const newArray = outData.map(item => {
      //   const value = item.Price * item.Quantity;
      //   const newItem = {
      //     BillNumber: item.BillNumber,
      //     Item: `${item.Brand} ${item.HardwareItem} ${item.Material} ${item.Size}`,
      //     Value: value
      //   };
      //   return newItem;
      // });
      const result = outData.reduce((acc, item) => {
        const { BillNumber, Quantity, Price } = item;
        acc[BillNumber] = (acc[BillNumber] || 0) + Quantity * Price;
        return acc;
      }, {});

      const transformedData = Object.entries(result).map(([key, value]) => ({
        BillNumber: key,
        Value: result[key],
      }));
      setCalculatedSumForEachBill(transformedData);
      console.log(calculatedSumForEachBill); // {123: 260, 124: 585}
    }

  }

  const handlePress = (billnumber) => {
    navigation.navigate('Page7', { data: selectedOperation == 'IN' ? inData : outData, billNum: billnumber });
  };

  //   const Item = ({ billnumber, value, item }) => (

  //     <TouchableOpacity>
  // <View style={{flexDirection:'row'}}>
  //       <Text style={{ flex: 1 }}>{billnumber}</Text>
  //       <Text style={{ flex: 1 }}>{item}</Text>
  //       <Text style={{ flex: 1 }}>{value}</Text>
  //     </View>
  //     </TouchableOpacity>

  //   );

  const Item = ({ billnumber, value }) => (

    <TouchableOpacity style={styles.itemHeader} onPress={() => handlePress(billnumber)}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.item}>{billnumber}</Text>
        <Text style={styles.item}>{value}</Text>
      </View>
    </TouchableOpacity>

  );


  const renderItem = ({ item }) => (
    <Item billnumber={item.BillNumber} value={item.Value} ></Item>)

  // const renderItem = ({ item }) => {

  //   (<View style={{ flexDirection: 'row', paddingVertical: 10 }}>
  //           <View style={{ flex: 1 }}>
  //             <Text>{item.BillNumber}</Text>
  //           </View>
  //           <View style={{ flex: 2 }}>
  //             {item.Items.map((item, index) => (
  //               <View key={`${item.Item}-${index}`} style={{ flexDirection: 'row' }}>
  //                 <View style={{ flex: 1 }}>
  //                   <Text>{item.Item}</Text>
  //                 </View>
  //                 <View style={{ flex: 1 }}>
  //                   <Text>{item.Value}</Text>
  //                 </View>
  //               </View>
  //             ))}
  //           </View>
  //         </View>
  //   )
  // };

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

  const showDetails = (entry) => {
    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).replace(',', '');
    console.log('The formatted date is ', formattedDate); // Output: "May 6, 2023"
    if (entry == 'IN') {
      setselectedOperation('IN');
      //console.log('IN Data');
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql('SELECT * FROM data WHERE ENTRY = ? AND Timestamp LIKE ?', ['IN', '%' + formattedDate + '%'], // passing sql query and parameters:null
          // success callback which sends two things Transaction object and ResultSet Object
          (txObj, { rows: { _array } }) => {

            setINData(_array);
            //console.log(inData);
            //setCalculatedSum('');
            //calculateData('IN');
          }
          ,
          // failure callback which sends two things Transaction object and Error
          (txObj, error) => console.log('Error ', error)
        ) // end executeSQL

      }) // end transaction
      //if (inData != []) {
      //calculateData('IN')
      //}
    }
    else if (entry == 'OUT') {
      setselectedOperation('OUT');
      //console.log('OUT Data');
      db.transaction(tx => {
        // sending 4 arguments in executeSql
        tx.executeSql('SELECT * FROM data WHERE ENTRY = ? AND Timestamp LIKE ?', ['OUT', '%' + formattedDate + '%'], // passing sql query and parameters:null
          // success callback which sends two things Transaction object and ResultSet Object
          (txObj, { rows: { _array } }) => {
            //console.log(_array);
            setOUTData(_array);
            // setCalculatedSum('');

          },
          // failure callback which sends two things Transaction object and Error
          (txObj, error) => console.log('Error ', error)
        ) // end executeSQL

      }) // end transaction

    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Button onPress={showDatepicker} title="Pick a date" />
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => { showDetails('IN') }}>
          <Text>{entryIN}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { showDetails('OUT') }}>
          <Text>{entryOUT}</Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={calculatedSumForEachBill}
        renderItem={renderItem}
        keyExtractor={(item, index) => item + index}
        ListHeaderComponent={
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.itemHeader}>Billnumber</Text>
            {/* <Text style={styles.itemHeader}>Item</Text> */}
            <Text style={styles.itemHeader}>Value</Text>
          </View>
        }
        ItemSeparatorComponent={renderSeparator}
      />


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
    marginRight: 50,
    //marginVertical: 8,
    //marginHorizontal: 16,
    fontSize: 18,
    //flexDirection:'row'
  },
  itemHeader: {
    padding: 20,
    //marginVertical: 8,
    //marginHorizontal: 16,
    flex: 1,
    fontWeight: "bold",
    flexDirection: 'row'
  }
});

export default Page6;