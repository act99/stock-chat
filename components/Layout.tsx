import useNavigation from "../hooks/navHook";
import Nav from "./nav/Nav";
import Tab from "./nav/Tab";
import navigationData from "./nav/navArr";
const Layout = ({ children }: any) => {
  const { currentRoute, setCurrentRoute } = useNavigation();
  return (
    <>
      <Nav
        navigationData={navigationData}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
      <Tab
        navigationData={navigationData}
        currentRoute={currentRoute}
        setCurrentRoute={setCurrentRoute}
      />
      <div>{children}</div>
    </>
  );
};

export default Layout;
