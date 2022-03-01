const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case "LOGIN":
      if (localStorage.getItem("bluffifyUser")) {
        state = true;
      }
      return state;
    case "LOGOUT":
      localStorage.clear("bluffifyUser");
      return (state = false);
    default:
      return state;
  }
};
export default loggedReducer;
