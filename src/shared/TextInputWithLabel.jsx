const TextInputWithLabel = ({
  elementId,
  labelText,
  onChange,
  ref,
  value,
  ...rest
}) => {
  return (
    <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        type='text'
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </>
  );
};

export default TextInputWithLabel;
