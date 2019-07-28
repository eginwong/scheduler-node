import Meta from "../components/meta";
import "../static/styles/main.scss";

export default ({ children }) => (
  <div className="main-layout">
    <Meta />
    {children}
  </div>
);
