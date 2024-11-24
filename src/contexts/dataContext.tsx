import { createContext } from "react";
import { itemType } from "../components/types/types";

    type valueProp = {
        loading:boolean,
        error:string,
        companies: string[],
        filteredCompanies: itemType[],
        handleSetFilter: (filter: string) => void,
        handleAddItem:(input:string)=>void,
        data: itemType[],
        filter:string
    };

export const DataContext = createContext<valueProp | null>(null);