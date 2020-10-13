import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function AddItem({route, navigation}){
    
    const [descricao, setDescricao] = useState('');
    const [name, setName] = useState('');

    async function registrarItem(){
        const url = `https://tomoliveiranodelista.herokuapp.com/item/${route.params.id}`;
        const unit = {
            method: 'POST',
            body: JSON.stringify({
                name:name,
                descricao: descricao
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        };
        const res = await fetch(url, unit);
        if(res.ok){
            navigation.navigate('Lista de itens', route.params);
        }
    }


    useEffect(()=>{
        navigation.setOptions({title: route.params.name});
    },[]);


    return (
        <View style={styles.viewContainer}>

            <TextInput 
                onChangeText={e =>setName(e)}
                placeholder="Nome" 
                style={styles.textInput}
            />
            
            <TextInput
                onChangeText={e => setDescricao(e)}
                placeholder="Descrição" 
                style={styles.textInput}
                multiline = {true}
                numberOfLines = {3}
            />

            <TouchableOpacity onPress={registrarItem} style={styles.opacityBtn}>
                <Text style={styles.textoBtn}>Concluir</Text>
            </TouchableOpacity>
        
        </View>
    );
}


const styles = StyleSheet.create({
    viewContainer: {
        margin: 10
    },

    textInput: {
        backgroundColor: '#DDA0DD',
        padding: 5,
        fontSize: 20,
        color: '#4B0082',
        marginBottom: 10,
        borderRadius:5,
        marginBottom: 10
    },

    opacityBtn: {
        backgroundColor: '#8A2BE2',
        padding:10,
        borderRadius: 5
    },

    textoBtn: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: '900'
    }
})