import { useState, useEffect, useCallback } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Button from "../../components/inputs/Button";
import getQuestionData from "../../api/getQuestionData";
import useCancel from "../../hooks/useCancel";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot, faClock } from "@fortawesome/free-solid-svg-icons";
import Radio from "../../components/inputs/Radio";
import updateQuestion from "../../api/updateQuestion";

/*
 * Detail screen.
 *
 * @component
 */
export default function DetailScreen() {
  // Retrieve question ID from params.
  const { questionID } = useParams();

  // Custom hook to prevent updating state after component has been unmounted.
  const isCancelled = useCancel();

  // Question data. Null if data is still loading (or failed to load).
  const [questionData, setQuestionData] = useState(null);

  // Fetch question data when component is mounted.
  useEffect(() => {
    getQuestionData(questionID)
      .then((data) => {
        if (data === false) return data;
        if (!isCancelled) setQuestionData(data);
        return data;
      })
      .catch(() => {});
  }, []);

  // Question title
  const title = questionData && questionData.question;

  // Total number of votes
  const votes =
    questionData &&
    questionData.choices.reduce((sum, choice) => sum + choice.votes, 0);

  // Question timestamp
  const timestamp =
    questionData && new Date(questionData.published_at).toLocaleString();

  // Selected choice. Null for none selected.
  const [selectedChoice, setSelectedChoice] = useState(null);

  // Whether or not the client has already voted.
  const [voted, setVoted] = useState(false);

  // Vote button callback
  const voteAction = useCallback(() => {
    // If we have already voted or there is no selected choice, cancel callback.
    if (voted || selectedChoice === null) return;

    // Build new question data and increase selected choice vote count by 1.
    const oldQuestionData = questionData;
    const newQuestionData = {
      ...questionData,
      choices: [...questionData.choices],
    };

    newQuestionData.choices[selectedChoice] = {
      ...newQuestionData.choices[selectedChoice],
      votes: newQuestionData.choices[selectedChoice].votes + 1,
    };

    // Update, temporarily, the state of the component to what we're expecting
    // the returned data to be.
    setVoted(true);
    setQuestionData(newQuestionData);

    // Update the question and then update the state when the updated data
    // is returned.
    updateQuestion(newQuestionData)
      .then((res) => {
        if (isCancelled) return res;

        if (res !== false) {
          setQuestionData(res);
        } else {
          // Updated failed, restore old state.
          setVoted(false);
          setQuestionData(oldQuestionData);
        }

        return res;
      })
      .catch(() => {
        if (isCancelled) return;

        // Update failed, restore old state.
        setVoted(false);
        setQuestionData(oldQuestionData);
      });
  }, [voted, questionData, selectedChoice]);

  // This hook returns the current location object.
  const location = useLocation();

  // Perseve filter when returning back to questions list.
  const from = location.state ? location.state.from : "/questions";

  return (
    <div className="detail-container">
      <Link to={from ? from : "/questions"}>
        <Button error>Close</Button>
      </Link>
      <div className="card">
        <div className="image-container">
          {questionData && (
            <img src={questionData.image_url} alt="Question Banner" />
          )}
        </div>
        <div className="description-container">
          <h3 className={title ? undefined : "skeleton"}>{title}</h3>
          <div>
            {votes && <FontAwesomeIcon icon={faCheckToSlot} className="icon" />}
            <span className={votes ? undefined : "skeleton"}>
              {votes ? `${votes} votes` : "##########"}
            </span>
          </div>
          <div>
            {timestamp && <FontAwesomeIcon icon={faClock} className="icon" />}
            <span className={timestamp ? undefined : "skeleton"}>
              {timestamp ? timestamp : "############"}
            </span>
          </div>
        </div>
        <div className="divider" />
        <div className="option-container">
          {questionData
            ? questionData.choices.map((choice, index) => (
                <Radio
                  key={index}
                  label={`${choice.choice} (${choice.votes} votes)`}
                  name="answer"
                  value={index}
                  checked={selectedChoice === index}
                  onChange={(event) => {
                    if (event.target.checked && !voted) {
                      setSelectedChoice(index);
                    }
                  }}
                />
              ))
            : Array(4)
                .fill()
                .map((_, index) => (
                  <Radio
                    key={`skeleton-${index}`}
                    label={<span className="skeleton">###########</span>}
                  />
                ))}
        </div>
        <div className="divider" />
        <div className="button-container">
          <Link
            to={{
              pathname: "/share",
            }}
            state={{
              from: window.location.href,
            }}
          >
            <Button secondary>Share</Button>
          </Link>
          <Button
            disabled={selectedChoice === null || voted}
            onClick={voteAction}
          >
            Vote
          </Button>
        </div>
      </div>
    </div>
  );
}
