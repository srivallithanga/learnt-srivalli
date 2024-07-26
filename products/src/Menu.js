import { Link } from "react-router-dom";

function Menu(props) {
  return (
    <div className="Menu">
      {props.menuData.map(({ title, path }) => (
        <Link to={path}>{title}</Link>
      ))}
    </div>
  );
}

export default Menu;
