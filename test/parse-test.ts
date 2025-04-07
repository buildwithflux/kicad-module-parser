import { parseModule } from "../src/parse";
import { n_container, n_primitive } from "../src";

const result = parseModule(
  `(footprint "L_Wurth_WE-LF-TypeLH"
          (version 20221018)
          (generator pcbnew)
          (fp_line (start -1.6500000000000004 -0.825) (end -4.440892098500626e-16 22.222))
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

if (
  result.module.find((p: n_container) => p.type === "fp_line").value.end.y !==
  22.222
) {
  throw new Error("fp_line end.x is not 22.222");
}

const result2 = parseModule(
  `(footprint "L_Wurth_WE-LF-TypeLH"
          (version 20221018)
          (generator pcbnew)
          (fp_line (start .6500000000000004 -.6e-3) (end +55 10e2))
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

if (
  result2.module.find((p: n_container) => p.type === "fp_line").value.end.y !==
  1000
) {
  throw new Error("fp_line end.y is not 10e2");
}

const result3 = parseModule(
  `(kicad_pcb (version 20211014) (generator pcbnew)
    (dimension (type aligned) (layer "F.CrtYd") (tstamp f78e02cd-9600-4173-be8d-67e530b5d19f)
      (pts (xy 213.5 78.5) (xy 210 78.5))
      (height 9.5)
      (gr_text "3.5000 mm" (at 211.75 67.2) (layer "F.CrtYd") (tstamp f78e02cd-9600-4173-be8d-67e530b5d19f)
        (effects (font (size 1.5 1.5) (thickness 0.3)))
      )
      (format (units 2) (units_format 1) (precision 4))
      (style (thickness 0.3) (arrow_length 1.27) (text_position_mode 0) (extension_height 0.58642) (extension_offset 0) keep_text_aligned)
    )
  )`,
  "long",
  { startRule: "board" },
);

const dimension = result3.kicad_pcb.find(
  (p: n_container) => p.type === "dimension",
).value;

if (dimension.dimension_type !== "aligned") {
  throw new Error("3: dimension type is not aligned");
}

const result4 = parseModule(
  `(kicad_pcb (version 20211014) (generator pcbnew)
    (general
      (thickness 1.6)
    )  
    (gr_line (start 207.825001 82.249999) (end 220.825 82.25) (layer F.SilkS) (width 0.5) (tstamp 5F727BA3))
    (dimension 57.5 (width 0.15) (layer Dwgs.User)
      (gr_text "57,500 mm" (at 134.98944 85.25864 270) (layer Dwgs.User)
        (effects (font (size 1 1) (thickness 0.15)))
      )
      (feature1 (pts (xy 119.43944 114.00864) (xy 134.275861 114.00864)))
      (feature2 (pts (xy 119.43944 56.50864) (xy 134.275861 56.50864)))
      (crossbar (pts (xy 133.68944 56.50864) (xy 133.68944 114.00864)))
      (arrow1a (pts (xy 133.68944 114.00864) (xy 133.103019 112.882136)))
      (arrow1b (pts (xy 133.68944 114.00864) (xy 134.275861 112.882136)))
      (arrow2a (pts (xy 133.68944 56.50864) (xy 133.103019 57.635144)))
      (arrow2b (pts (xy 133.68944 56.50864) (xy 134.275861 57.635144)))
    )
    (dimension 7 (width 0.15) (layer Dwgs.User)
      (gr_text "7,000 mm" (at 217.575 83.95) (layer Dwgs.User)
        (effects (font (size 1 1) (thickness 0.15)))
      )
      (feature1 (pts (xy 221.075 90) (xy 221.075 84.663579)))
      (feature2 (pts (xy 214.075 90) (xy 214.075 84.663579)))
      (crossbar (pts (xy 214.075 85.25) (xy 221.075 85.25)))
      (arrow1a (pts (xy 221.075 85.25) (xy 219.948496 85.836421)))
      (arrow1b (pts (xy 221.075 85.25) (xy 219.948496 84.663579)))
      (arrow2a (pts (xy 214.075 85.25) (xy 215.201504 85.836421)))
      (arrow2b (pts (xy 214.075 85.25) (xy 215.201504 84.663579)))
    )
  )`,
  "long",
  { startRule: "board" },
);

const dimension2 = result4.kicad_pcb.find(
  (p: n_container) => p.type === "dimension",
).value;
const gr_text = dimension2.gr_text.text;

if (gr_text !== "57,500 mm") {
  throw new Error(`4: gr_text not parsed as expected, expected 57,500 mm`);
}

const result5 = parseModule(
  `(kicad_pcb (version 20211014) (generator pcbnew)

    (footprint "ABC" (layer "F.Cu")
      (zone (net 2) (net_name "GND") (layer "F.Cu") (tstamp 00000000-0000-0000-0000-00005884c6ba) (hatch edge 0.508)
        (filled_polygon
          (layer "F.Cu")
          (pts
            (xy 208.311342 75.967964)
            (xy 207.470915 76.806925)
          )
          (pts
            (xy 208.311342 75.967964)
            (xy 207.470915 76.806925)
          )
        )
      )
    )
  )`,
  "long",
  { startRule: "board" },
);

const polygons = result5.kicad_pcb
  .find(
    (p: n_container) =>
      p.type === "module" &&
      p.value.find(
        (p2) =>
          p2.type === "name" && p2.value === ("ABC" as unknown as n_primitive),
      ),
  )
  .value.find((p: n_container) => p.type === "zone").value.filled_polygon;

if (polygons[0].layer !== "F.Cu") {
  throw new Error(
    "6: layer of filled_polygon not parsed as expected, expected F.Cu",
  );
}

console.log("All tests passed");
