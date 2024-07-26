import propTypes from "prop-types";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { TabContext } from "../context/TabContext";

function Navbar() {
  const linkData = [
    { link: "/otp-form", data: "OTP Form" },
    { link: "/course-list", data: "Course List" },
    { link: "/batches", data: "Batches" },
  ];
  return (
    <div className="absolute w-full max-w-[1024px] left-1/2 -translate-x-1/2 top-1 bg-slate-50 shadow-lg rounded-full flex justify-evenly items-center p-2">
      {linkData.map((link, index) => (
        <NavLink key={index} link={link.link} data={link.data} />
      ))}
    </div>
  );
}

function NavLink({ link, data }) {
  const { curTab, changeLink } = useContext(TabContext);
  return (
    <Link
      to={link}
      onClick={() => changeLink(data)}
      className={`nav-link ${
        data === curTab && "active"
      } font-semibold text-lg sm:text-xl pb-1`}
    >
      {data}
    </Link>
  );
}

NavLink.propTypes = {
  link: propTypes.string.isRequired,
  data: propTypes.string.isRequired,
};

export default Navbar;
