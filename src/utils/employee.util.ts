import { socket } from "@/socket";
import { handleApiRequest } from "@/api/index";
import { updateEmployee, deleteEmployee } from "@/api/employee";

const handleAcceptEmployee = async (employmentId: string) => {
  console.log(employmentId);
  const [response, error] = await handleApiRequest(() =>
    updateEmployee(
      {
        status: "active",
      },
      employmentId
    )
  );
  if (error) {
    alert(error.message);
  } else {
    socket.emit("acceptEmployee", response);
  }
};

const handleRejectEmployee = async (employmentId: string) => {
  console.log(employmentId);
  const [response, error] = await handleApiRequest(() =>
    deleteEmployee(employmentId)
  );
  if (error) {
    alert(error.message);
  } else {
    console.log(response);
    socket.emit("rejectEmployee", { employmentId });
  }
};

export { handleAcceptEmployee, handleRejectEmployee };
