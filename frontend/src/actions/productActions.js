import axios from 'axios';
import {productsRequest, productsFail, productsSuccess, productsCatageoryRequest, productsCatageorySuccess, productsCatageoryFail} from '../slices/productsSlice';
import {productRequest, productFail, productSuccess, createReviewRequest,createReviewFail, createReviewSuccess} from '../slices/productSlice';


export const getproducts = (keyword,catageory,ratings,currentPage) => async (dispatch) => {
    try{

        dispatch(productsRequest());
        let link = `/api/v1/products?page=${currentPage}`
        if(keyword){
            link += `&keyword=${keyword}`

        }
        if(catageory){
            link += `&category=${catageory}`
        }
        if(ratings){
            link += `&ratings=${ratings}`
        }
        const { data } = await axios.get(link)
        dispatch(productsSuccess(data));


    }catch(error){
        dispatch(productsFail(error.response.data.message))
    }
}

export const getcategory = catageory => async (dispatch) => {
    try{

        dispatch(productsCatageoryRequest());
        const { data } = await axios.get(`/api/v1/category?category=${catageory}`)
        dispatch(productsCatageorySuccess(data));


    }catch(error){
        dispatch(productsCatageoryFail(error.response.data.message))
    }
}

export const getproduct = id => async (dispatch) => {
    try{

        dispatch(productRequest());
        const { data } = await axios.get(`/api/v1/product/${id}`)
        dispatch(productSuccess(data));


    }catch(error){
        dispatch(productFail(error.response.data.message))
    }
}


export const createReview = reviewData => async (dispatch) => {

    try {  
        dispatch(createReviewRequest()) 
        const config = {
            headers : {
                'Content-type': 'application/json'
            }
        }
        const { data }  =  await axios.put(`/api/v1/review`,reviewData, config);
        dispatch(createReviewSuccess(data))
    } catch (error) {
        //handle error
        dispatch(createReviewFail(error.response.data.message))
    }
    
}