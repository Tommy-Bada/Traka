// eslint-disable-next-line react/prop-types
function CompletedTaskBox({ title, description, status, dueDate, dueTime }) {
  return (
    <li className={`task-box ${status}`}>
      <h2>{title}</h2>
      <pre>{description}</pre>
      <div>
        <p>{`Due Date: ${dueDate}`}</p>
        <p>{`Due Time:${dueTime}`}</p>
      </div>
      <p>{status}</p>
    </li>
  );
}

export default CompletedTaskBox;
