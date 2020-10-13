import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, SafeAreaView, FlatList} from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function UpdateItem({route, navigation}){
    
    const [descricao, setDescricao] = useState('');
    const [name, setName] = useState('');
    const [assistidos, setAssistidos] = useState([]);

    async function updateItem(){
        const url = `https://tomoliveiranodelista.herokuapp.com/item/${route.params.id}`;
        const unit = {
            method: 'PUT',
            body: JSON.stringify({
                name:name,
                descricao: descricao
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        };
        await fetch(url, unit);
        alert('Atualizado')
    }

    async function getEpsAssistidos(){
        const url = `https://tomoliveiranodelista.herokuapp.com/subitems/${route.params.id}`;
        const unit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        let res = await fetch(url, unit);
        let json = await res.json();
        setAssistidos(json);
    }

    async function deletarItem(id){
        const url = `https://tomoliveiranodelista.herokuapp.com/item/${route.params.id}`;

        const unit = {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
        };

        const res = await fetch(url, unit);
        if(res.ok){
            navigation.navigate('Lista de itens', {id: route.params.lista});
        }
    }

    useEffect(()=>{
        navigation.setOptions({title: route.params.name});
        setName(route.params.name);
        setDescricao(route.params.descricao);
        getEpsAssistidos();
    },[]);


    const deleteEp = async(id)=>{
        const url = `https://tomoliveiranodelista.herokuapp.com/subitem/${id}`;
        const unit = {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
        };

        await fetch(url, unit);
        alert('Deletado');
        await getEpsAssistidos();
    }

    const renderItem = ({item})=>(
        <TouchableOpacity onPress={() => deleteEp(item.id)} style={{padding:10, borderWidth:1, marginBottom: 5, borderRadius:5, borderColor: 'white'}}>
            <Text style={styles.texto}>EP : {item.ep}</Text>
            <Text style={styles.texto}>Nome: {item.name}</Text>
            <Text style={{fontSize:14, color: 'white', marginTop: 20}}>{item.descricao}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.viewContainer}>

            <TextInput 
                onChangeText={
                    (e) =>{
                        setName(e);

                    }
                }
                placeholder="Nome" 
                style={styles.textInput}
                defaultValue={route.params?.name}
            />
            
            <TextInput
                onChangeText={(e) =>{
                    setDescricao(e);
                    }
                }
                placeholder="Descrição" 
                style={styles.textInput}
                multiline = {true}
                numberOfLines = {3}
                defaultValue={route.params?.descricao}
            />

            <TouchableOpacity onPress={ () =>{ updateItem() }} style={styles.opacityBtn}>
                <Text style={styles.textoBtn}>Atualizar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () =>{ deletarItem(route.params.id) }} style={styles.opacityBtnDelete}>
                <Text style={styles.textoBtn}>Deletar</Text>
            </TouchableOpacity>


            <Text style={{fontSize:25, color:'white', textAlign: 'center'}}>Ep Assistido</Text>

            <SafeAreaView style={{height:270, padding:10, borderColor: 'white', borderRadius:5, borderWidth: 1, marginBottom:10}}>
                <FlatList
                    data={assistidos}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
            <TouchableOpacity onPress={ () =>{ navigation.navigate('Add Ep', route.params)}} style={styles.opacityBtnEp}>
                <Text style={styles.textoBtn}>Add ep Assistido</Text>
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
    },

    texto: {
        fontSize: 20,
        color: 'white',
        fontWeight: '900'
    }
})