import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Fade from "react-reveal";

class Header extends Component {
  render() {

    return (
      <header id="home">
        <ParticlesBg type="circle" bg={true} />
        <div className="row banner">
          <div className="banner-text">
            <Fade bottom>
              <h1 className="responsive-headline">speeir</h1>
            </Fade>
            <Fade bottom duration={1200}>
              <h3>@Speeir LTD</h3>
            </Fade>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
