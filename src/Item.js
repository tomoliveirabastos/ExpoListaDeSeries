    import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';


export default function Item({route, navigation}){
    const [items, setItems] = useState([]);
    
    async function getAllItems(){
        const url = `https://tomoliveiranodelista.herokuapp.com/items/${route.params.id}`;
        const unit = {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        };

        const res = await fetch(url, unit);
        const json = await res.json();
        setItems(json);
    }

    async function deleteItem(id){
        const url = `https://tomoliveiranodelista.herokuapp.com/lista/${id}`;   
        const unit = {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json'
            }
        };

        const res = await fetch(url, unit);
        if(res.ok){
            navigation.navigate('Inicio');
        }
    }

    useEffect(()=>{ 
        navigation.setOptions({title: `${route.params.name}`}); 
        getAllItems();
    }, []);

    const renderItem = ({item})=>(
        <TouchableOpacity onPress={()=> navigation.navigate('Update item na Lista', item)} style={styles.itemListaContainer}>
            <Text  style={{
                color: '#4B0082',
                fontSize:20, 
                padding:10
            }}>
                {item.name}
            </Text>

            <Text style={{
                color: '#f1f1f1',
                fontSize:20, 
                padding:10
            }}>
                {item.descricao}
            </Text>
        </TouchableOpacity>
    );
    return (

        <View style={styles.container}>
            
            <SafeAreaView>
                <FlatList
                    style={
                        {
                            height: 420,
                            marginBottom: 10
                        }
                    }
                    data={items}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                >
                </FlatList>
            </SafeAreaView>
        
        
            <TouchableOpacity onPress={()=>{navigation.navigate('Add item na Lista', route.params)}} style={styles.opacityBtn}>
                <Text style={styles.textoBtn}>Add {route.params.name}</Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={()=>{deleteItem(route.params.id)}} style={styles.opacityBtnDelete}>
                <Text style={styles.textoBtn}>Deletar {route.params.name}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        margin:10
    },

    opacityBtn: {
        backgroundColor: '#8A2BE2',
        padding:15,
        borderRadius: 10,
        marginBottom: 10
    },
    opacityBtnDelete:{
        backgroundColor: 'red',
        padding:15,
        borderRadius: 10,
        marginBottom: 10  
    },
    textoBtn: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: '900'
    },
    itemListaContainer: {
        borderWidth: 1,
        marginBottom: 5,
        borderColor: 'white',
        padding: 10,
        borderRadius: 4
    },
    textoBtn: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: '900'
    },
});