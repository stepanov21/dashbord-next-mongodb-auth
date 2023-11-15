import { cn } from "@/utils/cn";
import { formatISO, getDate, getDay, getTime, parseISO } from "date-fns";
import { intervalToDuration } from "date-fns/esm";
import Image from "next/image";
import { FC, HTMLAttributes, memo } from "react";

interface IUserBage extends HTMLAttributes<HTMLDivElement> {
  avatar: string;
  username: string;
  email: string;
  createdAt?: string;
}

const UserBage: FC<IUserBage> = ({
  avatar,
  username,
  createdAt,
  email,
  ...props
}) => {
  const start = getTime(parseISO(createdAt));
  const end = getTime(new Date());

  console.log(Math.floor((end - start) / 1000 / 60 / 60 / 24));

  return (
    <div {...props} className={cn("flex items-center", props.className)}>
      <div className="rounded-full overflow-hidden">
        {avatar && <Image src={avatar} width={50} height={50} alt="avatar" />}
      </div>
      <div className="flex flex-col ml-3 items-start">
        <span>{username}</span>
        <span className="bg-green text-greenDark px-2 py-1 border border-greenDark rounded-main mt-1">
          Beginner
        </span>
      </div>
      {createdAt && (
        <span>
          {`Days on the app ${Math.floor((end - start) / 1000 / 60 / 60 / 24)}`}
        </span>
      )}
    </div>
  );
};

export default memo(UserBage);
