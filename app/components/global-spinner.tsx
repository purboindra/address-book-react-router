import { motion } from "framer-motion";

const GlobalSpinner = () => {
  return (
    <div className="fixed inset-0 bg-neutral-500/15 bg-opacity-20 flex items-center justify-center z-50">
      <motion.div
        className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
};

export default GlobalSpinner;
