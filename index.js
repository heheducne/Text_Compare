/**
 * @format
 */
import {AppRegistry} from 'react-native';
import {React,useCallback,useState } from 'react';
import {name as appName} from './app.json';
import {StyleSheet, Text, SafeAreaView, Button,ScrollView,View,ImageBackground,Alert,Image,TextInput} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import DocumentPicker from 'react-native-document-picker';
import RNFS  from 'react-native-fs'
import Highlighter from './highlight.js';
import {NavigationContainer} from '@react-navigation/native';

//////////////////////////////////////////////
AppRegistry.registerComponent(appName, () => App);

const logo = { uri: 'https://reactnative.dev/img/tiny_logo.png',width: 64, height: 64};
const background = { uri: 'https://images.pexels.com/photos/2310713/pexels-photo-2310713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' };
  
const App = () =>{
    ///set value
    const [nameFile1, setnameFile1] = useState("Chọn File số 1");
    const [nameFile2, setnameFile2] = useState("Chọn File số 2");
    const [fileData1, setFileData1] = useState("Text số 1");//////biến lưu dư liệu text 1
    const [fileData2, setFileData2] = useState("Text số 2");//////biến lưu dữ liệu text 2
    const[numofLineFile1,setnumofLineFile1] = useState(0);
    const[numofLineFile2,setnumofLineFile2] = useState(0);
    const [search_word1,setsearchWord1] = useState(""); 
    const [search_word2,setsearchWord2] = useState(""); 
    ////////////////////////////////////////////////
    //////////////////// pick file ////////////////////////////////
let ChoseFile1 = useCallback(async () => {
    try {
      let response1 = await DocumentPicker.pickSingle();
      setnameFile1(response1.name);
      readFile1(response1.uri);
    } catch (err) {
      console.warn(err);
    }
  }, []);
let ChoseFile2 = useCallback(async () => {
    try {
      let response2 = await DocumentPicker.pickSingle();
      setnameFile2(response2.name);
      readFile2(response2.uri);
    } catch (err) {
      console.warn(err);
    }
  }, []);
    /////////////////////////////////////////////////
    /////////////////////read file///////////////////
    let readFile1 = async (path) => {
      let response = await (await RNFS.readFile(path)).toString();
      while(response[response.length-1]=='\n'){
        response=response.slice(0, -1);
      }
      setFileData1(response); //set the value of response to the fileData Hook.
      setnumofLineFile1(response.split("\n").length);
    };
    let readFile2 = async (path) => {
      let response = await (await RNFS.readFile(path)).toString();
      while(response[response.length-1]=='\n'){
        response=response.slice(0, -1);
      }
      setnumofLineFile2(response.split("\n").length);
      setFileData2(response); //set the value of response to the fileData Hook.
    };
    /////////////////////////////////////////////////
    return (
      <NavigationContainer>

        
      <ScrollView style={styles.container}>
        <ImageBackground source={background} resizeMode="stretch" style={styles.image}>
        <Text>{"\n"}</Text>
        <Text style={styles.title}>TEXT COMPARE APP</Text>
        <Image  source={logo} style ={{justifyContent: 'center',alignSelf: 'center'}}/>
        <Text>{"\n"}</Text>
  
        <View style={styles.fixToText}>
          <Button
              title="Lịch sử 🔒"
              onPress={() => Alert.alert('Nút Lịch sử đã được bấm')}
          />
          <Button
              title="Reset 🔑"
              onPress={() => {
                setnameFile1("Chọn file số 1")
                setnameFile2("Chọn file số 2")
                setFileData1("Text số 1")
                setFileData2("Text số 2")
                setnumofLineFile1("0")
                setnumofLineFile2("0")
                setsearchWord1("Tìm kiếm")
                setsearchWord2("Tìm kiếm")
              }}
          />
        </View>
  
      <Text>{"\n"}</Text>
      <Text style={styles.normal}>Các cách thực hiện:</Text>
      <Text style={styles.unnormal}>- Chọn 2 file txt để so sánh{"\n"}
                                    - Paste text vào 2 text box{"\n"}</Text>
      
      <SafeAreaView style={styles.normal}>
        <Text style={styles.filename}>File 1 📁</Text>
        <View style={styles.innerContainer}>  
            <TextInput  
                    placeholder = {nameFile1} 
                    style={styles.textStyle}  
                    editable ={false}
            />  
            <Button
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
                title="Chọn 📑"
                onPress={ChoseFile1}
            />
        </View>
    
        <Text>{"\n"}</Text>

        <Text style={styles.filename}>File 2 📁</Text>
        <View style={styles.innerContainer}>  
            <TextInput  
                      placeholder={nameFile2}  
                      style={styles.textStyle}
                      editable ={false}  
            />  
            <Button
                style={{flexDirection: 'row', justifyContent: 'space-between'}}
                title="Chọn 📑"
                onPress={ChoseFile2}
            />
        </View>
      </SafeAreaView>
  
      <Text>{"\n"}</Text>
      
      <Text style={styles.normal}>Text đã nhập 📖</Text>

      <SafeAreaView style={styles.normal}>
        <Text style={styles.filename2}>Text 1 📃</Text>
          <View style={styles.innerContainer}>  
              <TextInput  
                      placeholder="Tìm kiếm"  
                      style={styles.textStyle2} 
                      onChangeText={newtext => setsearchWord1(newtext)}
              />  
          </View>

        <Text>{"\n"}</Text>
        <Highlighter
            scrollEnabled = {true}
            textAlignVertical= 'top'
            highlightStyle={{backgroundColor: 'yellow'}}
            searchWords={[search_word1]}
            textToHighlight= {fileData1}
            multiline = {true}
            numberOfLines={10}
            style={styles.textBox}
            editable ={true}    
            onChangeText = {text => setFileData1(text.toString())}
            onChange={()=>{setnumofLineFile1(fileData1.split("\n").length)}}
        />
        <Text style={styles.filename}>Số dòng: {numofLineFile1}</Text>
        <Text style={styles.filename}>Số chữ: </Text>
    
        <Button
                title="Đổi vị trí 2 text"
                onPress={() => Alert.alert("dell lam dc")}
            />

        <Text>{"\n"}</Text>
    
        <Text style={styles.filename2}>Text 2 📃</Text>
          <View style={styles.innerContainer}>  
              <TextInput  
                      placeholder="Tìm kiếm"  
                      style={styles.textStyle2}  
                      editable ={true}
                      onChangeText={text => setsearchWord2(text)}
              /> 
          </View>
        <Text>{"\n"}</Text>
        <Highlighter
            scrollEnabled = {true}
            textAlignVertical= 'top'
            highlightStyle={{backgroundColor: 'yellow'}}
            searchWords={[search_word2]}
            textToHighlight= {fileData2}
            multiline = {true}
            numberOfLines={10}
            style={styles.textBox}
            editable ={true}
            onChangeText = {text => setFileData2(text.toString())}
            onChange={()=>{setnumofLineFile2(fileData2.split("\n").length)}}
        />
        <Text style={styles.filename}>Số dòng: {numofLineFile2}</Text>
        <Text style={styles.filename}>Số chữ: </Text>
      </SafeAreaView>
  
      <Text>{"\n"}</Text>
      
      
      <Text style={styles.normal}>Compare Text 📒📒</Text>
      <Text>{"\n"}</Text>
      <SafeAreaView>
      <View style={styles.fixToText2}>
          <Button
              title="So sánh và hiện tất cả"
              onPress={() => Alert.alert('Nút show all được bấm')}
          />
          <Text>{"\n"}</Text>
          <Button
              title="So sánh và hiện điểm khác biệt"
              onPress={() => Alert.alert('Nút show only differences đã được bấm')}
          />
          <Text>{"\n"}</Text>
        </View>
        <Text style={styles.filename2}>Text 1 📃</Text>
        <TextInput  
                    placeholder="Text số 1"  
                    style={styles.textBox} 
                    multiline = {true}
                    numberOfLines={10} 
                    textAlignVertical= 'top'
                    editable={false}
                    scrollEnabled = {true}
            />
          <Text>{"\n"}</Text>
  
        <Text style={styles.filename2}>Text 2 📃</Text>
        <TextInput  
                    placeholder={fileData2}  
                    style={styles.textBox} 
                    multiline = {true}
                    numberOfLines={10} 
                    textAlignVertical= 'top'
                    editable={false}
                    scrollEnabled = {true}
            />
        <Text style={styles.filename}>Khác biệt ở dòng thứ: </Text> 
        <Text style={styles.filename}>Số chữ khác biệt: </Text>
      </SafeAreaView>
  
        <StatusBar style="auto" />
      </ImageBackground>
      </ScrollView>
    
      </NavigationContainer>
    );
  }
  
  export default App;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: 'space-between',
    },
    title: {
      flex: 0.1,
      fontSize:32,
      color: 'black',
      textAlign: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
    },
    normal:{
      flex: 0.1,
      fontSize:25,
      color: 'black',
      textAlign: 'left',
      justifyContent: 'center',
      fontWeight: 'bold',
    },
    filename2:{
      flex: 0.1,
      fontSize:15,
      color: 'black',
      textAlign: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
    },
    unnormal:{
      flex: 0.1,
      fontSize:20,
      color: 'black',
      textAlign: 'left',
      justifyContent: 'center',
      fontStyle:'italic'
    },
    filename:{
      flex: 0.1,
      fontSize:15,
      color: 'black',
      textAlign: 'left',
      justifyContent: 'center',
      fontWeight: 'bold',
    },
    innerContainer:{  
      // flex: 1,  
       width: "100%",  
       flexDirection: "row",  
       justifyContent: "space-between",  
       alignItems: "center"  
   },  
   textStyle:{  
    width: "75%",  
    backgroundColor: "white", 
    fontSize:20,
    ScrollView:true,
    },  
    textStyle2:{  
      width: "75%",  
      backgroundColor: "white", 
      fontSize:10,
      },
    fixToText: {
      flexDirection: 'row',
      justifyContent:'space-between',
      width:"100%"
    },
    fixToText2: {
      flexDirection: 'column',
      justifyContent:'space-between',
      width:"100%"
    },
    textBox:{
    padding: 1,
    flex:1,
    backgroundColor: "white", 
    fontSize:10,
    ScrollView:true,
    },
  
  });
