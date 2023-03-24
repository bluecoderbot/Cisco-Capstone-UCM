// import axios from 'axios';
// import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// const api = axios.create({
//     // baseURL: 'https://next.json-generator.com/api/json/get/VyvneTarq'
//     baseURL: 'http://13.57.81.55/getpost_test'
//     // baseURL: 'https://next.json-generator.com/api/json/get/Nyt8D66Bc'
// })

// export default class App extends Component {

//     // state = {
//     //     dummyData: []
//     // }

//     // constructor() {
//     //     super();
//     //     api.get('/').then(res => {
//     //         console.log(res.data)
//     //         this.setState({ dummyData: res.data })
//     //     })
//     // }
//     // createDummyData = async () => {
//     //     let res = await api.post('/', { title: "Test", id: 4, author: "test" })
//     //     console.log(res)
//     // }

// // TUTORIAL
//     // https://www.youtube.com/watch?v=rpg1jOvGCtQ&ab_channel=PedroTech
//     getTest(){
//         axios.get('/user', {
//             params: {
//                 id: 2
//             }
//             })
//             .then(function (response) {
//             console.log(response);
//             })
//             .catch(function (error) {
//             console.log(error);
//             }); 
//     }

//     render() {
//         return (
//             <View style={styles.container}>

//                 {this.state.dummyData.map(dummyData => <Text style={styles.welcome} key={dummyData.id}>{dummyData.method} {dummyData.error}</Text>)}
//                 console.log(response.error);
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF'
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10
//     }
// });
//------------------ WORKING FETCH CALL
// import React, { Component } from 'react';
// import { TouchableOpacity, View, ActivityIndicator, Text, Alert } from 'react-native';
// export default class App extends Component {
//     handlePress = async () => {
//         fetch('http://13.57.81.55/getpost_test', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 id: 2
//             })
//         })
//             .then((response) => response.json())
//             .then((responseJson) => {
//                 // So something with the JSON response
//                 Alert.alert("Method Used: " + responseJson.method);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }
//     render() {
//         return (
//             <View style={{ alignItems: 'center', marginTop: 100 }}>
//                 {/* <Text> Some other text </Text>
//     <Text> Some other text </Text> */}
//                 <TouchableOpacity onPress={this.handlePress.bind(this)}>
//                     <Text> Click to see test JSON </Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }

import React, { Component, useEffect } from 'react';
import { TouchableOpacity, View, ActivityIndicator, Text } from 'react-native';

const App = () => {
    // Onpress -> POST Data to backend
    // const [method, setMethod] = React.useState(null);
    const [data, setData] = React.useState([]);
    console.log(data);

    useEffect(() => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // id: '0'
                name: 'SAMPLE',
                devices: "{0: 'abcdef', 1: '12345678',2: '11345678',3: '12145678',4: '12315678',5: '12341678',6: 'abcdeg',7: 'abcdeh'}"
            })
        };
        // fetch('http://13.57.81.55/getpost_test', requestOptions)
        fetch('http://13.57.81.55/add_devices', requestOptions)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
        // .then((responseJson) => {
        //     // So something with the JSON response
        //     Alert.alert("Method Used: " + responseJson.method);
        // })
        // .then(method => setMethod(method.method))
        // .then(IDNum => setid(IDNum.id))
        // .then(data => setid(data.id))
        // .then(response => response.json())
        // .then((response))
        // .catch((error) => {
        //     console.error(error);
        // });

    }, []);

    return (
        <View style={{ alignItems: 'center', marginTop: 100 }}>
            <Text>{data.id}</Text>
            <Text>{data.method}</Text>
            <Text>{data.error}</Text>
        </View>
    )
}

export default App;

// POST API CODE
// fetch('http://mywebsite.com/endpoint/', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'applications/json'
//     },
//     body: JSON.stringify({
//         firstParam: 'yourValue',
//         secondParam: 'yourOtherValue'
//     })
// });
