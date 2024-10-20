import charactersReducer from "../slices/charactersSlice";
import authReducer from "../slices/authSlice";
import themeReducer from "../slices/themeSlice";

const rootReducer = {
  characters: charactersReducer,
  auth: authReducer,
  theme: themeReducer,
};

export default rootReducer;
