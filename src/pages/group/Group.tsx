import React, { Suspense, useEffect, useState } from "react";

import CP from "@/components";
// import {
//   useRecoilRefresher_UNSTABLE,
//   useRecoilStateLoadable,
//   useRecoilValue,
//   useRecoilValueLoadable,
// } from "recoil";
// import { fetchGroupSelector, groupRefetchTrigger } from "@/store/groupStore";
import { handleApiRequest } from "@/api";
import { testApi } from "@/api/auth";
import { useRecoilValue } from "recoil";
import { accessTokenState, axiosInterceptorState } from "@/store/userStore";

const GroupPage = () => {
  const [groups, setGroups] = useState<Object[] | null>([]);
  const isInterceptorInitialized = useRecoilValue(axiosInterceptorState);
  const accessToken = useRecoilValue(accessTokenState);

  // const groups = useRecoilValueLoadable(fetchGroupSelector);
  // const refreshGroup = useRecoilRefresher_UNSTABLE(fetchGroupSelector);

  // console.log(groups.state);

  async function getGroup() {
    const [response, error] = await handleApiRequest(() => testApi.getGroup());

    if (response) {
      setGroups(response.data);
    } else {
      console.error(error?.message);
    }
  }

  useEffect(() => {
    console.log(accessToken);
    if (accessToken) {
      console.log("IS INTERCEPTOR INITIALIZED", accessToken);
      getGroup();
    }
  }, [accessToken]);

  console.log(groups);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>Hello</div>
      <CP.Button onClick={() => getGroup()}>Click me</CP.Button>
    </Suspense>
  );
};

export default GroupPage;
