import { useState, useEffect } from "react";

const useIsFirstRun = async () => {
  const [run, setRun] = useState(true);

  useEffect(() => {
    setRun(false);
    return () => {};
  }, []);

  return run;
};

export default useIsFirstRun;
