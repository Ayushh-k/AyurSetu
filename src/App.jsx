import { useState } from "react";
import "./App.css";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";

function App() {
  const [currentPage, setCurrentPage] = useState("signin");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const switchToSignUp = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage("signup");
      setIsTransitioning(false);
    }, 300);
  };

  const switchToSignIn = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage("signin");
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className={`app-container ${isTransitioning ? "transitioning" : ""}`}>
      {currentPage === "signin" ? (
        <SignIn onSwitchToSignUp={switchToSignUp} />
      ) : (
        <SignUp onSwitchToSignIn={switchToSignIn} />
      )}
    </div>
  );
}

export default App;
