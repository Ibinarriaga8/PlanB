"use client";

const OrderFilter = ({onChange}) => {
  return (
    <select name="orderFilter" required onChange={(e) => onChange(e.target.value)}>
        <option value="">Sort by price</option>
        <option value="asc">Low to high</option>
        <option value="desc">High to low</option>
    </select>
  );
};

export default OrderFilter;
