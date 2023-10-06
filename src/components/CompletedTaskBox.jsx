// eslint-disable-next-line react/prop-types
function CompletedTaskBox({ title, description, status }) {
  return (
    <li className={`task-box ${status}`}>
      <h2>{title}</h2>
      <pre>{description}</pre>
      <p>{status}</p>
    </li>
  );
}

export default CompletedTaskBox;
