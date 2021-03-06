import Button from "../../components/inputs/Button";
import useDebounce from "../../hooks/useDebounce";
import useInfiniteLoading from "../../hooks/useInfiniteLoading";
import { useState, useEffect, useCallback, useRef } from "react";
import "./styles.css";
import QuestionCard from "./QuestionCard";
import getQuestionsList from "../../api/getQuestionsList";
import { Link, useSearchParams } from "react-router-dom";
import TextInput from "../../components/inputs/TextInput";

/*
 * Poll list and search
 *
 * @component
 */
export default function QuestionsListScreen() {
  // This hook reads/writes search params.
  const [searchParams, setSearchParams] = useSearchParams();

  // The current filter. Defaults to the "filter" search param.
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

    // Cancel processing if the HTTP request failed.
    if (data === false) return;

    // If we have reached the end of the list, disable infinite loading.
    if (data.length < pageSize) {
      setEndReached(true);
    }

    const newQuestions = data.map((question) => ({
      id: question.id,
      title: question.question,
      thumbnail: question.thumb_url,
      timestamp: new Date(question.published_at).toLocaleString(),
      votes: question.choices.reduce((sum, choice) => sum + choice.votes, 0),
    }));

    setQuestions([...questions, ...newQuestions]);
    setPage(page + 1);
  }, [page, debouncedFilter, questions]);

  // Custom hook that handles infinite loading.
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
        <TextInput
          ref={searchBarRef}
          className="search"
          placeholder="Search"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          whiteBackground
        />
        <Button error disabled={filter === ""} onClick={() => setFilter("")}>
          Clear
        </Button>
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
      </div>
      {questions.length > 0 && (
        <div className="questions-container">
          {questions.map((question, index) => (
            <QuestionCard
              key={index}
              id={question.id}
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
        <div ref={ref} className="questions-container loading">
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
