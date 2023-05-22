// import React, { Component } from 'react';
// import { AppRegistry, Text, TextInput, View, Button,StyleSheet } from 'react-native';

// export default class PizzaTranslator extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { text: '', items: [], showAll: false };
//   }
//   addItem = (text) => {
//     this.state.items.push(text);
//     this.setState({ text: '' ,showAll:false});
//   }
//   handleButtonPress = () => {
//     this.setState({ showAll: true });
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Add item!!</Text>
//         <TextInput
//           style={{ height: 40, backgroundColor: 'azure', fontSize: 20 }}
//           placeholder="Add Items!"
//           onChangeText={(text) => this.setState({ text })}
//           onSubmitEditing={() => this.addItem(this.state.text)}
//           value={this.state.text}
//         />

//           <Text>Add item!!</Text>
//           <TextInput
//             style={{ height: 40, backgroundColor: 'azure', fontSize: 20 }}
//             placeholder="Add Items!"
//             onChangeText={(text) => this.setState({ text })}
//             onSubmitEditing={() => this.addItem(this.state.text)}
//             value={this.state.text}
//           />

//         {/*<Text>Array contents:</Text>
//          {this.state.items.map((item, index) => (
//           <Text key={index}>{item}</Text>
//         ))} */}
//         {this.state.showAll ? (
//           this.state.items.map((item, index) => (
//             <Text key={index}>{item}</Text>
//           ))
//         ) : (
//           <Button title="Show all" onPress={this.handleButtonPress} ></Button>
//         )}
//       </View>
//     );
//   }
// }  
// const styles = StyleSheet.create ({  
//   container: {  
//       flex: 1,  
//       flexDirection: 'row',  
//       backgroundColor:"#5ead97" ,
//       alignItems: 'center'
//   }  
// })  

import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';

export default class MapExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      brand: '',
      item: '',
      material: '',
      size: '',
      quantity: '',
      showComponent: false,
    };
  }

  addItem = () => {
    const { brand, item, material, size, quantity, items } = this.state;
    // if(newItems.has(name))
    // {
    //   const existingQuantity = newItems.get(name);
    //   newItems.set(name,parseInt(existingQuantity)+parseInt(quantity));
    // }
    // else
    // {
    //   newItems.set(name, quantity);
    // }
    const newItems = [...this.state.items, { brand: brand, item: item, material: material, size: size, quantity: quantity }];
    this.setState({ items: newItems, brand: '', item: '', material: '', size: '', quantity: '' });
  };

  removeItem = (name) => {
    // const { items } = this.state;
    // const newItems = new Map(items);
    // newItems.delete(name);
    // this.setState({ items: newItems });
  };

  toggleShowComponent = ()=> {
    const { showComponent } = this.state;  
        if (showComponent) {  
            this.setState({ showComponent: false });  
        } else {  
            this.setState({ showComponent: true }); 
        }  
  };

  renderRow = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.column}>{item.brand}</Text>
      <Text style={styles.column}>{item.item}</Text>
      <Text style={styles.column}>{item.material}</Text>
      <Text style={styles.column}>{item.size}</Text>
      <Text style={styles.column}>{item.quantity}</Text>
    </View>
  );

  tableHeader = () => {
    return (
      <View style={styles.tableRow}>
        <Text style={styles.tableHeader}>Brand</Text>
        <Text style={styles.tableHeader}>Item</Text>
        <Text style={styles.tableHeader}>Material</Text>
        <Text style={styles.tableHeader}>Size</Text>
        <Text style={styles.tableHeader}>Quantity</Text>
      </View>
    );
  };

  render() {
    const { brand, item, material, size, quantity, items } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <Text>Enter Brand!!</Text>
          <TextInput
            style={styles.input}
            placeholder="Brand"
            value={brand}
            onChangeText={(brand) => this.setState({ brand })}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text>Enter Item!!</Text>
          <TextInput
            style={styles.input}
            placeholder="Item"
            value={item}
            onChangeText={(item) => this.setState({ item })}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text>Enter Material!!</Text>
          <TextInput
            style={styles.input}
            placeholder="Material"
            value={material}
            onChangeText={(material) => this.setState({ material })}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text>Enter Size!!</Text>
          <TextInput
            style={styles.input}
            placeholder="Size"
            value={size}
            onChangeText={(size) => this.setState({ size })}
          />
        </View>
        <View style={styles.nameContainer}>
          <Text>Enter Quantity!!</Text>
          <TextInput
            style={styles.input}
            placeholder="Quantity"
            value={quantity}
            onChangeText={(quantity) => this.setState({ quantity })}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.button} onPress={this.addItem}>
            <Text style={styles.buttonText}>Add Items</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.toggleShowComponent} >
            { this.state.showComponent ? <Text style={styles.buttonText} >Hide Items</Text> : 
            <Text style={styles.buttonText} >Show Items</Text> }
          </TouchableOpacity>
        </View>
        {this.state.showComponent && 
        <View style={styles.tableContainer}>
          <Text style={styles.tableHeader}>Items</Text>
          {/* <View style={styles.table}>
            {Array.from(items).map(([brand, item, material, size, quantity]) => (
              <View style={styles.tableRow} key={brand}>
                <Text style={styles.tableCell}>{brand}</Text>
                <Text style={styles.tableCell}>{item}</Text>
                <Text style={styles.tableCell}>{material}</Text>
                <Text style={styles.tableCell}>{size}</Text>
                <Text style={styles.tableCell}>{quantity}</Text>
                <TouchableOpacity style={styles.removeButton} onPress={() => this.removeItem(name)}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
            <FlatList style={styles.tableRow}
              data={this.state.items}
              renderItem={({ item }) => (
                <View>
                  <Text style={styles.tableCell}>{item.brand}</Text>
                  <Text style={styles.tableCell}>{item.item}</Text>
                  <Text style={styles.tableCell}>{item.material}</Text>
                  <Text style={styles.tableCell}>{item.size}</Text>
                  <Text style={styles.tableCell}>{item.quantity}</Text>
                </View>
              )}
              keyExtractor={item => item.brand}
            />
            

          </View> */}
          <FlatList
              data={this.state.items}
              ListHeaderComponent={<this.tableHeader />}
              renderItem={this.renderRow}
              keyExtractor={(item, index) => index.toString()}
            />
        </View>}
      </View>
    );
  }
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 55,
  },
  nameContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  formContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  column: {
    flex: 1,
    textAlign: 'left',
  },
  input: {
    //flex: 1,
    height: 40,
    width: width,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex:1,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  tableContainer: {
    flex: 1,
  },
  tableHeader: {
    flex:1,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCCCCC',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 10,
    alignItems: 'center',
    fontWeight: 'bold',
    //padding: 10,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    //padding: 
  }
}) 
