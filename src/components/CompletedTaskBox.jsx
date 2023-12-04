// eslint-disable-next-line react/prop-types
function CompletedTaskBox({ title, description, status }) {
  return (
    <li
      className={`task-box ${status} text-left bg-[#FFE4BA] text-black p-[20px] rounded-2xl mb-[20px]`}
    >
      <h2 className=" text-[20px] mb-[10px]">
        <b>{title}</b>
      </h2>
      <pre className="mb-[10px] whitespace-pre-wrap">{description}</pre>
    </li>
  );
}

export default CompletedTaskBox;
