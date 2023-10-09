import Image from "next/image";
import { FC, memo } from "react";

type TUserBage = {
  avatar: string;
  username: string;
  email: string;
};

const UserBage: FC<TUserBage> = ({ avatar, username, email }) => {
  return (
    <div className="flex">
      <div className="rounded-full overflow-hidden">
        <Image src={avatar} width={50} height={50} alt="avatar" />
      </div>
      <div className="flex flex-col ml-4 items-center justify-center">
        <span className="">{username}</span>
        <span className="opacity-40 sm:hidden">{email}</span>
      </div>
    </div>
  );
};

export default memo(UserBage);
