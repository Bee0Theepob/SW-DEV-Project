import { useState, useEffect } from "react";
import { getUsers, toggleBan } from "../../features/user/services";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";

function UserManagement() {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getUsers(user.token);
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [user.token]);

  const handleBanToggle = async (userId, isBanned) => {
    const userData = { userId, banned: !isBanned };
    await toggleBan(user.token, userData);
    fetchUsers(); // Refresh the user list to reflect changes
  };

  return (
    <>
      <h2>User Management</h2>
      <div className='user-list'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                handleBanToggle={handleBanToggle}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default UserManagement;
