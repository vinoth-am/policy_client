import React from "react";
import { useHistory } from "react-router-dom";
import { Menu, Layout } from "antd";
import { DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { LOGO, SIDEBAR_CHART, SIDEBAR_HOME } from "../utils/constants";
const { Sider } = Layout;

const SideBar = () => {
  const history = useHistory();
  return (
    <Sider collapsed={true}>
      <div className="logo">{LOGO}</div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
      >
        <Menu.Item
          key="1"
          icon={<DesktopOutlined />}
          onClick={() => history.push("/")}
        >
          {SIDEBAR_HOME}
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<PieChartOutlined />}
          onClick={() => history.push("/chart")}
        >
          {SIDEBAR_CHART}
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default SideBar;
