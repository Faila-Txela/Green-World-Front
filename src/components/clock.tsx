import { useState, useEffect } from 'react';
import { IoTimeOutline } from "react-icons/io5";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString('pt-PT', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
<div className="fixed top-80 md:top-48 mx-0 md:mx-32 z-10">
  <div className="p-[2px] rounded-lg bg-gradient-to-r from-green-800 bg-transparent to-green-500">
    <div className="flex items-center gap-3 backdrop-blur-md text-white px-8 py-2 rounded-lg">
      <IoTimeOutline size={28} className="animate-pulse" />
      <span className="font-mono tracking-wide text-lg md:text-xl">{formattedTime}</span>
    </div>
  </div>
</div>
  );
};

export default Clock;