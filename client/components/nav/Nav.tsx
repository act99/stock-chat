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
  // const onAdminClick = () => {
  //   window.location.href = "/login";
  // };

  return (
    <nav className={styles.navbar}>
      <Link href={"/"}>
        <a>
          <Image
            src={logo}
            layout="fixed"
            height={50}
            width={90}
            className=" cursor-pointer"
          />
        </a>
      </Link>

      <ul className={styles.navItems}>
        {navigationData.map((item, index) => (
          <Link key={index} href={item == "home" ? "/" : `/${item}`}>
            <li
              key={index}
              className={classNames([
                styles.navItem,
                currentRoute === item && styles.selectedNavItem,
              ])}
            >
              {item}
            </li>
          </Link>
        ))}
      </ul>
      <Link href={"/login"}>
        <button className={styles.actions}>Admin</button>
      </Link>
    </nav>
  );
};

export default Nav;
