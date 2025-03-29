import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
function Home() {
  const { user, isLoading, isError, isSuccess, message, role } = useSelector(
    (state) => {
      return state.auth;
    }
  );


  return (
    <>
      {user && <div>hi,{user.name}</div>}
      <section className="heading">
        <h1>RenCar: Rental Car System</h1>
        <p>Please choose from an option below</p>
      </section>
      <Link to="/providerList" className="btn btn-reverse btn-block">
        <FaQuestionCircle />
        Create New Rentals
      </Link>
      {user && (
        <Link to="/viewRental" className="btn btn-block">
          <FaTicketAlt />
          {user.role === "admin" ? `View All Rentals` : `View My Rentals`}
        </Link>
      )}
      {!user && (
        <Link to="/login" className="btn btn-block">
          <FaTicketAlt />
          View My Rentals
        </Link>
      )}

      {user && user.role==="admin" && (
        <Link to="/userManagement" className="btn btn-reverse btn-block">
          <FaUser />
          User Management
        </Link>
      )}
    </>
  );
}

export default Home;
