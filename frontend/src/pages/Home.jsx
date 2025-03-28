import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { useSelector} from "react-redux";
function Home() {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
      (state) => {
        return state.auth;
      }
    );
  console.log(user);


  return (
    <>
    {user && (
      <div>hi,{user.name}</div>
    )}
      <section className="heading">
        <h1>RenCar: Rental Car System</h1>
        <p>Please choose from an option below</p>
      </section>
      <Link to="/new-ticket" className="btn btn-reverse btn-block">
        <FaQuestionCircle />
        Create New Appointment
      </Link>
      <Link to="/tickets" className="btn btn-block">
        <FaTicketAlt />
        View My Appointments
      </Link>
    </>
  );
}

export default Home;
