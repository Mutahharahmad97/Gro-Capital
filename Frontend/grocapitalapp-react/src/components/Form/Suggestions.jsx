const Suggestions = (props) => {
  return (
    <div>
      {props.results.map((option, index) => (
        <div key={index} onClick={() => props.onclick(option)}>
          {option}
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
