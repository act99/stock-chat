import classNames from "classnames";
import styles from "../../styles/navbar.module.css";
import logo from "../../images/logo.jpg";
import Image from "next/image";
import Link from "next/link";

type Props = {
  navigationData: string[];
  currentRoute: string;
  setCurrentRoute: any;
};

const Nav = ({ navigationData, currentRoute, setCurrentRoute }: Props) => {
  const onAdminClick = () => {
    window.location.href = "/login";
  };
  return (
    <nav className={styles.navbar}>
      <Image src={logo} layout="fixed" height={50} width={90} />
      <ul className={styles.navItems}>
        {navigationData.map((item, index) => (
          <li
            key={index}
            className={classNames([
              styles.navItem,
              currentRoute === item && styles.selectedNavItem,
            ])}
          >
            <Link key={index} href={`/${item}`}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
      <button className={styles.actions} onClick={onAdminClick}>
        Admin
      </button>
    </nav>
  );
};

export default Nav;
