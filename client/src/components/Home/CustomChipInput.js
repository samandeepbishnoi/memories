import React, { useState } from "react";
import { TextField, Chip } from "@material-ui/core";

const CustomChipInput = ({ value, onAdd, onDelete, label }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!value.includes(input.trim())) {
        onAdd(input.trim());
      }
      setInput("");
    }
  };

  return (
    <>
      <TextField
        variant="outlined"
        label={label}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
        style={{ margin: "10px 0" }}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {value.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            onDelete={() => onDelete(chip)}
            color="primary"
          />
        ))}
      </div>
    </>
  );
};

export default CustomChipInput;
