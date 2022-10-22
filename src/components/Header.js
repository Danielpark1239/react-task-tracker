import PropTypes from "prop-types"
import Button from "./Button"

const Header = ({ title, onAdd, showAdd, showButton }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      {showButton && (
        <Button
          color={showAdd ? "red" : "steelblue"}
          text={showAdd ? "Close" : "Add"}
          onClick={onAdd}
        />
      )}
    </header>
  )
}

Header.defaultProps = {
  title: "Task Tracker",
}

Header.propTypes = {
  title: PropTypes.string,
}

export default Header
