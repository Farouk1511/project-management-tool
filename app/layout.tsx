import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Theme from "./_components/Theme";
import { Avatar, Flex, Input, Layout, Space, Typography, theme } from "antd";
import SideMenu from "./_components/SideMenu";
import { Content, Header, Footer } from "antd/es/layout/layout";
import ContentWrapper from "./_components/ContentWrapper";
import { SearchOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en">
      <body style={{ margin: 0,backgroundColor:"black"}}>
        <AntdRegistry>
          <Theme>
            <Layout hasSider>
              <SideMenu />
              <Layout style={{ marginLeft: 200 }}>
                <Header style={{ padding: 5 }}>
                  <Flex justify="space-between" align="baseline">
                    <Input
                      addonBefore={<SearchOutlined />}
                      placeholder="search for anything..."
                      style={{
                        width: "300px",
                        marginTop: "10px",
                        marginLeft: "20px",
                        borderRadius: "10px",
                      }}
                    />
                    <Space align="baseline">
                      <Title level={5}>Farouk Kazeem</Title>
                      <Avatar
                        style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                      >
                        FK
                      </Avatar>
                    </Space>
                  </Flex>
                </Header>
                <ContentWrapper>{children}</ContentWrapper>
                <Footer style={{ textAlign: "center" }}>
                  Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
              </Layout>
            </Layout>
          </Theme>
        </AntdRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
