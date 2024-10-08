import React from "react";

import AvatarIcon from "assets/icons/AvatarIcon";

interface ProfileAvatarProps {
  pictureUrl: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ pictureUrl }) => {
  return (
    <div className="w-[40px] h-[40px] bg-[#dbdbdb] rounded-full">
      {pictureUrl ? (
        <img
          style={{ maxWidth: "100%", maxHeight: "100%" }}
          className="rounded-full"
          alt="profile"
          src={pictureUrl}
        />
      ) : (
        <AvatarIcon width={40} height={40} color={"white"} />
      )}
    </div>
  );
};

export default ProfileAvatar;
