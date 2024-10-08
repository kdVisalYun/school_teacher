import LatestSystemInfo from "./LatestSystemInfo";
import PictureMenu from "./PictureMenu";
import PublishedPictureCalendar from "./PublishedPictureCalendar";
import MonthlyPicture from "./MonthlyPicture";

const HomePage = () => {
  return (
    <section className="h-full flex flex-col space-y-3 lg:space-y-5">
      <LatestSystemInfo />
      <PictureMenu />
      <div className="flex-1 lg:flex lg:space-x-3 space-y-3 lg:space-y-0">
        <div className="w-full lg:w-[75%]">
          <PublishedPictureCalendar />
        </div>
        <div className="w-full lg:w-[25%]">
          <MonthlyPicture />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
