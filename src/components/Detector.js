import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductById } from "../Products";
import { toggleCamera, itemDetected } from "../reducers/view";
import Camera from "./Camera";
import DetectedItem from "./DetectedItem";
import DetectorShapes from "./DetectorShapes";
import "./Detector.css";

const Detector = () => {
  const { isCameraOn, detectedItem } = useSelector(state => state.view, []);

  const dispatch = useDispatch();

  const NFC = () => {
    //alert("현재 NFC 기능은 지원되지 않습니다.");
    dispatch(itemDetected(getProductById(880473500000)));
  };

  const Bluetooth = () => {
    const serviceUUID = "6a48d8f0-0b6f-6b30-5941-f597c5ed012d";
    const characteristicUUID = "b75b1617-6a75-361c-ed56-50bbb74e8a58";

    navigator.bluetooth
      .requestDevice({
        filters: [
          {
            namePrefix: "ScanBuy"
          }
        ],
        optionalServices: [serviceUUID]
      })
      .then(device => {
        return device.gatt.connect();
      })
      .then(server => {
        return server.getPrimaryService(serviceUUID);
      })
      .then(service => {
        return service.getCharacteristic(characteristicUUID);
      })
      .then(characteristic => {
        return characteristic.readValue();
      })
      .then(value => {
        const productID = value.getUint8(0);
        console.log(`Product's ID is ${productID}`);

        const item = getProductById(productID);
        if (item) dispatch(itemDetected(item));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const CameraOn = () => {
    dispatch(toggleCamera());
  };

  return (
    <div className="Detector">
      {isCameraOn ? <Camera /> : null}
      {detectedItem ? <DetectedItem /> : null}
      <DetectorShapes NFC={NFC} Bluetooth={Bluetooth} CameraOn={CameraOn} />
    </div>
  );
};

export default Detector;
