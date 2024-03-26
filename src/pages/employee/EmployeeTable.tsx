import CP from "@/components";
import useFetch from "@/hooks/useFetch";
import { allEmployees } from "@/api/employee";
import EnhancedTable from "@/components/table/Table";
import { HeadCell } from "@/components/table/TableHead";
import { Employement } from "@/utils/interfaces/Employment";
import Error from "../error/Error";
import { allEmployeesData } from "@/store/employee";
import { useRecoilState } from "recoil";

const EmployeeTable = () => {
  const [allEmployee, setAllEmployee] = useRecoilState(allEmployeesData);
  const { data, error } = useFetch(allEmployees);
  if (error) {
    console.log(error);
    return <Error status={error.status_code} />;
  }
  setAllEmployee(data);
  console.log(allEmployee);

  return (
    <CP.Container>
      <EnhancedTable<Employement>
        orderBy="name"
        order="asc"
        headCells={headCells}
        rows={data || []}
        rowCount={data?.length || 0}
        tableName="Employee"
      />
    </CP.Container>
  );
};

export default EmployeeTable;

const headCells: HeadCell<Employement>[] = [
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Emplyee Information",
    filterable: true,
  },
  {
    id: "position",
    numeric: false,
    disablePadding: false,
    label: "Position",
    filterable: true,
  },
  {
    id: "privilege",
    numeric: false,
    disablePadding: false,
    label: "privilege",
    filterable: true,
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    filterable: true,
  },
];
