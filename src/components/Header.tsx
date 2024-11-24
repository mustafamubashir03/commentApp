import { useDataStore } from "../stores/dataStore";
import FeedbackForm from "./FeedbackForm";
import Logo from "./Logo";
import PageHeading from "./PageHeading";
import Pattern from "./Pattern";



export default function Header() {

 const handleAddItem = useDataStore(state=>state.addItem)
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm onAddItem={handleAddItem} />
    </header>
  );
}
