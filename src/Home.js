import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';

export default function Home({navigation}){
    let [lista, setLista] = useState([]);

    async function getListas(){
    
        const url = "https://tomoliveiranodelista.herokuapp.com/listas";
    
        const unit = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/josn'
            }
        };
    
        let res = await fetch(url, unit);
    
        let json = await res.json();
    
        setLista(json);
    
    }

    const renderItem = ({item}) =>(

        
        <TouchableOpacity  onPress={
            ()=>{
                navigation.navigate('Lista de itens', item);
            }
        } 
        style={styles.itemListaContainer}>
            
            <Text style={{
                color: 'white',
                fontSize:20, 
                padding:10
            }}>{item.id}: {item.name}</Text>
        </TouchableOpacity>
    );

    useEffect(()=>{ getListas(); }, []);

    return(
    <View style={styles.container}>
        
        <SafeAreaView style={{height: 510, marginBottom: 10}}>
            <FlatList 
                data={lista}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            >
            </FlatList>
        </SafeAreaView>

        <TouchableOpacity onPress={ 
            ()=> navigation.navigate('Cadastrar Uma Lista')} 
            style={styles.opacityBtn}>
            <Text style={styles.textoBtn}>Cadastrar uma lista</Text>
        </TouchableOpacity>
    </View>);
}

const styles = StyleSheet.create({

    container:{
        margin:10
    },

    opacityBtn: {
        backgroundColor: '#8A2BE2',
        padding:15,
        borderRadius: 10
    },

    textoBtn: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: '900'
    },
    itemListaContainer: {
        borderWidth: 1,
        backgroundColor: '#EE82EE',
        marginBottom: 5,
        borderColor: 'white',
        padding: 10,
        borderRadius: 4
    }
});