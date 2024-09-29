type node = n_container | n_primitive | n_array | n_named_value;
interface n_container {
    type: string;
    value: node[];
}
interface n_named_value {
    type: string;
    value: n_primitive | n_array;
}
interface n_primitive {
    type: "string" | "boolean" | "number";
    value: string | boolean;
}
interface n_array {
    type: "array";
    value: n_primitive[];
}
type pad_shape = "circle" | "rect" | "oval" | "trapezoid" | "roundrect" | "custom";
type pad_type = "thru_hole" | "np_thru_hole" | "smd" | "connect";
interface size {
    height: number;
    width: number;
}
interface drill extends size {
    oval?: boolean;
    offset?: {
        x: number;
        y: number;
    };
}
interface fp_generic {
    layers?: string[];
    width?: number;
    tstamp?: string;
    status?: string;
}
interface fp_arc extends fp_generic {
    type: "fp_arc";
    center: [number, number];
    end: [number, number];
    angle: number;
}
interface fp_circle extends fp_generic {
    type: "fp_circle";
    center: [number, number];
    end: [number, number];
}
interface fp_curve extends fp_generic {
    type: "fp_curve";
    start: [number, number];
    control1: [number, number];
    control2: [number, number];
    end: [number, number];
}
interface fp_line extends fp_generic {
    type: "fp_line";
    start: [number, number];
    end: [number, number];
}
interface fp_poly extends fp_generic {
    type: "fp_poly";
    points: [number, number][];
}
type fp_shape = fp_arc | fp_circle | fp_curve | fp_line | fp_poly;
interface pad extends common_attribures {
    type: "pad";
    id: string;
    pad_type: pad_type;
    shape: pad_shape;
    at: at;
    size: size;
    layers?: string[];
    drill?: drill;
    tstamp?: string;
}
type TEXT_TYPE = "reference" | "value" | "user";
interface fp_text {
    text_type: TEXT_TYPE;
    value: string;
    at: at;
    layers?: string[];
    hide?: boolean;
    effects?: text_effects;
}
interface text_effects {
    font?: {
        size?: number;
        thickness?: number;
        bold: boolean;
        italic: boolean;
    };
    justify?: JUSTIFY[];
    hide?: boolean;
}
type JUSTIFY = "left" | "right" | "top" | "bottom" | "mirror";
interface at {
    x: number;
    y: number;
    angle?: number;
}
interface common_attribures {
    solder_mask_margin?: number;
    solder_paste_margin?: number;
    solder_paste_ratio?: number;
    clearance?: number;
    thermal_width?: number;
    thermal_gap?: number;
    autoplace_cost90?: number;
    autoplace_cost180?: number;
    zone_connect?: number;
}
interface kicad_module extends common_attribures {
    attributes?: string[];
    at?: at;
    descr?: string;
    layer?: string[];
    tags?: string[];
    pads: pad[];
    shapes: fp_shape[];
    text: fp_text[];
    name?: string;
    tedit?: string;
    version?: string;
    placed?: boolean;
    locked?: boolean;
    smd?: boolean;
    virtual?: boolean;
}

declare const parse: {
    module: (x: string, format?: "compact" | "long" | "bare", options?: any) => any;
    board: (x: string, format?: "compact" | "long" | "bare", options?: any) => any;
    symbol: (x: string, format?: "compact" | "long" | "bare", options?: any) => any;
};

export { type JUSTIFY, type TEXT_TYPE, type at, type common_attribures, type drill, type fp_arc, type fp_circle, type fp_curve, type fp_generic, type fp_line, type fp_poly, type fp_shape, type fp_text, type kicad_module, type n_array, type n_container, type n_named_value, type n_primitive, type node, type pad, type pad_shape, type pad_type, parse, type size, type text_effects };
