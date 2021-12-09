import React, { useCallback } from "react";
import classNames from "classnames";
import { AiFillHome, AiFillCompass, AiOutlineBarChart } from "react-icons/ai";
import { BsFillBagFill, BsFillPersonFill } from "react-icons/bs";
import { CgInbox } from "react-icons/cg";
import { SiBitcoinsv } from "react-icons/si";

import styles from "../../styles/tabbar.module.css";
import Link from "next/link";

type Props = {
  navigationData: string[];
  currentRoute: string;
  setCurrentRoute: any;
};

const Tab = ({ navigationData, currentRoute, setCurrentRoute }: Props) => {
  const getTabIcon = useCallback((item) => {
    switch (item) {
      case "home":
        return <AiFillHome />;
      case "stock":
        return <AiOutlineBarChart />;
      case "coin":
        return <SiBitcoinsv />;

      //   case "Profile":
      //     return <BsFillPersonFill />;
    }
  }, []);

  return (
    <nav className={styles.tabbar}>
      {navigationData.map((item, index) => (
        <span
          key={index}
          className={classNames([
            styles.tabItem,
            currentRoute === item && styles.tabItemActive,
          ])}
          onClick={() => setCurrentRoute(item)}
        >
          <Link key={index} href={`/${item}`}>
            <span className={styles.icon}>{getTabIcon(item)}</span>
          </Link>
        </span>
      ))}
    </nav>
  );
};

export default Tab;
