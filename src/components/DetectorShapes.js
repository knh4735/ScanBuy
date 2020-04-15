import React from "react";
import { useSelector } from "react-redux";
import BarcodeImg from "./QRCode.svg";
import BluetoothImg from "./Bluetooth.svg";
import NFCImg from "./NFC.svg";

const DetectorShapes = ({ NFC, Bluetooth, CameraOn }) => {
  const { width, height } = useSelector(state => state.view, []);

  const coords = {
    polygon: {
      Barcode: [[0, 0], [0, height / 4], [width, height / 2], [width, 0]],
      NFC: [
        [0, height / 4],
        [0, (height * 4) / 5],
        [(width * 2) / 3, (height * 5) / 12]
      ],
      Bluetooth: [
        [0, (height * 4) / 5],
        [0, height],
        [width, height],
        [width, height / 2],
        [(width * 2) / 3, (height * 5) / 12]
      ]
    },
    image: {
      Barcode: { x: width / 2 + 20, y: 50 },
      NFC: { x: 20, y: height / 4 + 80 },
      Bluetooth: { x: width / 2 + 10, y: (height * 3) / 5 - 20 }
    }
  };

  return (
    <svg className="Detector-svg">
      <polygon
        className="Detector-nfc Detector-button"
        points={coords.polygon.NFC.map(pos => pos.join(",")).join(" ")}
        onClick={NFC}
      />
      <polygon
        className="Detector-barcode Detector-button"
        points={coords.polygon.Barcode.map(pos => pos.join(",")).join(" ")}
        onClick={CameraOn}
      />
      <polygon
        className="Detector-bluetooth Detector-button"
        points={coords.polygon.Bluetooth.map(pos => pos.join(",")).join(" ")}
        onClick={Bluetooth}
      />
      <image
        className="Detector-nfc-img Detector-img"
        href={NFCImg}
        x={coords.image.NFC.x}
        y={coords.image.NFC.y}
        alt="NFC"
        onClick={NFC}
      />
      <image
        className="Detector-barcode-img Detector-img"
        href={BarcodeImg}
        x={coords.image.Barcode.x}
        y={coords.image.Barcode.y}
        alt="Barcode"
        onClick={CameraOn}
      />
      <image
        className="Detector-bluetooth-img Detector-img"
        href={BluetoothImg}
        x={coords.image.Bluetooth.x}
        y={coords.image.Bluetooth.y}
        alt="Bluetooth"
        onClick={Bluetooth}
      />
      <text
        className="Detector-nfc-text Detector-text"
        x={coords.image.NFC.x + 50}
        y={coords.image.NFC.y + 120}
        onClick={NFC}
      >
        NFC
      </text>
      <text
        className="Detector-barcode-text Detector-text"
        x={coords.image.Barcode.x + 50}
        y={coords.image.Barcode.y + 120}
        onClick={CameraOn}
      >
        Barcode
      </text>
      <text
        className="Detector-bluetooth-text Detector-text"
        x={coords.image.Bluetooth.x + 50}
        y={coords.image.Bluetooth.y + 120}
        onClick={Bluetooth}
      >
        Bluetooth
      </text>
      Sorry, your browser does not support inline SVG.
    </svg>
  );
};

export default DetectorShapes;
