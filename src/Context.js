import React, { useState, createContext } from "react";

export const Context = createContext();

export function ContextProvider(props) {
  return <Context.Provider>{props.children}</Context.Provider>;
}
