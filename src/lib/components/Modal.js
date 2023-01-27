import { useState, useEffect } from "react";
import React from "react";
import Button from "./Button";
import EIMZO from "./e-imzo/Eimzo";
import classes from "./Modal.module.css";
import Select from "./Select";
import { Guid } from "js-guid";

export default function Modal() {
  const [certificates, setCertificates] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [keyId, setKeyId] = useState(null);
  const EIMZOClient = new EIMZO();

  const newGuid = Guid.newGuid();
  console.log(newGuid.StringGuid);

  function getCurrentTimestamp() {
    return Date.now();
  }

  useEffect(() => {
    const listAllKeys = async () => {
      await EIMZOClient.install();
      const data = await EIMZOClient.listAllUserKeys();
      setCertificates(data);
      const keyData = await EIMZOClient.loadKey(data[0]);
      setKeyId(keyData);
      console.log(keyData);
      const createPkcs = await EIMZOClient.createPkcs7(
        keyData.id,
        newGuid.StringGuid
      );
      console.log(createPkcs);
    };

    !certificates && listAllKeys();
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    // console.log("certificates", certificates);
  };

  return (
    <>
      <Button
        kind="primary"
        handleClick={() => toggleModal()}
        label="E-imzo bilan kirish"
      />
      {isOpen ? (
        <div className={classes.modal} handleClick={() => toggleModal()}>
          <div
            className={classes.modal_content}
            handleClick={(e) => e.stopPropagation()}
          >
            <h1>Modal</h1>
            <Select data={certificates} />
            <Button handleClick={() => toggleModal()} label="Close" />
          </div>
        </div>
      ) : null}
    </>
  );
}
