"use client";

const IsOpen = ({onChange }) => {
  return (
    <select name="isOpen" required onChange={(e) => onChange(e.target.value)}>
      <option value="">Filter by open or closed</option>
      <option value={true}>Open</option>
      <option value={false}>Closed</option>
    </select>
  );
};

export default IsOpen;
