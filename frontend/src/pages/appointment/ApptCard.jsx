import { FaCalendarAlt } from "react-icons/fa";
import { format } from "date-fns";
import { deleteAppt } from "../../features/appointment/service";
import { useSelector } from "react-redux";
import "./AppointmentCard.css";

function ApptCard({ apptData, setIsDeleted }) {
  const { user } = useSelector((state) => state.auth);
  // console.log("Appointment Data:", apptData);
  // const handleEdit = () => {
  //   // Logic to handle editing the appointment
  //   console.log("Edit appointment:", apptData);

  // }

  const handleDelete = async () => {
    // Logic to handle deleting the appointment
    console.log("Delete appointment:", apptData);
    // Call the delete function from the service
    const response = await deleteAppt(user.token, apptData._id);
    //   // Optionally, you can refresh the appointment list after deletion
    // fetchAppts(); // Refresh the appointment list to reflect changes
    setIsDeleted(true);
  };

  return (
    <div className='appt-card'>
      <div className='apptContainer'>
        <div className='appt-icon'>
          <FaCalendarAlt size={40} color='#4CAF50' />
        </div>
        <div className='appt-info'>
          <h3>{apptData.provider?.name}</h3>
          <p>Date: {format(new Date(apptData.apptDate), "PPP")}</p>
          <p>Provider: {apptData.provider?.name}</p>
          <div className='buttonContainer'>
            <button className='edit-btn'>Edit</button>
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
