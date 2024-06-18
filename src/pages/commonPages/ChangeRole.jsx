import { useNavigate } from "react-router-dom";
const ChangeRole = () => {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const handleRole = (e) => {
    const userRole = e.target.value;
    localStorage.setItem("role", userRole);
    navigate("/dashboard");
    location.reload();
  };
  return (
    <select
      style={{
        backgroundColor: "#2F343A",
        color: "white",
        border: "none",
        cursor: "pointer",
        outline: "none",
      }}
      onChange={handleRole}
      name="role"
      id="role"
      value={role}
    >
      <option value={1}>Dectec</option>
      <option value={2}>Client</option>
      <option value={4}>Protocol</option>
      <option value={3}>Utility</option>
    </select>
  );
};

export default ChangeRole;
