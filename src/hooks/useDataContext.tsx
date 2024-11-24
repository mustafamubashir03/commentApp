import { useContext } from "react";
import { DataContext } from "../contexts/dataContext";


export function useDataContext() {
    const dataContext = useContext(DataContext)
    if(dataContext === null){
        throw new Error("Data Context Can't be accessed without provider")
    }
    return dataContext;

}
