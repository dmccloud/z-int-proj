import { Link } from "@reach/router";

export default function MenuItem(props: any) {
  const { to } = props;
  return (
    <div className="grow tracking-wide uppercase">
      <Link to={to} />
    </div>
  );
}
