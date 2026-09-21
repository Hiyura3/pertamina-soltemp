import { ModuleConfig } from "../ModuleConfig";
export const RouteConfig = {
  BasePath: `/${ModuleConfig.Prefix}/Countries`,
  Tag: `${ModuleConfig.Prefix}.Countries`,
} as const;
