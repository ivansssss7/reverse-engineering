const Input = (props) => {
  let {
    name,
    placeholder,
    value,
    onChange
  } = props;

  return (
    <input
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{color: "black"}}
    />
  );
}

export default Input;
