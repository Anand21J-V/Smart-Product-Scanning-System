import { TrashIcon } from '@heroicons/react/24/outline';

function SideBar() {
  return (
    <div className="hidden sm:flex flex-col-reverse items-center gap-3 px-2 mx-6">
      <div className="w-10 h-10 rounded-full bg-black shadow flex items-center justify-center border-[2px] border-black">
        <p className="text-lg font-bold text-white">+</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center border-[2px] border-black">
        <p className="text-lg font-medium">2</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center border-[2px] border-black">
        <p className="text-lg font-medium">1</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center border-[2px] border-black">
        <TrashIcon className="w-5 h-5 text-black" />
      </div>
    </div>
  );
}

export default SideBar;
