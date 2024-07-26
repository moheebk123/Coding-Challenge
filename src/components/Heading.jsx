import propTypes from 'prop-types'

function Heading({ colorClass }) {
  return (
    <div
      style={{ textShadow: "1px 1px 1px rgb(0 0 0 / 62%)" }}
      className={`${colorClass} absolute bg-transparent w-full top-20 flex items-center justify-center text-center text-3xl md:text-5xl font-bold capitalize`}
    >
      Chai Aur Code
    </div>
  );
}

Heading.propTypes = {
  colorClass: propTypes.string.isRequired,
}

export default Heading
