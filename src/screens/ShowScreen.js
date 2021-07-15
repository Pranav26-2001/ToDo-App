import React, {useContext} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Context} from '../context/BlogContext';
import { EvilIcons } from '@expo/vector-icons';

const ShowScreen = ({navigation}) => {
    const {state} = useContext(Context);

    const blogPost = state.find(blogPost => blogPost.id === navigation.getParam('id'));
    return (
        <View style = {styles.view}>
            <Text style = {styles.title}>{blogPost.title}</Text>
            <Text style = {styles.content}>{blogPost.content}</Text>
        </View>
    );
}

ShowScreen.navigationOptions = ({ navigation }) => {
    return {
      headerRight: () =>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Edit', { id: navigation.getParam('id') })
          }
        >
          <EvilIcons name="pencil" size={35} />
        </TouchableOpacity>
      
    };
  };
  

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    title: {
        fontSize: 18,
        marginLeft: 10,
    }
});

export default ShowScreen;