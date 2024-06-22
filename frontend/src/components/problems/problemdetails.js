import React from 'react';
import { useParams } from 'react-router-dom';

const ProblemDetails = ({ problems }) => {
  const { id } = useParams();
  const problem = problems.find((p) => p.id.toString() === id);

  if (!problem) {
    return <div>Problem not found</div>;
  }

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
      <p>
        <strong>ID:</strong> {problem.id}
      </p>
      <p>
        <strong>Difficulty:</strong> {problem.difficulty}
      </p>
      <p>
        <strong>Submissions:</strong> {problem.submissions}
      </p>
      <p>
        <strong>Accuracy:</strong> {problem.accuracy}%
      </p>
      <p>
        <strong>Asked In:</strong> {problem.askedIn}
      </p>
      <p>
        <strong>Topic:</strong> {problem.topic}
      </p>
      <p>
        <strong>Posts:</strong> {problem.posts}
      </p>
    </div>
  );
};

export default ProblemDetails;
