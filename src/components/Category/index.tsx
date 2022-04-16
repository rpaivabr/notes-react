import { ICategory } from "../../models";

interface CategoryProps {
  category: ICategory;
  onClick: () => void;
}

function Category({ category, onClick }: CategoryProps) {
  if (!category) return null;

  return (
    <div className="category" onClick={onClick}>
      <span className="dot" style={{ background: category.color }}></span>
      <span>{category.name}</span>
    </div>
  );
}

export default Category;
