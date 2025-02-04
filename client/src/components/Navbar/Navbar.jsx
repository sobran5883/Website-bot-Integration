import { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
import {  Drawer } from 'antd';
import { Link, NavLink } from "react-router-dom";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    window.location.reload();
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`${scrolled ? "backdrop-blur-sm bg-white/70" : ""} fixed w-full z-[100]`}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="container my-4 flex justify-between items-center"
      >
        {/* Logo section */}
        <div className="">
          <NavLink to="/">
            <div className="text-primary text-xl font-semibold border-2 px-4 py-1 rounded-full border-primary">Get<span className="text-secondary">Chat</span>Bot</div>
          </NavLink>
        </div>
        
        {/* Menu section */}
        {
          token ? (
            <div className="flex gap-4">
              <Link to="/get">
                <button className="hidden min-w-[110px] lg:block border-2 py-1 rounded-sm border-primary hover:text-primary hover:scale-[1.05] transition-all ease-in-out duration-300">
                  Get
                </button>
              </Link>
              <button onClick={handleLogout} className="hidden lg:block border-2 px-6 py-1 rounded-sm border-primary hover:text-primary hover:scale-[1.05] transition-all ease-in-out duration-300">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link to="/get">
              <button className="hidden min-w-[110px] lg:block border-2 py-1 rounded-sm border-primary hover:text-primary hover:scale-[1.05] transition-all ease-in-out duration-300">
                Demo
              </button>
              </Link>
              <Link to='/login'>
                <button className="hidden lg:block border-2 px-6 rounded-sm py-1 border-primary hover:text-primary hover:scale-[1.05] transition-all ease-in-out duration-300">
                  Login
                </button>
              </Link> 
            </div>
          )
        }

        {/* Mobile Hamburger menu section */}
        <div className="lg:hidden cursor-pointer">
          <IoMdMenu onClick={() => setOpenDrawer(true)} className="text-4xl" />
        </div>
      </motion.div>

      <Drawer
        className="w-full"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        {
          token ? (
            <div className="flex flex-col gap-4">
              <Link to="/get">
                <button className="lg:hidden w-full block border-2 py-1 rounded-sm border-primary hover:text-primary hover:scale-[1.05] transition-all ease-in-out duration-300">
                  Get
                </button>
              </Link>
              <button onClick={handleLogout} className="lg:hidden block border-2 px-6 py-1 rounded-sm border-primary hover:text-primary hover:scale-[1.05] transition-all ease-in-out duration-300">
                Logout
              </button>
            </div>
          ) : (
            <Link to='/login'>
              <button className="border-2 px-6 rounded-sm py-1 border-primary hover:text-primary hover:scale-[1.05] transition-all ease-in-out duration-300">
                Login
              </button>
            </Link> 
          )
        }
      </Drawer>
    </nav>
  );
};

export default Navbar;
