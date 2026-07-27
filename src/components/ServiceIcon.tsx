import {
  Code,
  DeviceMobile,
  Cube,
  ChartLineUp,
  ShoppingCartSimple,
  Wrench,
} from "@phosphor-icons/react/dist/ssr";
import type { ServiceIcon as ServiceIconName } from "@/data/services";

const ICONS = {
  code: Code,
  smartphone: DeviceMobile,
  box: Cube,
  "trending-up": ChartLineUp,
  "shopping-cart": ShoppingCartSimple,
  wrench: Wrench,
} as const;

export function ServiceIcon({
  name,
  size = 22,
  className,
}: {
  name: ServiceIconName;
  size?: number;
  className?: string;
}) {
  const Icon = ICONS[name];
  return (
    <Icon size={size} weight="duotone" className={className} aria-hidden="true" />
  );
}
