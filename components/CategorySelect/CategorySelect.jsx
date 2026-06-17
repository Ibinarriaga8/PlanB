"use client";

const CategorySelect = ({ categories, category, setCategory, newCategory, setNewCategory}) => {
  return (
    <>
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select a category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
        <option value="new"> Create new category </option>
      </select>

      {category === "new" && (
        <input value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="New category name" required/>
      )}

    </>
  );
};

export default CategorySelect;
