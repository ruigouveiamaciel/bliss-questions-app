import Card from "../../components/general/Card";
import Button from "../../components/general/Button";
import { useState } from "react";
import "./styles.css";

export default function QuestionsListScreen() {
  const [filter, setFilter] = useState("");

  return (
    <>
      <div className="filter-container">
        <input
          placeholder="Search"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
        <Button error disabled={filter === ""} onClick={() => setFilter("")}>
          Clear
        </Button>
      </div>
      <div className="questions-container">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <Card key={i} className="question">
            <img src="" />
            <div>{"What's your favourite language?"}</div>
          </Card>
        ))}
      </div>
    </>
  );
}
