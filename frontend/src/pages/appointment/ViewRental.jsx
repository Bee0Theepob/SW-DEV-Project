import { useState, useEffect } from "react";
import { getAppt } from "../../features/appointment/service";
import { useSelector } from "react-redux";
import ApptCard from "./ApptCard";

function ViewRental() {
  const { user } = useSelector((state) => state.auth);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  console.log(user);

  const fetchAppts = async () => {
    console.log("fetchAppts called");
    setLoading(true);
    const data = await getAppt(user.token, user);
    setAppointments(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user && appointments.length === 0) {
      console.log("user here, ", user);
      fetchAppts();
    }
  }, [user]);

  useEffect(() => {
    if (isDeleted) {
      fetchAppts();
      setIsDeleted(false);
    }
  }, [isDeleted]);

  console.log(appointments);

  return (
    <>
      <h2>View Appointment</h2>
      {appointments.length === 0 && (
        <div className='no-appointments'>No appointments found.</div>
      )}
      <div className='user-list'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {appointments.map((appt) => (
              <ApptCard
                key={appt._id}
                apptData={appt}
                setIsDeleted={setIsDeleted}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default ViewRental;
