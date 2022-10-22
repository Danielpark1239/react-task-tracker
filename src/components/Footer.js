import { useLocation } from "react-router-dom"

const Footer = ({ showLink }) => {
  const location = useLocation()

  return (
    <footer>
      <p>Copyright: &copy; 2022</p>
      {location.pathname !== "/about" && <a href="/about">About</a>}
    </footer>
  )
}

export default Footer
