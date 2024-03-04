import CP from "@/components";
import Store from "@/store";
import { useRecoilState } from "recoil";

function WindowProvider() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modal, setModal] = useRecoilState(Store.Layout.windowState);

  return <CP.Modal {...modal} />;
}

export default WindowProvider;
