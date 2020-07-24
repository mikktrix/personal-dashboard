import React from "react";
import ShoppingList from "../components/ShoppingList";
import ItemModal from "../components/ItemModal";

const TodoPage = () => {
  return (
    <div>
      <ItemModal />
      <ShoppingList />
    </div>
  );
};

export default TodoPage;
