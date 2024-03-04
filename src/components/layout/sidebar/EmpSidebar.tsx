import CP from "@/components";
import { useNavigate } from "react-router-dom";

const EmpSidebar = () => {
  const navigate = useNavigate();

  return (
    <CP.Styled.Div padding={"10px"} width="60vw">
      직원
      <CP.Button variant="text" onClick={() => navigate("/")}>
        {"< 캠퍼스"}
      </CP.Button>
      <CP.Button variant="text" onClick={() => navigate("/login")}>
        {"< 로그인"}
      </CP.Button>
    </CP.Styled.Div>
  );
};

export default EmpSidebar;
