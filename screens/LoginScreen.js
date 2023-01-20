import { StyleSheet, Text, View ,Image,TextInput,TouchableOpacity} from 'react-native'
import React,{useState} from 'react'
import { useNavigation } from "@react-navigation/native"
import {auth} from "../firebase"
import { signInAnonymously, updateProfile } from "firebase/auth"

const LoginScreen = () => {

    const [name, setName] = useState("")

    const navigation = useNavigation();

    const [user, setUser] = useState(null);


  return (
    <View style={styles.container}>
        <View style={styles.circle} />
        <View style={{marginTop: 64}}>
            <Image source={require("../assets/chat.jpg")} style={{width: 100, height: 100, alignSelf: "center"}} />
        </View>
        <View style={{marginHorizontal: 32}}>
            <Text style={{fontSize: 20, fontWeight: "500", color: "#514e5a",
            marginTop: 20}}>Username
            </Text>
            <TextInput style={styles.input} placeholder="Enter your username" onChangeText={(text) => setName(text)} />
      
            <View style={{alignItems: "flex-end", marginTop: 64}}>
                <TouchableOpacity onPress={
                    () => {

                        signInAnonymously(auth).then((userCredential) => {
                            // Signed in..
                            

                            updateProfile(auth.currentUser, {
                                displayName: name
                                }).then(() => {
                                // Update successful
                                
                                setUser(auth.currentUser);
                                }).catch((error) => {
                                // An error occurred
                                console.log(error);
                                });

                            



                            // ...
                            }).catch((error) => {
                            const errorCode = error.code;
                            });

                        navigation.navigate("Chat",{user: auth.currentUser
                        })
                    }
                } style={{width: 200, height: 50, backgroundColor: "#9075e3", borderRadius: 30, alignItems: "center", justifyContent: "center"}}>
                    <Text style={{color: "#fff", fontWeight: "500"}}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#f4f5f7"
    },
    circle: {
        width: 500,
        height: 500,
        borderRadius: 500/2,
        backgroundColor: "#fff",
        position: "absolute",
        left: -120,
        top: -20
    },
    input:{
        marginTop: 32,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#bab7c3",
        height: 50,
        borderRadius: 30,
        paddingHorizontal: 16,
    }

})