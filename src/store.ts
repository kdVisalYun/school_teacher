import { configureStore } from "@reduxjs/toolkit";

import authReducer from "features/auth/authSlice";
import userReducer from "features/user/userSlice";
import facilityReducer from "features/facility/facilitySlice";
import systemInfoReducer from "features/systemInfo/systemInfoSlice";
import classReducer from "features/class/classSlice";
import studentReducer from "features/student/studentSlice";
import pictureSearchReducer from "features/pictureSearch/pictureSearchSlice";
import teacherReducer from "features/teacher/teacherSlice";
import pictureReducer from "features/picture/pictureSlice";
import successReducer from "features/success/successSlice";
import errorReducer from "features/error/errorSlice";

const reducer = {
  auth: authReducer,
  user: userReducer,
  facility: facilityReducer,
  systemInfo: systemInfoReducer,
  class: classReducer,
  student: studentReducer,
  pictureSearch: pictureSearchReducer,
  teacher: teacherReducer,
  picture: pictureReducer,
  success: successReducer,
  error: errorReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
