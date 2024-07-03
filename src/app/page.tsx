import { Component } from "../components/components";

export default function Home() {
  return (
    <div className="flex w-full flex-row h-screen overflow-hidden">
      <Component.Sider />
      <Component.Chat />
    </div>
  );
}
