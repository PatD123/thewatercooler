import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <LogoIcon />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        <h1 className="text-xl font-bold text-info">
          <span className="text-teal-900">the</span>
          <span className="text-teal-700">watercooler</span>
        </h1>
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Image
      className="object-fill"
      src="/dashboard_icon.ico"
      width={35}
      height={35}
      alt="Picture of the author"
    />
  );
};
