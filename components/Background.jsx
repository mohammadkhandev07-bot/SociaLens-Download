export default function Background() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-[#05010a]">
      <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] animate-drift rounded-full bg-fuchsia-600/25 blur-[130px]" />
      <div className="absolute -right-40 top-1/3 h-[32rem] w-[32rem] animate-drift rounded-full bg-purple-700/25 blur-[140px] [animation-delay:-6s]" />
      <div className="absolute -bottom-48 left-1/4 h-[36rem] w-[36rem] animate-drift rounded-full bg-pink-600/20 blur-[150px] [animation-delay:-11s]" />
    </div>
  );
}
