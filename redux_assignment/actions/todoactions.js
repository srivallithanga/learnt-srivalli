const addAction = (todo) => ({ type: "ADD", todo });
const deleteAction = (index) => ({ type: "DELETE", index });
const editAction = (index, todo) => ({ type: "EDIT", index, todo });
const deleteAllAction = () => ({ type: "DELETE_ALL" });

export { addAction, deleteAction, editAction, deleteAllAction };
