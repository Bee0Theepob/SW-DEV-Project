import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
function ViewRental() {
  const { user } = useSelector(
    (state) => {
      return state.auth;
    }
  );

  return (
    <>
        <div>{user.role==="admin" ? "All":"Your"} Rental will be shown here</div>

    </>
  );
}

export default ViewRental;
