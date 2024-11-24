import { ReactNode, useEffect, useMemo, useState } from "react";
import { itemType } from "../components/types/types";
import { DataContext } from "./dataContext";
import axios from "axios";


type childrenType = {
    children: ReactNode
}

function DataContextProvider({ children }: childrenType) {
  const [data, setData] = useState<itemType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const dataFetched = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );
        if (!response.data.feedbacks) {
          throw Error;
        }
        setData(response.data.feedbacks);
        console.log(response);
        setLoading(false);
      } catch (e) {
        setError("Something went wrong :(");
        setLoading(false);
      }
    };
    dataFetched();
  }, []);

  const [filter, setFilter] = useState("");
  const handleSetFilter = (filter: string) => {
    setFilter(filter);
  };

  const filteredCompanies = useMemo(
    () => data.filter((item) => item.company === filter),
    [filter, data]
  );

  const companies = useMemo(
    () =>
      data
        .map((item) => item.company)
        .filter((item, index, array) => array.indexOf(item) === index),
    [data]
  );
  const handleAddItem = (inputText: string) => {
    const companyName = inputText
      .split(" ")
      .find((word) => word.includes("#"))!
      .substring(1);
    const newItem: itemType = {
      id: new Date().getTime(),
      text: inputText,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
      daysAgo: 0,
      upvoteCount: 0,
    };
    setData([...data, newItem]);
  };
  return (
    <DataContext.Provider
      value={{
        companies,
        filteredCompanies,
        handleSetFilter,
        handleAddItem,
        data,
        loading,
        error,
        filter
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
