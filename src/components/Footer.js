const Footer = ({ showLink }) => {
  return (
    <footer>
      <p>Copyright: &copy; 2022</p>
      {showLink && <a href="/about">About</a>}
    </footer>
  )
}

export default Footer
