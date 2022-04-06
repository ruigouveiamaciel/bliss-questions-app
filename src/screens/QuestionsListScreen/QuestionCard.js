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
          <h3 className={title ? undefined : "skeleton"}>
            {title ? title : "#"}
          </h3>
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
