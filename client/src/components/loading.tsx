import Logo from "../assets/logo.svg";

const Loading = () => {
  return (
    <>
      <img
        className="block m-auto fill-slate-700 animate-spin max-h-2.5 max-w-2.5"
        src={Logo}
        alt="Loading"
      />
    </>
  );
};

export default Loading;
