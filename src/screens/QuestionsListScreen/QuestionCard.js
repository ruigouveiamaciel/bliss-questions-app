import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot, faClock } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import "./QuestionCard.css";
import { Link } from "react-router-dom";

export default function QuestionCard({
  id,
  bannerSrc,
  bannerAlt,
  title,
  votes,
  timestamp,
}) {
  return (
    <Link to={`/questions/${id}`} className={`card question`}>
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
    </Link>
  );
}

QuestionCard.propTypes = {
  id: PropTypes.number,
  bannerSrc: PropTypes.string,
  bannerAlt: PropTypes.string,
  title: PropTypes.string,
  votes: PropTypes.number,
  timestamp: PropTypes.string,
};
