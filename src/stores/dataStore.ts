import { create } from "zustand";
import { itemType } from "../components/types/types";
import axios from "axios";

type storeValues = {
  loading: boolean;
  error: string;
  getCompanies: () => string[];
  getFilteredCompanies: () => itemType[];
  onDataFetch: () => Promise<void>;
  onSetFilter: (filter: string) => void;
  addItem: (input: string) => void;
  data: itemType[];
  filter: string;

};
export const useDataStore = create<storeValues>((set, get) => ({
  data: [],
  loading: false,
  error: "",
  filter: "",
  onSetFilter: (filter: string) => {
    set({ filter: filter });
  },
  getFilteredCompanies: () => {
    return get().data.filter((item) => item.company === get().filter);
  },
  getCompanies: () => {
    return get()
      .data.map((item) => item.company)
      .filter((item, index, array) => array.indexOf(item) === index);
  },
  onDataFetch: async () => {
    try {
      set( ({ loading: true, error:"" }));
      const response = await axios.get(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      if (!response.data.feedbacks) {
        throw Error;
      }
      set( ({ data: response.data.feedbacks,loading:false }));
    } catch (e) {
      set( ({ error: "Something went wrong :(" , loading:false}));
    }
  },

  addItem: (inputText: string) => {
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
    set((state) => ({ data: [...state.data, newItem] }));
  },
}));







