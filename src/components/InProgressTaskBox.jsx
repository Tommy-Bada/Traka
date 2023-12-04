/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

function InProgressTaskBox({
  title,
  description,
  status,
  dueDate,
  dueTime,
  onCompleted,
}) {
  return (
    <li
      className={`task-box ${status} text-left bg-[#FFE4BA] text-black p-[20px] rounded-2xl mb-[20px]`}
    >
      <h2 className="text-[20px] mb-[10px]">
        <b>{title}</b>
      </h2>
      <pre className="mb-[10px] whitespace-pre-wrap ">{description}</pre>
      <div className="flex items-center justify-start mb-[20px]">
        <p className="mr-[10px]">
          <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#000000" }} />{" "}
          {`${dueDate}`}
        </p>
        <p>
          <FontAwesomeIcon icon={faClock} style={{ color: "#000000" }} />
          {` ${dueTime}`}
        </p>
      </div>
      <p
        className="w-[100%] text-center bg-[#62EEA8] text-[16px] p-[10px] rounded-md  shadow-[0px_3px_0px_0px_#000000] border-[2px] border-black"
        onClick={onCompleted}
      >
        Complete
      </p>
    </li>
  );
}

export default InProgressTaskBox;
