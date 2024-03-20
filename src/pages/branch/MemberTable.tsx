import EnhancedTable from "@/components/table";
import { BranchData } from "@/utils/interfaces/Branch";
import { allEmployees } from "@/api/employee";
import { useRecoilState } from "recoil";
import { Error } from "../error";
import CP from "@/components";
import { HeadCell } from "@/components/table/TableHead";
import useFetch from "@/hooks/useFetch";
import { Employement } from "@/utils/interfaces/Employment";
import { allEmployeesData } from "@/store/employee";

const MemberTable = () => {
  const [allEmployee, setAllEmployee] = useRecoilState(allEmployeesData);
  const { data, error } = useFetch(allEmployees);
  if (error) {
    return <Error status={error.status_code} />;
  }
  return (
    <CP.Container>
      <EnhancedTable<Employement>
        orderBy="name"
        order="asc"
        headCells={headCells}
        rows={data}
        rowCount={data.length}
        tableName="Add Employee"
      />
    </CP.Container>
  );
};
export default MemberTable;
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
