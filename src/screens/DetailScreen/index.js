import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "../../components/general/Button";
import getQuestionData from "../../api/getQuestionData";
import useCancel from "../../hooks/useCancel";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot, faClock } from "@fortawesome/free-solid-svg-icons";
import Radio from "../../components/inputs/Radio";

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

  return (
    <div className="detail-container">
      <Link to="/questions">
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
                    if (event.target.checked) {
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
          <Button secondary>Share</Button>
          <Button disabled={selectedChoice === null}>Vote</Button>
        </div>
      </div>
    </div>
  );
}
