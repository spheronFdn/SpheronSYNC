import SpheronLogo from "../assets/SpheronLogo.svg";

const Navbar = () => {
  return (
    <section className="bg-white shadow px-16 py-3 flex gap-1">
      <img src={SpheronLogo} alt="Spheron" className="h-10" />
      <div className="pt-1 text-xl font-bold">SYNC</div>
    </section>
  );
};

export default Navbar;
