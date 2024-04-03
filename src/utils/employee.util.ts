import { handleApiRequest } from "@/api/index";
import { updateEmployee, deleteEmployee } from "@/api/employee";

const handleAcceptEmployee = async (
  employmentId: string,
  organizationId: string,
  callback: (data: any, error: any) => void
) => {
  const [response, error] = await handleApiRequest(() =>
    updateEmployee(
      {
        status: "active",
      },
      employmentId,
      organizationId
    )
  );

  callback(response, error);
};

const handleRejectEmployee = async (
  employmentId: string,
  organizationId: string,
  callback: (data: any, error: any) => void
) => {
  const [response, error] = await handleApiRequest(() =>
    deleteEmployee(employmentId, organizationId)
  );

  callback(response, error);
};

export { handleAcceptEmployee, handleRejectEmployee };
