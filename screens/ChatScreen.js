import { StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect,useCallback} from 'react'
import { GiftedChat } from "react-native-gifted-chat";
import { KeyboardAvoidingView, Platform } from "react-native";
import { collection,addDoc,orderBy,query,onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useLayoutEffect } from "react";



const ChatScreen = ({route}) => {

  const [messages, setMessages] = useState([]);

 
  useEffect(() => {
    const collectionref = collection(db, "messages");

    const q = query(collectionref, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      )
    })

    return unsubscribe;
  }, [])







  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))

    const { _id, createdAt, text, user } = messages[0];

    addDoc(collection(db, "messages"), {
      _id,
      createdAt,
      text,
      user
    })





  }, [])

    

  
  return (
    <View style={{flex: 1}}>
    <GiftedChat messages={messages} onSend={messages => {
      onSend(messages)
    }} user={{
      _id: route.params.user.uid,
      name: route.params.user.displayName
    }}
    
    messagesContainerStyle= {{
      backgroundColor: "white"
    }}
    
    />
     {
      Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
   }
    </View>

    

  )
}

export default ChatScreen

const styles = StyleSheet.create({})