import { useEffect } from "react";

import CP from "@/components";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilValueLoadable,
  useResetRecoilState,
} from "recoil";
import { fetchGroupSelector } from "@/store/groupStore";

const GroupPage = () => {
  /*
  const [groups, setGroups] = useState<Object[] | null>([]);

  async function getGroup() {
    const [response, error] = await handleApiRequest(() => testApi.getGroup());

    if (response) {
      setGroups(response.data);
    } else {
      console.error(error?.message);
    }
  }
  */

  const groupsReset = useResetRecoilState(fetchGroupSelector);

  const groupsLoadable = useRecoilValueLoadable(fetchGroupSelector);
  const refreshGroup = useRecoilRefresher_UNSTABLE(fetchGroupSelector);

  console.log(groupsLoadable.state);

  console.log(groupsLoadable);
  if (groupsLoadable.state === "hasValue") {
    console.log(groupsLoadable.contents.data);
  }

  /**
   * trigger a data refetch request
   * SOURCE: https://github.com/facebookexperimental/Recoil/issues/85
   */
  useEffect(() => {
    // force the selector to re-run
    groupsReset();
  }, [groupsReset]);

  return (
    <>
      <CP.Button onClick={() => refreshGroup()}>Click me</CP.Button>
      <CP.Typography variant="h4">Group List</CP.Typography>
      {groupsLoadable.state === "hasValue" && (
        <div>
          {groupsLoadable.contents?.data?.map((item: any) => (
            <CP.Typography key={item.id}>{item.name}</CP.Typography>
          ))}
        </div>
      )}
      {groupsLoadable.state === "loading" && <div>Loading...</div>}
      {groupsLoadable.state === "hasError" && (
        <div>Error: {groupsLoadable.contents.message}</div>
      )}
    </>
  );
};

export default GroupPage;
