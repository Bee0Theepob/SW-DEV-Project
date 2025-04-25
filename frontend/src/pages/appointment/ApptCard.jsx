import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { deleteAppt, updateAppt } from "../../features/appointment/service";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./AppointmentCard.css";

function ApptCard({ apptData, setIsDeleted }) {
  const { user } = useSelector((state) => state.auth);
  const [oldDate, setOldDate] = useState(apptData.apptDate);
  const [isEditing, setIsEditing] = useState(false);
  const [newDate, setNewDate] = useState(apptData.apptDate);

  useEffect(() => {
    if (apptData && apptData.apptDate) {
      setOldDate(apptData.apptDate);
    }
  }, [apptData]);

  const handleDelete = async () => {
    await deleteAppt(user.token, apptData._id);
    setIsDeleted(true);
  };

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = async () => {
    try {
      const response = await updateAppt(user.token, apptData._id, {
        apptDate: newDate,
      });
      console.log("Updated appointment:", response);
      setIsEditing(false);
      setOldDate(newDate);
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
          <h3>📅 Appointment Info</h3>

          <p>
            <strong>👤 User:</strong> {apptData.user?.name || "Unknown User"}
          </p>

          {!isEditing ? (
            <p>
              <strong>📆 Appt Date:</strong>{" "}
              {oldDate && format(new Date(oldDate), "PPP")}
            </p>
          ) : (
            <div>
              <label>
                <strong>✏️ New Date:</strong>
              </label>
              <input
                type='date'
                value={newDate.slice(0, 10)}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
          )}

          <h4>🚗 Provider Info</h4>
          {apptData.provider ? (
            <div className='provider-info'>
              <p>
                <strong>🏢 Name:</strong> {apptData.provider.name}
              </p>
              <p>
                <strong>📍 Address:</strong> {apptData.provider.address}
              </p>
              <p>
                <strong>📞 Tel:</strong> {apptData.provider.tel}
              </p>
            </div>
          ) : (
            <p style={{ color: "red" }}>⚠️ No provider data found.</p>
          )}

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
