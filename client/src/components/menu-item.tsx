import { Link } from "react-router-dom";

const MenuItem = (props: any) => {
  return (
    <Link className="h-24 grow w-0 uppercase text-center" to={props.to}>
      <svg className="h-24 block my-auto fill-cyan-100">{props.children}</svg>
    </Link>
  );
};

export default MenuItem;
