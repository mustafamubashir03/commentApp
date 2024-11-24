import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import Error from "./Error";
import { itemType } from "./types/types";
import { useDataStore } from "../stores/dataStore";
import { useEffect, useMemo} from "react";

export default function FeedbackList() {
  const data = useDataStore((state) => state.data);
  const loading = useDataStore((state) => state.loading);
  const error = useDataStore((state) => state.error);
  const filter = useDataStore((state) => state.filter);
  const getFilteredCompanies = useDataStore((state) =>
    state.getFilteredCompanies
  );
  const fetchData = useDataStore((state) => state.onDataFetch);
  const filteredCompanies = useMemo(()=> getFilteredCompanies(),[getFilteredCompanies])
  const filteredData = filter ? filteredCompanies : data;
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <ol className="feedback-list">
      {loading && <Spinner />}
      {error ? (
        <Error message={error} />
      ) : (
        filteredData.map((item: itemType) => (
          <FeedbackItem key={item.id} item={item} />
        ))
      )}
    </ol>
  );
}
