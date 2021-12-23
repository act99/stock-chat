import { useState, useCallback } from "react";

const useNavigation = () => {
  const [route, setRoute] = useState("Home");

  const selectAction = useCallback(
    (option) => {
      if (route === option) return;
      setRoute(option);
    },
    [route]
  );

  return { currentRoute: route, setCurrentRoute: selectAction };
};

export default useNavigation;
