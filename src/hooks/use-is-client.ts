import { useEffect, useState } from "react";

export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- standard hydration pattern
    setIsClient(true);
  }, []);

  return isClient;
}
