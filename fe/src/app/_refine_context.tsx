"use client";

import { DevtoolsProvider } from "@providers/devtools";
import { useNotificationProvider } from "@refinedev/antd";
import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider from "@refinedev/nextjs-router";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ColorModeContextProvider } from "@contexts/color-mode";
import { dataProvider } from "@providers/data-provider";
import "@refinedev/antd/dist/reset.css";
import { useUserStore } from "@stores/useUserStore";
import { accessControlProvider, resources } from "@utils/refine";

type RefineContextProps = {
  defaultMode?: string;
  meData?: any;
};

export const RefineContext = (
  props: React.PropsWithChildren<RefineContextProps>
) => {
  const { defaultMode, meData, children } = props;
  const setPermission = useUserStore((state) => state.setPermission);

  setPermission(meData.permission);

  return (
    <RefineKbarProvider>
      <AntdRegistry>
        <ColorModeContextProvider defaultMode={defaultMode}>
          <DevtoolsProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider}
              resources={resources}
              accessControlProvider={accessControlProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: false,
                projectId: "OUGZXq-n7gy2N-6xX2O0",
              }}
            >
              {children}
              <RefineKbar />
            </Refine>
          </DevtoolsProvider>
        </ColorModeContextProvider>
      </AntdRegistry>
    </RefineKbarProvider>
  );
};
