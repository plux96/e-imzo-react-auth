import { useState, useEffect } from "react";
import React from "react";
import Button from "./Button";
import EIMZO from "./e-imzo/Eimzo";
import classes from "./Modal.module.css";
import Select from "./Select";
import axios from "axios";

export default function Modal() {
  const [certificates, setCertificates] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [keyId, setKeyId] = useState(null);
  const [pkcsInfo, setPkcsInfo] = useState("");
  const [resultPkcs, setResultPkcs] = useState({});
  const EIMZOClient = new EIMZO();

  useEffect(() => {
    const listAllKeys = async () => {
      await EIMZOClient.install();
      const data = await EIMZOClient.listAllUserKeys();
      setCertificates(data);
    };
    listAllKeys();
  }, []);

  const reqGuid = async () => {
    const backendGuid = await axios.get(
      `http://localhost:8080/?key=${keyId.id}`
    );
    console.log(backendGuid, "sdvdvdvd------vedvdv-");
    return backendGuid;
  };
  const getData = () => {
    const getKeyData = async () => {
      const keyData = await EIMZOClient.loadKey(certificates[0]);
      console.log(keyData);
      setKeyId(keyData);
      console.log(keyData);
    };
    if (certificates) {
      getKeyData();
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getDateFromBackend = async () => {
      const guid1 = await reqGuid();
      const pkcs = await EIMZOClient.createPkcs7(keyId.id, guid1.data.guid);
      console.log(pkcs);
      setPkcsInfo(pkcs);
    };
    if (keyId) {
      getDateFromBackend();
    }
  }, [keyId]);

  useEffect(() => {
    const verifyPkcs = async () => {
      const info = await axios.post("http://localhost:8080/pkcs7", {
        pkcs: pkcsInfo,
        infoCert: keyId,
      });
      console.log(info);
      setResultPkcs(info);
    };
    if (pkcsInfo) {
      verifyPkcs();
    }
  }, [pkcsInfo]);

  useEffect(() => {
    console.log(resultPkcs);
  }, [resultPkcs]);

  return (
    <>
      <Button
        kind="primary"
        onClick={() => toggleModal()}
        label="E-imzo bilan kirish"
      />
      {isOpen ? (
        <div className={classes.modal} onClick={() => toggleModal()}>
          <div
            className={classes.modal_content}
            onClick={(e) => e.stopPropagation()}
          >
            <h1>Modal</h1>
            <Select data={certificates} />
            <Button onClick={() => getData()} label="Tizimga kirish" />
          </div>
        </div>
      ) : null}
    </>
  );
}
