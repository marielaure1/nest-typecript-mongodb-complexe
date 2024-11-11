import { SetMetadata } from "@nestjs/common";

export const DISABLED_ROUTE = "DISABLED_ROUTE";
export const DisableRoute = () => SetMetadata(DISABLED_ROUTE, true);
