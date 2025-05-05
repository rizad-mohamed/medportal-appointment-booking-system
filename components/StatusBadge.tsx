import clsx from "clsx";
import Image from "next/image";

import { StatusIcon } from "@/constants";

export const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx(
        "status-badge min-w-[120px] h-8 flex items-center justify-center gap-2",
        {
          "bg-green-400": status === "scheduled",
          "bg-blue-400": status === "pending",
          "bg-red-400": status === "cancelled",
        }
      )}
    >
      <Image
        src={StatusIcon[status]}
        alt="status"
        width={16}
        height={16}
        className="brightness-0 invert"
      />
      <p className="text-12-semibold capitalize text-white">
        {status}
      </p>
    </div>
  );
};
