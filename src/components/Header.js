import React, { useRef } from "react";
import LogoImg from "../Logo.svg";
import FullscreenImg from "./Fullscreen.svg";
import InstallImg from "./Install.svg";
import "./Header.css";

const Header = () => {
  const installBtn = useRef(null);
  let isInstalled = window.matchMedia("(display-mode: standalone)").matches;
  let deferredPrompt;
  let installInterval;

  const install = () => {
    if (isInstalled) return;
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === "accepted") {
        isInstalled = true;
        deferredPrompt = null;
        clearInterval(installInterval);
      } else {
        console.log("User dismissed the A2HS prompt");
      }
    });
  };

  if (!isInstalled)
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();

      deferredPrompt = e;

      installInterval = setInterval(() => {
        installBtn.current.style.animationName = "Icon-shake";
        setTimeout(() => (installBtn.current.style.animationName = null), 600);
      }, 5000);
    });

  return (
    <div className="Header">
      <img className="Header-logo" src={LogoImg} alt="Logo" />
      <div className="Header-title">Scan Buy</div>
      <img
        className="Header-fullscreen Header-img"
        alt="Fullscreen"
        src={FullscreenImg}
        onClick={() => {
          document.body.requestFullscreen();
        }}
      />
      {isInstalled ? null : (
        <img
          className="Header-install Header-img Icon-can-shake"
          alt="Install"
          src={InstallImg}
          ref={installBtn}
          onClick={install}
        />
      )}
    </div>
  );
};

export default Header;
