import { FaUser } from "react-icons/fa";
import "./UserCard.css";
import { useState } from "react";

function UserCard({ user, handleBanToggle }) {

    const [ban,setBan] = useState(user.banned);
  return (
    <>
      <div className="user-card">
        <div className="userContainer">
          <div className="user-icon">
            <FaUser size={40} />
          </div>
          <div className="user-info">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        </div>
        {user.role !== "admin" && (
          <div className="user-actions">
            <button
              className={user.banned ? "unban-button" : "ban-button"}
              onClick={() => {handleBanToggle(user._id, user.banned);setBan(!ban)}}
            >
              {user.banned ? "Unban" : "Ban"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default UserCard;
