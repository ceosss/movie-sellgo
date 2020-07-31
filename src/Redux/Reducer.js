let initial_state = [];

const movieReducer = (state = initial_state, action) => {
  switch (action.type) {
    case "SET_MOVIE":
      return action.payload;
    default:
      return state;
  }
};

export default movieReducer;
