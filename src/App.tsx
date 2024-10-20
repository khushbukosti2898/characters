import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { Login } from "./components/Login/Login";
import { Navbar } from "./components/Appbar/Appbar";
import ErrorBoundary from "./components/Error/ErrorBoundary";
import ThemeProvider from "./components/ThemeProvider/ThemeProvider";
import { Characters } from "./containers/characters/CharacterList";

const App: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <ThemeProvider>
      <Navbar />
      <ErrorBoundary>
        <Characters />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
