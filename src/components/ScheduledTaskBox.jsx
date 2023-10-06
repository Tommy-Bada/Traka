/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
function ScheduledTaskBox({
  title,
  description,
  status,
  dueDate,
  dueTime,
  onStart,
  onEdit,
  onDelete,
}) {
  return (
    <li className={`task-box ${status}`}>
      <h2>{title}</h2>
      <pre>{description}</pre>
      <div>
        <p>{`Due Date: ${dueDate}`}</p>
        <p>{`Due Time:${dueTime}`}</p>
      </div>
      <p>{status}</p>
      <div>
        <button onClick={onStart}>Start</button>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </li>
  );
}

export default ScheduledTaskBox;
