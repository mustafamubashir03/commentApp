import { useMemo } from "react";
import { useDataStore } from "../stores/dataStore";
import Hashtag from "./Hashtag";

export default function HashtagList() {
  const getCompanies = useDataStore((state) => state.getCompanies);
  const handleSetFilter = useDataStore((state) => state.onSetFilter);
  const companies = useMemo(() => getCompanies(), [getCompanies]);


  return (
    <ul className="hashtags">
      {companies.map((company) => (
        <Hashtag company={company} onClick={handleSetFilter} />
      ))}
    </ul>
  );
}
