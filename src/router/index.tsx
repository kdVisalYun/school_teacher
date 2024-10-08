import { createBrowserRouter } from "react-router-dom";

import store from "store";
import { refreshToken } from "features/auth/authAction";
import { getUserProfile } from "features/user/userAction";
import {
  LOGIN_PATH,
  BASE_PATH,
  PICTURES_PATH,
  PICTURES_SUMMARIZATION_PATH,
  PICTURES_RESULTS_PATH,
  CLASS_PATH,
  STUDENT_PATH,
  ACCOUNT_PATH,
  DELETE_ACCOUNT_PATH,
  SYSTEM_INFO_PATH,
  FACILITY_PATH,
  CHANGE_PASSWORD_PATH,
  SETTING_PATH,
  UPLOAD_PATH,
  UNPUBLISHED_PICTURES_PATH,
  DELETE_PICTURES_PATH,
  PARENTS_MATERIAL_PATH,
  USER_MANUAL_PATH,
  FAQ_PATH,
} from "./pathName";
import { STUDENT } from "config/keywords";
import LoginPage from "components/Login";
import Layout from "components/layout/Layout";
import HomePage from "components/Home";
import PictureSummarizationPage from "components/PictureSummarization";
import PicturesPage from "components/Pictures";
import PictureFilterPage from "components/PictureFilter";
import ClassPage from "components/Class";
import ClassFormPage from "components/ClassForm";
import StudentPage from "components/Student";
import StudentFormPage from "components/StudentForm";
import TeacherPage from "components/Teacher";
import TeacherFormPage from "components/TeacherForm";
import DeleteTeacherFormPage from "components/DeleteTeacherForm";
import SystemInfoPage from "components/SystemInfo";
import FacilityPage from "components/Facility";
import ChangePasswordPage from "components/ChangePassword";
import SettingPage from "components/Setting";
import UploadPage from "components/Upload";
import UploadPicturesSummarizationPage from "components/UploadPicturesSummarization";
import UploadPicturePage from "components/UploadPicture";
import BadUploadPicture from "components/BadUploadPicture";
import ParentsMaterialPage from "components/ParentsMaterial";
import UserManualPage from "components/UserManual";
import FAQPage from "components/FAQ";

const AppRouter = createBrowserRouter([
  {
    path: "*",
    element: <div>404 Not Found!</div>,
  },
  {
    path: "",
    element: <Layout />,
    loader: async () => {
      await store.dispatch(refreshToken());
      await store.dispatch(getUserProfile());
      return 1;
    },
    children: [
      {
        path: BASE_PATH,
        element: <HomePage />,
      },
      {
        path: UPLOAD_PATH,
        element: <UploadPage />,
      },
      {
        path: UNPUBLISHED_PICTURES_PATH,
        element: <UploadPicturesSummarizationPage />,
      },
      {
        path: `${UNPUBLISHED_PICTURES_PATH}/:id`,
        element: <UploadPicturePage />,
      },
      {
        path: `${DELETE_PICTURES_PATH}/:id`,
        element: <BadUploadPicture />,
      },
      {
        path: PICTURES_SUMMARIZATION_PATH,
        element: <PictureSummarizationPage />,
      },
      {
        path: PICTURES_PATH,
        element: <PictureFilterPage />,
      },
      {
        path: PICTURES_RESULTS_PATH,
        element: <PicturesPage />,
      },
      {
        path: CLASS_PATH,
        element: <ClassPage />,
      },
      {
        path: `${CLASS_PATH}/:id`,
        element: <ClassFormPage />,
      },
      {
        path: `${CLASS_PATH}/:id/${STUDENT}`,
        element: <StudentPage />,
      },
      {
        path: `${CLASS_PATH}/:classId/${STUDENT}/:id`,
        element: <StudentFormPage />,
      },
      {
        path: `${STUDENT_PATH}/:id`,
        element: <StudentFormPage />,
      },
      {
        path: ACCOUNT_PATH,
        element: <TeacherPage />,
      },
      {
        path: `${ACCOUNT_PATH}/:id`,
        element: <TeacherFormPage />,
      },
      {
        path: `${DELETE_ACCOUNT_PATH}/:id`,
        element: <DeleteTeacherFormPage />,
      },
      {
        path: SYSTEM_INFO_PATH,
        element: <SystemInfoPage />,
      },
      {
        path: FACILITY_PATH,
        element: <FacilityPage />,
      },
      {
        path: SETTING_PATH,
        element: <SettingPage />,
      },
      {
        path: CHANGE_PASSWORD_PATH,
        element: <ChangePasswordPage />,
      },
      {
        path: PARENTS_MATERIAL_PATH,
        element: <ParentsMaterialPage />,
      },
      {
        path: USER_MANUAL_PATH,
        element: <UserManualPage />,
      },
      {
        path: FAQ_PATH,
        element: <FAQPage />,
      },
    ],
  },
  {
    path: LOGIN_PATH,
    element: <LoginPage />,
  },
]);

export default AppRouter;
