import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity} from 'react-native';
import {Context, Provider} from '../context/BlogContext';
import {Feather} from '@expo/vector-icons';

const IndexScreen = ({navigation}) => {
    const {state, deleteBlogPost, getBlogPosts} = useContext(Context);

    useEffect(() => {
        getBlogPosts();

        const listener = navigation.addListener('didFocus', () => {
            getBlogPosts();
        });

        return () => {
            listener.remove();
        };

    }, []);

    return (
        (state.length === 0) ? <View style = {styles.empty}><Text style = {styles.title}>No Blog Yet!</Text></View>
        :
        <View>
            
            <FlatList
                data = {state}
                keyExtractor = {blogPosts => blogPosts.title}
                renderItem = {({item}) => {
                    return (
                    <TouchableOpacity
                        onPress =  {() => navigation.navigate('Show', {id: item.id}) }
                    >
                        <View style = {styles.row}>
                            <Text style = {styles.title}>{item.title}</Text>
                            <TouchableOpacity onPress = {() => deleteBlogPost(item.id)}>
                                <Feather name = 'trash' style = {styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
};

IndexScreen.navigationOptions = ({navigation}) => {
    return {
        headerRight: () => 
            <TouchableOpacity 
                onPress = {() => navigation.navigate('Create')}>
                <Feather name = 'plus' size = {30} />
            </TouchableOpacity>
    }
}



const styles = StyleSheet.create({

    empty: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: '#2196F3'
    },

    title: {
        fontSize: 18,
        marginLeft: 10,
    },

    icon: {
        fontSize: 24,
        marginRight: 20,
    },

});

export default IndexScreen;