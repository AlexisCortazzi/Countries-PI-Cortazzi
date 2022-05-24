import axios from 'axios';

export function getCountries(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/countries",{});
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
    }
}

export function getNameCountries(payload){
    return async function (dispatch){
        try {
            var json = await axios.get("http://localhost:3001/countries?name=" + payload);
            return dispatch ({
                type: "GET_NAME_COUNTRY",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getActivities() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/activity",{

        });
        return dispatch({ type: "GET_ACTIVITIES", payload: json.data});
    };  
}

export function getDetail (payload) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/countries/" + payload);
            return dispatch ({
                type: "GET_DETAIL",
                payload: json.data
            })
        } catch(error) {
            console.log(error)
        }
    }
}

export function postActivity (payload) {
    return async function (dispatch) {
        var json = await axios.post("http://localhost:3001/activity",payload)
        console.log(json)
        return json;
    }
}

export function filterCountriesByContinent(payload){
    return {
        type: 'FILTER_BY_CONTINENT',
        payload
    }
}

export function filterCountriesByActivity(payload){
    return {
        type: 'FILTER_BY_ACTIVITY',
        payload
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}