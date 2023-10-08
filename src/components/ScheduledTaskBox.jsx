/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
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
    <li
      className={`task-box ${status} text-left bg-[#D1D0F9] text-[#6368D9] p-[20px] rounded-2xl mb-[20px]`}
    >
      <h2 className="text-[#6368D9] text-[20px] mb-[10px]">
        <b>{title}</b>
      </h2>
      <p className="mb-[10px]">{description}</p>
      <div className="flex items-center justify-start mb-[20px]">
        <p className="mr-[10px]">
          <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#6368D9" }} />{" "}
          {`${dueDate}`}
        </p>
        <p>
          <FontAwesomeIcon icon={faClock} style={{ color: "#6368D9" }} />
          {` ${dueTime}`}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <button onClick={onEdit}>
          <FontAwesomeIcon
            icon={faEdit}
            style={{ color: "#6368D9" }}
            size="lg"
          />
        </button>
        <button onClick={onDelete}>
          <FontAwesomeIcon
            icon={faTrash}
            style={{ color: "#6368D9" }}
            size="lg"
          />
        </button>
      </div>
      <p
        className="bg-[#6368D9] text-[#D1D0F9] text-[16px] text-center w-[100%] py-[5px]  mt-[20px] rounded-md"
        onClick={onStart}
      >
        Start
      </p>
    </li>
  );
}

export default ScheduledTaskBox;
