import logo from "../assets/logo.png"

function Logo() {
  return (
    <div className="fixed bottom-5 right-5 lg:bottom-10 lg:right-10 h-14 w-14 rounded-lg overflow-hidden">
      <a href="https://chaicode.com/" target="blank">
        <img className="object-cover" src={logo} alt="Chai Aur Code Logo" />
      </a>
    </div>
  );
}

export default Logo;
