const DEFAULT_STATE = {
  id: "",
  fullname: "",
};

export const userReducer = (state = DEFAULT_STATE, action) => {
  if (action.type === "USER_LOGIN") {
    const dupState = { ...state };

    dupState.id = action.payload.id;
    dupState.fullname = action.payload.fullname;

    return dupState;
  }
  return state;
};
