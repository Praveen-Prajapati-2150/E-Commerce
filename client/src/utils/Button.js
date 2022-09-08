import React, {useState} from 'react';

const Button = ({text, color, margin, padding, setBoxColor}) => {
  const [box_color, setBox_color] = useState("")

  const handleChange = (e) => {
    const value = e.target.value
    setBoxColor(value)
    setBox_color(value)
  }

  return (
    <>
      <button
        style={{
          backgroundColor: color || 'black',
          color: 'white',
          border: 'none',
          outline: 'none',
          margin: margin || '5px',
          padding: padding || '5px',
          borderRadius: '4px',
        }}
      >
        {text || 'dummy text'}
      </button>
      <input type={"text"} onChange={handleChange} value={box_color} placeholder={"input for box color"}/>
    </>
  );
};

export default Button;
