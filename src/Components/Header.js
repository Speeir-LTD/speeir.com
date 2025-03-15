import React from "react";
import ParticlesBg from "particles-bg";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <header id="home">
      <ParticlesBg type="circle" bg={true} />
      <div className="row banner">
        <div className="banner-text">
          <motion.h1
            className="responsive-headline"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            speeir
          </motion.h1>
          <motion.h3
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            @Speeir LTD
          </motion.h3>
        </div>
      </div>
    </header>
  );
};

export default Header;
