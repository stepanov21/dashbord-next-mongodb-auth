import { getTime, parseISO } from "date-fns";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { memo } from "react";

import { cn } from "@/utils/cn";

import type { FC, HTMLAttributes } from "react";

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
  const { data: session } = useSession();
  const start = getTime(parseISO(createdAt));
  const end = getTime(new Date());

  console.log(Math.floor((end - start) / 1000 / 60 / 60 / 24));

  return (
    <div
      {...props}
      className={cn(
        "flex items-center",
        props.className,
        session?.user?.email === email &&
          createdAt &&
          "shadow-active-bage order-first dark:bg-gray",
      )}
    >
      <div className="rounded-full overflow-hidden">
        {avatar && <Image src={avatar} width={50} height={50} alt="avatar" />}
      </div>
      <div className="flex flex-col ml-3 items-start">
        <span>
          {session?.user?.email === email && createdAt ? "You" : username}
        </span>
        <span className="bg-green text-greenDark px-2 py-1 border border-greenDark rounded-main mt-1">
          Beginner
        </span>
      </div>
      {createdAt && (
        <span className="ml-auto border border-[black] rounded-main bg-yellow dark:text-black p-2 px-3 w-20 text-center">
          {`${Math.floor((end - start) / 1000 / 60 / 60 / 24)} days`}
        </span>
      )}
    </div>
  );
};

export default memo(UserBage);
