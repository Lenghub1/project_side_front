import { Suspense } from "react";

import CP from "@/components";
import { useRecoilRefresher_UNSTABLE, useRecoilValueLoadable } from "recoil";
import { fetchGroupSelector } from "@/store/groupStore";

const GroupPage = () => {
  //   const [groups, setGroups] = useState<Object[] | null>([]);

  const groups = useRecoilValueLoadable(fetchGroupSelector);
  const refreshGroup = useRecoilRefresher_UNSTABLE(fetchGroupSelector);

  console.log(groups.state);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>Hello</div>
      <CP.Button onClick={() => refreshGroup()}>Click me</CP.Button>
    </Suspense>
  );
};

export default GroupPage;
