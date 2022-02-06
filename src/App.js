import { Layout } from "antd";
import React from "react";
import "./App.css";
import { FOOTER } from "./utils/constants";
import Router from "./layouts/Router";
import SideBar from "./layouts/SideBar";

const { Header, Content, Footer } = Layout;

export default function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Layout className="site-layout">
        <Header className="site-layout-background" />
        <Content className="content">
          <Router />
        </Content>
        <Footer className="footer">{FOOTER}</Footer>
      </Layout>
    </Layout>
  );
}
