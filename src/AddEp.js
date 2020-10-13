
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';

export default function AddEp({route, navigation}){
    
    const [name, setName] = useState('');
    const [descricao, setDescricao] = useState('');
    const [ep, setEp] = useState('');

    useEffect( () =>{
        navigation.setOptions({title: `Add ep ${route.params.name}` })
    }, []);

    async function addSubItem(){
        const obj = {
            lista_id : route.params.lista,
            item_id: route.params.id,
            descricao: descricao,
            name: name,
            ep: ep
        };
        const url = `https://tomoliveiranodelista.herokuapp.com/subitem`;
        const unit = {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type'  : 'application/json'
            }
        };
        const res = await fetch(url, unit);
        if(res.ok){
            alert(`Ep ${name} adicionado em ${route.params.name}`);
        }
    }


    return (

    <View style={styles.viewContainer}>
        
        <TextInput 
            onChangeText={e => setName(e)}
            placeholder="Nome" 
            style={styles.textInput}
            defaultValue={name}
        />

        <TextInput 
            onChangeText={ e=> setEp(e)}
            placeholder="EP" 
            style={styles.textInput}
            defaultValue={ep}
        />
                
        <TextInput
            onChangeText={e=>setDescricao(e)}
            placeholder="Descrição" 
            style={styles.textInput}
            multiline = {true}
            numberOfLines = {3}
            defaultValue={descricao}
        />

        <TouchableOpacity onPress={addSubItem} style={styles.opacityBtn}>
            <Text style={styles.textoBtn}>Add EP</Text>
        </TouchableOpacity>

    </View>);
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
        marginBottom:10,
        borderRadius: 5
    },

    opacityBtnEp: {
        backgroundColor: '#BA55D3',
        padding:10,
        marginBottom:10,
        borderRadius: 5
    },

    opacityBtnDelete: {
        backgroundColor: 'red',
        padding:10,
        marginBottom:10,
        borderRadius: 5
    },

    textoBtn: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: '900'
    }
});