import { useEffect, useState } from "react";

import CP from "@/components";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilValueLoadable,
  useResetRecoilState,
} from "recoil";
import { fetchGroupSelector } from "@/store/groupStore";
import useRefetchOnMount from "@/hooks/useRefetchOnMount";

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

  useRefetchOnMount(groupsReset);

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
