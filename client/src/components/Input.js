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
      className="form-control mt-10 block w-1/2"
    />
  );
}

export default Input;
