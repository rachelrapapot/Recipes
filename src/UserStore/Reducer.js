import { json } from "react-router-dom";

const initialState = {

    user: JSON.parse(localStorage.getItem('user')),
    recipes: [],
   SelectedCategory:null,
}
const Reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_USER':
            {
                return {
                    ...state, user: action.payload
                   
                }
            }
            break;
        case 'LOG_OUT':
            {
                return {
                    ...state,
                    user: null

                }
                 break;
            }
           
        case 'GET_RECIPIES':
            {
                return {
                    ...state, recipes: action.payload
                }
            }
            break;
        case 'ADD_RECIPE':
            {
            return {
                ...state, recipes: [...state.recipes, action.payload]

            }
        }
        break;
        case 'SET_CATEGORY':
            {
                return {
                    ...state, SelectedCategory: action.payload
                }
            }
            break;
            case 'SET_Time':
                {
                    return {
                        ...state, Time: action.payload
                    }
                }
                break;
                case 'SET_Difficulty':
                    {
                        return {
                            ...state, Difficulty: action.payload
                        }
                    }
                    break;
                    case 'SET_creator':
                        {
                            return {
                                ...state, creator: action.payload
                            }
                        }
                        break;
        
    default:
        return state; 
    }

}
export default Reducer;