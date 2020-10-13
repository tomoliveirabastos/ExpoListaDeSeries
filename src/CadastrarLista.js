import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native';


export default function CadastrarLista({navigation}){
    const [titulo, setTitulo] = useState('');    

    async function registrarLista(){
        let url = "https://tomoliveiranodelista.herokuapp.com/lista";
        
        let unit = {
            method: 'POST',
            body: JSON.stringify({
                name: titulo
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        };

        let res = await fetch(url, unit);

        navigation.navigate('Inicio');
    }
    
    return(
        <View style={styles.viewContainer}>
            <TextInput onChangeText={e => setTitulo(e)} placeholder="Titulo da lista" style={styles.textInput} id="listaNome"/>
            
            <TouchableOpacity onPress={registrarLista} style={styles.opacityBtn}>
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
        padding: 10,
        fontSize: 20,
        color: '#4B0082',
        marginBottom: 10
    },

    opacityBtn: {
        backgroundColor: '#8A2BE2',
        padding:10
    },

    textoBtn: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: '900'
    }
})