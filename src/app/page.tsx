"use client";
import { Component } from "../components/components";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function Home() {
  return (
    <div className="flex w-full flex-row h-screen overflow-hidden">
      <Provider store={store}>
        <Component.Sider />
        <Component.Chat />
      </Provider>
    </div>
  );
}
