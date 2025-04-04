import { parseModule } from "../src/parse";
import { n_container } from "../src";

const result = parseModule(
  `(footprint "L_Wurth_WE-LF-TypeLH"
          (version 20221018)
          (generator pcbnew)
          (fp_line (start -1.6500000000000004 -0.825) (end -4.440892098500626e-16 0))
        )`,
  "long",
  { startRule: "module" },
);

if (
  result.module.find((p: n_container) => p.type === "fp_line").value.end.x !==
  -4.440892098500626e-16
) {
  throw new Error("fp_line end.x is not -4.440892098500626e-16");
}

const result2 = parseModule(
  `(footprint "L_Wurth_WE-LF-TypeLH"
          (version 20221018)
          (generator pcbnew)
          (fp_line (start .6500000000000004 -.6e-3) (end +55. 0))
        )`,
  "long",
  { startRule: "module" },
);

if (
  result2.module.find((p: n_container) => p.type === "fp_line").value.start
    .y !== -0.6e-3
) {
  throw new Error("fp_line start.y is not -0.6e-3");
}

if (
  result2.module.find((p: n_container) => p.type === "fp_line").value.start
    .x !== 0.6500000000000004
) {
  throw new Error("fp_line start.x is not 0.6500000000000004");
}

if (
  result2.module.find((p: n_container) => p.type === "fp_line").value.end.x !==
  55
) {
  throw new Error("fp_line end.x is not 55");
}

console.log("All tests passed");
