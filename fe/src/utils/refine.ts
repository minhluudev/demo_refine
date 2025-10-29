import {
  AccessControlProvider,
  CanParams,
  CanReturnType,
} from "@refinedev/core";
import { useUserStore } from "@stores/useUserStore";

export const accessControlProvider: AccessControlProvider = {
  can: async ({
    resource,
    action,
    params,
  }: CanParams): Promise<CanReturnType> => {
    // TODO: xử lý permission ở đây
    console.log(resource, action, params);
    const permission = useUserStore.getState().permission;

    if (permission === "admin") {
      return { can: true };
    }

    return { can: false };
  },
};

export const resources = [
  {
    name: "posts",
    list: "/blog-posts",
    create: "/blog-posts/create",
    edit: "/blog-posts/edit/:id",
    show: "/blog-posts/show/:id",
    meta: {
      canDelete: true,
    },
  },
  {
    name: "categories",
    list: "/categories",
    create: "/categories/create",
    edit: "/categories/edit/:id",
    show: "/categories/show/:id",
    meta: {
      canDelete: true,
    },
  },
  {
    name: "categories-v2",
    list: "/categories-v2",
    show: "/categories-v2/show/:id",
    meta: {
      canDelete: true,
    },
  },
];
