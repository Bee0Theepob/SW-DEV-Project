import { useState, useEffect } from "react";
import { getUsers } from "../../features/user/services";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import "./UserCard.css";

function UserManagement() {
  const { user } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const data = await getUsers(user.token); 
      setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, [user.token]);

  return (
    <>
    <div>User Management</div>
      <div className="user-list">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {users.map((user) => (
              <div key={user._id} className="user-card">
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
                {user.role !=="admin" && (
                  <div className="user-actions">
                  <button
                    className={user.isBanned ? "unban-button" : "ban-button"}
                    onClick={() => handleBanToggle(user._id, user.isBanned)}
                  >
                    {user.isBanned ? "Unban" : "Ban"}
                  </button>
                </div>
                )}
                
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default UserManagement;
