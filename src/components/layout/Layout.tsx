import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Header from "./Header";
import UploadPicture from "./UploadPicture";
import SuccessMessageDialog from "./SuccessMessageDialog";
import ErrorMessageDialog from "./ErrorMessageDialog";

const Layout = () => {
  return (
    <main className="flex flex-row">
      <Navbar />
      <div className="h-screen flex-1 flex flex-col bg-[#F4F4F4] overflow-auto">
        <Header />
        <UploadPicture />
        <div className="flex-1 p-2 lg:p-5 overflow-y-auto">
          <Outlet />
        </div>
      </div>
      <SuccessMessageDialog />
      <ErrorMessageDialog />
    </main>
  );
};

export default Layout;
