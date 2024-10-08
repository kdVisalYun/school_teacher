import { useEffect } from "react";

import LanguageDropdown from "components/__reusable/LanguageDropdown";
import WelcomeContainer from "./WelcomeContainer";
import LoginForm from "./LoginForm";
import InfoContainer from "./InfoContainer";
import useAppDispatch from "hooks/useAppDispatch";
import { logout } from "features/auth/authAction";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(logout());
  }, []);

  return (
    <main className="h-screen bg-white flex flex-col">
      <header className="w-full p-2">
        <div className="w-1/3 lg:w-1/12 float-right">
          <LanguageDropdown />
        </div>
      </header>
      <article className="flex-1 w-[90vw] lg:w-2/4 m-auto space-y-10">
        <WelcomeContainer />
        <LoginForm />
        <InfoContainer />
      </article>
    </main>
  );
};

export default LoginPage;
