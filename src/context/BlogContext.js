import React, {useReducer} from 'react';
import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';


const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts');

        dispatch({type: 'get_blogPost', payload: response.data});

    };

}

const addBlogPost = (dispatch) => {
    return async (title,content,callback) => {
        await jsonServer.post('/blogposts', {title,content})
        if (callback){
            callback();
        }
    }
}

const deleteBlogPost = (dispatch) => {
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`);
        dispatch({type: 'delete_blogPost', payload: id});
    }
}

const editBlogPost = dispatch => { 
    return async (id,title,content,callback) => {
        await jsonServer.put(`/blogposts/${id}`, {title,content})
        dispatch({
            type: 'edit_blogPost', 
            payload:{id:id, title:title, content:content},

        });
        if (callback){
            callback();
        }
        
    }
}

const blogReducer = (state, action) => {
    switch(action.type){
        case 'get_blogPost':{
            return action.payload;
        }
        case 'edit_blogPost':
            return state.map((blogPost) => {
                if (blogPost.id === action.payload.id){
                    return action.payload;
                }
                else{
                    return blogPost;
                }
            })

        default:
            return state;
        
        case 'delete_blogPost':
            return state.filter((blogPost) => blogPost.id !== action.payload);
        
        
    }
}

export const {Context, Provider} = createDataContext(blogReducer, {addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts}, []);
