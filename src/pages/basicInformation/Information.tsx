import CP from "@/components";
export interface InformationProvider {
  userInfo: {
    direction: string;
    firstName: string;
    lastName: string;
  };
  contact: {
    email: string;
    phone: string;
    direction: string;
  };
  comapnyName: string;
  gender: string;
  birtdate: Date;
}

const InformationForm = () => {
  return (
    <CP.Container>
      <CP.Input />
      <CP.Input />
    </CP.Container>
  );
};
export default InformationForm;
