import { useState } from "react";
import { TOTAL_CHARS } from "./constants";

export default function FeedbackForm({
  onAddItem,
}: {
  onAddItem: (inputText: string) => void;
}) {
  const [feedback, setFeedback] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const charsCount = feedback.length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (charsCount >= TOTAL_CHARS) {
      return;
    }
    setFeedback(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (feedback.includes("#") && feedback.length >= 5) {
      setIsValid(true);
      setTimeout(() => {
        setIsValid(false);
      }, 2000);
    } else {
      setIsInvalid(true);
      setTimeout(() => {
        setIsInvalid(false);
      }, 2000);
      return;
    }
    onAddItem(feedback);
    setFeedback("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${isValid && "form--valid"} ${
        isInvalid && "form--invalid"
      }`}
    >
      <textarea
        id="feedback-textarea"
        value={feedback}
        onChange={handleChange}
        placeholder="Enter your comment"
        spellCheck={false}
      />

      <label htmlFor="feedback-textarea">
        Enter your feeback here, remember to #hashtag the company
      </label>

      <div>
        <p className="u-italic">{TOTAL_CHARS - charsCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
