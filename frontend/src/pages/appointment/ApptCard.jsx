import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { deleteAppt, updateAppt } from "../../features/appointment/service";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./AppointmentCard.css";

function ApptCard({ apptData, setIsDeleted }) {
  const { user } = useSelector((state) => state.auth);
  const [oldDate, setOldDate] = useState(apptData.apptDate);
  console.log(apptData);
  console.log("ApptCard oldDate:", apptData.apptDate);
  // console.log("ApptCard oldDate:", oldDate);
  useEffect(() => {
    if (apptData && apptData.apptDate) {
      setOldDate(apptData.apptDate);
    }
  }, [apptData]);

  const [isEditing, setIsEditing] = useState(false);
  const [newDate, setNewDate] = useState(apptData.apptDate);

  const handleDelete = async () => {
    console.log("Delete appointment:", apptData);
    await deleteAppt(user.token, apptData._id);
    setIsDeleted(true);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const response = await updateAppt(user.token, apptData._id, {
        apptDate: newDate,
      });
      console.log("Updated appointment:", response);
      setIsEditing(false);
      setOldDate(newDate); // Update the date in the parent component
    } catch (err) {
      console.error("Error updating appointment:", err);
    }
  };

  return (
    <div className='appt-card'>
      <div className='apptContainer'>
        <div className='appt-icon'>
          <FaCalendarAlt size={40} color='#4CAF50' />
        </div>
        <div className='appt-info'>
          <h3>{apptData.provider?.name}</h3>
          {!isEditing ? (
            <p>Date: {oldDate && format(new Date(oldDate), "PPP")}</p>
          ) : (
            <input
              type='date'
              value={newDate.slice(0, 10)}
              onChange={(e) => setNewDate(e.target.value)}
            />
          )}
          <p>Provider: {apptData.provider?.name}</p>
          <div className='buttonContainer'>
            {!isEditing ? (
              <button className='edit-btn' onClick={handleEditToggle}>
                Edit
              </button>
            ) : (
              <button className='edit-btn' onClick={handleSave}>
                Save
              </button>
            )}
            <button className='delete-btn' onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApptCard;
