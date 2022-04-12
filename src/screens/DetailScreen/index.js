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

export default function DetailScreen() {
  // Retrieve question ID from params.
  const { questionID } = useParams();

  const isCancelled = useCancel();

  const [questionData, setQuestionData] = useState(null);

  useEffect(() => {
    getQuestionData(questionID)
      .then((data) => {
        if (data === false) return data;
        if (!isCancelled) setQuestionData(data);
        return data;
      })
      .catch(() => {});
  }, []);

  const title = questionData && questionData.question;

  const votes =
    questionData &&
    questionData.choices.reduce((sum, choice) => sum + choice.votes, 0);

  const timestamp =
    questionData && new Date(questionData.published_at).toLocaleString();

  const [selectedChoice, setSelectedChoice] = useState(null);

  const [voted, setVoted] = useState(false);

  const voteAction = useCallback(() => {
    if (!voted && selectedChoice !== null) {
      const oldQuestionData = questionData;
      const newQuestionData = {
        ...questionData,
        choices: [...questionData.choices],
      };

      newQuestionData.choices[selectedChoice] = {
        ...newQuestionData.choices[selectedChoice],
        votes: newQuestionData.choices[selectedChoice].votes + 1,
      };

      setVoted(true);
      setQuestionData(newQuestionData);
      updateQuestion(newQuestionData)
        .then((res) => {
          if (!isCancelled) {
            if (res !== false) {
              setQuestionData(res);
            } else {
              setVoted(false);
              setQuestionData(oldQuestionData);
            }
          }

          return res;
        })
        .catch(() => {
          if (!isCancelled) {
            setVoted(false);
            setQuestionData(oldQuestionData);
          }
        });
    }
  }, [voted, questionData, selectedChoice]);

  const location = useLocation();
  const from = location.state ? location.state.from : null;

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
