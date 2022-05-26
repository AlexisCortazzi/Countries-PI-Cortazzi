const initialState = {
    countries: [],
    allCountries: [],
    activities: [],
    detail: [],
    firstMount: true
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
            let filterCountries = state.allCountries
            filterCountries = 
            action.payload.continent !== "all" ? filterCountries.filter(el => el.region === action.payload.continent)
            : filterCountries;
            console.log(action.payload.continent)
            console.log(filterCountries)
            filterCountries =
            action.payload.activity === "desactivado" ? filterCountries : action.payload.activity === "all" ? filterCountries.filter(e => (e.activity.length > 0)) : filterCountries.filter(el => { for (let i=0; i<el.activity.length; i++) if (el.activity[i].name === action.payload.activity) return true})
            console.log(action.payload.activity)
            return {
                ...state,
                countries: filterCountries
            }
            case "SET_FIRST_MOUNT":
                return {
                  ...state,
                  countries: [],
                  firstMount: action.payload,
                };

        // case 'FILTER_BY_ACTIVITY':
        //     const allCountries2 = state.allCountries
        //     const activityFiltered = action.payload === 'Todos' ? allCountries2.filter(e => (e.activity.length > 0)) : allCountries2.filter(el => { for (let i=0; i<el.activity.length; i++) if (el.activity[i].name === action.payload) return true})
        //         return {
        //             ...state,
        //             countries: activityFiltered
        //         }

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