import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
  <div className="screen landing">
    <div className="content">
      <h2>Welcome to PopX</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>

      <button className="primary" onClick={() => navigate('/signup')}>
        Create Account
      </button>

      <button className="secondary" onClick={() => navigate('/login')}>
        Already Registered? Login
      </button>
    </div>
  </div>
);

}
