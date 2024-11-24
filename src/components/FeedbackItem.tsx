import { TriangleUpIcon } from "@radix-ui/react-icons";
import { itemType } from "./types/types";
import { useState } from "react";

type itemProps = {
  item: itemType;
};

export default function FeedbackItem({ item }: itemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [upVote, setUpVote] = useState<number>(item.upvoteCount);
  const handleUpVote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setUpVote((prev) => prev + 1);
    e.currentTarget.disabled=true
    e.stopPropagation()
  };
  return (
    <li
    onClick={() => setIsOpen((prev) => !prev)}
      className={`feedback ${isOpen && "feedback--expand"}`}
    >
      <button onClick={handleUpVote}>
        <TriangleUpIcon />
        <span>{upVote}</span>
      </button>
      <div>
        <p>{item.badgeLetter}</p>
      </div>
      <div>
        <p>{item.company}</p>
        <p>{item.text}</p>
      </div>
      <p>{item.daysAgo}d</p>
    </li>
  );
}
