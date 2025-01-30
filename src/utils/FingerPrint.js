import React, { useState, useEffect, useCallback } from "react";
import { errorFunction, successFunction } from "../Component/Alert";

const sampleFormat = [
  {
    name: "Raw",
    id: 1,
  },
  { name: "Intermediate", id: 2 },
  { name: "Compressed", id: 3 },
  { name: "PngImage", id: 5 },
];

const FingerPrint = ({ setImg, startScan = false, setDeviceId }) => {
  const [currentFormat] = useState(sampleFormat[3]);
  const [acquisitionStarted, setAcquisitionStarted] = useState(false);
  const [sdk, setSdk] = useState(null);
  const [myVal, setMyVal] = useState("");
  const [deviceConnected, setDeviceConnected] = useState(false);

  const initializeSDK = async () => {
    let sdkObtained = new window.Fingerprint.WebApi();
    FingerprintSdkTest(sdkObtained);
    setSdk(sdkObtained);
    const devices = await getDevices(sdkObtained);

    // Only update state if component is still mounted
    if (devices?.length === 1) {
      setMyVal(devices[0]);
      setDeviceId(devices[0]);
    }
  };

  // fingerprint sdk test
  const FingerprintSdkTest = (sdkObtained) => {
    sdkObtained.onDeviceConnected = (e) => {
      setDeviceConnected(true);
    };
    sdkObtained.onDeviceDisconnected = (e) => {
      // Detects if device gets disconnected - provides deviceUid of disconnected device
      if (e.deviceUid !== "00000000-0000-0000-0000-000000000000") {
        setDeviceConnected(false);
        errorFunction("Device disconnected");
        setMyVal("");
        setDeviceId("");
      }
    };
    sdkObtained.onCommunicationFailed = (e) => {
      // Detects if there is a failure in communicating with U.R.U web SDK
      errorFunction("Communication Failed");
    };
    sdkObtained.onSamplesAcquired = (s) => {
      // Sample acquired event triggers this function
      sampleAcquired(s);
    };
    sdkObtained.onQualityReported = (e) => {
      // Quality of sample acquired - Function triggered on every sample acquired
      // setQuality(window.Fingerprint.QualityCode[e.quality]);
    };
  };

  const handleStart = () => {
    if (myVal === "") {
      if (deviceConnected) {
        let sdkObtained = new window.Fingerprint.WebApi();
        FingerprintSdkTest(sdkObtained);
        setSdk(sdkObtained);
        getDevices(sdkObtained);
      } else {
        successFunction("Please connect a device.");
      }
    } else {
      console.log("start");
      startCapture(currentFormat, myVal);
    }
  };

  const startCapture = async (currentFormat, device) => {
    console.log("fianal");
    const formatId = currentFormat.id;
    const deviceId = device;
    if (!sdk || !myVal || acquisitionStarted) {
      return;
    }

    try {
      successFunction("Please,Place your finger on the device.", 2000);
      setAcquisitionStarted(true);
      await sdk.startAcquisition(formatId, deviceId);
    } catch (error) {
      errorFunction(error.message);
    }
  };
  const stopCapture = async () => {
    if (!acquisitionStarted) {
      return;
    }
    try {
      await sdk.stopAcquisition(myVal);
      setAcquisitionStarted(false);
    } catch (error) {
      errorFunction(error.message);
    }
  };

  // sample acquired
  const sampleAcquired = useCallback(
    (s) => {
      console.log(currentFormat, window.Fingerprint.SampleFormat.PngImage);
      if (currentFormat.id === window.Fingerprint.SampleFormat.PngImage) {
        // If sample acquired format is PNG- perform following call on object recieved
        // Get samples from the object - get 0th element of samples as base 64 encoded PNG image
        // localStorage.setItem("imageSrc", "");
        const samples = JSON.parse(s.samples);
        // localStorage.setItem(
        //   "imageSrc",
        //   "data:image/png;base64," + window.Fingerprint.b64UrlTo64(samples[0])
        // );
        setImg(
          "data:image/png;base64," + window.Fingerprint.b64UrlTo64(samples[0])
        );

        // setImg("test");
      } else {
        errorFunction("Format Error");
      }
    },
    [currentFormat]
  );

  // get devices
  const getDevices = useCallback(async (sdkObtained) => {
    let obtainedDevices = await sdkObtained.enumerateDevices();
    if (obtainedDevices.length === 0) {
      errorFunction("No Reader Detected.Please connect a reader");
    } else if (obtainedDevices.length === 1) {
      return obtainedDevices;
    }
  }, []);
  // start scanning
  useEffect(() => {
    if (startScan) {
      initializeSDK();
    }
  }, [startScan]);

  useEffect(() => {
    if (startScan && myVal !== "") {
      handleStart();
    }
    if (!startScan) {
      stopCapture();
    }
  }, [startScan, myVal]);

  return <></>;
};

export default FingerPrint;
