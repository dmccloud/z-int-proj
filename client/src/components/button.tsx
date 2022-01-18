const Button = (props: any) => {
  console.log("button-props", props);
  return (
    <button
      className="rounded-lg text-white bg-amber-500"
      onClick={() => props.onClick()}
    >
      {props.children}
    </button>
  );
};

export default Button;
