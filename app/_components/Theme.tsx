"use client"
import { ConfigProvider, theme } from "antd";

export default function Theme({ children }: React.PropsWithChildren) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#fa8c16",
          colorInfo: "#fa8c16",
          colorWarning: "#fadb14",
        },
        components: {
          Layout: {
            siderBg: "rgb(0, 0, 0)",
            triggerBg: "rgb(0, 0, 0)",
            headerBg: "rgb(0, 0, 0)",
          },
          Menu: {
            darkItemBg: "rgb(0, 0, 0)",
          },
        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      {children}
    </ConfigProvider>
  );
}
