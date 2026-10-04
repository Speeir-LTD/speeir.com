import type { Product } from "@/components/ProductShowcase";
import { easysave } from "./easysave";
import { trackhq } from "./trackhq";

// Products with a full showcase page. Anything in `work` without an entry here
// falls back to the generic PortfolioDetail.
export const PRODUCTS: Record<string, Product> = { easysave, trackhq };
