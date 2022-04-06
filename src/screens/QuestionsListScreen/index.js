import Button from "../../components/general/Button";
import useDebounce from "../../hooks/useDebounce";
import useInfiniteLoading from "../../hooks/useInfiniteLoading";
import { useState, useEffect, useCallback, useRef } from "react";
import "./styles.css";
import QuestionCard from "./QuestionCard";
import getQuestionsList from "../../api/getQuestionsList";
import { useSearchParams } from "react-router-dom";

export default function QuestionsListScreen() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(
    searchParams.has("filter") ? searchParams.get("filter") : ""
  );
  // Delay the filter state change so we don't fetch the api for every single
  // changed character
  const debouncedFilter = useDebounce(filter, 750);

  // Number of items per page
  const pageSize = 10;
  // List of loaded questions
  const [questions, setQuestions] = useState([]);
  // Whether or not we have reached the end of the list
  const [endReached, setEndReached] = useState(false);
  // Current page. This is used to calcualte the offset parameter when fetching
  // the API.
  const [page, setPage] = useState(0);

  const fetchQuestions = useCallback(async () => {
    const data = await getQuestionsList(
      pageSize,
      pageSize * page,
      debouncedFilter !== "" ? debouncedFilter : undefined
    );

    // If we have reached the end of the list, disable infinite loading.
    if (data.length < pageSize) {
      setEndReached(true);
    }

    const newQuestions = data.map((question) => ({
      title: question.question,
      thumbnail: question.thumb_url,
      timestamp: new Date(question.published_at).toLocaleString(),
      votes: question.choices.reduce((sum, choice) => sum + choice.votes, 0),
    }));

    setQuestions([...questions, ...newQuestions]);
    setPage(page + 1);
  }, [page, debouncedFilter, questions]);

  const ref = useInfiniteLoading(fetchQuestions, 1000);

  // Reset the questions list everytime time the filter is changed.
  useEffect(() => {
    setQuestions([]);
    setEndReached(false);
    setPage(0);
    // Update search params to match filter value.
    setSearchParams(
      debouncedFilter !== ""
        ? {
            filter: debouncedFilter,
          }
        : {}
    );
  }, [debouncedFilter]);

  // Search bar reference. Used to focus the search bar if the filter param is
  // present but empty.
  const searchBarRef = useRef();

  // If filter param is present but is empty, focus the search bar.
  useEffect(() => {
    if (searchBarRef.current && searchParams.get("filter") === "") {
      searchBarRef.current.focus();
    }
  }, []);

  return (
    <>
      <div className="filter-container">
        <input
          ref={searchBarRef}
          placeholder="Search"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
        <Button error disabled={filter === ""} onClick={() => setFilter("")}>
          Clear
        </Button>
        <Button>Share</Button>
      </div>
      {questions.length > 0 && (
        <div className="questions-container">
          {questions.map((question, index) => (
            <QuestionCard
              key={index}
              bannerSrc={question.thumbnail}
              bannerAlt={`Thumbnail ${question.title}`}
              title={question.title}
              votes={question.votes}
              timestamp={question.timestamp}
            />
          ))}
        </div>
      )}
      {!endReached && (
        <div ref={ref} className="questions-container">
          {Array(pageSize)
            .fill()
            .map((_, index) => (
              <QuestionCard key={index} />
            ))}
        </div>
      )}
    </>
  );
}
