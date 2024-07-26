import propTypes from "prop-types";

function Header({ heading, para }) {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-black">{heading}</h1>
      <p className="text-md my-2 text-[#4B4747] font-medium">{para}</p>
    </div>
  );
}

Header.propTypes = {
  heading: propTypes.string.isRequired,
  para: propTypes.string.isRequired,
};

export default Header;
