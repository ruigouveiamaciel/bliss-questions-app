import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot, faClock } from "@fortawesome/free-solid-svg-icons";
import { forwardRef } from "react";
import PropTypes from "prop-types";
import Card from "../../components/general/Card";
import "./QuestionCard.css";

const QuestionCard = forwardRef(
  ({ bannerSrc, bannerAlt, title, votes, timestamp }, ref) => {
    return (
      <Card ref={ref} className="question">
        <div className="question-banner">
          {bannerSrc && <img src={bannerSrc} alt={bannerAlt} />}
        </div>
        <div className="question-content">
          <h3>{title}</h3>
          <div>
            <FontAwesomeIcon icon={faCheckToSlot} className="icon" />
            <span>{votes} Votes</span>
          </div>
          <div>
            <FontAwesomeIcon icon={faClock} className="icon" />
            <span>{timestamp}</span>
          </div>
        </div>
      </Card>
    );
  }
);

QuestionCard.displayName = "QuestionCard";

QuestionCard.propTypes = {
  bannerSrc: PropTypes.string,
  bannerAlt: PropTypes.string,
  title: PropTypes.string,
  votes: PropTypes.number,
  timestamp: PropTypes.string,
};

export default QuestionCard;
