import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { getProductById } from "../Products";
import { toggleCamera, itemDetected } from "../reducers/view";
import CameraImg from "./Camera.svg";
import "./Camera.css";

const Camera = () => {
  const dispatch = useDispatch();
  const loadImg = useRef(null);
  const camVideo = useRef(null);
  const camCanvas = useRef(null);
  let videoInterval;

  const barcodeDetector =
    window.BarcodeDetector !== undefined
      ? new window.BarcodeDetector()
      : undefined;

  const Barcode = image => {
    return barcodeDetector.detect(image).then(barcodes => {
      if (barcodes.length !== 1) return undefined;

      const productID = barcodes[0].rawValue;
      console.log(`Product's ID is ${productID}`);

      const item = getProductById(productID);
      return item;
    });
  };

  const videoOnReady = () => {
    camCanvas.current.width = camVideo.current.videoWidth;
    camCanvas.current.height = camVideo.current.videoHeight;
    const context = camCanvas.current.getContext("2d");

    videoInterval = setInterval(() => {
      context.drawImage(camVideo.current, 0, 0);

      Barcode(camCanvas.current).then(item => {
        if (item === undefined) return;

        camVideo.current.pause();
        clearInterval(videoInterval);
        dispatch(itemDetected(item));
      });
    }, 500);
  };

  useEffect(() => {
    let videoTracks;
    let isClosed = false;
    const videoObj = camVideo.current;

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: { exact: "environment" } } }) //true })
      .then(stream => {
        if (isClosed) {
          stream.getVideoTracks().forEach(track => track.stop());
          return;
        }

        camVideo.current.srcObject = stream;
        videoTracks = stream.getVideoTracks();
      })
      .catch(error => {
        console.log(error);
      });

    return () => {
      isClosed = true;
      if (videoTracks) videoTracks.forEach(track => track.stop());
      if (videoInterval) clearInterval(videoInterval);
      videoObj.srcObject = null;
    };
  });

  const closeCam = () => {
    dispatch(toggleCamera());
  };

  return (
    <div className="Camera">
      <div className="Camera-overlay" onClick={closeCam}></div>
      <img
        className="Camera-load"
        alt="Camera Loading"
        src={CameraImg}
        ref={loadImg}
      />
      <div className="Camera-screen">
        <video
          className="Camera-video"
          autoPlay
          ref={camVideo}
          onPlay={videoOnReady}
        />
        <canvas className="Camera-canvas" ref={camCanvas} />
      </div>
    </div>
  );
};

export default Camera;
