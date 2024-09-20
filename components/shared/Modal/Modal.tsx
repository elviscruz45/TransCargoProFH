import React from "react";
import { Overlay } from "@rneui/themed";

import { styles } from "./Modal.styles";
interface ModalProps {
  show?: boolean;
  close?: () => void;
  children?: React.ReactNode;
}

export function Modal({
  show = false,
  close = () => {},
  children = null,
}: ModalProps) {
  // const { show, close, children } = props;

  return (
    <Overlay
      isVisible={show}
      overlayStyle={styles.overlay}
      onBackdropPress={close}
    >
      {children}
    </Overlay>
  );
}
