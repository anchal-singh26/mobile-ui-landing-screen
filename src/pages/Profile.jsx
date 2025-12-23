import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import avatar from "../assets/avatar.png";

export default function Profile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="screen profile-screen">
      <h3>Account Settings</h3>

      <div className="profile-card">
        <div className="profile-header">
          <img src={avatar} alt="avatar" />
          <div className="profile-info">
            <strong>{user.name}</strong>
            <p>{user.email}</p>
          </div>
        </div>

        <p className="bio">
          Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr,
          Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna
          Aliquyam Erat, Sed Diam
        </p>

        <div className="divider"></div>
      </div>
    </div>
  );
}
