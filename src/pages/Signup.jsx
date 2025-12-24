import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Signup() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    company: "",
    agency: "yes",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "*Full name is required";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "*Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.password.trim()) {
      newErrors.password = "*Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "*Password must be at least 6 characters";
    }

    return newErrors;
  };

  const submit = () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newUser = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      agency: form.agency,
      password: form.password, // Save password for login check
    };

    // Save user in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    setUser({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      agency: form.agency,
    });

    navigate("/profile");
  };

  return (
    <div className="screen signup">
      <h3>Create your PopX account</h3>

      <div className="form">
        <div className="field">
          <label>Full Name <span className="required">*</span></label>
          <input
            name="name"
            value={form.name}
            placeholder="Enter full name"
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="field">
          <label>Phone number <span className="required">*</span></label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            placeholder="Enter phone number"
            onChange={handleChange}
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>

        <div className="field">
          <label> Email address<span className="required">*</span></label>
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Enter email address"
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="field">
          <label>Password <span className="required">*</span></label>
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Enter password"
            onChange={handleChange}
          />
          {errors.password && (
            <span className="error">{errors.password}</span>
          )}
        </div>

        <div className="field">
          <label>Company name </label>
          <input
            name="company"
            value={form.company}
            placeholder="Enter company name"
            onChange={handleChange}
          />
        </div>

        <div className="agency">
          <p>Are you an Agency?*</p>
          <div className="radio">
            <label>
              <input
                type="radio"
                checked={form.agency === "yes"}
                onChange={() => setForm({ ...form, agency: "yes" })}
              />
              Yes
            </label>

            <label>
              <input
                type="radio"
                checked={form.agency === "no"}
                onChange={() => setForm({ ...form, agency: "no" })}
              />
              No
            </label>
          </div>
        </div>
      </div>

      <button className="primary bottom-btn" onClick={submit}>
        Create Account
      </button>
    </div>
  );
}
