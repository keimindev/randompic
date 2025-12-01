import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

export type AppState = {
  cutCount: number;
  filter: string | null;
  mode: "normal" | "random";
  photos: string[];
};

export type AppAction =
  | { type: "SET_CUT_COUNT"; payload: number }
  | { type: "SET_FILTER"; payload: string | null }
  | { type: "SET_MODE"; payload: "normal" | "random" }
  | { type: "SET_PHOTOS"; payload: string[] }
  | { type: "RESET" };

const initialState: AppState = {
  cutCount: 3,
  filter: null,
  mode: "normal",
  photos: [],
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_CUT_COUNT":
      return { ...state, cutCount: action.payload };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "SET_MODE":
      return { ...state, mode: action.payload };

    case "SET_PHOTOS":
      return { ...state, photos: [...state.photos, ...action.payload] };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

type AppContextType = {
  state: AppState;
  dispatch: Dispatch<AppAction>;
};

const AppContext = createContext<AppContextType | null>(null);

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
