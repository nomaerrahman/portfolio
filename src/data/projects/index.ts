import type { Project } from "@/lib/types";

/*
 * Project registry. To add a project:
 *   1. Copy any file in this folder, rename it to your slug and fill it in.
 *   2. Put images in /public/projects/<slug>/.
 *   3. Import it below. Set `featured` (1 = first) to show it on the homepage.
 */
import retailEltPipeline from "./retail-elt-pipeline";
import gpDemandForecasting from "./gp-demand-forecasting";
import checkoutFunnelPrd from "./checkout-funnel-prd";
import nhsPharmacyWorkflow from "./nhs-pharmacy-workflow";
import apexHomeAuto from "./apex-home-auto";
import lumenAndGrainCafe from "./lumen-and-grain-cafe";
import auraBeautyLounge from "./aura-beauty-lounge";
import apexGroomingBarbershop from "./apex-grooming-barbershop";
import novaEvents from "./nova-events";
import hypespark from "./hypespark";
import insightDashboard from "./insight-dashboard";
import ukTaxCalculator from "./uk-tax-calculator";
import portfolio from "./portfolio";

export const projects: Project[] = [
  retailEltPipeline,
  gpDemandForecasting,
  checkoutFunnelPrd,
  nhsPharmacyWorkflow,
  apexHomeAuto,
  lumenAndGrainCafe,
  auraBeautyLounge,
  apexGroomingBarbershop,
  novaEvents,
  hypespark,
  insightDashboard,
  ukTaxCalculator,
  portfolio,
];
