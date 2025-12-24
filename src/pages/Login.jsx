import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const matchedUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!matchedUser) {
      setErrors({ password: "Invalid email or password" });
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(matchedUser));
    setUser(matchedUser);
    navigate("/profile");
  };

  return (
    <div className="screen login-screen">
      <h2>Signin to your PopX account</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>

      <form onSubmit={handleLogin}>
        <div className="field">
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            className={errors.email ? "input-error" : ""}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: "" });
            }}
          />
          {errors.email && (
            <span className="tooltip-error">{errors.email}</span>
          )}
        </div>

        <div className="field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            className={errors.password ? "input-error" : ""}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors({ ...errors, password: "" });
            }}
          />
          {errors.password && (
            <span className="tooltip-error">{errors.password}</span>
          )}
        </div>

        <button type="submit" className="primary bottom-btn">
          Login
        </button>
      </form>
    </div>
  );
}
