// eslint-disable-next-line react/prop-types
function CompletedTaskBox({ title, description, status }) {
  return (
    <li
      className={`task-box ${status} text-left bg-[#D1D0F9] text-[#6368D9] p-[20px] rounded-2xl mb-[20px]`}
    >
      <h2 className="text-[#6368D9] text-[20px] mb-[10px]">{title}</h2>
      <pre className="mb-[10px]">{description}</pre>
    </li>
  );
}

export default CompletedTaskBox;
