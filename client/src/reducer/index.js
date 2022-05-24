const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    detail: []
}

function rootReducer (state = initialState, action){
    switch(action.type) {
        case 'GET_COUNTRIES':
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }
        case 'GET_NAME_COUNTRY':
            return{
                ...state,
                countries: action.payload
            }
        case 'GET_ACTIVITIES':
            return {
                ...state,
                activities: action.payload
            }
        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload
            }
        case 'POST_ACTIVITY':
            return {
                ...state,
            }
        case 'FILTER_BY_CONTINENT':
            const allCountries = state.allCountries
            const countriesFiltered = action.payload === 'All' ? allCountries : allCountries.filter(el => el.region === action.payload)
            return {
                ...state,
                countries: countriesFiltered
            }
        case 'FILTER_BY_ACTIVITY':
            const allCountries2 = state.allCountries
            const activityFiltered = action.payload === 'Todos' ? allCountries2 : allCountries2.filter(el => { for (let i=0; i<el.activity.length; i++) if (el.activity[i] === action.payload) return true})
                return {
                    ...state,
                    countries: activityFiltered
                }
        case 'ORDER_BY_NAME':
            let orderCountries = state.allCountries
            let sortedArr = action.payload === 'asc' ?
                state.countries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }) : action.payload === 'des' ?
                state.countries.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                }) : action.payload === 'pob' ?
                    state.countries.sort((a,b) => {
                    if (a.population > b.population) return 1;
                    if (a.population < b.population) return -1;
                    return 0;
                }) : action.payload === 'pobdes' ?
                state.countries.sort((a,b) => {
                if (a.population > b.population) return -1;
                if (a.population < b.population) return 1;
                return 0;
            }) :  orderCountries
            return {
                ...state,
                countries: sortedArr
            }
        default:
            return state;
    }

}

export default rootReducer;