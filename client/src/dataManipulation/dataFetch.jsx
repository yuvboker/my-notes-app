import {useEffect, useState, useReducer } from "react";
import apis from "../api";
import apisUser from "../apiUser";


const dataFetchReducer = (state, action) =>{
    switch (action.type) {
        case 'FETCH_INIT':
            return{
                ...state,
                isLoading: true,
                isError: false
            };
        case 'FETCH_SUCCESS':
            return{
                firstName: action.payload.firstName,
                notes: action.payload.notes,
                isLoading: false,
                isError: false
            };
        case 'FETCH_FAILURE':
            return{
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            throw new Error();
    }
};

const useDataApi = (initialData, user, googleId) => {
    const [greeting, setGreeting] = useState("");
    const [updateFlag, setUpdate] = useState(false);
    const [valid, setValid] = useState(true);
    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError:false,
        notes: initialData,
        firstName: "",
    })

    //is Google login?
    useEffect( () => {
        let didCancel = false;

        if(!googleId) {
            const authenticationCheck = async () => await apisUser.authenticate();
                authenticationCheck().then(result => {
                    if (!result.data.success) {
                        setValid(false);
                    }

                }).catch(() => setValid(false));
        }
        else{
            user = googleId;
        }

        const fetchData = async () => {
            dispatch({type: 'FETCH_INIT'});
            return await apis.getAll(user);

        }
        fetchData()
            .then(result => !didCancel && dispatch({type: 'FETCH_SUCCESS', payload: result.data.data}))
            .catch(() => !didCancel && dispatch({type: 'FETCH_FAILURE'}));


        const hour = new Date().getHours();
        if(5<hour && hour<12){
            setGreeting("Good Morning ");
        }
        else if(12<= hour && hour <18){
            setGreeting("Good Afternoon ");
        }
        else if(18<= hour && hour <23){
            setGreeting("Good Evening ");
        }
        else{
            setGreeting("Good Night ");
        }

        return () =>{
            didCancel = true;
        };
    }, [updateFlag, user]);

    return [state, valid, setUpdate, greeting];
}

export default useDataApi;