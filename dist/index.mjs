var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/module-parser.js
var require_module_parser = __commonJS({
  "src/module-parser.js"(exports, module) {
    "use strict";
    function peg$subclass(child, parent) {
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
    }
    function peg$SyntaxError(message, expected, found, location) {
      this.message = message;
      this.expected = expected;
      this.found = found;
      this.location = location;
      this.name = "SyntaxError";
      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, peg$SyntaxError);
      }
    }
    peg$subclass(peg$SyntaxError, Error);
    peg$SyntaxError.buildMessage = function(expected, found) {
      var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return '"' + literalEscape(expectation.text) + '"';
        },
        "class": function(expectation) {
          var escapedParts = "", i;
          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1]) : classEscape(expectation.parts[i]);
          }
          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },
        any: function(expectation) {
          return "any character";
        },
        end: function(expectation) {
          return "end of input";
        },
        other: function(expectation) {
          return expectation.description;
        }
      };
      function hex(ch) {
        return ch.charCodeAt(0).toString(16).toUpperCase();
      }
      function literalEscape(s) {
        return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
          return "\\x0" + hex(ch);
        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
          return "\\x" + hex(ch);
        });
      }
      function classEscape(s) {
        return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
          return "\\x0" + hex(ch);
        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
          return "\\x" + hex(ch);
        });
      }
      function describeExpectation(expectation) {
        return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
      }
      function describeExpected(expected2) {
        var descriptions = new Array(expected2.length), i, j;
        for (i = 0; i < expected2.length; i++) {
          descriptions[i] = describeExpectation(expected2[i]);
        }
        descriptions.sort();
        if (descriptions.length > 0) {
          for (i = 1, j = 1; i < descriptions.length; i++) {
            if (descriptions[i - 1] !== descriptions[i]) {
              descriptions[j] = descriptions[i];
              j++;
            }
          }
          descriptions.length = j;
        }
        switch (descriptions.length) {
          case 1:
            return descriptions[0];
          case 2:
            return descriptions[0] + " or " + descriptions[1];
          default:
            return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
        }
      }
      function describeFound(found2) {
        return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
      }
      return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
    };
    function peg$parse(input, options) {
      options = options !== void 0 ? options : {};
      var peg$FAILED = {}, peg$startRuleFunctions = { module: peg$parsemodule, board: peg$parseboard }, peg$startRuleFunction = peg$parsemodule, peg$c0 = "(", peg$c1 = peg$literalExpectation("(", false), peg$c2 = "kicad_pcb", peg$c3 = peg$literalExpectation("kicad_pcb", false), peg$c4 = function(type, val) {
        return val;
      }, peg$c5 = ")", peg$c6 = peg$literalExpectation(")", false), peg$c7 = function(type, rest) {
        return { type, value: rest };
      }, peg$c8 = "general", peg$c9 = peg$literalExpectation("general", false), peg$c10 = function(type, options2) {
        return { type, value: options2 };
      }, peg$c11 = "thickness", peg$c12 = peg$literalExpectation("thickness", false), peg$c13 = "drawings", peg$c14 = peg$literalExpectation("drawings", false), peg$c15 = "tracks", peg$c16 = peg$literalExpectation("tracks", false), peg$c17 = "zones", peg$c18 = peg$literalExpectation("zones", false), peg$c19 = "modules", peg$c20 = peg$literalExpectation("modules", false), peg$c21 = "nets", peg$c22 = peg$literalExpectation("nets", false), peg$c23 = "links", peg$c24 = peg$literalExpectation("links", false), peg$c25 = "no_connects", peg$c26 = peg$literalExpectation("no_connects", false), peg$c27 = "area", peg$c28 = peg$literalExpectation("area", false), peg$c29 = function(type, value) {
        return { type, value };
      }, peg$c30 = function(type, value) {
        return { type, value };
      }, peg$c31 = "page", peg$c32 = peg$literalExpectation("page", false), peg$c33 = "paper", peg$c34 = peg$literalExpectation("paper", false), peg$c35 = '"', peg$c36 = peg$literalExpectation('"', false), peg$c37 = "A0", peg$c38 = peg$literalExpectation("A0", false), peg$c39 = "A1", peg$c40 = peg$literalExpectation("A1", false), peg$c41 = "A2", peg$c42 = peg$literalExpectation("A2", false), peg$c43 = "A3", peg$c44 = peg$literalExpectation("A3", false), peg$c45 = "A4", peg$c46 = peg$literalExpectation("A4", false), peg$c47 = "A5", peg$c48 = peg$literalExpectation("A5", false), peg$c49 = "A", peg$c50 = peg$literalExpectation("A", false), peg$c51 = "B", peg$c52 = peg$literalExpectation("B", false), peg$c53 = "C", peg$c54 = peg$literalExpectation("C", false), peg$c55 = "D", peg$c56 = peg$literalExpectation("D", false), peg$c57 = "portrait", peg$c58 = peg$literalExpectation("portrait", false), peg$c59 = function(size, portrait) {
        const value = [
          { type: "size", value: { type: "string", value: size } },
          { type: "portrait", value: { type: "boolean", value: !!portrait } }
        ];
        return { type: "page", value };
      }, peg$c60 = "title_block", peg$c61 = peg$literalExpectation("title_block", false), peg$c62 = "title", peg$c63 = peg$literalExpectation("title", false), peg$c64 = "date", peg$c65 = peg$literalExpectation("date", false), peg$c66 = "rev", peg$c67 = peg$literalExpectation("rev", false), peg$c68 = "company", peg$c69 = peg$literalExpectation("company", false), peg$c70 = "comment", peg$c71 = peg$literalExpectation("comment", false), peg$c72 = /^[0-8]/, peg$c73 = peg$classExpectation([["0", "8"]], false, false), peg$c74 = function(type, options2) {
        return { type, value: options2.map((x) => ({ type: x[2], value: x[4] })) };
      }, peg$c75 = "layers", peg$c76 = peg$literalExpectation("layers", false), peg$c77 = function(type, v) {
        return v;
      }, peg$c78 = function(type, value) {
        return { type, value };
      }, peg$c79 = "user", peg$c80 = peg$literalExpectation("user", false), peg$c81 = function(index, name, value) {
        return value;
      }, peg$c82 = "hide", peg$c83 = peg$literalExpectation("hide", false), peg$c84 = function(index, name, layer_type, hide) {
        const value = [
          { type: "index", value: index },
          { type: "name", value: name },
          { type: "layer_type", value: layer_type },
          { type: "hide", value: { type: "boolean", value: !!hide } }
        ];
        return { type: "layer", value };
      }, peg$c85 = "setup", peg$c86 = peg$literalExpectation("setup", false), peg$c87 = function(type, values) {
        return { type, value: values.map((x) => x[0]) };
      }, peg$c88 = function(type, value) {
        return { type, value };
      }, peg$c89 = "filled_areas_thickness", peg$c90 = peg$literalExpectation("filled_areas_thickness", false), peg$c91 = "blind_buried_vias_allowed", peg$c92 = peg$literalExpectation("blind_buried_vias_allowed", false), peg$c93 = "uvias_allowed", peg$c94 = peg$literalExpectation("uvias_allowed", false), peg$c95 = "zone_45_only", peg$c96 = peg$literalExpectation("zone_45_only", false), peg$c97 = "last_trace_width", peg$c98 = peg$literalExpectation("last_trace_width", false), peg$c99 = "user_trace_width", peg$c100 = peg$literalExpectation("user_trace_width", false), peg$c101 = "trace_clearance", peg$c102 = peg$literalExpectation("trace_clearance", false), peg$c103 = "zone_clearance", peg$c104 = peg$literalExpectation("zone_clearance", false), peg$c105 = "clearance_min", peg$c106 = peg$literalExpectation("clearance_min", false), peg$c107 = "trace_min", peg$c108 = peg$literalExpectation("trace_min", false), peg$c109 = "via_size", peg$c110 = peg$literalExpectation("via_size", false), peg$c111 = "via_drill", peg$c112 = peg$literalExpectation("via_drill", false), peg$c113 = "via_min_annulus", peg$c114 = peg$literalExpectation("via_min_annulus", false), peg$c115 = "via_min_size", peg$c116 = peg$literalExpectation("via_min_size", false), peg$c117 = "through_hole_min", peg$c118 = peg$literalExpectation("through_hole_min", false), peg$c119 = "via_min_drill", peg$c120 = peg$literalExpectation("via_min_drill", false), peg$c121 = "hole_to_hole_min", peg$c122 = peg$literalExpectation("hole_to_hole_min", false), peg$c123 = "uvia_size", peg$c124 = peg$literalExpectation("uvia_size", false), peg$c125 = "uvia_drill", peg$c126 = peg$literalExpectation("uvia_drill", false), peg$c127 = "uvia_min_size", peg$c128 = peg$literalExpectation("uvia_min_size", false), peg$c129 = "uvia_min_drill", peg$c130 = peg$literalExpectation("uvia_min_drill", false), peg$c131 = "segment_width", peg$c132 = peg$literalExpectation("segment_width", false), peg$c133 = "edge_width", peg$c134 = peg$literalExpectation("edge_width", false), peg$c135 = "mod_edge_width", peg$c136 = peg$literalExpectation("mod_edge_width", false), peg$c137 = "pcb_text_width", peg$c138 = peg$literalExpectation("pcb_text_width", false), peg$c139 = "mod_text_width", peg$c140 = peg$literalExpectation("mod_text_width", false), peg$c141 = "pad_to_mask_clearance", peg$c142 = peg$literalExpectation("pad_to_mask_clearance", false), peg$c143 = "solder_mask_min_width", peg$c144 = peg$literalExpectation("solder_mask_min_width", false), peg$c145 = "pad_to_paste_clearance_ratio", peg$c146 = peg$literalExpectation("pad_to_paste_clearance_ratio", false), peg$c147 = "pad_to_paste_clearance", peg$c148 = peg$literalExpectation("pad_to_paste_clearance", false), peg$c149 = "max_error", peg$c150 = peg$literalExpectation("max_error", false), peg$c151 = "pad_drill", peg$c152 = peg$literalExpectation("pad_drill", false), peg$c153 = "visible_elements", peg$c154 = peg$literalExpectation("visible_elements", false), peg$c155 = function(type, value) {
        return { type, value: value.map((x) => x[0]) };
      }, peg$c156 = "user_via", peg$c157 = peg$literalExpectation("user_via", false), peg$c158 = "user_diff_pair", peg$c159 = peg$literalExpectation("user_diff_pair", false), peg$c160 = "pcb_text_size", peg$c161 = peg$literalExpectation("pcb_text_size", false), peg$c162 = "mod_text_size", peg$c163 = peg$literalExpectation("mod_text_size", false), peg$c164 = "pad_size", peg$c165 = peg$literalExpectation("pad_size", false), peg$c166 = "aux_axis_origin", peg$c167 = peg$literalExpectation("aux_axis_origin", false), peg$c168 = "grid_origin", peg$c169 = peg$literalExpectation("grid_origin", false), peg$c170 = "defaults", peg$c171 = peg$literalExpectation("defaults", false), peg$c172 = function(type, values) {
        return { type, value: values.map((x) => x[0]) };
      }, peg$c173 = "T_edge_clearance", peg$c174 = peg$literalExpectation("T_edge_clearance", false), peg$c175 = "T_copper_line_width", peg$c176 = peg$literalExpectation("T_copper_line_width", false), peg$c177 = "T_courtyard_line_width", peg$c178 = peg$literalExpectation("T_courtyard_line_width", false), peg$c179 = "T_edge_cuts_line_width", peg$c180 = peg$literalExpectation("T_edge_cuts_line_width", false), peg$c181 = "T_silk_line_width", peg$c182 = peg$literalExpectation("T_silk_line_width", false), peg$c183 = "T_fab_layers_line_width", peg$c184 = peg$literalExpectation("T_fab_layers_line_width", false), peg$c185 = "T_other_layers_line_width", peg$c186 = peg$literalExpectation("T_other_layers_line_width", false), peg$c187 = "dimension_units", peg$c188 = peg$literalExpectation("dimension_units", false), peg$c189 = "dimension_precision", peg$c190 = peg$literalExpectation("dimension_precision", false), peg$c191 = function(type, attrs) {
        return { type, value: attrs.map((x) => x[0]) };
      }, peg$c192 = "copper_text_dims", peg$c193 = peg$literalExpectation("copper_text_dims", false), peg$c194 = "silk_text_dims", peg$c195 = peg$literalExpectation("silk_text_dims", false), peg$c196 = "fab_layers_text_dims", peg$c197 = peg$literalExpectation("fab_layers_text_dims", false), peg$c198 = "other_layers_text_dims", peg$c199 = peg$literalExpectation("other_layers_text_dims", false), peg$c200 = "pcbplotparams", peg$c201 = peg$literalExpectation("pcbplotparams", false), peg$c202 = "layerselection", peg$c203 = peg$literalExpectation("layerselection", false), peg$c204 = function(type, value) {
        return { type, value };
      }, peg$c205 = "outputdirectory", peg$c206 = peg$literalExpectation("outputdirectory", false), peg$c207 = "linewidth", peg$c208 = peg$literalExpectation("linewidth", false), peg$c209 = "mode", peg$c210 = peg$literalExpectation("mode", false), peg$c211 = "hpglpennumber", peg$c212 = peg$literalExpectation("hpglpennumber", false), peg$c213 = "hpglpenspeed", peg$c214 = peg$literalExpectation("hpglpenspeed", false), peg$c215 = "hpglpendiameter", peg$c216 = peg$literalExpectation("hpglpendiameter", false), peg$c217 = "hpglpenoverlay", peg$c218 = peg$literalExpectation("hpglpenoverlay", false), peg$c219 = "outputformat", peg$c220 = peg$literalExpectation("outputformat", false), peg$c221 = "drillshape", peg$c222 = peg$literalExpectation("drillshape", false), peg$c223 = "scaleselection", peg$c224 = peg$literalExpectation("scaleselection", false), peg$c225 = "svgprecision", peg$c226 = peg$literalExpectation("svgprecision", false), peg$c227 = "disableapertmacros", peg$c228 = peg$literalExpectation("disableapertmacros", false), peg$c229 = "usegerberextensions", peg$c230 = peg$literalExpectation("usegerberextensions", false), peg$c231 = "usegerberattributes", peg$c232 = peg$literalExpectation("usegerberattributes", false), peg$c233 = "usegerberadvancedattributes", peg$c234 = peg$literalExpectation("usegerberadvancedattributes", false), peg$c235 = "creategerberjobfile", peg$c236 = peg$literalExpectation("creategerberjobfile", false), peg$c237 = "svguseinch", peg$c238 = peg$literalExpectation("svguseinch", false), peg$c239 = "excludeedgelayer", peg$c240 = peg$literalExpectation("excludeedgelayer", false), peg$c241 = "plotframeref", peg$c242 = peg$literalExpectation("plotframeref", false), peg$c243 = "viasonmask", peg$c244 = peg$literalExpectation("viasonmask", false), peg$c245 = "useauxorigin", peg$c246 = peg$literalExpectation("useauxorigin", false), peg$c247 = "dxfpolygonmode", peg$c248 = peg$literalExpectation("dxfpolygonmode", false), peg$c249 = "dxfimperialunits", peg$c250 = peg$literalExpectation("dxfimperialunits", false), peg$c251 = "dxfusepcbnewfont", peg$c252 = peg$literalExpectation("dxfusepcbnewfont", false), peg$c253 = "psnegative", peg$c254 = peg$literalExpectation("psnegative", false), peg$c255 = "psa4output", peg$c256 = peg$literalExpectation("psa4output", false), peg$c257 = "plotreference", peg$c258 = peg$literalExpectation("plotreference", false), peg$c259 = "plotvalue", peg$c260 = peg$literalExpectation("plotvalue", false), peg$c261 = "plotinvisibletext", peg$c262 = peg$literalExpectation("plotinvisibletext", false), peg$c263 = "plotothertext", peg$c264 = peg$literalExpectation("plotothertext", false), peg$c265 = "sketchpadsonfab", peg$c266 = peg$literalExpectation("sketchpadsonfab", false), peg$c267 = "padsonsilk", peg$c268 = peg$literalExpectation("padsonsilk", false), peg$c269 = "subtractmaskfromsilk", peg$c270 = peg$literalExpectation("subtractmaskfromsilk", false), peg$c271 = "mirror", peg$c272 = peg$literalExpectation("mirror", false), peg$c273 = "true", peg$c274 = peg$literalExpectation("true", false), peg$c275 = "false", peg$c276 = peg$literalExpectation("false", false), peg$c277 = function(value) {
        return { type: "boolean", value: value === "true" };
      }, peg$c278 = "stackup", peg$c279 = peg$literalExpectation("stackup", false), peg$c280 = function(type) {
        return { type, value: { type: "string", value: "unsupported" } };
      }, peg$c281 = "net", peg$c282 = peg$literalExpectation("net", false), peg$c283 = function(type, net_number, v) {
        return v;
      }, peg$c284 = function(type, net_number, name) {
        var value = [
          { type: "net_number", value: { type: "string", value: net_number } }
        ];
        if (name)
          value.push({ type: "name", value: name });
        return { type, value };
      }, peg$c285 = "net_class", peg$c286 = peg$literalExpectation("net_class", false), peg$c287 = function(type, name, description, opt) {
        return opt;
      }, peg$c288 = function(type, name, description, options2) {
        return {
          type,
          value: [
            { type: "name", value: name },
            { type: "description", value: description },
            ...options2
          ]
        };
      }, peg$c289 = "add_net", peg$c290 = peg$literalExpectation("add_net", false), peg$c291 = "clearance", peg$c292 = peg$literalExpectation("clearance", false), peg$c293 = "trace_width", peg$c294 = peg$literalExpectation("trace_width", false), peg$c295 = "via_dia", peg$c296 = peg$literalExpectation("via_dia", false), peg$c297 = "uvia_dia", peg$c298 = peg$literalExpectation("uvia_dia", false), peg$c299 = "diff_pair_width", peg$c300 = peg$literalExpectation("diff_pair_width", false), peg$c301 = "diff_pair_gap", peg$c302 = peg$literalExpectation("diff_pair_gap", false), peg$c303 = "dimension", peg$c304 = peg$literalExpectation("dimension", false), peg$c305 = function(type, dimension, width, options2) {
        return {
          type,
          value: [
            { type: "dimension", value: dimension },
            width,
            ...options2.map((x) => x[0])
          ]
        };
      }, peg$c306 = function(type, value) {
        return { type, value: [value] };
      }, peg$c307 = "feature1", peg$c308 = peg$literalExpectation("feature1", false), peg$c309 = "feature2", peg$c310 = peg$literalExpectation("feature2", false), peg$c311 = "crossbar", peg$c312 = peg$literalExpectation("crossbar", false), peg$c313 = "arrow1a", peg$c314 = peg$literalExpectation("arrow1a", false), peg$c315 = "arrow1b", peg$c316 = peg$literalExpectation("arrow1b", false), peg$c317 = "arrow2a", peg$c318 = peg$literalExpectation("arrow2a", false), peg$c319 = "arrow2b", peg$c320 = peg$literalExpectation("arrow2b", false), peg$c321 = "segment", peg$c322 = peg$literalExpectation("segment", false), peg$c323 = function(type, v) {
        return v;
      }, peg$c324 = function(type, value) {
        return { type, value };
      }, peg$c325 = "arc", peg$c326 = peg$literalExpectation("arc", false), peg$c327 = function(type, value) {
        return { type, value };
      }, peg$c328 = "target", peg$c329 = peg$literalExpectation("target", false), peg$c330 = function(type, value) {
        return { type, value: value.map((x) => x[0]) };
      }, peg$c331 = "x", peg$c332 = peg$literalExpectation("x", false), peg$c333 = "plus", peg$c334 = peg$literalExpectation("plus", false), peg$c335 = function(value) {
        return { type: "shape", value: { type: "string", value } };
      }, peg$c336 = "via", peg$c337 = peg$literalExpectation("via", false), peg$c338 = function(type, value) {
        return { type, value: value.map((x) => x[0]) };
      }, peg$c339 = "blind", peg$c340 = peg$literalExpectation("blind", false), peg$c341 = "micro", peg$c342 = peg$literalExpectation("micro", false), peg$c343 = function(type) {
        return {
          type,
          value: { type: "boolean", value: true }
        };
      }, peg$c344 = "zone", peg$c345 = peg$literalExpectation("zone", false), peg$c346 = "drill", peg$c347 = peg$literalExpectation("drill", false), peg$c348 = function(type, value) {
        return { type, value };
      }, peg$c349 = "polygon", peg$c350 = peg$literalExpectation("polygon", false), peg$c351 = "filled_polygon", peg$c352 = peg$literalExpectation("filled_polygon", false), peg$c353 = function(type, value) {
        return { type, value: [value] };
      }, peg$c354 = "fill_segments", peg$c355 = peg$literalExpectation("fill_segments", false), peg$c356 = function(type, pts2) {
        return pts2;
      }, peg$c357 = function(type, value) {
        return { type, value };
      }, peg$c358 = "net_name", peg$c359 = peg$literalExpectation("net_name", false), peg$c360 = "priority", peg$c361 = peg$literalExpectation("priority", false), peg$c362 = "min_thickness", peg$c363 = peg$literalExpectation("min_thickness", false), peg$c364 = function(type, value) {
        return { type, value };
      }, peg$c365 = "hatch", peg$c366 = peg$literalExpectation("hatch", false), peg$c367 = "none", peg$c368 = peg$literalExpectation("none", false), peg$c369 = "edge", peg$c370 = peg$literalExpectation("edge", false), peg$c371 = "full", peg$c372 = peg$literalExpectation("full", false), peg$c373 = function(type, style, pitch) {
        return {
          type,
          value: [
            { type: "style", value: { type: "string", value: style } },
            { type: "pitch", value: pitch }
          ]
        };
      }, peg$c374 = "fill", peg$c375 = peg$literalExpectation("fill", false), peg$c376 = "yes", peg$c377 = peg$literalExpectation("yes", false), peg$c378 = function(type, filled, value) {
        value = value.map((x) => x[0]);
        if (filled)
          value.push({ type: "filled", value: { type: "boolean", value: true } });
        else
          value.push({ type: "filled", value: { type: "boolean", value: false } });
        return { type, value };
      }, peg$c379 = function(type, value) {
        return { type, value: { type: "string", value } };
      }, peg$c380 = "smoothing", peg$c381 = peg$literalExpectation("smoothing", false), peg$c382 = "chamfer", peg$c383 = peg$literalExpectation("chamfer", false), peg$c384 = "fillet", peg$c385 = peg$literalExpectation("fillet", false), peg$c386 = "hatch_thickness", peg$c387 = peg$literalExpectation("hatch_thickness", false), peg$c388 = "hatch_gap", peg$c389 = peg$literalExpectation("hatch_gap", false), peg$c390 = "hatch_orientation", peg$c391 = peg$literalExpectation("hatch_orientation", false), peg$c392 = "hatch_smoothing_level", peg$c393 = peg$literalExpectation("hatch_smoothing_level", false), peg$c394 = "hatch_smoothing_value", peg$c395 = peg$literalExpectation("hatch_smoothing_value", false), peg$c396 = "arc_segments", peg$c397 = peg$literalExpectation("arc_segments", false), peg$c398 = "thermal_gap", peg$c399 = peg$literalExpectation("thermal_gap", false), peg$c400 = "thermal_bridge_width", peg$c401 = peg$literalExpectation("thermal_bridge_width", false), peg$c402 = "radius", peg$c403 = peg$literalExpectation("radius", false), peg$c404 = "keepout", peg$c405 = peg$literalExpectation("keepout", false), peg$c406 = "vias", peg$c407 = peg$literalExpectation("vias", false), peg$c408 = "copperpour", peg$c409 = peg$literalExpectation("copperpour", false), peg$c410 = "pads", peg$c411 = peg$literalExpectation("pads", false), peg$c412 = "footprints", peg$c413 = peg$literalExpectation("footprints", false), peg$c414 = "allowed", peg$c415 = peg$literalExpectation("allowed", false), peg$c416 = "not_allowed", peg$c417 = peg$literalExpectation("not_allowed", false), peg$c418 = function(type, t, v) {
        return { type: t, value: { type: "string", value: v } };
      }, peg$c419 = function(type, value) {
        return { type, value };
      }, peg$c420 = "connect_pads", peg$c421 = peg$literalExpectation("connect_pads", false), peg$c422 = "no", peg$c423 = peg$literalExpectation("no", false), peg$c424 = "thru_hole_only", peg$c425 = peg$literalExpectation("thru_hole_only", false), peg$c426 = function(type, v) {
        return { type: "string", value: v };
      }, peg$c427 = function(type, connection, c) {
        return c;
      }, peg$c428 = function(type, connection, clearance) {
        var value = [];
        if (connection)
          value.push({ type: "connection", value: connection });
        if (clearance)
          value.push({ type: "clearance", value: clearance });
        return { type, value };
      }, peg$c429 = "generator", peg$c430 = peg$literalExpectation("generator", false), peg$c431 = function(type, value) {
        return { type, value };
      }, peg$c432 = "generator_version", peg$c433 = peg$literalExpectation("generator_version", false), peg$c434 = "host", peg$c435 = peg$literalExpectation("host", false), peg$c436 = function(application, version) {
        const value = [
          { type: "application", value: application },
          { type: "version", value: version }
        ];
        return { type: "host", value };
      }, peg$c437 = function(generator, layer, attr) {
        return {
          type: "header",
          value: {
            generator: { type: "string", value: generator },
            generator_version: { type: "string", value: generator_version },
            layer: { type: "string", value: layer },
            attr: { type: "string", value: attr }
          }
        };
      }, peg$c438 = "version", peg$c439 = peg$literalExpectation("version", false), peg$c440 = function(type, value) {
        return { type, value: { type: "number", value } };
      }, peg$c441 = "footprint", peg$c442 = peg$literalExpectation("footprint", false), peg$c443 = "module", peg$c444 = peg$literalExpectation("module", false), peg$c445 = function(type, value, contents) {
        return {
          type: "module",
          value: [
            { type: "name", value },
            ...contents.map((x) => x[0])
          ]
        };
      }, peg$c446 = "locked", peg$c447 = peg$literalExpectation("locked", false), peg$c448 = function() {
        return { type: "locked", value: { type: "boolean", value: true } };
      }, peg$c449 = "placed", peg$c450 = peg$literalExpectation("placed", false), peg$c451 = function() {
        return { type: "placed", value: { type: "boolean", value: true } };
      }, peg$c452 = "layer", peg$c453 = peg$literalExpectation("layer", false), peg$c454 = "B.Adhes", peg$c455 = peg$literalExpectation("B.Adhes", false), peg$c456 = "F.Adhes", peg$c457 = peg$literalExpectation("F.Adhes", false), peg$c458 = "B.Paste", peg$c459 = peg$literalExpectation("B.Paste", false), peg$c460 = "F.Paste", peg$c461 = peg$literalExpectation("F.Paste", false), peg$c462 = "B.SilkS", peg$c463 = peg$literalExpectation("B.SilkS", false), peg$c464 = "F.SilkS", peg$c465 = peg$literalExpectation("F.SilkS", false), peg$c466 = "B.Mask", peg$c467 = peg$literalExpectation("B.Mask", false), peg$c468 = "F.Mask", peg$c469 = peg$literalExpectation("F.Mask", false), peg$c470 = "B.Fab", peg$c471 = peg$literalExpectation("B.Fab", false), peg$c472 = "F.Fab", peg$c473 = peg$literalExpectation("F.Fab", false), peg$c474 = "B.CrtYd", peg$c475 = peg$literalExpectation("B.CrtYd", false), peg$c476 = "F.CrtYd", peg$c477 = peg$literalExpectation("F.CrtYd", false), peg$c478 = "Dwgs.User", peg$c479 = peg$literalExpectation("Dwgs.User", false), peg$c480 = "Cmts.User", peg$c481 = peg$literalExpectation("Cmts.User", false), peg$c482 = "Eco1.User", peg$c483 = peg$literalExpectation("Eco1.User", false), peg$c484 = "Eco2.User", peg$c485 = peg$literalExpectation("Eco2.User", false), peg$c486 = "Edge.Cuts", peg$c487 = peg$literalExpectation("Edge.Cuts", false), peg$c488 = function(value) {
        return { type: "string", value };
      }, peg$c489 = "tedit", peg$c490 = peg$literalExpectation("tedit", false), peg$c491 = function(tedit) {
        return { type: "tedit", value: tedit };
      }, peg$c492 = "tstamp", peg$c493 = peg$literalExpectation("tstamp", false), peg$c494 = function(tstamp) {
        return {
          type: "tstamp",
          value: tstamp
        };
      }, peg$c495 = "effects", peg$c496 = peg$literalExpectation("effects", false), peg$c497 = function(type, effects2) {
        return { type, value: effects2.map((x) => x[0]) };
      }, peg$c498 = "font", peg$c499 = peg$literalExpectation("font", false), peg$c500 = function(type, attrs) {
        return {
          type,
          value: attrs.map((x) => x[0])
        };
      }, peg$c501 = "bold", peg$c502 = peg$literalExpectation("bold", false), peg$c503 = function(type) {
        return { type, value: { type: "boolean", value: true } };
      }, peg$c504 = function(type, value) {
        return { type, value: { type: "boolean", value: value === "yes" } };
      }, peg$c505 = "italic", peg$c506 = peg$literalExpectation("italic", false), peg$c507 = "justify", peg$c508 = peg$literalExpectation("justify", false), peg$c509 = function(type, justify) {
        return { type, value: justify.map((x) => x[0]) };
      }, peg$c510 = "left", peg$c511 = peg$literalExpectation("left", false), peg$c512 = "right", peg$c513 = peg$literalExpectation("right", false), peg$c514 = "top", peg$c515 = peg$literalExpectation("top", false), peg$c516 = "bottom", peg$c517 = peg$literalExpectation("bottom", false), peg$c518 = function(value) {
        return { type: "string", value };
      }, peg$c519 = function(type) {
        return { type, value: { type: "boolean", value: true } };
      }, peg$c520 = "border", peg$c521 = peg$literalExpectation("border", false), peg$c522 = function(type, value) {
        return { type, value: { type: "boolean", value: value === "yes" } };
      }, peg$c523 = "unlocked", peg$c524 = peg$literalExpectation("unlocked", false), peg$c525 = "remove_unused_layers", peg$c526 = peg$literalExpectation("remove_unused_layers", false), peg$c527 = "keep_end_layers", peg$c528 = peg$literalExpectation("keep_end_layers", false), peg$c529 = "property", peg$c530 = peg$literalExpectation("property", false), peg$c531 = "pad_prop_bga", peg$c532 = peg$literalExpectation("pad_prop_bga", false), peg$c533 = "pad_prop_heatsink", peg$c534 = peg$literalExpectation("pad_prop_heatsink", false), peg$c535 = function(type, value) {
        return { type, value: { type: "string", value } };
      }, peg$c536 = "descr", peg$c537 = peg$literalExpectation("descr", false), peg$c538 = function(type, value) {
        return { type, value };
      }, peg$c539 = "tags", peg$c540 = peg$literalExpectation("tags", false), peg$c541 = function(type, value) {
        return { type, value };
      }, peg$c542 = "path", peg$c543 = peg$literalExpectation("path", false), peg$c544 = function(type, value) {
        return { type, value };
      }, peg$c545 = "solder_paste_margin_ratio", peg$c546 = peg$literalExpectation("solder_paste_margin_ratio", false), peg$c547 = "solder_mask_margin", peg$c548 = peg$literalExpectation("solder_mask_margin", false), peg$c549 = "solder_paste_margin", peg$c550 = peg$literalExpectation("solder_paste_margin", false), peg$c551 = "solder_paste_ratio", peg$c552 = peg$literalExpectation("solder_paste_ratio", false), peg$c553 = "thermal_width", peg$c554 = peg$literalExpectation("thermal_width", false), peg$c555 = "zone_connect", peg$c556 = peg$literalExpectation("zone_connect", false), peg$c557 = "autoplace_cost90", peg$c558 = peg$literalExpectation("autoplace_cost90", false), peg$c559 = "autoplace_cost180", peg$c560 = peg$literalExpectation("autoplace_cost180", false), peg$c561 = "attr", peg$c562 = peg$literalExpectation("attr", false), peg$c563 = "smd", peg$c564 = peg$literalExpectation("smd", false), peg$c565 = "virtual", peg$c566 = peg$literalExpectation("virtual", false), peg$c567 = "through_hole", peg$c568 = peg$literalExpectation("through_hole", false), peg$c569 = "exclude_from_pos_files", peg$c570 = peg$literalExpectation("exclude_from_pos_files", false), peg$c571 = "exclude_from_bom", peg$c572 = peg$literalExpectation("exclude_from_bom", false), peg$c573 = function(value, tag) {
        return tag;
      }, peg$c574 = function(value, tags) {
        return {
          type: "module_attribute",
          value: { type: "string", value },
          tags
        };
      }, peg$c575 = "private_layers", peg$c576 = peg$literalExpectation("private_layers", false), peg$c577 = function(type, value) {
        return {
          type,
          value
        };
      }, peg$c578 = "net_tie_pad_groups", peg$c579 = peg$literalExpectation("net_tie_pad_groups", false), peg$c580 = function(head, tail) {
        return [head, ...tail.map((item) => item[1])];
      }, peg$c581 = function(key, value, attrs) {
        return {
          type: "module_property",
          value: [
            { type: "key", value: key },
            { type: "value", value },
            ...attrs.map((x) => x[0])
          ]
        };
      }, peg$c582 = "fp_text", peg$c583 = peg$literalExpectation("fp_text", false), peg$c584 = "reference", peg$c585 = peg$literalExpectation("reference", false), peg$c586 = "value", peg$c587 = peg$literalExpectation("value", false), peg$c588 = function(type, text_type, value, at, attrs) {
        return {
          type,
          value: [
            { type: "text", value },
            {
              type: "type",
              value: {
                type: "string",
                value: text_type
              }
            },
            at,
            ...attrs.map((x) => x[0])
          ]
        };
      }, peg$c589 = "fp_text_box", peg$c590 = peg$literalExpectation("fp_text_box", false), peg$c591 = function(type, value, start, end, attrs) {
        return {
          type,
          value: [
            { type: "text", value },
            start,
            end,
            ...attrs.map((x) => x[0])
          ]
        };
      }, peg$c592 = "fp_arc", peg$c593 = peg$literalExpectation("fp_arc", false), peg$c594 = function(type, start, mid, end, angle, generics) {
        const out = [start];
        if (mid !== null) {
          out.push(mid[0]);
        }
        out.push(end);
        if (angle !== null) {
          out.push(angle[0]);
        }
        return {
          type,
          value: [...out, ...generics]
        };
      }, peg$c595 = "fp_circle", peg$c596 = peg$literalExpectation("fp_circle", false), peg$c597 = function(type, center, end, generics) {
        return {
          type,
          value: [center, end, ...generics]
        };
      }, peg$c598 = "fp_curve", peg$c599 = peg$literalExpectation("fp_curve", false), peg$c600 = function(type, pts2, generics) {
        return {
          type,
          value: [...pts2, ...generics]
        };
      }, peg$c601 = "fp_line", peg$c602 = peg$literalExpectation("fp_line", false), peg$c603 = function(type, start, end, generics) {
        return {
          type,
          value: [start, end, ...generics]
        };
      }, peg$c604 = "fp_rect", peg$c605 = peg$literalExpectation("fp_rect", false), peg$c606 = "fp_poly", peg$c607 = peg$literalExpectation("fp_poly", false), peg$c608 = function(type, pts2, generics) {
        return {
          type,
          value: [pts2, ...generics]
        };
      }, peg$c609 = function(generics) {
        return generics.map((x) => x[0]);
      }, peg$c610 = "pad", peg$c611 = peg$literalExpectation("pad", false), peg$c612 = function(no, pad_type, shape, attrs) {
        var values = [
          { type: "pad_id", value: no },
          pad_type,
          shape,
          ...attrs.map((x) => x[0])
        ];
        if (typeof locked !== "undefined") values.push(locked);
        return {
          type: "pad",
          value: values
        };
      }, peg$c613 = "thru_hole", peg$c614 = peg$literalExpectation("thru_hole", false), peg$c615 = "np_thru_hole", peg$c616 = peg$literalExpectation("np_thru_hole", false), peg$c617 = "connect", peg$c618 = peg$literalExpectation("connect", false), peg$c619 = function(value) {
        return { type: "pad_type", value: { type: "string", value } };
      }, peg$c620 = "circle", peg$c621 = peg$literalExpectation("circle", false), peg$c622 = "rect", peg$c623 = peg$literalExpectation("rect", false), peg$c624 = "oval", peg$c625 = peg$literalExpectation("oval", false), peg$c626 = "trapezoid", peg$c627 = peg$literalExpectation("trapezoid", false), peg$c628 = "roundrect", peg$c629 = peg$literalExpectation("roundrect", false), peg$c630 = "custom", peg$c631 = peg$literalExpectation("custom", false), peg$c632 = function(value) {
        return { type: "pad_shape", value: { type: "string", value } };
      }, peg$c633 = function(type, value) {
        return { type, value };
      }, peg$c634 = "top_left", peg$c635 = peg$literalExpectation("top_left", false), peg$c636 = "top_right", peg$c637 = peg$literalExpectation("top_right", false), peg$c638 = "bottom_left", peg$c639 = peg$literalExpectation("bottom_left", false), peg$c640 = "bottom_right", peg$c641 = peg$literalExpectation("bottom_right", false), peg$c642 = function(head, tail) {
        return [
          { type: head, value: { type: "boolean", value: true } },
          ...tail.map((item) => {
            return { type: item[1], value: { type: "boolean", value: true } };
          })
        ];
      }, peg$c643 = "size", peg$c644 = peg$literalExpectation("size", false), peg$c645 = function(type, width, height) {
        return {
          type,
          value: [
            { type: "height", value: height },
            { type: "width", value: width }
          ]
        };
      }, peg$c646 = "at", peg$c647 = peg$literalExpectation("at", false), peg$c648 = function(type, x, y, angle, unlocked) {
        var value = [
          { type: "x", value: x },
          { type: "y", value: y },
          { type: "unlocked", value: { type: "boolean", value: !!unlocked } }
        ];
        if (angle !== null) value.push({ type: "angle", value: angle[0] });
        return { type, value };
      }, peg$c649 = "rect_delta", peg$c650 = peg$literalExpectation("rect_delta", false), peg$c651 = function(type, width, height) {
        return {
          type,
          value: [
            { type: "width", value: width },
            { type: "height", value: height }
          ]
        };
      }, peg$c652 = function(type, attrs) {
        var height, width;
        var value = [];
        for (const ATTR of attrs) {
          var attr = ATTR[0];
          if (attr.type == "number") {
            height = { type: "height", value: attr };
            if (!width) {
              width = { type: "width", value: attr };
            }
          } else {
            value.push(attr);
          }
        }
        if (height)
          value.splice(0, 0, height);
        if (width)
          value.splice(0, 0, width);
        return { type, value };
      }, peg$c653 = function(type) {
        return { type, value: { type: "boolean", value: true } };
      }, peg$c654 = "offset", peg$c655 = peg$literalExpectation("offset", false), peg$c656 = function(type, x, y) {
        return {
          type,
          value: [
            { type: "x", value: x },
            { type: "y", value: y }
          ]
        };
      }, peg$c657 = "chamfer_ratio", peg$c658 = peg$literalExpectation("chamfer_ratio", false), peg$c659 = "roundrect_rratio", peg$c660 = peg$literalExpectation("roundrect_rratio", false), peg$c661 = "die_length", peg$c662 = peg$literalExpectation("die_length", false), peg$c663 = "thermal_bridge_angle", peg$c664 = peg$literalExpectation("thermal_bridge_angle", false), peg$c665 = "options", peg$c666 = peg$literalExpectation("options", false), peg$c667 = "anchor", peg$c668 = peg$literalExpectation("anchor", false), peg$c669 = function(type, value) {
        return { type, value: { type: "string", value } };
      }, peg$c670 = "outline", peg$c671 = peg$literalExpectation("outline", false), peg$c672 = "convexhull", peg$c673 = peg$literalExpectation("convexhull", false), peg$c674 = function(type, value) {
        return { type, value: { type: "string", value } };
      }, peg$c675 = "primitives", peg$c676 = peg$literalExpectation("primitives", false), peg$c677 = function(type, val) {
        return val;
      }, peg$c678 = "gr_arc", peg$c679 = peg$literalExpectation("gr_arc", false), peg$c680 = function(type, center, mid, end, generics) {
        if (mid) {
          return {
            type,
            value: [center, mid, end, ...generics]
          };
        } else {
          return {
            type,
            value: [center, end, ...generics]
          };
        }
      }, peg$c681 = "gr_circle", peg$c682 = peg$literalExpectation("gr_circle", false), peg$c683 = function(type, center, end, generics) {
        return {
          type,
          value: [center, end, ...generics]
        };
      }, peg$c684 = "gr_curve", peg$c685 = peg$literalExpectation("gr_curve", false), peg$c686 = "pts", peg$c687 = peg$literalExpectation("pts", false), peg$c688 = function(start, control1, control2, end) {
        return [
          { type: "start", value: start.value },
          { type: "control1", value: control1.value },
          { type: "control2", value: control2.value },
          { type: "end", value: end.value }
        ];
      }, peg$c689 = "gr_line", peg$c690 = peg$literalExpectation("gr_line", false), peg$c691 = function(type, start, end, generics) {
        return {
          type,
          value: [start, end, ...generics]
        };
      }, peg$c692 = "gr_rect", peg$c693 = peg$literalExpectation("gr_rect", false), peg$c694 = "gr_poly", peg$c695 = peg$literalExpectation("gr_poly", false), peg$c696 = function(type, pts2, generics) {
        return {
          type,
          value: [pts2, ...generics]
        };
      }, peg$c697 = "gr_text", peg$c698 = peg$literalExpectation("gr_text", false), peg$c699 = function(type, text2, at, options2) {
        const value = [
          { type: "text", value: text2 },
          at,
          ...options2.map((x) => x[0])
        ];
        return { type, value };
      }, peg$c700 = "status", peg$c701 = peg$literalExpectation("status", false), peg$c702 = "name", peg$c703 = peg$literalExpectation("name", false), peg$c704 = "uuid", peg$c705 = peg$literalExpectation("uuid", false), peg$c706 = "stroke", peg$c707 = peg$literalExpectation("stroke", false), peg$c708 = function(type, width, stroke_type) {
        return {
          type,
          value: [
            width,
            stroke_type
          ]
        };
      }, peg$c709 = "type", peg$c710 = peg$literalExpectation("type", false), peg$c711 = "dash", peg$c712 = peg$literalExpectation("dash", false), peg$c713 = "dash_dot", peg$c714 = peg$literalExpectation("dash_dot", false), peg$c715 = "dash_dot_dot", peg$c716 = peg$literalExpectation("dash_dot_dot", false), peg$c717 = "dot", peg$c718 = peg$literalExpectation("dot", false), peg$c719 = "default", peg$c720 = peg$literalExpectation("default", false), peg$c721 = "solid", peg$c722 = peg$literalExpectation("solid", false), peg$c723 = function(value) {
        return { type: "string", value };
      }, peg$c724 = "width", peg$c725 = peg$literalExpectation("width", false), peg$c726 = "angle", peg$c727 = peg$literalExpectation("angle", false), peg$c728 = "mid", peg$c729 = peg$literalExpectation("mid", false), peg$c730 = "start", peg$c731 = peg$literalExpectation("start", false), peg$c732 = function(x, y) {
        return [
          { type: "x", value: x },
          { type: "y", value: y }
        ];
      }, peg$c733 = "center", peg$c734 = peg$literalExpectation("center", false), peg$c735 = function(type, value) {
        return { type, value };
      }, peg$c736 = "end", peg$c737 = peg$literalExpectation("end", false), peg$c738 = function(type, points) {
        return { type, value: points.filter((x) => x).map((x) => {
          return x[0];
        }) };
      }, peg$c739 = "xy", peg$c740 = peg$literalExpectation("xy", false), peg$c741 = function(type, start, mid, end) {
        return {
          type,
          value: [start, mid, end]
        };
      }, peg$c742 = function(type, value) {
        return { type, value };
      }, peg$c743 = function(type, options2) {
        return {
          type,
          value: options2.map((x) => x[0])
          // Only return the actual parsed attributes
        };
      }, peg$c744 = "aligned", peg$c745 = peg$literalExpectation("aligned", false), peg$c746 = "leader", peg$c747 = peg$literalExpectation("leader", false), peg$c748 = function(type, value) {
        return { type: "dimension_type", value: { type: "string", value } };
      }, peg$c749 = "height", peg$c750 = peg$literalExpectation("height", false), peg$c751 = "format", peg$c752 = peg$literalExpectation("format", false), peg$c753 = function(type, options2) {
        return {
          type,
          value: [
            ...options2.map((x) => x[0])
          ]
        };
      }, peg$c754 = "prefix", peg$c755 = peg$literalExpectation("prefix", false), peg$c756 = "suffix", peg$c757 = peg$literalExpectation("suffix", false), peg$c758 = "units", peg$c759 = peg$literalExpectation("units", false), peg$c760 = "units_format", peg$c761 = peg$literalExpectation("units_format", false), peg$c762 = "precision", peg$c763 = peg$literalExpectation("precision", false), peg$c764 = "override_value", peg$c765 = peg$literalExpectation("override_value", false), peg$c766 = "style", peg$c767 = peg$literalExpectation("style", false), peg$c768 = "keep_text_aligned", peg$c769 = peg$literalExpectation("keep_text_aligned", false), peg$c770 = function(type, options2, value) {
        return {
          type,
          value: [
            ...options2.map((x) => x[0])
          ]
        };
      }, peg$c771 = "arrow_length", peg$c772 = peg$literalExpectation("arrow_length", false), peg$c773 = "text_position_mode", peg$c774 = peg$literalExpectation("text_position_mode", false), peg$c775 = "extension_height", peg$c776 = peg$literalExpectation("extension_height", false), peg$c777 = "extension_offset", peg$c778 = peg$literalExpectation("extension_offset", false), peg$c779 = "text_frame", peg$c780 = peg$literalExpectation("text_frame", false), peg$c781 = "group", peg$c782 = peg$literalExpectation("group", false), peg$c783 = function(type, value, options2) {
        return { type, value };
      }, peg$c784 = "members", peg$c785 = peg$literalExpectation("members", false), peg$c786 = "model", peg$c787 = peg$literalExpectation("model", false), peg$c788 = function(type, filename, options2) {
        return {
          type,
          value: [
            { type: "filename", value: filename },
            ...options2.map((x) => x[0])
          ]
        };
      }, peg$c789 = "opacity", peg$c790 = peg$literalExpectation("opacity", false), peg$c791 = function(value) {
        return { type: "opacity", value };
      }, peg$c792 = "scale", peg$c793 = peg$literalExpectation("scale", false), peg$c794 = "rotate", peg$c795 = peg$literalExpectation("rotate", false), peg$c796 = function(type, value) {
        return { type, value: [value] };
      }, peg$c797 = "xyz", peg$c798 = peg$literalExpectation("xyz", false), peg$c799 = function(type, x, y, z) {
        return { type, value: [
          { type: "x", value: x },
          { type: "y", value: y },
          { type: "z", value: z }
        ] };
      }, peg$c800 = function(chars) {
        return { type: "string", value: chars.join("") };
      }, peg$c801 = "'", peg$c802 = peg$literalExpectation("'", false), peg$c803 = "\\", peg$c804 = peg$literalExpectation("\\", false), peg$c805 = peg$anyExpectation(), peg$c806 = function(char) {
        return char;
      }, peg$c807 = function(sequence) {
        return sequence;
      }, peg$c808 = "b", peg$c809 = peg$literalExpectation("b", false), peg$c810 = function() {
        return "\b";
      }, peg$c811 = "f", peg$c812 = peg$literalExpectation("f", false), peg$c813 = function() {
        return "\f";
      }, peg$c814 = "n", peg$c815 = peg$literalExpectation("n", false), peg$c816 = function() {
        return "\n";
      }, peg$c817 = "r", peg$c818 = peg$literalExpectation("r", false), peg$c819 = function() {
        return "\r";
      }, peg$c820 = "t", peg$c821 = peg$literalExpectation("t", false), peg$c822 = function() {
        return "	";
      }, peg$c823 = "v", peg$c824 = peg$literalExpectation("v", false), peg$c825 = function() {
        return "\v";
      }, peg$c826 = function(contents) {
        return {
          type: "sexp",
          value: contents.map((x) => x[0])
        };
      }, peg$c827 = "[", peg$c828 = peg$literalExpectation("[", false), peg$c829 = ",", peg$c830 = peg$literalExpectation(",", false), peg$c831 = "]", peg$c832 = peg$literalExpectation("]", false), peg$c833 = function(value, values) {
        return {
          type: "array",
          value: [value, ...values.map((x) => x[0])]
        };
      }, peg$c834 = /^[^ ();'\n]/, peg$c835 = peg$classExpectation([" ", "(", ")", ";", "'", "\n"], true, false), peg$c836 = function(value) {
        return { type: "string", value };
      }, peg$c837 = peg$otherExpectation("whitespace"), peg$c838 = /^[ \t\n\r]/, peg$c839 = peg$classExpectation([" ", "	", "\n", "\r"], false, false), peg$c840 = /^[ \t]/, peg$c841 = peg$classExpectation([" ", "	"], false, false), peg$c842 = "\r\n", peg$c843 = peg$literalExpectation("\r\n", false), peg$c844 = "\n", peg$c845 = peg$literalExpectation("\n", false), peg$c846 = "\r", peg$c847 = peg$literalExpectation("\r", false), peg$c848 = /^[\-+]/, peg$c849 = peg$classExpectation(["-", "+"], false, false), peg$c850 = function(val) {
        return { type: "number", value: val };
      }, peg$c851 = function(value) {
        return value;
      }, peg$c852 = ".", peg$c853 = peg$literalExpectation(".", false), peg$c854 = function(val) {
        return { type: "real", value: val };
      }, peg$c855 = "e", peg$c856 = peg$literalExpectation("e", false), peg$c857 = "E", peg$c858 = peg$literalExpectation("E", false), peg$c859 = "+", peg$c860 = peg$literalExpectation("+", false), peg$c861 = "-", peg$c862 = peg$literalExpectation("-", false), peg$c863 = function(val) {
        return { type: "exponential", value: val };
      }, peg$c864 = "/", peg$c865 = peg$literalExpectation("/", false), peg$c866 = function(n, d) {
        return { type: "fraction", n, d };
      }, peg$c867 = /^[0-9]/, peg$c868 = peg$classExpectation([["0", "9"]], false, false), peg$c869 = /^[0-9a-fA-F]/, peg$c870 = peg$classExpectation([["0", "9"], ["a", "f"], ["A", "F"]], false, false), peg$c871 = function(value) {
        return { type: "hex", value };
      }, peg$c872 = function(value) {
        return { type: "boolean", value: value === "yes" };
      }, peg$c873 = "F.Cu", peg$c874 = peg$literalExpectation("F.Cu", false), peg$c875 = "B.Cu", peg$c876 = peg$literalExpectation("B.Cu", false), peg$c877 = "In1.Cu", peg$c878 = peg$literalExpectation("In1.Cu", false), peg$c879 = "In2.Cu", peg$c880 = peg$literalExpectation("In2.Cu", false), peg$c881 = "In3.Cu", peg$c882 = peg$literalExpectation("In3.Cu", false), peg$c883 = "In4.Cu", peg$c884 = peg$literalExpectation("In4.Cu", false), peg$c885 = "In5.Cu", peg$c886 = peg$literalExpectation("In5.Cu", false), peg$c887 = "In6.Cu", peg$c888 = peg$literalExpectation("In6.Cu", false), peg$c889 = "In7.Cu", peg$c890 = peg$literalExpectation("In7.Cu", false), peg$c891 = "In8.Cu", peg$c892 = peg$literalExpectation("In8.Cu", false), peg$c893 = "In9.Cu", peg$c894 = peg$literalExpectation("In9.Cu", false), peg$c895 = "In10.Cu", peg$c896 = peg$literalExpectation("In10.Cu", false), peg$c897 = "In11.Cu", peg$c898 = peg$literalExpectation("In11.Cu", false), peg$c899 = "In12.Cu", peg$c900 = peg$literalExpectation("In12.Cu", false), peg$c901 = "In13.Cu", peg$c902 = peg$literalExpectation("In13.Cu", false), peg$c903 = "In14.Cu", peg$c904 = peg$literalExpectation("In14.Cu", false), peg$c905 = "In15.Cu", peg$c906 = peg$literalExpectation("In15.Cu", false), peg$c907 = "In16.Cu", peg$c908 = peg$literalExpectation("In16.Cu", false), peg$c909 = "In17.Cu", peg$c910 = peg$literalExpectation("In17.Cu", false), peg$c911 = "In18.Cu", peg$c912 = peg$literalExpectation("In18.Cu", false), peg$c913 = "In19.Cu", peg$c914 = peg$literalExpectation("In19.Cu", false), peg$c915 = "In20.Cu", peg$c916 = peg$literalExpectation("In20.Cu", false), peg$c917 = "In21.Cu", peg$c918 = peg$literalExpectation("In21.Cu", false), peg$c919 = "In22.Cu", peg$c920 = peg$literalExpectation("In22.Cu", false), peg$c921 = "In23.Cu", peg$c922 = peg$literalExpectation("In23.Cu", false), peg$c923 = "In24.Cu", peg$c924 = peg$literalExpectation("In24.Cu", false), peg$c925 = "In25.Cu", peg$c926 = peg$literalExpectation("In25.Cu", false), peg$c927 = "In26.Cu", peg$c928 = peg$literalExpectation("In26.Cu", false), peg$c929 = "In27.Cu", peg$c930 = peg$literalExpectation("In27.Cu", false), peg$c931 = "In28.Cu", peg$c932 = peg$literalExpectation("In28.Cu", false), peg$c933 = "In29.Cu", peg$c934 = peg$literalExpectation("In29.Cu", false), peg$c935 = "In30.Cu", peg$c936 = peg$literalExpectation("In30.Cu", false), peg$c937 = "*.Cu", peg$c938 = peg$literalExpectation("*.Cu", false), peg$c939 = "*In.Cu", peg$c940 = peg$literalExpectation("*In.Cu", false), peg$c941 = "F&B.Cu", peg$c942 = peg$literalExpectation("F&B.Cu", false), peg$c943 = "*.Adhes", peg$c944 = peg$literalExpectation("*.Adhes", false), peg$c945 = "*.Paste", peg$c946 = peg$literalExpectation("*.Paste", false), peg$c947 = "*.Mask", peg$c948 = peg$literalExpectation("*.Mask", false), peg$c949 = "*.SilkS", peg$c950 = peg$literalExpectation("*.SilkS", false), peg$c951 = "*.Fab", peg$c952 = peg$literalExpectation("*.Fab", false), peg$c953 = "*.CrtYd", peg$c954 = peg$literalExpectation("*.CrtYd", false), peg$c955 = "Inner", peg$c956 = peg$literalExpectation("Inner", false), peg$c957 = /^[1-9]/, peg$c958 = peg$classExpectation([["1", "9"]], false, false), peg$c959 = ".Cu", peg$c960 = peg$literalExpectation(".Cu", false), peg$c961 = "Inner1", peg$c962 = peg$literalExpectation("Inner1", false), peg$c963 = /^[01-4]/, peg$c964 = peg$classExpectation(["0", ["1", "4"]], false, false), peg$currPos = 0, peg$savedPos = 0, peg$posDetailsCache = [{ line: 1, column: 1 }], peg$maxFailPos = 0, peg$maxFailExpected = [], peg$silentFails = 0, peg$result;
      if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
          throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
      }
      function text() {
        return input.substring(peg$savedPos, peg$currPos);
      }
      function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
      }
      function expected(description, location2) {
        location2 = location2 !== void 0 ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildStructuredError(
          [peg$otherExpectation(description)],
          input.substring(peg$savedPos, peg$currPos),
          location2
        );
      }
      function error(message, location2) {
        location2 = location2 !== void 0 ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location2);
      }
      function peg$literalExpectation(text2, ignoreCase) {
        return { type: "literal", text: text2, ignoreCase };
      }
      function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts, inverted, ignoreCase };
      }
      function peg$anyExpectation() {
        return { type: "any" };
      }
      function peg$endExpectation() {
        return { type: "end" };
      }
      function peg$otherExpectation(description) {
        return { type: "other", description };
      }
      function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos], p;
        if (details) {
          return details;
        } else {
          p = pos - 1;
          while (!peg$posDetailsCache[p]) {
            p--;
          }
          details = peg$posDetailsCache[p];
          details = {
            line: details.line,
            column: details.column
          };
          while (p < pos) {
            if (input.charCodeAt(p) === 10) {
              details.line++;
              details.column = 1;
            } else {
              details.column++;
            }
            p++;
          }
          peg$posDetailsCache[pos] = details;
          return details;
        }
      }
      function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos), endPosDetails = peg$computePosDetails(endPos);
        return {
          start: {
            offset: startPos,
            line: startPosDetails.line,
            column: startPosDetails.column
          },
          end: {
            offset: endPos,
            line: endPosDetails.line,
            column: endPosDetails.column
          }
        };
      }
      function peg$fail(expected2) {
        if (peg$currPos < peg$maxFailPos) {
          return;
        }
        if (peg$currPos > peg$maxFailPos) {
          peg$maxFailPos = peg$currPos;
          peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected2);
      }
      function peg$buildSimpleError(message, location2) {
        return new peg$SyntaxError(message, null, null, location2);
      }
      function peg$buildStructuredError(expected2, found, location2) {
        return new peg$SyntaxError(
          peg$SyntaxError.buildMessage(expected2, found),
          expected2,
          found,
          location2
        );
      }
      function peg$parseboard() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseEmptyLine();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseEmptyLine();
        }
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s2 = peg$c0;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c1);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              if (input.substr(peg$currPos, 9) === peg$c2) {
                s4 = peg$c2;
                peg$currPos += 9;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c3);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                  s6 = [];
                  s7 = peg$currPos;
                  s8 = peg$parsegeneral();
                  if (s8 === peg$FAILED) {
                    s8 = peg$parsehost();
                    if (s8 === peg$FAILED) {
                      s8 = peg$parsegenerator();
                      if (s8 === peg$FAILED) {
                        s8 = peg$parsegenerator_version();
                        if (s8 === peg$FAILED) {
                          s8 = peg$parseversion();
                          if (s8 === peg$FAILED) {
                            s8 = peg$parsepaper();
                            if (s8 === peg$FAILED) {
                              s8 = peg$parsetitle_block();
                              if (s8 === peg$FAILED) {
                                s8 = peg$parseboard_layers();
                                if (s8 === peg$FAILED) {
                                  s8 = peg$parsesetup();
                                  if (s8 === peg$FAILED) {
                                    s8 = peg$parsenet();
                                    if (s8 === peg$FAILED) {
                                      s8 = peg$parsenet_class();
                                      if (s8 === peg$FAILED) {
                                        s8 = peg$parsegr_arc();
                                        if (s8 === peg$FAILED) {
                                          s8 = peg$parsegr_circle();
                                          if (s8 === peg$FAILED) {
                                            s8 = peg$parsegr_curve();
                                            if (s8 === peg$FAILED) {
                                              s8 = peg$parsegr_line();
                                              if (s8 === peg$FAILED) {
                                                s8 = peg$parsegr_rect();
                                                if (s8 === peg$FAILED) {
                                                  s8 = peg$parsegr_poly();
                                                  if (s8 === peg$FAILED) {
                                                    s8 = peg$parsegr_text();
                                                    if (s8 === peg$FAILED) {
                                                      s8 = peg$parsemodule();
                                                      if (s8 === peg$FAILED) {
                                                        s8 = peg$parsesegment();
                                                        if (s8 === peg$FAILED) {
                                                          s8 = peg$parsearc();
                                                          if (s8 === peg$FAILED) {
                                                            s8 = peg$parsevia();
                                                            if (s8 === peg$FAILED) {
                                                              s8 = peg$parsezone();
                                                              if (s8 === peg$FAILED) {
                                                                s8 = peg$parsetarget();
                                                                if (s8 === peg$FAILED) {
                                                                  s8 = peg$parsedimension();
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parse_();
                    if (s9 !== peg$FAILED) {
                      peg$savedPos = s7;
                      s8 = peg$c4(s4, s8);
                      s7 = s8;
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s7;
                    s7 = peg$FAILED;
                  }
                  while (s7 !== peg$FAILED) {
                    s6.push(s7);
                    s7 = peg$currPos;
                    s8 = peg$parsegeneral();
                    if (s8 === peg$FAILED) {
                      s8 = peg$parsehost();
                      if (s8 === peg$FAILED) {
                        s8 = peg$parsegenerator();
                        if (s8 === peg$FAILED) {
                          s8 = peg$parsegenerator_version();
                          if (s8 === peg$FAILED) {
                            s8 = peg$parseversion();
                            if (s8 === peg$FAILED) {
                              s8 = peg$parsepaper();
                              if (s8 === peg$FAILED) {
                                s8 = peg$parsetitle_block();
                                if (s8 === peg$FAILED) {
                                  s8 = peg$parseboard_layers();
                                  if (s8 === peg$FAILED) {
                                    s8 = peg$parsesetup();
                                    if (s8 === peg$FAILED) {
                                      s8 = peg$parsenet();
                                      if (s8 === peg$FAILED) {
                                        s8 = peg$parsenet_class();
                                        if (s8 === peg$FAILED) {
                                          s8 = peg$parsegr_arc();
                                          if (s8 === peg$FAILED) {
                                            s8 = peg$parsegr_circle();
                                            if (s8 === peg$FAILED) {
                                              s8 = peg$parsegr_curve();
                                              if (s8 === peg$FAILED) {
                                                s8 = peg$parsegr_line();
                                                if (s8 === peg$FAILED) {
                                                  s8 = peg$parsegr_rect();
                                                  if (s8 === peg$FAILED) {
                                                    s8 = peg$parsegr_poly();
                                                    if (s8 === peg$FAILED) {
                                                      s8 = peg$parsegr_text();
                                                      if (s8 === peg$FAILED) {
                                                        s8 = peg$parsemodule();
                                                        if (s8 === peg$FAILED) {
                                                          s8 = peg$parsesegment();
                                                          if (s8 === peg$FAILED) {
                                                            s8 = peg$parsearc();
                                                            if (s8 === peg$FAILED) {
                                                              s8 = peg$parsevia();
                                                              if (s8 === peg$FAILED) {
                                                                s8 = peg$parsezone();
                                                                if (s8 === peg$FAILED) {
                                                                  s8 = peg$parsetarget();
                                                                  if (s8 === peg$FAILED) {
                                                                    s8 = peg$parsedimension();
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parse_();
                      if (s9 !== peg$FAILED) {
                        peg$savedPos = s7;
                        s8 = peg$c4(s4, s8);
                        s7 = s8;
                      } else {
                        peg$currPos = s7;
                        s7 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c7(s4, s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsegeneral() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c8) {
              s3 = peg$c8;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c9);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$parsegeneral_opt();
                if (s6 === peg$FAILED) {
                  s6 = peg$parsegeneral_array_opt();
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$parsegeneral_opt();
                  if (s6 === peg$FAILED) {
                    s6 = peg$parsegeneral_array_opt();
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c10(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsegeneral_opt() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 9) === peg$c11) {
              s3 = peg$c11;
              peg$currPos += 9;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c12);
              }
            }
            if (s3 === peg$FAILED) {
              if (input.substr(peg$currPos, 8) === peg$c13) {
                s3 = peg$c13;
                peg$currPos += 8;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c14);
                }
              }
              if (s3 === peg$FAILED) {
                if (input.substr(peg$currPos, 6) === peg$c15) {
                  s3 = peg$c15;
                  peg$currPos += 6;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c16);
                  }
                }
                if (s3 === peg$FAILED) {
                  if (input.substr(peg$currPos, 5) === peg$c17) {
                    s3 = peg$c17;
                    peg$currPos += 5;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c18);
                    }
                  }
                  if (s3 === peg$FAILED) {
                    if (input.substr(peg$currPos, 7) === peg$c19) {
                      s3 = peg$c19;
                      peg$currPos += 7;
                    } else {
                      s3 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c20);
                      }
                    }
                    if (s3 === peg$FAILED) {
                      if (input.substr(peg$currPos, 4) === peg$c21) {
                        s3 = peg$c21;
                        peg$currPos += 4;
                      } else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c22);
                        }
                      }
                      if (s3 === peg$FAILED) {
                        if (input.substr(peg$currPos, 5) === peg$c23) {
                          s3 = peg$c23;
                          peg$currPos += 5;
                        } else {
                          s3 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c24);
                          }
                        }
                        if (s3 === peg$FAILED) {
                          if (input.substr(peg$currPos, 11) === peg$c25) {
                            s3 = peg$c25;
                            peg$currPos += 11;
                          } else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c26);
                            }
                          }
                          if (s3 === peg$FAILED) {
                            if (input.substr(peg$currPos, 4) === peg$c27) {
                              s3 = peg$c27;
                              peg$currPos += 4;
                            } else {
                              s3 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c28);
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber_();
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c29(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsegeneral_array_opt() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c27) {
              s3 = peg$c27;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c28);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$parsenumber_();
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$parsenumber_();
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c30(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepaper() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c31) {
              s3 = peg$c31;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c32);
              }
            }
            if (s3 === peg$FAILED) {
              if (input.substr(peg$currPos, 5) === peg$c33) {
                s3 = peg$c33;
                peg$currPos += 5;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c34);
                }
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 34) {
                  s5 = peg$c35;
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c36);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 34) {
                    s5 = peg$c35;
                    peg$currPos++;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c36);
                    }
                  }
                }
                if (s5 === peg$FAILED) {
                  s5 = null;
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.substr(peg$currPos, 2) === peg$c37) {
                      s7 = peg$c37;
                      peg$currPos += 2;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c38);
                      }
                    }
                    if (s7 === peg$FAILED) {
                      if (input.substr(peg$currPos, 2) === peg$c39) {
                        s7 = peg$c39;
                        peg$currPos += 2;
                      } else {
                        s7 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c40);
                        }
                      }
                      if (s7 === peg$FAILED) {
                        if (input.substr(peg$currPos, 2) === peg$c41) {
                          s7 = peg$c41;
                          peg$currPos += 2;
                        } else {
                          s7 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c42);
                          }
                        }
                        if (s7 === peg$FAILED) {
                          if (input.substr(peg$currPos, 2) === peg$c43) {
                            s7 = peg$c43;
                            peg$currPos += 2;
                          } else {
                            s7 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c44);
                            }
                          }
                          if (s7 === peg$FAILED) {
                            if (input.substr(peg$currPos, 2) === peg$c45) {
                              s7 = peg$c45;
                              peg$currPos += 2;
                            } else {
                              s7 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c46);
                              }
                            }
                            if (s7 === peg$FAILED) {
                              if (input.substr(peg$currPos, 2) === peg$c47) {
                                s7 = peg$c47;
                                peg$currPos += 2;
                              } else {
                                s7 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c48);
                                }
                              }
                              if (s7 === peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 65) {
                                  s7 = peg$c49;
                                  peg$currPos++;
                                } else {
                                  s7 = peg$FAILED;
                                  if (peg$silentFails === 0) {
                                    peg$fail(peg$c50);
                                  }
                                }
                                if (s7 === peg$FAILED) {
                                  if (input.charCodeAt(peg$currPos) === 66) {
                                    s7 = peg$c51;
                                    peg$currPos++;
                                  } else {
                                    s7 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                      peg$fail(peg$c52);
                                    }
                                  }
                                  if (s7 === peg$FAILED) {
                                    if (input.charCodeAt(peg$currPos) === 67) {
                                      s7 = peg$c53;
                                      peg$currPos++;
                                    } else {
                                      s7 = peg$FAILED;
                                      if (peg$silentFails === 0) {
                                        peg$fail(peg$c54);
                                      }
                                    }
                                    if (s7 === peg$FAILED) {
                                      if (input.charCodeAt(peg$currPos) === 68) {
                                        s7 = peg$c55;
                                        peg$currPos++;
                                      } else {
                                        s7 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                          peg$fail(peg$c56);
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 34) {
                          s9 = peg$c35;
                          peg$currPos++;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c36);
                          }
                        }
                        if (s9 === peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 34) {
                            s9 = peg$c35;
                            peg$currPos++;
                          } else {
                            s9 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c36);
                            }
                          }
                        }
                        if (s9 === peg$FAILED) {
                          s9 = null;
                        }
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parse_();
                          if (s10 !== peg$FAILED) {
                            s11 = peg$currPos;
                            if (input.substr(peg$currPos, 8) === peg$c57) {
                              s12 = peg$c57;
                              peg$currPos += 8;
                            } else {
                              s12 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c58);
                              }
                            }
                            if (s12 !== peg$FAILED) {
                              s13 = peg$parse_();
                              if (s13 !== peg$FAILED) {
                                s12 = [s12, s13];
                                s11 = s12;
                              } else {
                                peg$currPos = s11;
                                s11 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s11;
                              s11 = peg$FAILED;
                            }
                            if (s11 === peg$FAILED) {
                              s11 = null;
                            }
                            if (s11 !== peg$FAILED) {
                              if (input.charCodeAt(peg$currPos) === 41) {
                                s12 = peg$c5;
                                peg$currPos++;
                              } else {
                                s12 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c6);
                                }
                              }
                              if (s12 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c59(s7, s11);
                                s0 = s1;
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsetitle_block() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 11) === peg$c60) {
              s3 = peg$c60;
              peg$currPos += 11;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c61);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 40) {
                  s7 = peg$c0;
                  peg$currPos++;
                } else {
                  s7 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c1);
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s9 = peg$currPos;
                    if (input.substr(peg$currPos, 5) === peg$c62) {
                      s10 = peg$c62;
                      peg$currPos += 5;
                    } else {
                      s10 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c63);
                      }
                    }
                    if (s10 === peg$FAILED) {
                      if (input.substr(peg$currPos, 4) === peg$c64) {
                        s10 = peg$c64;
                        peg$currPos += 4;
                      } else {
                        s10 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c65);
                        }
                      }
                      if (s10 === peg$FAILED) {
                        if (input.substr(peg$currPos, 3) === peg$c66) {
                          s10 = peg$c66;
                          peg$currPos += 3;
                        } else {
                          s10 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c67);
                          }
                        }
                        if (s10 === peg$FAILED) {
                          if (input.substr(peg$currPos, 7) === peg$c68) {
                            s10 = peg$c68;
                            peg$currPos += 7;
                          } else {
                            s10 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c69);
                            }
                          }
                          if (s10 === peg$FAILED) {
                            s10 = peg$currPos;
                            if (input.substr(peg$currPos, 7) === peg$c70) {
                              s11 = peg$c70;
                              peg$currPos += 7;
                            } else {
                              s11 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c71);
                              }
                            }
                            if (s11 !== peg$FAILED) {
                              s12 = peg$parse_();
                              if (s12 !== peg$FAILED) {
                                if (peg$c72.test(input.charAt(peg$currPos))) {
                                  s13 = input.charAt(peg$currPos);
                                  peg$currPos++;
                                } else {
                                  s13 = peg$FAILED;
                                  if (peg$silentFails === 0) {
                                    peg$fail(peg$c73);
                                  }
                                }
                                if (s13 !== peg$FAILED) {
                                  s11 = [s11, s12, s13];
                                  s10 = s11;
                                } else {
                                  peg$currPos = s10;
                                  s10 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s10;
                                s10 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s10;
                              s10 = peg$FAILED;
                            }
                          }
                        }
                      }
                    }
                    if (s10 !== peg$FAILED) {
                      s9 = input.substring(s9, peg$currPos);
                    } else {
                      s9 = s10;
                    }
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parse_();
                      if (s10 !== peg$FAILED) {
                        s11 = peg$parsestring();
                        if (s11 === peg$FAILED) {
                          s11 = peg$parsesymbol();
                        }
                        if (s11 !== peg$FAILED) {
                          s12 = peg$parse_();
                          if (s12 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 41) {
                              s13 = peg$c5;
                              peg$currPos++;
                            } else {
                              s13 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c6);
                              }
                            }
                            if (s13 !== peg$FAILED) {
                              s14 = peg$parse_();
                              if (s14 !== peg$FAILED) {
                                s7 = [s7, s8, s9, s10, s11, s12, s13, s14];
                                s6 = s7;
                              } else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s6;
                              s6 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s6;
                          s6 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  if (input.charCodeAt(peg$currPos) === 40) {
                    s7 = peg$c0;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c1);
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$currPos;
                      if (input.substr(peg$currPos, 5) === peg$c62) {
                        s10 = peg$c62;
                        peg$currPos += 5;
                      } else {
                        s10 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c63);
                        }
                      }
                      if (s10 === peg$FAILED) {
                        if (input.substr(peg$currPos, 4) === peg$c64) {
                          s10 = peg$c64;
                          peg$currPos += 4;
                        } else {
                          s10 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c65);
                          }
                        }
                        if (s10 === peg$FAILED) {
                          if (input.substr(peg$currPos, 3) === peg$c66) {
                            s10 = peg$c66;
                            peg$currPos += 3;
                          } else {
                            s10 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c67);
                            }
                          }
                          if (s10 === peg$FAILED) {
                            if (input.substr(peg$currPos, 7) === peg$c68) {
                              s10 = peg$c68;
                              peg$currPos += 7;
                            } else {
                              s10 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c69);
                              }
                            }
                            if (s10 === peg$FAILED) {
                              s10 = peg$currPos;
                              if (input.substr(peg$currPos, 7) === peg$c70) {
                                s11 = peg$c70;
                                peg$currPos += 7;
                              } else {
                                s11 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c71);
                                }
                              }
                              if (s11 !== peg$FAILED) {
                                s12 = peg$parse_();
                                if (s12 !== peg$FAILED) {
                                  if (peg$c72.test(input.charAt(peg$currPos))) {
                                    s13 = input.charAt(peg$currPos);
                                    peg$currPos++;
                                  } else {
                                    s13 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                      peg$fail(peg$c73);
                                    }
                                  }
                                  if (s13 !== peg$FAILED) {
                                    s11 = [s11, s12, s13];
                                    s10 = s11;
                                  } else {
                                    peg$currPos = s10;
                                    s10 = peg$FAILED;
                                  }
                                } else {
                                  peg$currPos = s10;
                                  s10 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s10;
                                s10 = peg$FAILED;
                              }
                            }
                          }
                        }
                      }
                      if (s10 !== peg$FAILED) {
                        s9 = input.substring(s9, peg$currPos);
                      } else {
                        s9 = s10;
                      }
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parse_();
                        if (s10 !== peg$FAILED) {
                          s11 = peg$parsestring();
                          if (s11 === peg$FAILED) {
                            s11 = peg$parsesymbol();
                          }
                          if (s11 !== peg$FAILED) {
                            s12 = peg$parse_();
                            if (s12 !== peg$FAILED) {
                              if (input.charCodeAt(peg$currPos) === 41) {
                                s13 = peg$c5;
                                peg$currPos++;
                              } else {
                                s13 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c6);
                                }
                              }
                              if (s13 !== peg$FAILED) {
                                s14 = peg$parse_();
                                if (s14 !== peg$FAILED) {
                                  s7 = [s7, s8, s9, s10, s11, s12, s13, s14];
                                  s6 = s7;
                                } else {
                                  peg$currPos = s6;
                                  s6 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s6;
                              s6 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s6;
                          s6 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c74(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseboard_layers() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c75) {
              s3 = peg$c75;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c76);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parse_board_layer();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    peg$savedPos = s6;
                    s7 = peg$c77(s3, s7);
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parse_board_layer();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s6;
                      s7 = peg$c77(s3, s7);
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c78(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parse_board_layer() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parsesymbol();
            if (s3 === peg$FAILED) {
              s3 = peg$parsenumber();
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsesymbol();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$currPos;
                    if (input.substr(peg$currPos, 4) === peg$c79) {
                      s8 = peg$c79;
                      peg$currPos += 4;
                    } else {
                      s8 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c80);
                      }
                    }
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parse_();
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parsestring();
                        if (s10 !== peg$FAILED) {
                          peg$savedPos = s7;
                          s8 = peg$c81(s3, s5, s10);
                          s7 = s8;
                        } else {
                          peg$currPos = s7;
                          s7 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s7;
                        s7 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsesymbol();
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$currPos;
                        if (input.substr(peg$currPos, 4) === peg$c82) {
                          s10 = peg$c82;
                          peg$currPos += 4;
                        } else {
                          s10 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c83);
                          }
                        }
                        if (s10 !== peg$FAILED) {
                          s11 = peg$parse_();
                          if (s11 !== peg$FAILED) {
                            s10 = [s10, s11];
                            s9 = s10;
                          } else {
                            peg$currPos = s9;
                            s9 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s9;
                          s9 = peg$FAILED;
                        }
                        if (s9 === peg$FAILED) {
                          s9 = null;
                        }
                        if (s9 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 41) {
                            s10 = peg$c5;
                            peg$currPos++;
                          } else {
                            s10 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c6);
                            }
                          }
                          if (s10 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c84(s3, s5, s7, s9);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsesetup() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c85) {
              s3 = peg$c85;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c86);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parsesetup_boardunits();
                if (s7 === peg$FAILED) {
                  s7 = peg$parsesetup_flag();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsesetup_array();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsesetup_hex();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parsedefaults();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parsepcbplotparams();
                          if (s7 === peg$FAILED) {
                            s7 = peg$parseunsupported_setup();
                          }
                        }
                      }
                    }
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parsesetup_boardunits();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsesetup_flag();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsesetup_array();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parsesetup_hex();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parsedefaults();
                          if (s7 === peg$FAILED) {
                            s7 = peg$parsepcbplotparams();
                            if (s7 === peg$FAILED) {
                              s7 = peg$parseunsupported_setup();
                            }
                          }
                        }
                      }
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c87(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsesetup_flag() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseSETUP_FLAG();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsebool();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c88(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseSETUP_FLAG() {
        var s0;
        if (input.substr(peg$currPos, 22) === peg$c89) {
          s0 = peg$c89;
          peg$currPos += 22;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c90);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 25) === peg$c91) {
            s0 = peg$c91;
            peg$currPos += 25;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c92);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 13) === peg$c93) {
              s0 = peg$c93;
              peg$currPos += 13;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c94);
              }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 12) === peg$c95) {
                s0 = peg$c95;
                peg$currPos += 12;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c96);
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parsesetup_boardunits() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseSETUP_BOARDUNITS();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c88(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseSETUP_BOARDUNITS() {
        var s0;
        if (input.substr(peg$currPos, 16) === peg$c97) {
          s0 = peg$c97;
          peg$currPos += 16;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c98);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 16) === peg$c99) {
            s0 = peg$c99;
            peg$currPos += 16;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c100);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 15) === peg$c101) {
              s0 = peg$c101;
              peg$currPos += 15;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c102);
              }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 14) === peg$c103) {
                s0 = peg$c103;
                peg$currPos += 14;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c104);
                }
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 13) === peg$c105) {
                  s0 = peg$c105;
                  peg$currPos += 13;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c106);
                  }
                }
                if (s0 === peg$FAILED) {
                  if (input.substr(peg$currPos, 9) === peg$c107) {
                    s0 = peg$c107;
                    peg$currPos += 9;
                  } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c108);
                    }
                  }
                  if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 8) === peg$c109) {
                      s0 = peg$c109;
                      peg$currPos += 8;
                    } else {
                      s0 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c110);
                      }
                    }
                    if (s0 === peg$FAILED) {
                      if (input.substr(peg$currPos, 9) === peg$c111) {
                        s0 = peg$c111;
                        peg$currPos += 9;
                      } else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c112);
                        }
                      }
                      if (s0 === peg$FAILED) {
                        if (input.substr(peg$currPos, 15) === peg$c113) {
                          s0 = peg$c113;
                          peg$currPos += 15;
                        } else {
                          s0 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c114);
                          }
                        }
                        if (s0 === peg$FAILED) {
                          if (input.substr(peg$currPos, 12) === peg$c115) {
                            s0 = peg$c115;
                            peg$currPos += 12;
                          } else {
                            s0 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c116);
                            }
                          }
                          if (s0 === peg$FAILED) {
                            if (input.substr(peg$currPos, 16) === peg$c117) {
                              s0 = peg$c117;
                              peg$currPos += 16;
                            } else {
                              s0 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c118);
                              }
                            }
                            if (s0 === peg$FAILED) {
                              if (input.substr(peg$currPos, 13) === peg$c119) {
                                s0 = peg$c119;
                                peg$currPos += 13;
                              } else {
                                s0 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c120);
                                }
                              }
                              if (s0 === peg$FAILED) {
                                if (input.substr(peg$currPos, 16) === peg$c121) {
                                  s0 = peg$c121;
                                  peg$currPos += 16;
                                } else {
                                  s0 = peg$FAILED;
                                  if (peg$silentFails === 0) {
                                    peg$fail(peg$c122);
                                  }
                                }
                                if (s0 === peg$FAILED) {
                                  if (input.substr(peg$currPos, 9) === peg$c123) {
                                    s0 = peg$c123;
                                    peg$currPos += 9;
                                  } else {
                                    s0 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                      peg$fail(peg$c124);
                                    }
                                  }
                                  if (s0 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 10) === peg$c125) {
                                      s0 = peg$c125;
                                      peg$currPos += 10;
                                    } else {
                                      s0 = peg$FAILED;
                                      if (peg$silentFails === 0) {
                                        peg$fail(peg$c126);
                                      }
                                    }
                                    if (s0 === peg$FAILED) {
                                      if (input.substr(peg$currPos, 13) === peg$c127) {
                                        s0 = peg$c127;
                                        peg$currPos += 13;
                                      } else {
                                        s0 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                          peg$fail(peg$c128);
                                        }
                                      }
                                      if (s0 === peg$FAILED) {
                                        if (input.substr(peg$currPos, 14) === peg$c129) {
                                          s0 = peg$c129;
                                          peg$currPos += 14;
                                        } else {
                                          s0 = peg$FAILED;
                                          if (peg$silentFails === 0) {
                                            peg$fail(peg$c130);
                                          }
                                        }
                                        if (s0 === peg$FAILED) {
                                          if (input.substr(peg$currPos, 13) === peg$c131) {
                                            s0 = peg$c131;
                                            peg$currPos += 13;
                                          } else {
                                            s0 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                              peg$fail(peg$c132);
                                            }
                                          }
                                          if (s0 === peg$FAILED) {
                                            if (input.substr(peg$currPos, 10) === peg$c133) {
                                              s0 = peg$c133;
                                              peg$currPos += 10;
                                            } else {
                                              s0 = peg$FAILED;
                                              if (peg$silentFails === 0) {
                                                peg$fail(peg$c134);
                                              }
                                            }
                                            if (s0 === peg$FAILED) {
                                              if (input.substr(peg$currPos, 14) === peg$c135) {
                                                s0 = peg$c135;
                                                peg$currPos += 14;
                                              } else {
                                                s0 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                  peg$fail(peg$c136);
                                                }
                                              }
                                              if (s0 === peg$FAILED) {
                                                if (input.substr(peg$currPos, 14) === peg$c137) {
                                                  s0 = peg$c137;
                                                  peg$currPos += 14;
                                                } else {
                                                  s0 = peg$FAILED;
                                                  if (peg$silentFails === 0) {
                                                    peg$fail(peg$c138);
                                                  }
                                                }
                                                if (s0 === peg$FAILED) {
                                                  if (input.substr(peg$currPos, 14) === peg$c139) {
                                                    s0 = peg$c139;
                                                    peg$currPos += 14;
                                                  } else {
                                                    s0 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                      peg$fail(peg$c140);
                                                    }
                                                  }
                                                  if (s0 === peg$FAILED) {
                                                    if (input.substr(peg$currPos, 21) === peg$c141) {
                                                      s0 = peg$c141;
                                                      peg$currPos += 21;
                                                    } else {
                                                      s0 = peg$FAILED;
                                                      if (peg$silentFails === 0) {
                                                        peg$fail(peg$c142);
                                                      }
                                                    }
                                                    if (s0 === peg$FAILED) {
                                                      if (input.substr(peg$currPos, 21) === peg$c143) {
                                                        s0 = peg$c143;
                                                        peg$currPos += 21;
                                                      } else {
                                                        s0 = peg$FAILED;
                                                        if (peg$silentFails === 0) {
                                                          peg$fail(peg$c144);
                                                        }
                                                      }
                                                      if (s0 === peg$FAILED) {
                                                        if (input.substr(peg$currPos, 28) === peg$c145) {
                                                          s0 = peg$c145;
                                                          peg$currPos += 28;
                                                        } else {
                                                          s0 = peg$FAILED;
                                                          if (peg$silentFails === 0) {
                                                            peg$fail(peg$c146);
                                                          }
                                                        }
                                                        if (s0 === peg$FAILED) {
                                                          if (input.substr(peg$currPos, 22) === peg$c147) {
                                                            s0 = peg$c147;
                                                            peg$currPos += 22;
                                                          } else {
                                                            s0 = peg$FAILED;
                                                            if (peg$silentFails === 0) {
                                                              peg$fail(peg$c148);
                                                            }
                                                          }
                                                          if (s0 === peg$FAILED) {
                                                            if (input.substr(peg$currPos, 9) === peg$c149) {
                                                              s0 = peg$c149;
                                                              peg$currPos += 9;
                                                            } else {
                                                              s0 = peg$FAILED;
                                                              if (peg$silentFails === 0) {
                                                                peg$fail(peg$c150);
                                                              }
                                                            }
                                                            if (s0 === peg$FAILED) {
                                                              if (input.substr(peg$currPos, 9) === peg$c151) {
                                                                s0 = peg$c151;
                                                                peg$currPos += 9;
                                                              } else {
                                                                s0 = peg$FAILED;
                                                                if (peg$silentFails === 0) {
                                                                  peg$fail(peg$c152);
                                                                }
                                                              }
                                                              if (s0 === peg$FAILED) {
                                                                if (input.substr(peg$currPos, 28) === peg$c145) {
                                                                  s0 = peg$c145;
                                                                  peg$currPos += 28;
                                                                } else {
                                                                  s0 = peg$FAILED;
                                                                  if (peg$silentFails === 0) {
                                                                    peg$fail(peg$c146);
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parsesetup_hex() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 16) === peg$c153) {
              s3 = peg$c153;
              peg$currPos += 16;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c154);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsehex();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c88(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsesetup_array() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseSETUP_ARRAY();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parsenumber();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                if (s6 !== peg$FAILED) {
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$currPos;
                    s7 = peg$parsenumber();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s7 = [s7, s8];
                        s6 = s7;
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  }
                } else {
                  s5 = peg$FAILED;
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c155(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseSETUP_ARRAY() {
        var s0;
        if (input.substr(peg$currPos, 8) === peg$c156) {
          s0 = peg$c156;
          peg$currPos += 8;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c157);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 14) === peg$c158) {
            s0 = peg$c158;
            peg$currPos += 14;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c159);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 13) === peg$c160) {
              s0 = peg$c160;
              peg$currPos += 13;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c161);
              }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 13) === peg$c162) {
                s0 = peg$c162;
                peg$currPos += 13;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c163);
                }
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 8) === peg$c164) {
                  s0 = peg$c164;
                  peg$currPos += 8;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c165);
                  }
                }
                if (s0 === peg$FAILED) {
                  if (input.substr(peg$currPos, 15) === peg$c166) {
                    s0 = peg$c166;
                    peg$currPos += 15;
                  } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c167);
                    }
                  }
                  if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 11) === peg$c168) {
                      s0 = peg$c168;
                      peg$currPos += 11;
                    } else {
                      s0 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c169);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parsedefaults() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 8) === peg$c170) {
              s3 = peg$c170;
              peg$currPos += 8;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c171);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$parsedefault_boardunits();
                if (s6 === peg$FAILED) {
                  s6 = peg$parsedefault_int();
                  if (s6 === peg$FAILED) {
                    s6 = peg$currPos;
                    s7 = peg$parsedefault_text_dims();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s7 = [s7, s8];
                        s6 = s7;
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  }
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$parsedefault_boardunits();
                  if (s6 === peg$FAILED) {
                    s6 = peg$parsedefault_int();
                    if (s6 === peg$FAILED) {
                      s6 = peg$currPos;
                      s7 = peg$parsedefault_text_dims();
                      if (s7 !== peg$FAILED) {
                        s8 = peg$parse_();
                        if (s8 !== peg$FAILED) {
                          s7 = [s7, s8];
                          s6 = s7;
                        } else {
                          peg$currPos = s6;
                          s6 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c172(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsedefault_boardunits() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseDEFAULT_BOARDUNITS();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c88(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseDEFAULT_BOARDUNITS() {
        var s0;
        if (input.substr(peg$currPos, 16) === peg$c173) {
          s0 = peg$c173;
          peg$currPos += 16;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c174);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 19) === peg$c175) {
            s0 = peg$c175;
            peg$currPos += 19;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c176);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 22) === peg$c177) {
              s0 = peg$c177;
              peg$currPos += 22;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c178);
              }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 22) === peg$c179) {
                s0 = peg$c179;
                peg$currPos += 22;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c180);
                }
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 17) === peg$c181) {
                  s0 = peg$c181;
                  peg$currPos += 17;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c182);
                  }
                }
                if (s0 === peg$FAILED) {
                  if (input.substr(peg$currPos, 23) === peg$c183) {
                    s0 = peg$c183;
                    peg$currPos += 23;
                  } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c184);
                    }
                  }
                  if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 25) === peg$c185) {
                      s0 = peg$c185;
                      peg$currPos += 25;
                    } else {
                      s0 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c186);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parsedefault_int() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseDEFAULT_INT();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsedigits();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c88(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseDEFAULT_INT() {
        var s0;
        if (input.substr(peg$currPos, 15) === peg$c187) {
          s0 = peg$c187;
          peg$currPos += 15;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c188);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 19) === peg$c189) {
            s0 = peg$c189;
            peg$currPos += 19;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c190);
            }
          }
        }
        return s0;
      }
      function peg$parsedefault_text_dims() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseDEFAULT_TEXT_DIMS();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parsesize();
                if (s7 === peg$FAILED) {
                  s7 = peg$parsethickness();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsebold();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parseitalic();
                    }
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parsesize();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsethickness();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsebold();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parseitalic();
                      }
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c191(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseDEFAULT_TEXT_DIMS() {
        var s0;
        if (input.substr(peg$currPos, 16) === peg$c192) {
          s0 = peg$c192;
          peg$currPos += 16;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c193);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 14) === peg$c194) {
            s0 = peg$c194;
            peg$currPos += 14;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c195);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 20) === peg$c196) {
              s0 = peg$c196;
              peg$currPos += 20;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c197);
              }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 22) === peg$c198) {
                s0 = peg$c198;
                peg$currPos += 22;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c199);
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parsepcbplotparams() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 13) === peg$c200) {
              s3 = peg$c200;
              peg$currPos += 13;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c201);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parsepcbplotparams_flag();
                if (s7 === peg$FAILED) {
                  s7 = peg$parsepcbplotparams_numeric();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsepcbplotparams_layerselection();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsepcbplotparams_outputdirectory();
                    }
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parsepcbplotparams_flag();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsepcbplotparams_numeric();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsepcbplotparams_layerselection();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parsepcbplotparams_outputdirectory();
                      }
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c87(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepcbplotparams_layerselection() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 14) === peg$c202) {
              s3 = peg$c202;
              peg$currPos += 14;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c203);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 === peg$FAILED) {
                  s5 = peg$parsesymbol();
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c204(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepcbplotparams_outputdirectory() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 15) === peg$c205) {
              s3 = peg$c205;
              peg$currPos += 15;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c206);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 === peg$FAILED) {
                  s5 = peg$parsesymbol();
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c204(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepcbplotparams_numeric() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parsePCBPLOTPARAMS_NUMERIC();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c88(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsePCBPLOTPARAMS_NUMERIC() {
        var s0;
        if (input.substr(peg$currPos, 9) === peg$c207) {
          s0 = peg$c207;
          peg$currPos += 9;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c208);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c209) {
            s0 = peg$c209;
            peg$currPos += 4;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c210);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 13) === peg$c211) {
              s0 = peg$c211;
              peg$currPos += 13;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c212);
              }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 12) === peg$c213) {
                s0 = peg$c213;
                peg$currPos += 12;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c214);
                }
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 15) === peg$c215) {
                  s0 = peg$c215;
                  peg$currPos += 15;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c216);
                  }
                }
                if (s0 === peg$FAILED) {
                  if (input.substr(peg$currPos, 14) === peg$c217) {
                    s0 = peg$c217;
                    peg$currPos += 14;
                  } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c218);
                    }
                  }
                  if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 12) === peg$c219) {
                      s0 = peg$c219;
                      peg$currPos += 12;
                    } else {
                      s0 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c220);
                      }
                    }
                    if (s0 === peg$FAILED) {
                      if (input.substr(peg$currPos, 10) === peg$c221) {
                        s0 = peg$c221;
                        peg$currPos += 10;
                      } else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c222);
                        }
                      }
                      if (s0 === peg$FAILED) {
                        if (input.substr(peg$currPos, 14) === peg$c223) {
                          s0 = peg$c223;
                          peg$currPos += 14;
                        } else {
                          s0 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c224);
                          }
                        }
                        if (s0 === peg$FAILED) {
                          if (input.substr(peg$currPos, 12) === peg$c225) {
                            s0 = peg$c225;
                            peg$currPos += 12;
                          } else {
                            s0 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c226);
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parsepcbplotparams_flag() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parsePCBPLOTPARAMS_FLAG();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsepcbplotparams_bool();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c88(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsePCBPLOTPARAMS_FLAG() {
        var s0;
        if (input.substr(peg$currPos, 18) === peg$c227) {
          s0 = peg$c227;
          peg$currPos += 18;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c228);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 19) === peg$c229) {
            s0 = peg$c229;
            peg$currPos += 19;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c230);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 19) === peg$c231) {
              s0 = peg$c231;
              peg$currPos += 19;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c232);
              }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 27) === peg$c233) {
                s0 = peg$c233;
                peg$currPos += 27;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c234);
                }
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 19) === peg$c235) {
                  s0 = peg$c235;
                  peg$currPos += 19;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c236);
                  }
                }
                if (s0 === peg$FAILED) {
                  if (input.substr(peg$currPos, 10) === peg$c237) {
                    s0 = peg$c237;
                    peg$currPos += 10;
                  } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c238);
                    }
                  }
                  if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 16) === peg$c239) {
                      s0 = peg$c239;
                      peg$currPos += 16;
                    } else {
                      s0 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c240);
                      }
                    }
                    if (s0 === peg$FAILED) {
                      if (input.substr(peg$currPos, 12) === peg$c241) {
                        s0 = peg$c241;
                        peg$currPos += 12;
                      } else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c242);
                        }
                      }
                      if (s0 === peg$FAILED) {
                        if (input.substr(peg$currPos, 10) === peg$c243) {
                          s0 = peg$c243;
                          peg$currPos += 10;
                        } else {
                          s0 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c244);
                          }
                        }
                        if (s0 === peg$FAILED) {
                          if (input.substr(peg$currPos, 12) === peg$c245) {
                            s0 = peg$c245;
                            peg$currPos += 12;
                          } else {
                            s0 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c246);
                            }
                          }
                          if (s0 === peg$FAILED) {
                            if (input.substr(peg$currPos, 14) === peg$c247) {
                              s0 = peg$c247;
                              peg$currPos += 14;
                            } else {
                              s0 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c248);
                              }
                            }
                            if (s0 === peg$FAILED) {
                              if (input.substr(peg$currPos, 16) === peg$c249) {
                                s0 = peg$c249;
                                peg$currPos += 16;
                              } else {
                                s0 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c250);
                                }
                              }
                              if (s0 === peg$FAILED) {
                                if (input.substr(peg$currPos, 16) === peg$c251) {
                                  s0 = peg$c251;
                                  peg$currPos += 16;
                                } else {
                                  s0 = peg$FAILED;
                                  if (peg$silentFails === 0) {
                                    peg$fail(peg$c252);
                                  }
                                }
                                if (s0 === peg$FAILED) {
                                  if (input.substr(peg$currPos, 10) === peg$c253) {
                                    s0 = peg$c253;
                                    peg$currPos += 10;
                                  } else {
                                    s0 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                      peg$fail(peg$c254);
                                    }
                                  }
                                  if (s0 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 10) === peg$c255) {
                                      s0 = peg$c255;
                                      peg$currPos += 10;
                                    } else {
                                      s0 = peg$FAILED;
                                      if (peg$silentFails === 0) {
                                        peg$fail(peg$c256);
                                      }
                                    }
                                    if (s0 === peg$FAILED) {
                                      if (input.substr(peg$currPos, 13) === peg$c257) {
                                        s0 = peg$c257;
                                        peg$currPos += 13;
                                      } else {
                                        s0 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                          peg$fail(peg$c258);
                                        }
                                      }
                                      if (s0 === peg$FAILED) {
                                        if (input.substr(peg$currPos, 9) === peg$c259) {
                                          s0 = peg$c259;
                                          peg$currPos += 9;
                                        } else {
                                          s0 = peg$FAILED;
                                          if (peg$silentFails === 0) {
                                            peg$fail(peg$c260);
                                          }
                                        }
                                        if (s0 === peg$FAILED) {
                                          if (input.substr(peg$currPos, 17) === peg$c261) {
                                            s0 = peg$c261;
                                            peg$currPos += 17;
                                          } else {
                                            s0 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                              peg$fail(peg$c262);
                                            }
                                          }
                                          if (s0 === peg$FAILED) {
                                            if (input.substr(peg$currPos, 13) === peg$c263) {
                                              s0 = peg$c263;
                                              peg$currPos += 13;
                                            } else {
                                              s0 = peg$FAILED;
                                              if (peg$silentFails === 0) {
                                                peg$fail(peg$c264);
                                              }
                                            }
                                            if (s0 === peg$FAILED) {
                                              if (input.substr(peg$currPos, 15) === peg$c265) {
                                                s0 = peg$c265;
                                                peg$currPos += 15;
                                              } else {
                                                s0 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                  peg$fail(peg$c266);
                                                }
                                              }
                                              if (s0 === peg$FAILED) {
                                                if (input.substr(peg$currPos, 10) === peg$c267) {
                                                  s0 = peg$c267;
                                                  peg$currPos += 10;
                                                } else {
                                                  s0 = peg$FAILED;
                                                  if (peg$silentFails === 0) {
                                                    peg$fail(peg$c268);
                                                  }
                                                }
                                                if (s0 === peg$FAILED) {
                                                  if (input.substr(peg$currPos, 20) === peg$c269) {
                                                    s0 = peg$c269;
                                                    peg$currPos += 20;
                                                  } else {
                                                    s0 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                      peg$fail(peg$c270);
                                                    }
                                                  }
                                                  if (s0 === peg$FAILED) {
                                                    if (input.substr(peg$currPos, 6) === peg$c271) {
                                                      s0 = peg$c271;
                                                      peg$currPos += 6;
                                                    } else {
                                                      s0 = peg$FAILED;
                                                      if (peg$silentFails === 0) {
                                                        peg$fail(peg$c272);
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parsepcbplotparams_bool() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c273) {
          s1 = peg$c273;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c274);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 5) === peg$c275) {
            s1 = peg$c275;
            peg$currPos += 5;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c276);
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c277(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parseunsupported_setup() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c278) {
              s3 = peg$c278;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c279);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parseexpression();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parseexpression();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c280(s3);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsenet() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c281) {
              s3 = peg$c281;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c282);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsedigits();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$currPos;
                    s8 = peg$parsestring();
                    if (s8 === peg$FAILED) {
                      s8 = peg$parsesymbol();
                    }
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parse_();
                      if (s9 !== peg$FAILED) {
                        peg$savedPos = s7;
                        s8 = peg$c283(s3, s5, s8);
                        s7 = s8;
                      } else {
                        peg$currPos = s7;
                        s7 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                    if (s7 === peg$FAILED) {
                      s7 = null;
                    }
                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s8 = peg$c5;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c6);
                        }
                      }
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c284(s3, s5, s7);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsenet_class() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 9) === peg$c285) {
              s3 = peg$c285;
              peg$currPos += 9;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c286);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 === peg$FAILED) {
                  s5 = peg$parsesymbol();
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsestring();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsesymbol();
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = [];
                        s10 = peg$currPos;
                        s11 = peg$parsenet_class_symbol();
                        if (s11 === peg$FAILED) {
                          s11 = peg$parsenet_class_boardunit();
                        }
                        if (s11 !== peg$FAILED) {
                          s12 = peg$parse_();
                          if (s12 !== peg$FAILED) {
                            peg$savedPos = s10;
                            s11 = peg$c287(s3, s5, s7, s11);
                            s10 = s11;
                          } else {
                            peg$currPos = s10;
                            s10 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s10;
                          s10 = peg$FAILED;
                        }
                        while (s10 !== peg$FAILED) {
                          s9.push(s10);
                          s10 = peg$currPos;
                          s11 = peg$parsenet_class_symbol();
                          if (s11 === peg$FAILED) {
                            s11 = peg$parsenet_class_boardunit();
                          }
                          if (s11 !== peg$FAILED) {
                            s12 = peg$parse_();
                            if (s12 !== peg$FAILED) {
                              peg$savedPos = s10;
                              s11 = peg$c287(s3, s5, s7, s11);
                              s10 = s11;
                            } else {
                              peg$currPos = s10;
                              s10 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s10;
                            s10 = peg$FAILED;
                          }
                        }
                        if (s9 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 41) {
                            s10 = peg$c5;
                            peg$currPos++;
                          } else {
                            s10 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c6);
                            }
                          }
                          if (s10 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c288(s3, s5, s7, s9);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsenet_class_symbol() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c289) {
              s3 = peg$c289;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c290);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 === peg$FAILED) {
                  s5 = peg$parsesymbol();
                  if (s5 === peg$FAILED) {
                    s5 = peg$parsenumber();
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c88(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsenet_class_boardunit() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseNET_CLASS_BOARDUNIT();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c88(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseNET_CLASS_BOARDUNIT() {
        var s0;
        if (input.substr(peg$currPos, 9) === peg$c291) {
          s0 = peg$c291;
          peg$currPos += 9;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c292);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 11) === peg$c293) {
            s0 = peg$c293;
            peg$currPos += 11;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c294);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c295) {
              s0 = peg$c295;
              peg$currPos += 7;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c296);
              }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 9) === peg$c111) {
                s0 = peg$c111;
                peg$currPos += 9;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c112);
                }
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 8) === peg$c297) {
                  s0 = peg$c297;
                  peg$currPos += 8;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c298);
                  }
                }
                if (s0 === peg$FAILED) {
                  if (input.substr(peg$currPos, 10) === peg$c125) {
                    s0 = peg$c125;
                    peg$currPos += 10;
                  } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c126);
                    }
                  }
                  if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 15) === peg$c299) {
                      s0 = peg$c299;
                      peg$currPos += 15;
                    } else {
                      s0 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c300);
                      }
                    }
                    if (s0 === peg$FAILED) {
                      if (input.substr(peg$currPos, 13) === peg$c301) {
                        s0 = peg$c301;
                        peg$currPos += 13;
                      } else {
                        s0 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c302);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parsedimension() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 9) === peg$c303) {
              s3 = peg$c303;
              peg$currPos += 9;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c304);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsewidth();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = [];
                        s10 = peg$currPos;
                        s11 = peg$parselayer();
                        if (s11 === peg$FAILED) {
                          s11 = peg$parsetstamp();
                          if (s11 === peg$FAILED) {
                            s11 = peg$parsegr_text();
                            if (s11 === peg$FAILED) {
                              s11 = peg$parsedimension_xy();
                            }
                          }
                        }
                        if (s11 !== peg$FAILED) {
                          s12 = peg$parse_();
                          if (s12 !== peg$FAILED) {
                            s11 = [s11, s12];
                            s10 = s11;
                          } else {
                            peg$currPos = s10;
                            s10 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s10;
                          s10 = peg$FAILED;
                        }
                        while (s10 !== peg$FAILED) {
                          s9.push(s10);
                          s10 = peg$currPos;
                          s11 = peg$parselayer();
                          if (s11 === peg$FAILED) {
                            s11 = peg$parsetstamp();
                            if (s11 === peg$FAILED) {
                              s11 = peg$parsegr_text();
                              if (s11 === peg$FAILED) {
                                s11 = peg$parsedimension_xy();
                              }
                            }
                          }
                          if (s11 !== peg$FAILED) {
                            s12 = peg$parse_();
                            if (s12 !== peg$FAILED) {
                              s11 = [s11, s12];
                              s10 = s11;
                            } else {
                              peg$currPos = s10;
                              s10 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s10;
                            s10 = peg$FAILED;
                          }
                        }
                        if (s9 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 41) {
                            s10 = peg$c5;
                            peg$currPos++;
                          } else {
                            s10 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c6);
                            }
                          }
                          if (s10 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c305(s3, s5, s7, s9);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsedimension_xy() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseDIMENSION_XY();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsepts();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c306(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseDIMENSION_XY() {
        var s0;
        if (input.substr(peg$currPos, 8) === peg$c307) {
          s0 = peg$c307;
          peg$currPos += 8;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c308);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 8) === peg$c309) {
            s0 = peg$c309;
            peg$currPos += 8;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c310);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 8) === peg$c311) {
              s0 = peg$c311;
              peg$currPos += 8;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c312);
              }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 7) === peg$c313) {
                s0 = peg$c313;
                peg$currPos += 7;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c314);
                }
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 7) === peg$c315) {
                  s0 = peg$c315;
                  peg$currPos += 7;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c316);
                  }
                }
                if (s0 === peg$FAILED) {
                  if (input.substr(peg$currPos, 7) === peg$c317) {
                    s0 = peg$c317;
                    peg$currPos += 7;
                  } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c318);
                    }
                  }
                  if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 7) === peg$c319) {
                      s0 = peg$c319;
                      peg$currPos += 7;
                    } else {
                      s0 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c320);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parsesegment() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c321) {
              s3 = peg$c321;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c322);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parsestart();
                if (s7 === peg$FAILED) {
                  s7 = peg$parseend();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsewidth();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsenet();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parselayer();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parsetstamp();
                          if (s7 === peg$FAILED) {
                            s7 = peg$parsestatus();
                          }
                        }
                      }
                    }
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    peg$savedPos = s6;
                    s7 = peg$c323(s3, s7);
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parsestart();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parseend();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsewidth();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parsenet();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parselayer();
                          if (s7 === peg$FAILED) {
                            s7 = peg$parsetstamp();
                            if (s7 === peg$FAILED) {
                              s7 = peg$parsestatus();
                            }
                          }
                        }
                      }
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s6;
                      s7 = peg$c323(s3, s7);
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c324(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsearc() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c325) {
              s3 = peg$c325;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c326);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parsestart();
                if (s7 === peg$FAILED) {
                  s7 = peg$parsemid();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parseend();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsewidth();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parsenet();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parselayer();
                          if (s7 === peg$FAILED) {
                            s7 = peg$parsetstamp();
                            if (s7 === peg$FAILED) {
                              s7 = peg$parsestatus();
                            }
                          }
                        }
                      }
                    }
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    peg$savedPos = s6;
                    s7 = peg$c323(s3, s7);
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parsestart();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsemid();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parseend();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parsewidth();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parsenet();
                          if (s7 === peg$FAILED) {
                            s7 = peg$parselayer();
                            if (s7 === peg$FAILED) {
                              s7 = peg$parsetstamp();
                              if (s7 === peg$FAILED) {
                                s7 = peg$parsestatus();
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s6;
                      s7 = peg$c323(s3, s7);
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c327(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsetarget() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c328) {
              s3 = peg$c328;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c329);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parsetarget_flag();
                if (s7 === peg$FAILED) {
                  s7 = peg$parseat();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsesize1();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsewidth();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parselayer();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parsetstamp();
                        }
                      }
                    }
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parsetarget_flag();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parseat();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsesize1();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parsewidth();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parselayer();
                          if (s7 === peg$FAILED) {
                            s7 = peg$parsetstamp();
                          }
                        }
                      }
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c330(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsetarget_flag() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 120) {
          s1 = peg$c331;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c332);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c333) {
            s1 = peg$c333;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c334);
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c335(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsevia() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c336) {
              s3 = peg$c336;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c337);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parsevia_param();
                if (s7 === peg$FAILED) {
                  s7 = peg$parsevia_flag();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parseat();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsesize1();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parselayers();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parsetstamp();
                          if (s7 === peg$FAILED) {
                            s7 = peg$parsestatus();
                          }
                        }
                      }
                    }
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parsevia_param();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsevia_flag();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parseat();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parsesize1();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parselayers();
                          if (s7 === peg$FAILED) {
                            s7 = peg$parsetstamp();
                            if (s7 === peg$FAILED) {
                              s7 = peg$parsestatus();
                            }
                          }
                        }
                      }
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c338(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsevia_flag() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$currPos;
        if (input.substr(peg$currPos, 5) === peg$c339) {
          s2 = peg$c339;
          peg$currPos += 5;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c340);
          }
        }
        if (s2 === peg$FAILED) {
          if (input.substr(peg$currPos, 5) === peg$c341) {
            s2 = peg$c341;
            peg$currPos += 5;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c342);
            }
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c343(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsevia_param() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$currPos;
            if (input.substr(peg$currPos, 4) === peg$c344) {
              s4 = peg$c344;
              peg$currPos += 4;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c345);
              }
            }
            if (s4 === peg$FAILED) {
              if (input.substr(peg$currPos, 5) === peg$c346) {
                s4 = peg$c346;
                peg$currPos += 5;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c347);
                }
              }
              if (s4 === peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c281) {
                  s4 = peg$c281;
                  peg$currPos += 3;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c282);
                  }
                }
              }
            }
            if (s4 !== peg$FAILED) {
              s3 = input.substring(s3, peg$currPos);
            } else {
              s3 = s4;
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$currPos;
                s6 = peg$parsenumber();
                if (s6 === peg$FAILED) {
                  s6 = peg$parsesymbol();
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s5;
                    s6 = peg$c77(s3, s6);
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c348(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepolygon() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c349) {
              s3 = peg$c349;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c350);
              }
            }
            if (s3 === peg$FAILED) {
              if (input.substr(peg$currPos, 14) === peg$c351) {
                s3 = peg$c351;
                peg$currPos += 14;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c352);
                }
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsepts();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c353(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsezone() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c344) {
              s3 = peg$c344;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c345);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parselayers();
                if (s7 === peg$FAILED) {
                  s7 = peg$parselayer();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsezone_param();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsetstamp();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parsezone_connect_pads();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parsezone_hatch();
                          if (s7 === peg$FAILED) {
                            s7 = peg$parsezone_fill();
                            if (s7 === peg$FAILED) {
                              s7 = peg$parsezone_keepout();
                              if (s7 === peg$FAILED) {
                                s7 = peg$parsepolygon();
                                if (s7 === peg$FAILED) {
                                  s7 = peg$parsefill_segments();
                                  if (s7 === peg$FAILED) {
                                    s7 = peg$parseuuid();
                                    if (s7 === peg$FAILED) {
                                      s7 = peg$parsename();
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    peg$savedPos = s6;
                    s7 = peg$c323(s3, s7);
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parselayers();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parselayer();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsezone_param();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parsetstamp();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parsezone_connect_pads();
                          if (s7 === peg$FAILED) {
                            s7 = peg$parsezone_hatch();
                            if (s7 === peg$FAILED) {
                              s7 = peg$parsezone_fill();
                              if (s7 === peg$FAILED) {
                                s7 = peg$parsezone_keepout();
                                if (s7 === peg$FAILED) {
                                  s7 = peg$parsepolygon();
                                  if (s7 === peg$FAILED) {
                                    s7 = peg$parsefill_segments();
                                    if (s7 === peg$FAILED) {
                                      s7 = peg$parseuuid();
                                      if (s7 === peg$FAILED) {
                                        s7 = peg$parsename();
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s6;
                      s7 = peg$c323(s3, s7);
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c348(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsefill_segments() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 13) === peg$c354) {
              s3 = peg$c354;
              peg$currPos += 13;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c355);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parsepts();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    peg$savedPos = s6;
                    s7 = peg$c356(s3, s7);
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                if (s6 !== peg$FAILED) {
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$currPos;
                    s7 = peg$parsepts();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s6;
                        s7 = peg$c356(s3, s7);
                        s6 = s7;
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  }
                } else {
                  s5 = peg$FAILED;
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c357(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsezone_param() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$currPos;
            if (input.substr(peg$currPos, 8) === peg$c358) {
              s4 = peg$c358;
              peg$currPos += 8;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c359);
              }
            }
            if (s4 === peg$FAILED) {
              if (input.substr(peg$currPos, 3) === peg$c281) {
                s4 = peg$c281;
                peg$currPos += 3;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c282);
                }
              }
              if (s4 === peg$FAILED) {
                if (input.substr(peg$currPos, 6) === peg$c328) {
                  s4 = peg$c328;
                  peg$currPos += 6;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c329);
                  }
                }
                if (s4 === peg$FAILED) {
                  if (input.substr(peg$currPos, 8) === peg$c360) {
                    s4 = peg$c360;
                    peg$currPos += 8;
                  } else {
                    s4 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c361);
                    }
                  }
                  if (s4 === peg$FAILED) {
                    if (input.substr(peg$currPos, 13) === peg$c362) {
                      s4 = peg$c362;
                      peg$currPos += 13;
                    } else {
                      s4 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c363);
                      }
                    }
                    if (s4 === peg$FAILED) {
                      if (input.substr(peg$currPos, 22) === peg$c89) {
                        s4 = peg$c89;
                        peg$currPos += 22;
                      } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c90);
                        }
                      }
                    }
                  }
                }
              }
            }
            if (s4 !== peg$FAILED) {
              s3 = input.substring(s3, peg$currPos);
            } else {
              s3 = s4;
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$currPos;
                s6 = peg$parsestring();
                if (s6 === peg$FAILED) {
                  s6 = peg$parsesymbol();
                  if (s6 === peg$FAILED) {
                    s6 = peg$parsenumber();
                  }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s5;
                    s6 = peg$c77(s3, s6);
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c364(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsezone_hatch() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c365) {
              s3 = peg$c365;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c366);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.substr(peg$currPos, 4) === peg$c367) {
                  s5 = peg$c367;
                  peg$currPos += 4;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c368);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 4) === peg$c369) {
                    s5 = peg$c369;
                    peg$currPos += 4;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c370);
                    }
                  }
                  if (s5 === peg$FAILED) {
                    if (input.substr(peg$currPos, 4) === peg$c371) {
                      s5 = peg$c371;
                      peg$currPos += 4;
                    } else {
                      s5 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c372);
                      }
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsenumber();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                          s9 = peg$c5;
                          peg$currPos++;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c6);
                          }
                        }
                        if (s9 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c373(s3, s5, s7);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsezone_fill() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c374) {
              s3 = peg$c374;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c375);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$currPos;
                if (input.substr(peg$currPos, 3) === peg$c376) {
                  s6 = peg$c376;
                  peg$currPos += 3;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c377);
                  }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    s6 = [s6, s7];
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
                if (s5 === peg$FAILED) {
                  s5 = null;
                }
                if (s5 !== peg$FAILED) {
                  s6 = [];
                  s7 = peg$currPos;
                  s8 = peg$parsefill_options();
                  if (s8 === peg$FAILED) {
                    s8 = peg$parsefill_mode();
                    if (s8 === peg$FAILED) {
                      s8 = peg$parsefill_smoothing();
                    }
                  }
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parse_();
                    if (s9 !== peg$FAILED) {
                      s8 = [s8, s9];
                      s7 = s8;
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s7;
                    s7 = peg$FAILED;
                  }
                  while (s7 !== peg$FAILED) {
                    s6.push(s7);
                    s7 = peg$currPos;
                    s8 = peg$parsefill_options();
                    if (s8 === peg$FAILED) {
                      s8 = peg$parsefill_mode();
                      if (s8 === peg$FAILED) {
                        s8 = peg$parsefill_smoothing();
                      }
                    }
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parse_();
                      if (s9 !== peg$FAILED) {
                        s8 = [s8, s9];
                        s7 = s8;
                      } else {
                        peg$currPos = s7;
                        s7 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c378(s3, s5, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsefill_mode() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c209) {
              s3 = peg$c209;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c210);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.substr(peg$currPos, 7) === peg$c349) {
                  s5 = peg$c349;
                  peg$currPos += 7;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c350);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 5) === peg$c365) {
                    s5 = peg$c365;
                    peg$currPos += 5;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c366);
                    }
                  }
                  if (s5 === peg$FAILED) {
                    if (input.substr(peg$currPos, 7) === peg$c321) {
                      s5 = peg$c321;
                      peg$currPos += 7;
                    } else {
                      s5 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c322);
                      }
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c379(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsefill_smoothing() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 9) === peg$c380) {
              s3 = peg$c380;
              peg$currPos += 9;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c381);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.substr(peg$currPos, 4) === peg$c367) {
                  s5 = peg$c367;
                  peg$currPos += 4;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c368);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 7) === peg$c382) {
                    s5 = peg$c382;
                    peg$currPos += 7;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c383);
                    }
                  }
                  if (s5 === peg$FAILED) {
                    if (input.substr(peg$currPos, 6) === peg$c384) {
                      s5 = peg$c384;
                      peg$currPos += 6;
                    } else {
                      s5 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c385);
                      }
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c379(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsefill_options() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 15) === peg$c386) {
              s3 = peg$c386;
              peg$currPos += 15;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c387);
              }
            }
            if (s3 === peg$FAILED) {
              if (input.substr(peg$currPos, 9) === peg$c388) {
                s3 = peg$c388;
                peg$currPos += 9;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c389);
                }
              }
              if (s3 === peg$FAILED) {
                if (input.substr(peg$currPos, 17) === peg$c390) {
                  s3 = peg$c390;
                  peg$currPos += 17;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c391);
                  }
                }
                if (s3 === peg$FAILED) {
                  if (input.substr(peg$currPos, 21) === peg$c392) {
                    s3 = peg$c392;
                    peg$currPos += 21;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c393);
                    }
                  }
                  if (s3 === peg$FAILED) {
                    if (input.substr(peg$currPos, 21) === peg$c394) {
                      s3 = peg$c394;
                      peg$currPos += 21;
                    } else {
                      s3 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c395);
                      }
                    }
                    if (s3 === peg$FAILED) {
                      if (input.substr(peg$currPos, 12) === peg$c396) {
                        s3 = peg$c396;
                        peg$currPos += 12;
                      } else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c397);
                        }
                      }
                      if (s3 === peg$FAILED) {
                        if (input.substr(peg$currPos, 11) === peg$c398) {
                          s3 = peg$c398;
                          peg$currPos += 11;
                        } else {
                          s3 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c399);
                          }
                        }
                        if (s3 === peg$FAILED) {
                          if (input.substr(peg$currPos, 20) === peg$c400) {
                            s3 = peg$c400;
                            peg$currPos += 20;
                          } else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c401);
                            }
                          }
                          if (s3 === peg$FAILED) {
                            if (input.substr(peg$currPos, 6) === peg$c402) {
                              s3 = peg$c402;
                              peg$currPos += 6;
                            } else {
                              s3 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c403);
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c357(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsezone_keepout() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c404) {
              s3 = peg$c404;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c405);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 40) {
                  s7 = peg$c0;
                  peg$currPos++;
                } else {
                  s7 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c1);
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    if (input.substr(peg$currPos, 6) === peg$c15) {
                      s9 = peg$c15;
                      peg$currPos += 6;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c16);
                      }
                    }
                    if (s9 === peg$FAILED) {
                      if (input.substr(peg$currPos, 4) === peg$c406) {
                        s9 = peg$c406;
                        peg$currPos += 4;
                      } else {
                        s9 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c407);
                        }
                      }
                      if (s9 === peg$FAILED) {
                        if (input.substr(peg$currPos, 10) === peg$c408) {
                          s9 = peg$c408;
                          peg$currPos += 10;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c409);
                          }
                        }
                        if (s9 === peg$FAILED) {
                          if (input.substr(peg$currPos, 4) === peg$c410) {
                            s9 = peg$c410;
                            peg$currPos += 4;
                          } else {
                            s9 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c411);
                            }
                          }
                          if (s9 === peg$FAILED) {
                            if (input.substr(peg$currPos, 10) === peg$c412) {
                              s9 = peg$c412;
                              peg$currPos += 10;
                            } else {
                              s9 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c413);
                              }
                            }
                          }
                        }
                      }
                    }
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parse_();
                      if (s10 !== peg$FAILED) {
                        if (input.substr(peg$currPos, 7) === peg$c414) {
                          s11 = peg$c414;
                          peg$currPos += 7;
                        } else {
                          s11 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c415);
                          }
                        }
                        if (s11 === peg$FAILED) {
                          if (input.substr(peg$currPos, 11) === peg$c416) {
                            s11 = peg$c416;
                            peg$currPos += 11;
                          } else {
                            s11 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c417);
                            }
                          }
                        }
                        if (s11 !== peg$FAILED) {
                          s12 = peg$parse_();
                          if (s12 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 41) {
                              s13 = peg$c5;
                              peg$currPos++;
                            } else {
                              s13 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c6);
                              }
                            }
                            if (s13 !== peg$FAILED) {
                              s14 = peg$parse_();
                              if (s14 !== peg$FAILED) {
                                peg$savedPos = s6;
                                s7 = peg$c418(s3, s9, s11);
                                s6 = s7;
                              } else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s6;
                              s6 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s6;
                          s6 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  if (input.charCodeAt(peg$currPos) === 40) {
                    s7 = peg$c0;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c1);
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      if (input.substr(peg$currPos, 6) === peg$c15) {
                        s9 = peg$c15;
                        peg$currPos += 6;
                      } else {
                        s9 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c16);
                        }
                      }
                      if (s9 === peg$FAILED) {
                        if (input.substr(peg$currPos, 4) === peg$c406) {
                          s9 = peg$c406;
                          peg$currPos += 4;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c407);
                          }
                        }
                        if (s9 === peg$FAILED) {
                          if (input.substr(peg$currPos, 10) === peg$c408) {
                            s9 = peg$c408;
                            peg$currPos += 10;
                          } else {
                            s9 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c409);
                            }
                          }
                          if (s9 === peg$FAILED) {
                            if (input.substr(peg$currPos, 4) === peg$c410) {
                              s9 = peg$c410;
                              peg$currPos += 4;
                            } else {
                              s9 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c411);
                              }
                            }
                            if (s9 === peg$FAILED) {
                              if (input.substr(peg$currPos, 10) === peg$c412) {
                                s9 = peg$c412;
                                peg$currPos += 10;
                              } else {
                                s9 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c413);
                                }
                              }
                            }
                          }
                        }
                      }
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parse_();
                        if (s10 !== peg$FAILED) {
                          if (input.substr(peg$currPos, 7) === peg$c414) {
                            s11 = peg$c414;
                            peg$currPos += 7;
                          } else {
                            s11 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c415);
                            }
                          }
                          if (s11 === peg$FAILED) {
                            if (input.substr(peg$currPos, 11) === peg$c416) {
                              s11 = peg$c416;
                              peg$currPos += 11;
                            } else {
                              s11 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c417);
                              }
                            }
                          }
                          if (s11 !== peg$FAILED) {
                            s12 = peg$parse_();
                            if (s12 !== peg$FAILED) {
                              if (input.charCodeAt(peg$currPos) === 41) {
                                s13 = peg$c5;
                                peg$currPos++;
                              } else {
                                s13 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c6);
                                }
                              }
                              if (s13 !== peg$FAILED) {
                                s14 = peg$parse_();
                                if (s14 !== peg$FAILED) {
                                  peg$savedPos = s6;
                                  s7 = peg$c418(s3, s9, s11);
                                  s6 = s7;
                                } else {
                                  peg$currPos = s6;
                                  s6 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s6;
                              s6 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s6;
                          s6 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c419(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsezone_connect_pads() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 12) === peg$c420) {
              s3 = peg$c420;
              peg$currPos += 12;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c421);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$currPos;
                if (input.substr(peg$currPos, 3) === peg$c376) {
                  s6 = peg$c376;
                  peg$currPos += 3;
                } else {
                  s6 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c377);
                  }
                }
                if (s6 === peg$FAILED) {
                  if (input.substr(peg$currPos, 2) === peg$c422) {
                    s6 = peg$c422;
                    peg$currPos += 2;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c423);
                    }
                  }
                  if (s6 === peg$FAILED) {
                    if (input.substr(peg$currPos, 14) === peg$c424) {
                      s6 = peg$c424;
                      peg$currPos += 14;
                    } else {
                      s6 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c425);
                      }
                    }
                  }
                }
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    peg$savedPos = s5;
                    s6 = peg$c426(s3, s6);
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
                if (s5 === peg$FAILED) {
                  s5 = null;
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$currPos;
                  if (input.charCodeAt(peg$currPos) === 40) {
                    s7 = peg$c0;
                    peg$currPos++;
                  } else {
                    s7 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c1);
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      if (input.substr(peg$currPos, 9) === peg$c291) {
                        s9 = peg$c291;
                        peg$currPos += 9;
                      } else {
                        s9 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c292);
                        }
                      }
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parse_();
                        if (s10 !== peg$FAILED) {
                          s11 = peg$parsenumber();
                          if (s11 !== peg$FAILED) {
                            s12 = peg$parse_();
                            if (s12 !== peg$FAILED) {
                              if (input.charCodeAt(peg$currPos) === 41) {
                                s13 = peg$c5;
                                peg$currPos++;
                              } else {
                                s13 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c6);
                                }
                              }
                              if (s13 !== peg$FAILED) {
                                s14 = peg$parse_();
                                if (s14 !== peg$FAILED) {
                                  peg$savedPos = s6;
                                  s7 = peg$c427(s3, s5, s11);
                                  s6 = s7;
                                } else {
                                  peg$currPos = s6;
                                  s6 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s6;
                                s6 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s6;
                              s6 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s6;
                            s6 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s6;
                          s6 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                  if (s6 === peg$FAILED) {
                    s6 = null;
                  }
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c428(s3, s5, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsegenerator() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 9) === peg$c429) {
              s3 = peg$c429;
              peg$currPos += 9;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c430);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsesymbol();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c431(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsegenerator_version() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 17) === peg$c432) {
              s3 = peg$c432;
              peg$currPos += 17;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c433);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsesymbol();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c431(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsehost() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c434) {
              s3 = peg$c434;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c435);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsesymbol();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsestring();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsesymbol();
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                          s9 = peg$c5;
                          peg$currPos++;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c6);
                          }
                        }
                        if (s9 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c436(s5, s7);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseheader() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parsesymbol();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 === peg$FAILED) {
                  s5 = peg$parsesymbol();
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsestring();
                    if (s7 === peg$FAILED) {
                      s7 = peg$currPos;
                      s8 = peg$parsesymbol();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parse_();
                        if (s9 !== peg$FAILED) {
                          s8 = [s8, s9];
                          s7 = s8;
                        } else {
                          peg$currPos = s7;
                          s7 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s7;
                        s7 = peg$FAILED;
                      }
                    }
                    if (s7 === peg$FAILED) {
                      s7 = null;
                    }
                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s8 = peg$c5;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c6);
                        }
                      }
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c437(s3, s5, s7);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseversion() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c438) {
              s3 = peg$c438;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c439);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsedigits();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c440(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsemodule() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseEmptyLine();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseEmptyLine();
        }
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s2 = peg$c0;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c1);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              if (input.substr(peg$currPos, 9) === peg$c441) {
                s4 = peg$c441;
                peg$currPos += 9;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c442);
                }
              }
              if (s4 === peg$FAILED) {
                if (input.substr(peg$currPos, 6) === peg$c443) {
                  s4 = peg$c443;
                  peg$currPos += 6;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c444);
                  }
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsestring();
                  if (s6 === peg$FAILED) {
                    s6 = peg$parsesymbol();
                  }
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();
                    if (s7 !== peg$FAILED) {
                      s8 = [];
                      s9 = peg$currPos;
                      s10 = peg$parsemodule_contents();
                      if (s10 !== peg$FAILED) {
                        s11 = peg$parse_();
                        if (s11 !== peg$FAILED) {
                          s10 = [s10, s11];
                          s9 = s10;
                        } else {
                          peg$currPos = s9;
                          s9 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s9;
                        s9 = peg$FAILED;
                      }
                      while (s9 !== peg$FAILED) {
                        s8.push(s9);
                        s9 = peg$currPos;
                        s10 = peg$parsemodule_contents();
                        if (s10 !== peg$FAILED) {
                          s11 = peg$parse_();
                          if (s11 !== peg$FAILED) {
                            s10 = [s10, s11];
                            s9 = s10;
                          } else {
                            peg$currPos = s9;
                            s9 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s9;
                          s9 = peg$FAILED;
                        }
                      }
                      if (s8 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                          s9 = peg$c5;
                          peg$currPos++;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c6);
                          }
                        }
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parse_();
                          if (s10 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c445(s4, s6, s8);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsemodule_contents() {
        var s0;
        s0 = peg$parseversion();
        if (s0 === peg$FAILED) {
          s0 = peg$parsegenerator();
          if (s0 === peg$FAILED) {
            s0 = peg$parsegenerator_version();
            if (s0 === peg$FAILED) {
              s0 = peg$parsemodule_property();
              if (s0 === peg$FAILED) {
                s0 = peg$parselocked();
                if (s0 === peg$FAILED) {
                  s0 = peg$parseplaced();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parselayer();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parsetedit();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parsetstamp();
                        if (s0 === peg$FAILED) {
                          s0 = peg$parseat();
                          if (s0 === peg$FAILED) {
                            s0 = peg$parsedescr();
                            if (s0 === peg$FAILED) {
                              s0 = peg$parsetags();
                              if (s0 === peg$FAILED) {
                                s0 = peg$parsepath();
                                if (s0 === peg$FAILED) {
                                  s0 = peg$parsecommon_numeric();
                                  if (s0 === peg$FAILED) {
                                    s0 = peg$parsecommon_int();
                                    if (s0 === peg$FAILED) {
                                      s0 = peg$parsemodule_attr();
                                      if (s0 === peg$FAILED) {
                                        s0 = peg$parsefp_text();
                                        if (s0 === peg$FAILED) {
                                          s0 = peg$parsefp_text_box();
                                          if (s0 === peg$FAILED) {
                                            s0 = peg$parsefp_arc();
                                            if (s0 === peg$FAILED) {
                                              s0 = peg$parsefp_circle();
                                              if (s0 === peg$FAILED) {
                                                s0 = peg$parsefp_curve();
                                                if (s0 === peg$FAILED) {
                                                  s0 = peg$parsefp_line();
                                                  if (s0 === peg$FAILED) {
                                                    s0 = peg$parsefp_rect();
                                                    if (s0 === peg$FAILED) {
                                                      s0 = peg$parsefp_poly();
                                                      if (s0 === peg$FAILED) {
                                                        s0 = peg$parsepad();
                                                        if (s0 === peg$FAILED) {
                                                          s0 = peg$parsemodel();
                                                          if (s0 === peg$FAILED) {
                                                            s0 = peg$parsezone();
                                                            if (s0 === peg$FAILED) {
                                                              s0 = peg$parsenet_tie_pad_groups();
                                                              if (s0 === peg$FAILED) {
                                                                s0 = peg$parseprivate_layers();
                                                                if (s0 === peg$FAILED) {
                                                                  s0 = peg$parsedimensions();
                                                                  if (s0 === peg$FAILED) {
                                                                    s0 = peg$parsegroup();
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parselocked() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c446) {
          s1 = peg$c446;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c447);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c448();
        }
        s0 = s1;
        return s0;
      }
      function peg$parseplaced() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c449) {
          s1 = peg$c449;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c450);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c451();
        }
        s0 = s1;
        return s0;
      }
      function peg$parselayer() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c452) {
              s3 = peg$c452;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c453);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 34) {
                  s5 = peg$c35;
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c36);
                  }
                }
                if (s5 === peg$FAILED) {
                  s5 = null;
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parseLAYER();
                  if (s6 === peg$FAILED) {
                    s6 = peg$parsesymbol();
                  }
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 34) {
                      s7 = peg$c35;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c36);
                      }
                    }
                    if (s7 === peg$FAILED) {
                      s7 = null;
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                          s9 = peg$c5;
                          peg$currPos++;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c6);
                          }
                        }
                        if (s9 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c348(s3, s6);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parse_LAYER() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 7) === peg$c454) {
          s1 = peg$c454;
          peg$currPos += 7;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c455);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 7) === peg$c456) {
            s1 = peg$c456;
            peg$currPos += 7;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c457);
            }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c458) {
              s1 = peg$c458;
              peg$currPos += 7;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c459);
              }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 7) === peg$c460) {
                s1 = peg$c460;
                peg$currPos += 7;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c461);
                }
              }
              if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 7) === peg$c462) {
                  s1 = peg$c462;
                  peg$currPos += 7;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c463);
                  }
                }
                if (s1 === peg$FAILED) {
                  if (input.substr(peg$currPos, 7) === peg$c464) {
                    s1 = peg$c464;
                    peg$currPos += 7;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c465);
                    }
                  }
                  if (s1 === peg$FAILED) {
                    if (input.substr(peg$currPos, 6) === peg$c466) {
                      s1 = peg$c466;
                      peg$currPos += 6;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c467);
                      }
                    }
                    if (s1 === peg$FAILED) {
                      if (input.substr(peg$currPos, 6) === peg$c468) {
                        s1 = peg$c468;
                        peg$currPos += 6;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c469);
                        }
                      }
                      if (s1 === peg$FAILED) {
                        if (input.substr(peg$currPos, 5) === peg$c470) {
                          s1 = peg$c470;
                          peg$currPos += 5;
                        } else {
                          s1 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c471);
                          }
                        }
                        if (s1 === peg$FAILED) {
                          if (input.substr(peg$currPos, 5) === peg$c472) {
                            s1 = peg$c472;
                            peg$currPos += 5;
                          } else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c473);
                            }
                          }
                          if (s1 === peg$FAILED) {
                            if (input.substr(peg$currPos, 7) === peg$c474) {
                              s1 = peg$c474;
                              peg$currPos += 7;
                            } else {
                              s1 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c475);
                              }
                            }
                            if (s1 === peg$FAILED) {
                              if (input.substr(peg$currPos, 7) === peg$c476) {
                                s1 = peg$c476;
                                peg$currPos += 7;
                              } else {
                                s1 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c477);
                                }
                              }
                              if (s1 === peg$FAILED) {
                                if (input.substr(peg$currPos, 9) === peg$c478) {
                                  s1 = peg$c478;
                                  peg$currPos += 9;
                                } else {
                                  s1 = peg$FAILED;
                                  if (peg$silentFails === 0) {
                                    peg$fail(peg$c479);
                                  }
                                }
                                if (s1 === peg$FAILED) {
                                  if (input.substr(peg$currPos, 9) === peg$c480) {
                                    s1 = peg$c480;
                                    peg$currPos += 9;
                                  } else {
                                    s1 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                      peg$fail(peg$c481);
                                    }
                                  }
                                  if (s1 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 9) === peg$c482) {
                                      s1 = peg$c482;
                                      peg$currPos += 9;
                                    } else {
                                      s1 = peg$FAILED;
                                      if (peg$silentFails === 0) {
                                        peg$fail(peg$c483);
                                      }
                                    }
                                    if (s1 === peg$FAILED) {
                                      if (input.substr(peg$currPos, 9) === peg$c484) {
                                        s1 = peg$c484;
                                        peg$currPos += 9;
                                      } else {
                                        s1 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                          peg$fail(peg$c485);
                                        }
                                      }
                                      if (s1 === peg$FAILED) {
                                        if (input.substr(peg$currPos, 9) === peg$c486) {
                                          s1 = peg$c486;
                                          peg$currPos += 9;
                                        } else {
                                          s1 = peg$FAILED;
                                          if (peg$silentFails === 0) {
                                            peg$fail(peg$c487);
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c488(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parseLAYER() {
        var s0;
        s0 = peg$parse_LAYER();
        if (s0 === peg$FAILED) {
          s0 = peg$parseCU_LAYER();
        }
        return s0;
      }
      function peg$parsetedit() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c489) {
              s3 = peg$c489;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c490);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsehex();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c491(s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsetstamp() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c492) {
              s3 = peg$c492;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c493);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 === peg$FAILED) {
                  s5 = peg$parsesymbol();
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c494(s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseeffects() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c495) {
              s3 = peg$c495;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c496);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parsefont();
                if (s7 === peg$FAILED) {
                  s7 = peg$parsejustify();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsehide();
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parsefont();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsejustify();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsehide();
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c497(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsefont() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c498) {
              s3 = peg$c498;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c499);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parsesize();
                if (s7 === peg$FAILED) {
                  s7 = peg$parsethickness();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsebold_prop();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parseitalic_prop();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parseitalic();
                      }
                    }
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parsesize();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsethickness();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsebold_prop();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parseitalic_prop();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parseitalic();
                        }
                      }
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c500(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsethickness() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 9) === peg$c11) {
              s3 = peg$c11;
              peg$currPos += 9;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c12);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c204(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsebold() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c501) {
          s1 = peg$c501;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c502);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c503(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsebold_prop() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c501) {
              s3 = peg$c501;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c502);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c376) {
                  s5 = peg$c376;
                  peg$currPos += 3;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c377);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 2) === peg$c422) {
                    s5 = peg$c422;
                    peg$currPos += 2;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c423);
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c504(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseitalic_prop() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c505) {
              s3 = peg$c505;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c506);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c376) {
                  s5 = peg$c376;
                  peg$currPos += 3;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c377);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 2) === peg$c422) {
                    s5 = peg$c422;
                    peg$currPos += 2;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c423);
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c504(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseitalic() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c505) {
          s1 = peg$c505;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c506);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c503(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsejustify() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c507) {
              s3 = peg$c507;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c508);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parseJUSTIFY();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parseJUSTIFY();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c509(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseJUSTIFY() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c510) {
          s1 = peg$c510;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c511);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 5) === peg$c512) {
            s1 = peg$c512;
            peg$currPos += 5;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c513);
            }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c514) {
              s1 = peg$c514;
              peg$currPos += 3;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c515);
              }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 6) === peg$c516) {
                s1 = peg$c516;
                peg$currPos += 6;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c517);
                }
              }
              if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 6) === peg$c271) {
                  s1 = peg$c271;
                  peg$currPos += 6;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c272);
                  }
                }
              }
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c518(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsehide() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c82) {
          s1 = peg$c82;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c83);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c519(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parseborder() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c520) {
              s3 = peg$c520;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c521);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c376) {
                  s5 = peg$c376;
                  peg$currPos += 3;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c377);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 2) === peg$c422) {
                    s5 = peg$c422;
                    peg$currPos += 2;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c423);
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c522(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseunlocked() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 8) === peg$c523) {
              s3 = peg$c523;
              peg$currPos += 8;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c524);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c376) {
                  s5 = peg$c376;
                  peg$currPos += 3;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c377);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 2) === peg$c422) {
                    s5 = peg$c422;
                    peg$currPos += 2;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c423);
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c522(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsehide_prop() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c82) {
              s3 = peg$c82;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c83);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c376) {
                  s5 = peg$c376;
                  peg$currPos += 3;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c377);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 2) === peg$c422) {
                    s5 = peg$c422;
                    peg$currPos += 2;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c423);
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c522(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseremove_unused_layers() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 20) === peg$c525) {
              s3 = peg$c525;
              peg$currPos += 20;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c526);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c376) {
                  s5 = peg$c376;
                  peg$currPos += 3;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c377);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 2) === peg$c422) {
                    s5 = peg$c422;
                    peg$currPos += 2;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c423);
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c522(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsekeep_end_layers() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 15) === peg$c527) {
              s3 = peg$c527;
              peg$currPos += 15;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c528);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c376) {
                  s5 = peg$c376;
                  peg$currPos += 3;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c377);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 2) === peg$c422) {
                    s5 = peg$c422;
                    peg$currPos += 2;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c423);
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c522(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepad_property() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 8) === peg$c529) {
              s3 = peg$c529;
              peg$currPos += 8;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c530);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.substr(peg$currPos, 12) === peg$c531) {
                  s5 = peg$c531;
                  peg$currPos += 12;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c532);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 17) === peg$c533) {
                    s5 = peg$c533;
                    peg$currPos += 17;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c534);
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c535(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsedescr() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c536) {
              s3 = peg$c536;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c537);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 === peg$FAILED) {
                  s5 = peg$parsesymbol();
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c538(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsetags() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c539) {
              s3 = peg$c539;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c540);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsearray();
                if (s5 === peg$FAILED) {
                  s5 = peg$parsestring();
                  if (s5 === peg$FAILED) {
                    s5 = peg$parsesymbol();
                    if (s5 === peg$FAILED) {
                      s5 = peg$parsenumber();
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c541(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepath() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c542) {
              s3 = peg$c542;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c543);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 === peg$FAILED) {
                  s5 = peg$parsesymbol();
                  if (s5 === peg$FAILED) {
                    s5 = peg$parsenumber();
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c541(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsecommon_numeric() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseCOMMON_NUMERIC();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c544(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseCOMMON_NUMERIC() {
        var s0;
        if (input.substr(peg$currPos, 25) === peg$c545) {
          s0 = peg$c545;
          peg$currPos += 25;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c546);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 18) === peg$c547) {
            s0 = peg$c547;
            peg$currPos += 18;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c548);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 19) === peg$c549) {
              s0 = peg$c549;
              peg$currPos += 19;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c550);
              }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 18) === peg$c551) {
                s0 = peg$c551;
                peg$currPos += 18;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c552);
                }
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 13) === peg$c553) {
                  s0 = peg$c553;
                  peg$currPos += 13;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c554);
                  }
                }
                if (s0 === peg$FAILED) {
                  if (input.substr(peg$currPos, 9) === peg$c291) {
                    s0 = peg$c291;
                    peg$currPos += 9;
                  } else {
                    s0 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c292);
                    }
                  }
                  if (s0 === peg$FAILED) {
                    if (input.substr(peg$currPos, 11) === peg$c398) {
                      s0 = peg$c398;
                      peg$currPos += 11;
                    } else {
                      s0 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c399);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parsecommon_int() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parseCOMMON_INT();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c544(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseCOMMON_INT() {
        var s0;
        if (input.substr(peg$currPos, 12) === peg$c555) {
          s0 = peg$c555;
          peg$currPos += 12;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c556);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 16) === peg$c557) {
            s0 = peg$c557;
            peg$currPos += 16;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c558);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 17) === peg$c559) {
              s0 = peg$c559;
              peg$currPos += 17;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c560);
              }
            }
          }
        }
        return s0;
      }
      function peg$parsemodule_attr() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c561) {
              s3 = peg$c561;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c562);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c563) {
                  s5 = peg$c563;
                  peg$currPos += 3;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c564);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 7) === peg$c565) {
                    s5 = peg$c565;
                    peg$currPos += 7;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c566);
                    }
                  }
                  if (s5 === peg$FAILED) {
                    if (input.substr(peg$currPos, 12) === peg$c567) {
                      s5 = peg$c567;
                      peg$currPos += 12;
                    } else {
                      s5 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c568);
                      }
                    }
                    if (s5 === peg$FAILED) {
                      if (input.substr(peg$currPos, 22) === peg$c569) {
                        s5 = peg$c569;
                        peg$currPos += 22;
                      } else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c570);
                        }
                      }
                      if (s5 === peg$FAILED) {
                        if (input.substr(peg$currPos, 16) === peg$c571) {
                          s5 = peg$c571;
                          peg$currPos += 16;
                        } else {
                          s5 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c572);
                          }
                        }
                      }
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = [];
                    s8 = peg$currPos;
                    s9 = peg$parsearray();
                    if (s9 === peg$FAILED) {
                      s9 = peg$parsestring();
                      if (s9 === peg$FAILED) {
                        s9 = peg$parsesymbol();
                        if (s9 === peg$FAILED) {
                          s9 = peg$parsenumber();
                        }
                      }
                    }
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parse_();
                      if (s10 !== peg$FAILED) {
                        peg$savedPos = s8;
                        s9 = peg$c573(s5, s9);
                        s8 = s9;
                      } else {
                        peg$currPos = s8;
                        s8 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s8;
                      s8 = peg$FAILED;
                    }
                    while (s8 !== peg$FAILED) {
                      s7.push(s8);
                      s8 = peg$currPos;
                      s9 = peg$parsearray();
                      if (s9 === peg$FAILED) {
                        s9 = peg$parsestring();
                        if (s9 === peg$FAILED) {
                          s9 = peg$parsesymbol();
                          if (s9 === peg$FAILED) {
                            s9 = peg$parsenumber();
                          }
                        }
                      }
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parse_();
                        if (s10 !== peg$FAILED) {
                          peg$savedPos = s8;
                          s9 = peg$c573(s5, s9);
                          s8 = s9;
                        } else {
                          peg$currPos = s8;
                          s8 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s8;
                        s8 = peg$FAILED;
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s8 = peg$c5;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c6);
                        }
                      }
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c574(s5, s7);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseprivate_layers() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 14) === peg$c575) {
              s3 = peg$c575;
              peg$currPos += 14;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c576);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c577(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsenet_tie_pad_groups() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 18) === peg$c578) {
              s3 = peg$c578;
              peg$currPos += 18;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c579);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring_list();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c577(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsestring_list() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        s1 = peg$parsestring();
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            s5 = peg$parsestring();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsestring();
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c580(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsemodule_property() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 8) === peg$c529) {
              s3 = peg$c529;
              peg$currPos += 8;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c530);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsestring();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = [];
                        s10 = peg$currPos;
                        s11 = peg$parseat();
                        if (s11 === peg$FAILED) {
                          s11 = peg$parselayer();
                          if (s11 === peg$FAILED) {
                            s11 = peg$parseuuid();
                            if (s11 === peg$FAILED) {
                              s11 = peg$parseeffects();
                              if (s11 === peg$FAILED) {
                                s11 = peg$parseunlocked();
                                if (s11 === peg$FAILED) {
                                  s11 = peg$parsehide_prop();
                                }
                              }
                            }
                          }
                        }
                        if (s11 !== peg$FAILED) {
                          s12 = peg$parse_();
                          if (s12 !== peg$FAILED) {
                            s11 = [s11, s12];
                            s10 = s11;
                          } else {
                            peg$currPos = s10;
                            s10 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s10;
                          s10 = peg$FAILED;
                        }
                        while (s10 !== peg$FAILED) {
                          s9.push(s10);
                          s10 = peg$currPos;
                          s11 = peg$parseat();
                          if (s11 === peg$FAILED) {
                            s11 = peg$parselayer();
                            if (s11 === peg$FAILED) {
                              s11 = peg$parseuuid();
                              if (s11 === peg$FAILED) {
                                s11 = peg$parseeffects();
                                if (s11 === peg$FAILED) {
                                  s11 = peg$parseunlocked();
                                  if (s11 === peg$FAILED) {
                                    s11 = peg$parsehide_prop();
                                  }
                                }
                              }
                            }
                          }
                          if (s11 !== peg$FAILED) {
                            s12 = peg$parse_();
                            if (s12 !== peg$FAILED) {
                              s11 = [s11, s12];
                              s10 = s11;
                            } else {
                              peg$currPos = s10;
                              s10 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s10;
                            s10 = peg$FAILED;
                          }
                        }
                        if (s9 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 41) {
                            s10 = peg$c5;
                            peg$currPos++;
                          } else {
                            s10 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c6);
                            }
                          }
                          if (s10 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c581(s5, s7, s9);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsefp_text() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c582) {
              s3 = peg$c582;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c583);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.substr(peg$currPos, 9) === peg$c584) {
                  s5 = peg$c584;
                  peg$currPos += 9;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c585);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 5) === peg$c586) {
                    s5 = peg$c586;
                    peg$currPos += 5;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c587);
                    }
                  }
                  if (s5 === peg$FAILED) {
                    if (input.substr(peg$currPos, 4) === peg$c79) {
                      s5 = peg$c79;
                      peg$currPos += 4;
                    } else {
                      s5 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c80);
                      }
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsestring();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsesymbol();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parsenumber();
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parseat();
                        if (s9 === peg$FAILED) {
                          s9 = null;
                        }
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parse_();
                          if (s10 !== peg$FAILED) {
                            s11 = [];
                            s12 = peg$currPos;
                            s13 = peg$parselayer();
                            if (s13 === peg$FAILED) {
                              s13 = peg$parsehide();
                              if (s13 === peg$FAILED) {
                                s13 = peg$parseeffects();
                                if (s13 === peg$FAILED) {
                                  s13 = peg$parsetstamp();
                                  if (s13 === peg$FAILED) {
                                    s13 = peg$parseuuid();
                                    if (s13 === peg$FAILED) {
                                      s13 = peg$parseunlocked();
                                      if (s13 === peg$FAILED) {
                                        s13 = peg$parsehide_prop();
                                      }
                                    }
                                  }
                                }
                              }
                            }
                            if (s13 !== peg$FAILED) {
                              s14 = peg$parse_();
                              if (s14 !== peg$FAILED) {
                                s13 = [s13, s14];
                                s12 = s13;
                              } else {
                                peg$currPos = s12;
                                s12 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s12;
                              s12 = peg$FAILED;
                            }
                            while (s12 !== peg$FAILED) {
                              s11.push(s12);
                              s12 = peg$currPos;
                              s13 = peg$parselayer();
                              if (s13 === peg$FAILED) {
                                s13 = peg$parsehide();
                                if (s13 === peg$FAILED) {
                                  s13 = peg$parseeffects();
                                  if (s13 === peg$FAILED) {
                                    s13 = peg$parsetstamp();
                                    if (s13 === peg$FAILED) {
                                      s13 = peg$parseuuid();
                                      if (s13 === peg$FAILED) {
                                        s13 = peg$parseunlocked();
                                        if (s13 === peg$FAILED) {
                                          s13 = peg$parsehide_prop();
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                              if (s13 !== peg$FAILED) {
                                s14 = peg$parse_();
                                if (s14 !== peg$FAILED) {
                                  s13 = [s13, s14];
                                  s12 = s13;
                                } else {
                                  peg$currPos = s12;
                                  s12 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s12;
                                s12 = peg$FAILED;
                              }
                            }
                            if (s11 !== peg$FAILED) {
                              if (input.charCodeAt(peg$currPos) === 41) {
                                s12 = peg$c5;
                                peg$currPos++;
                              } else {
                                s12 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c6);
                                }
                              }
                              if (s12 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c588(s3, s5, s7, s9, s11);
                                s0 = s1;
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsefp_text_box() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 11) === peg$c589) {
              s3 = peg$c589;
              peg$currPos += 11;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c590);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 === peg$FAILED) {
                  s5 = peg$parsesymbol();
                  if (s5 === peg$FAILED) {
                    s5 = peg$parsenumber();
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsestart();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parseend();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parse_();
                          if (s10 !== peg$FAILED) {
                            s11 = [];
                            s12 = peg$currPos;
                            s13 = peg$parselayer();
                            if (s13 === peg$FAILED) {
                              s13 = peg$parsehide();
                              if (s13 === peg$FAILED) {
                                s13 = peg$parseeffects();
                                if (s13 === peg$FAILED) {
                                  s13 = peg$parsetstamp();
                                  if (s13 === peg$FAILED) {
                                    s13 = peg$parseuuid();
                                    if (s13 === peg$FAILED) {
                                      s13 = peg$parseunlocked();
                                      if (s13 === peg$FAILED) {
                                        s13 = peg$parseborder();
                                        if (s13 === peg$FAILED) {
                                          s13 = peg$parsestroke();
                                          if (s13 === peg$FAILED) {
                                            s13 = peg$parsehide_prop();
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                            if (s13 !== peg$FAILED) {
                              s14 = peg$parse_();
                              if (s14 !== peg$FAILED) {
                                s13 = [s13, s14];
                                s12 = s13;
                              } else {
                                peg$currPos = s12;
                                s12 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s12;
                              s12 = peg$FAILED;
                            }
                            while (s12 !== peg$FAILED) {
                              s11.push(s12);
                              s12 = peg$currPos;
                              s13 = peg$parselayer();
                              if (s13 === peg$FAILED) {
                                s13 = peg$parsehide();
                                if (s13 === peg$FAILED) {
                                  s13 = peg$parseeffects();
                                  if (s13 === peg$FAILED) {
                                    s13 = peg$parsetstamp();
                                    if (s13 === peg$FAILED) {
                                      s13 = peg$parseuuid();
                                      if (s13 === peg$FAILED) {
                                        s13 = peg$parseunlocked();
                                        if (s13 === peg$FAILED) {
                                          s13 = peg$parseborder();
                                          if (s13 === peg$FAILED) {
                                            s13 = peg$parsestroke();
                                            if (s13 === peg$FAILED) {
                                              s13 = peg$parsehide_prop();
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                              if (s13 !== peg$FAILED) {
                                s14 = peg$parse_();
                                if (s14 !== peg$FAILED) {
                                  s13 = [s13, s14];
                                  s12 = s13;
                                } else {
                                  peg$currPos = s12;
                                  s12 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s12;
                                s12 = peg$FAILED;
                              }
                            }
                            if (s11 !== peg$FAILED) {
                              if (input.charCodeAt(peg$currPos) === 41) {
                                s12 = peg$c5;
                                peg$currPos++;
                              } else {
                                s12 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c6);
                                }
                              }
                              if (s12 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c591(s3, s5, s7, s9, s11);
                                s0 = s1;
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsefp_arc() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c592) {
              s3 = peg$c592;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c593);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestart();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$currPos;
                    s8 = peg$parsemid();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parse_();
                      if (s9 !== peg$FAILED) {
                        s8 = [s8, s9];
                        s7 = s8;
                      } else {
                        peg$currPos = s7;
                        s7 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                    if (s7 === peg$FAILED) {
                      s7 = null;
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parseend();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parse_();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$currPos;
                          s11 = peg$parseangle();
                          if (s11 !== peg$FAILED) {
                            s12 = peg$parse_();
                            if (s12 !== peg$FAILED) {
                              s11 = [s11, s12];
                              s10 = s11;
                            } else {
                              peg$currPos = s10;
                              s10 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s10;
                            s10 = peg$FAILED;
                          }
                          if (s10 === peg$FAILED) {
                            s10 = null;
                          }
                          if (s10 !== peg$FAILED) {
                            s11 = peg$parsefp_generics();
                            if (s11 !== peg$FAILED) {
                              if (input.charCodeAt(peg$currPos) === 41) {
                                s12 = peg$c5;
                                peg$currPos++;
                              } else {
                                s12 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c6);
                                }
                              }
                              if (s12 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c594(s3, s5, s7, s8, s10, s11);
                                s0 = s1;
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsefp_circle() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 9) === peg$c595) {
              s3 = peg$c595;
              peg$currPos += 9;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c596);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsecenter();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseend();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parsefp_generics();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parse_();
                          if (s10 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 41) {
                              s11 = peg$c5;
                              peg$currPos++;
                            } else {
                              s11 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c6);
                              }
                            }
                            if (s11 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c597(s3, s5, s7, s9);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsefp_curve() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 8) === peg$c598) {
              s3 = peg$c598;
              peg$currPos += 8;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c599);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsecurve_points();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsefp_generics();
                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s8 = peg$c5;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c6);
                        }
                      }
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c600(s3, s5, s7);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsefp_line() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c601) {
              s3 = peg$c601;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c602);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestart();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseend();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parsefp_generics();
                        if (s9 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 41) {
                            s10 = peg$c5;
                            peg$currPos++;
                          } else {
                            s10 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c6);
                            }
                          }
                          if (s10 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c603(s3, s5, s7, s9);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsefp_rect() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c604) {
              s3 = peg$c604;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c605);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestart();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseend();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parsefp_generics();
                        if (s9 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 41) {
                            s10 = peg$c5;
                            peg$currPos++;
                          } else {
                            s10 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c6);
                            }
                          }
                          if (s10 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c603(s3, s5, s7, s9);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsefp_poly() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c606) {
              s3 = peg$c606;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c607);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsepts();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsefp_generics();
                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s8 = peg$c5;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c6);
                        }
                      }
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c608(s3, s5, s7);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsefp_generics() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$parsestroke();
        if (s3 === peg$FAILED) {
          s3 = peg$parselayer();
          if (s3 === peg$FAILED) {
            s3 = peg$parsewidth();
            if (s3 === peg$FAILED) {
              s3 = peg$parsefill();
              if (s3 === peg$FAILED) {
                s3 = peg$parsetstamp();
                if (s3 === peg$FAILED) {
                  s3 = peg$parsestatus();
                  if (s3 === peg$FAILED) {
                    s3 = peg$parseuuid();
                    if (s3 === peg$FAILED) {
                      s3 = peg$parseunlocked();
                    }
                  }
                }
              }
            }
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$parsestroke();
          if (s3 === peg$FAILED) {
            s3 = peg$parselayer();
            if (s3 === peg$FAILED) {
              s3 = peg$parsewidth();
              if (s3 === peg$FAILED) {
                s3 = peg$parsefill();
                if (s3 === peg$FAILED) {
                  s3 = peg$parsetstamp();
                  if (s3 === peg$FAILED) {
                    s3 = peg$parsestatus();
                    if (s3 === peg$FAILED) {
                      s3 = peg$parseuuid();
                      if (s3 === peg$FAILED) {
                        s3 = peg$parseunlocked();
                      }
                    }
                  }
                }
              }
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c609(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsepad() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c610) {
              s3 = peg$c610;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c611);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 === peg$FAILED) {
                  s5 = peg$parsesymbol();
                }
                if (s5 === peg$FAILED) {
                  s5 = null;
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsepad_type();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parsepad_shape();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parse_();
                          if (s10 !== peg$FAILED) {
                            s11 = peg$currPos;
                            s12 = peg$parselocked();
                            if (s12 !== peg$FAILED) {
                              s13 = peg$parse_();
                              if (s13 !== peg$FAILED) {
                                s12 = [s12, s13];
                                s11 = s12;
                              } else {
                                peg$currPos = s11;
                                s11 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s11;
                              s11 = peg$FAILED;
                            }
                            if (s11 === peg$FAILED) {
                              s11 = null;
                            }
                            if (s11 !== peg$FAILED) {
                              s12 = [];
                              s13 = peg$currPos;
                              s14 = peg$parsepad_attr();
                              if (s14 !== peg$FAILED) {
                                s15 = peg$parse_();
                                if (s15 !== peg$FAILED) {
                                  s14 = [s14, s15];
                                  s13 = s14;
                                } else {
                                  peg$currPos = s13;
                                  s13 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s13;
                                s13 = peg$FAILED;
                              }
                              while (s13 !== peg$FAILED) {
                                s12.push(s13);
                                s13 = peg$currPos;
                                s14 = peg$parsepad_attr();
                                if (s14 !== peg$FAILED) {
                                  s15 = peg$parse_();
                                  if (s15 !== peg$FAILED) {
                                    s14 = [s14, s15];
                                    s13 = s14;
                                  } else {
                                    peg$currPos = s13;
                                    s13 = peg$FAILED;
                                  }
                                } else {
                                  peg$currPos = s13;
                                  s13 = peg$FAILED;
                                }
                              }
                              if (s12 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 41) {
                                  s13 = peg$c5;
                                  peg$currPos++;
                                } else {
                                  s13 = peg$FAILED;
                                  if (peg$silentFails === 0) {
                                    peg$fail(peg$c6);
                                  }
                                }
                                if (s13 !== peg$FAILED) {
                                  peg$savedPos = s0;
                                  s1 = peg$c612(s5, s7, s9, s12);
                                  s0 = s1;
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepad_type() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 9) === peg$c613) {
          s1 = peg$c613;
          peg$currPos += 9;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c614);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 12) === peg$c615) {
            s1 = peg$c615;
            peg$currPos += 12;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c616);
            }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c563) {
              s1 = peg$c563;
              peg$currPos += 3;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c564);
              }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 7) === peg$c617) {
                s1 = peg$c617;
                peg$currPos += 7;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c618);
                }
              }
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c619(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsepad_shape() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c620) {
          s1 = peg$c620;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c621);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c622) {
            s1 = peg$c622;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c623);
            }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c624) {
              s1 = peg$c624;
              peg$currPos += 4;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c625);
              }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 9) === peg$c626) {
                s1 = peg$c626;
                peg$currPos += 9;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c627);
                }
              }
              if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 9) === peg$c628) {
                  s1 = peg$c628;
                  peg$currPos += 9;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c629);
                  }
                }
                if (s1 === peg$FAILED) {
                  if (input.substr(peg$currPos, 6) === peg$c630) {
                    s1 = peg$c630;
                    peg$currPos += 6;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c631);
                    }
                  }
                }
              }
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c632(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parselocked_group() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c446) {
              s3 = peg$c446;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c447);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 41) {
                  s5 = peg$c5;
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c6);
                  }
                }
                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c448();
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepad_attr() {
        var s0;
        s0 = peg$parsesize();
        if (s0 === peg$FAILED) {
          s0 = peg$parselocked_group();
          if (s0 === peg$FAILED) {
            s0 = peg$parseat();
            if (s0 === peg$FAILED) {
              s0 = peg$parserect_delta();
              if (s0 === peg$FAILED) {
                s0 = peg$parsedrill();
                if (s0 === peg$FAILED) {
                  s0 = peg$parselayers();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parsetstamp();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parsenet();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parsecommon_numeric();
                        if (s0 === peg$FAILED) {
                          s0 = peg$parsecommon_int();
                          if (s0 === peg$FAILED) {
                            s0 = peg$parsepad_numeric();
                            if (s0 === peg$FAILED) {
                              s0 = peg$parsechamfer();
                              if (s0 === peg$FAILED) {
                                s0 = peg$parsepad_options();
                                if (s0 === peg$FAILED) {
                                  s0 = peg$parseprimitives();
                                  if (s0 === peg$FAILED) {
                                    s0 = peg$parseuuid();
                                    if (s0 === peg$FAILED) {
                                      s0 = peg$parseremove_unused_layers();
                                      if (s0 === peg$FAILED) {
                                        s0 = peg$parsekeep_end_layers();
                                        if (s0 === peg$FAILED) {
                                          s0 = peg$parsepad_property();
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parsechamfer() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c382) {
              s3 = peg$c382;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c383);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsechamfer_options();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c633(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsechamfer_options() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 8) === peg$c634) {
          s1 = peg$c634;
          peg$currPos += 8;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c635);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 9) === peg$c636) {
            s1 = peg$c636;
            peg$currPos += 9;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c637);
            }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 11) === peg$c638) {
              s1 = peg$c638;
              peg$currPos += 11;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c639);
              }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 12) === peg$c640) {
                s1 = peg$c640;
                peg$currPos += 12;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c641);
                }
              }
            }
          }
        }
        if (s1 === peg$FAILED) {
          s1 = null;
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$currPos;
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            if (input.substr(peg$currPos, 8) === peg$c634) {
              s5 = peg$c634;
              peg$currPos += 8;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c635);
              }
            }
            if (s5 === peg$FAILED) {
              if (input.substr(peg$currPos, 9) === peg$c636) {
                s5 = peg$c636;
                peg$currPos += 9;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c637);
                }
              }
              if (s5 === peg$FAILED) {
                if (input.substr(peg$currPos, 11) === peg$c638) {
                  s5 = peg$c638;
                  peg$currPos += 11;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c639);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 12) === peg$c640) {
                    s5 = peg$c640;
                    peg$currPos += 12;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c641);
                    }
                  }
                }
              }
            }
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$currPos;
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              if (input.substr(peg$currPos, 8) === peg$c634) {
                s5 = peg$c634;
                peg$currPos += 8;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c635);
                }
              }
              if (s5 === peg$FAILED) {
                if (input.substr(peg$currPos, 9) === peg$c636) {
                  s5 = peg$c636;
                  peg$currPos += 9;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c637);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 11) === peg$c638) {
                    s5 = peg$c638;
                    peg$currPos += 11;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c639);
                    }
                  }
                  if (s5 === peg$FAILED) {
                    if (input.substr(peg$currPos, 12) === peg$c640) {
                      s5 = peg$c640;
                      peg$currPos += 12;
                    } else {
                      s5 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c641);
                      }
                    }
                  }
                }
              }
              if (s5 !== peg$FAILED) {
                s4 = [s4, s5];
                s3 = s4;
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c642(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsesize1() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c643) {
              s3 = peg$c643;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c644);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c204(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsesize() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c643) {
              s3 = peg$c643;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c644);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsenumber();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                          s9 = peg$c5;
                          peg$currPos++;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c6);
                          }
                        }
                        if (s9 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c645(s3, s5, s7);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseat() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c646) {
              s3 = peg$c646;
              peg$currPos += 2;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c647);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsenumber();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$currPos;
                        s10 = peg$parsenumber();
                        if (s10 !== peg$FAILED) {
                          s11 = peg$parse_();
                          if (s11 !== peg$FAILED) {
                            s10 = [s10, s11];
                            s9 = s10;
                          } else {
                            peg$currPos = s9;
                            s9 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s9;
                          s9 = peg$FAILED;
                        }
                        if (s9 === peg$FAILED) {
                          s9 = null;
                        }
                        if (s9 !== peg$FAILED) {
                          s10 = peg$currPos;
                          if (input.substr(peg$currPos, 8) === peg$c523) {
                            s11 = peg$c523;
                            peg$currPos += 8;
                          } else {
                            s11 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c524);
                            }
                          }
                          if (s11 !== peg$FAILED) {
                            s12 = peg$parse_();
                            if (s12 !== peg$FAILED) {
                              s11 = [s11, s12];
                              s10 = s11;
                            } else {
                              peg$currPos = s10;
                              s10 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s10;
                            s10 = peg$FAILED;
                          }
                          if (s10 === peg$FAILED) {
                            s10 = null;
                          }
                          if (s10 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 41) {
                              s11 = peg$c5;
                              peg$currPos++;
                            } else {
                              s11 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c6);
                              }
                            }
                            if (s11 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c648(s3, s5, s7, s9, s10);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parserect_delta() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 10) === peg$c649) {
              s3 = peg$c649;
              peg$currPos += 10;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c650);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsenumber();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                          s9 = peg$c5;
                          peg$currPos++;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c6);
                          }
                        }
                        if (s9 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c651(s3, s5, s7);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsedrill() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c346) {
              s3 = peg$c346;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c347);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parseoval();
                if (s7 === peg$FAILED) {
                  s7 = peg$parsenumber();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parseoffset();
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parseoval();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsenumber();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parseoffset();
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c652(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseoval() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c624) {
          s1 = peg$c624;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c625);
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c653(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parseoffset() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c654) {
              s3 = peg$c654;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c655);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsenumber();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                          s9 = peg$c5;
                          peg$currPos++;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c6);
                          }
                        }
                        if (s9 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c656(s3, s5, s7);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parselayers() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c75) {
              s3 = peg$c75;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c76);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parseLAYERS();
                if (s7 === peg$FAILED) {
                  s7 = peg$parsestring();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsesymbol();
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    peg$savedPos = s6;
                    s7 = peg$c4(s3, s7);
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parseLAYERS();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsestring();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsesymbol();
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s6;
                      s7 = peg$c4(s3, s7);
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c204(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepad_numeric() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parsePAD_NUMERIC();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c88(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsePAD_NUMERIC() {
        var s0;
        if (input.substr(peg$currPos, 13) === peg$c657) {
          s0 = peg$c657;
          peg$currPos += 13;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c658);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 16) === peg$c659) {
            s0 = peg$c659;
            peg$currPos += 16;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c660);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.substr(peg$currPos, 10) === peg$c661) {
              s0 = peg$c661;
              peg$currPos += 10;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c662);
              }
            }
            if (s0 === peg$FAILED) {
              if (input.substr(peg$currPos, 20) === peg$c663) {
                s0 = peg$c663;
                peg$currPos += 20;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c664);
                }
              }
              if (s0 === peg$FAILED) {
                if (input.substr(peg$currPos, 20) === peg$c400) {
                  s0 = peg$c400;
                  peg$currPos += 20;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c401);
                  }
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parsepad_options() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c665) {
              s3 = peg$c665;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c666);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parseoption_anchor();
                if (s7 === peg$FAILED) {
                  s7 = peg$parseoption_clearance();
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    peg$savedPos = s6;
                    s7 = peg$c4(s3, s7);
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parseoption_anchor();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parseoption_clearance();
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s6;
                      s7 = peg$c4(s3, s7);
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c204(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseoption_anchor() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c667) {
              s3 = peg$c667;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c668);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.substr(peg$currPos, 6) === peg$c620) {
                  s5 = peg$c620;
                  peg$currPos += 6;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c621);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 4) === peg$c622) {
                    s5 = peg$c622;
                    peg$currPos += 4;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c623);
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c669(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseoption_clearance() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 9) === peg$c291) {
              s3 = peg$c291;
              peg$currPos += 9;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c292);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.substr(peg$currPos, 7) === peg$c670) {
                  s5 = peg$c670;
                  peg$currPos += 7;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c671);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 10) === peg$c672) {
                    s5 = peg$c672;
                    peg$currPos += 10;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c673);
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c674(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseprimitives() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 10) === peg$c675) {
              s3 = peg$c675;
              peg$currPos += 10;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c676);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parseprimitive_shape();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    peg$savedPos = s6;
                    s7 = peg$c677(s3, s7);
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parseprimitive_shape();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s6;
                      s7 = peg$c677(s3, s7);
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c204(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseprimitive_shape() {
        var s0;
        s0 = peg$parsegr_arc();
        if (s0 === peg$FAILED) {
          s0 = peg$parsegr_line();
          if (s0 === peg$FAILED) {
            s0 = peg$parsegr_rect();
            if (s0 === peg$FAILED) {
              s0 = peg$parsegr_circle();
              if (s0 === peg$FAILED) {
                s0 = peg$parsegr_poly();
                if (s0 === peg$FAILED) {
                  s0 = peg$parsegr_curve();
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parsegr_arc() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c678) {
              s3 = peg$c678;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c679);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_start();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsemid();
                    if (s7 === peg$FAILED) {
                      s7 = null;
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parseend();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parse_();
                          if (s10 !== peg$FAILED) {
                            s11 = peg$parsegr_generics();
                            if (s11 !== peg$FAILED) {
                              if (input.charCodeAt(peg$currPos) === 41) {
                                s12 = peg$c5;
                                peg$currPos++;
                              } else {
                                s12 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c6);
                                }
                              }
                              if (s12 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c680(s3, s5, s7, s9, s11);
                                s0 = s1;
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsegr_circle() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 9) === peg$c681) {
              s3 = peg$c681;
              peg$currPos += 9;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c682);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsecenter();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseend();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parsegr_generics();
                        if (s9 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 41) {
                            s10 = peg$c5;
                            peg$currPos++;
                          } else {
                            s10 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c6);
                            }
                          }
                          if (s10 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c683(s3, s5, s7, s9);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsegr_curve() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 8) === peg$c684) {
              s3 = peg$c684;
              peg$currPos += 8;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c685);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsecurve_points();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsegr_generics();
                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s8 = peg$c5;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c6);
                        }
                      }
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c600(s3, s5, s7);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsecurve_points() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c686) {
              s3 = peg$c686;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c687);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsexy();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsexy();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parsexy();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parse_();
                          if (s10 !== peg$FAILED) {
                            s11 = peg$parsexy();
                            if (s11 !== peg$FAILED) {
                              s12 = peg$parse_();
                              if (s12 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 41) {
                                  s13 = peg$c5;
                                  peg$currPos++;
                                } else {
                                  s13 = peg$FAILED;
                                  if (peg$silentFails === 0) {
                                    peg$fail(peg$c6);
                                  }
                                }
                                if (s13 !== peg$FAILED) {
                                  peg$savedPos = s0;
                                  s1 = peg$c688(s5, s7, s9, s11);
                                  s0 = s1;
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsegr_line() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c689) {
              s3 = peg$c689;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c690);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_start();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseend();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parsegr_generics();
                        if (s9 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 41) {
                            s10 = peg$c5;
                            peg$currPos++;
                          } else {
                            s10 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c6);
                            }
                          }
                          if (s10 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c691(s3, s5, s7, s9);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsegr_rect() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c692) {
              s3 = peg$c692;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c693);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_start();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseend();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parsegr_generics();
                        if (s9 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 41) {
                            s10 = peg$c5;
                            peg$currPos++;
                          } else {
                            s10 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c6);
                            }
                          }
                          if (s10 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c691(s3, s5, s7, s9);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsegr_poly() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c694) {
              s3 = peg$c694;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c695);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsepts();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsegr_generics();
                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s8 = peg$c5;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c6);
                        }
                      }
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c696(s3, s5, s7);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsegr_text() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c697) {
              s3 = peg$c697;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c698);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 === peg$FAILED) {
                  s5 = peg$parsesymbol();
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseat();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = [];
                        s10 = peg$currPos;
                        s11 = peg$parselayer();
                        if (s11 === peg$FAILED) {
                          s11 = peg$parsetstamp();
                          if (s11 === peg$FAILED) {
                            s11 = peg$parseeffects();
                            if (s11 === peg$FAILED) {
                              s11 = peg$parseuuid();
                            }
                          }
                        }
                        if (s11 !== peg$FAILED) {
                          s12 = peg$parse_();
                          if (s12 !== peg$FAILED) {
                            s11 = [s11, s12];
                            s10 = s11;
                          } else {
                            peg$currPos = s10;
                            s10 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s10;
                          s10 = peg$FAILED;
                        }
                        while (s10 !== peg$FAILED) {
                          s9.push(s10);
                          s10 = peg$currPos;
                          s11 = peg$parselayer();
                          if (s11 === peg$FAILED) {
                            s11 = peg$parsetstamp();
                            if (s11 === peg$FAILED) {
                              s11 = peg$parseeffects();
                              if (s11 === peg$FAILED) {
                                s11 = peg$parseuuid();
                              }
                            }
                          }
                          if (s11 !== peg$FAILED) {
                            s12 = peg$parse_();
                            if (s12 !== peg$FAILED) {
                              s11 = [s11, s12];
                              s10 = s11;
                            } else {
                              peg$currPos = s10;
                              s10 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s10;
                            s10 = peg$FAILED;
                          }
                        }
                        if (s9 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 41) {
                            s10 = peg$c5;
                            peg$currPos++;
                          } else {
                            s10 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c6);
                            }
                          }
                          if (s10 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c699(s3, s5, s7, s9);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsegr_generics() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$currPos;
        s3 = peg$parseangle();
        if (s3 === peg$FAILED) {
          s3 = peg$parselayer();
          if (s3 === peg$FAILED) {
            s3 = peg$parsewidth();
            if (s3 === peg$FAILED) {
              s3 = peg$parsefill();
              if (s3 === peg$FAILED) {
                s3 = peg$parsetstamp();
                if (s3 === peg$FAILED) {
                  s3 = peg$parsestatus();
                  if (s3 === peg$FAILED) {
                    s3 = peg$parseuuid();
                  }
                }
              }
            }
          }
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parse_();
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$currPos;
          s3 = peg$parseangle();
          if (s3 === peg$FAILED) {
            s3 = peg$parselayer();
            if (s3 === peg$FAILED) {
              s3 = peg$parsewidth();
              if (s3 === peg$FAILED) {
                s3 = peg$parsefill();
                if (s3 === peg$FAILED) {
                  s3 = peg$parsetstamp();
                  if (s3 === peg$FAILED) {
                    s3 = peg$parsestatus();
                    if (s3 === peg$FAILED) {
                      s3 = peg$parseuuid();
                    }
                  }
                }
              }
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parse_();
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c609(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsestatus() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c700) {
              s3 = peg$c700;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c701);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsehex();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c348(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsename() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c702) {
              s3 = peg$c702;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c703);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c348(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseuuid() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c704) {
              s3 = peg$c704;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c705);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c348(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsefill() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c374) {
              s3 = peg$c374;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c375);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsesymbol();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c204(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsestroke() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c706) {
              s3 = peg$c706;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c707);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsewidth();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsestroke_type();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                          s9 = peg$c5;
                          peg$currPos++;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c6);
                          }
                        }
                        if (s9 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c708(s3, s5, s7);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsestroke_type() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c709) {
              s3 = peg$c709;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c710);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parseSTROKE_TYPES();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c204(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseSTROKE_TYPES() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c711) {
          s1 = peg$c711;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c712);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 8) === peg$c713) {
            s1 = peg$c713;
            peg$currPos += 8;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c714);
            }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 12) === peg$c715) {
              s1 = peg$c715;
              peg$currPos += 12;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c716);
              }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 3) === peg$c717) {
                s1 = peg$c717;
                peg$currPos += 3;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c718);
                }
              }
              if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 7) === peg$c719) {
                  s1 = peg$c719;
                  peg$currPos += 7;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c720);
                  }
                }
                if (s1 === peg$FAILED) {
                  if (input.substr(peg$currPos, 5) === peg$c721) {
                    s1 = peg$c721;
                    peg$currPos += 5;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c722);
                    }
                  }
                }
              }
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c723(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsewidth() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c724) {
              s3 = peg$c724;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c725);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c204(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseangle() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c726) {
              s3 = peg$c726;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c727);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c204(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsemid() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c728) {
              s3 = peg$c728;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c729);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsex_y();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c78(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsestart() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c730) {
              s3 = peg$c730;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c731);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsex_y();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c78(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsex_y() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parsenumber();
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parsenumber();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c732(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parse_start() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c730) {
              s3 = peg$c730;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c731);
              }
            }
            if (s3 === peg$FAILED) {
              if (input.substr(peg$currPos, 6) === peg$c733) {
                s3 = peg$c733;
                peg$currPos += 6;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c734);
                }
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsex_y();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c735(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsecenter() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c733) {
              s3 = peg$c733;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c734);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsex_y();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c204(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseend() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c736) {
              s3 = peg$c736;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c737);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsex_y();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c204(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepts() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c686) {
              s3 = peg$c686;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c687);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parsexy();
                if (s7 === peg$FAILED) {
                  s7 = peg$parsepointList_arc();
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parsexy();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsepointList_arc();
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c738(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsexy() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c739) {
              s3 = peg$c739;
              peg$currPos += 2;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c740);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsex_y();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c204(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepointList_arc() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c325) {
              s3 = peg$c325;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c326);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsearcPoint();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsearcPoint();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parsearcPoint();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parse_();
                          if (s10 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 41) {
                              s11 = peg$c5;
                              peg$currPos++;
                            } else {
                              s11 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c6);
                              }
                            }
                            if (s11 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c741(s3, s5, s7, s9);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsearcPoint() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c730) {
              s3 = peg$c730;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c731);
              }
            }
            if (s3 === peg$FAILED) {
              if (input.substr(peg$currPos, 3) === peg$c728) {
                s3 = peg$c728;
                peg$currPos += 3;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c729);
                }
              }
              if (s3 === peg$FAILED) {
                if (input.substr(peg$currPos, 3) === peg$c736) {
                  s3 = peg$c736;
                  peg$currPos += 3;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c737);
                  }
                }
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsex_y();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c742(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsedimensions() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 9) === peg$c303) {
              s3 = peg$c303;
              peg$currPos += 9;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c304);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parsedimension_type();
                if (s7 === peg$FAILED) {
                  s7 = peg$parselayer();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parseuuid();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsepts();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parseheight();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parsegr_text();
                          if (s7 === peg$FAILED) {
                            s7 = peg$parseformat();
                            if (s7 === peg$FAILED) {
                              s7 = peg$parsestyle();
                            }
                          }
                        }
                      }
                    }
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parsedimension_type();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parselayer();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parseuuid();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parsepts();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parseheight();
                          if (s7 === peg$FAILED) {
                            s7 = peg$parsegr_text();
                            if (s7 === peg$FAILED) {
                              s7 = peg$parseformat();
                              if (s7 === peg$FAILED) {
                                s7 = peg$parsestyle();
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c743(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsedimension_type() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c709) {
              s3 = peg$c709;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c710);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.substr(peg$currPos, 7) === peg$c744) {
                  s5 = peg$c744;
                  peg$currPos += 7;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c745);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 6) === peg$c746) {
                    s5 = peg$c746;
                    peg$currPos += 6;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c747);
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c748(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseheight() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c749) {
              s3 = peg$c749;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c750);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c348(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseformat() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c751) {
              s3 = peg$c751;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c752);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parseprefix();
                if (s7 === peg$FAILED) {
                  s7 = peg$parsesuffix();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parseunits();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parseunits_format();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parseprecision();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parseoverride_value();
                        }
                      }
                    }
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parseprefix();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsesuffix();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parseunits();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parseunits_format();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parseprecision();
                          if (s7 === peg$FAILED) {
                            s7 = peg$parseoverride_value();
                          }
                        }
                      }
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c753(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseprefix() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c754) {
              s3 = peg$c754;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c755);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c348(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsesuffix() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c756) {
              s3 = peg$c756;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c757);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c348(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseunits() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c758) {
              s3 = peg$c758;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c759);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c348(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseunits_format() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 12) === peg$c760) {
              s3 = peg$c760;
              peg$currPos += 12;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c761);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c348(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseprecision() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 9) === peg$c762) {
              s3 = peg$c762;
              peg$currPos += 9;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c763);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c348(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseoverride_value() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 14) === peg$c764) {
              s3 = peg$c764;
              peg$currPos += 14;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c765);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c348(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsestyle() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c766) {
              s3 = peg$c766;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c767);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parsethickness();
                if (s7 === peg$FAILED) {
                  s7 = peg$parsearrow_length();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsetext_position_mode();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parseextension_height();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parseextension_offset();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parsetext_frame();
                        }
                      }
                    }
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parsethickness();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsearrow_length();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsetext_position_mode();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parseextension_height();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parseextension_offset();
                          if (s7 === peg$FAILED) {
                            s7 = peg$parsetext_frame();
                          }
                        }
                      }
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.substr(peg$currPos, 17) === peg$c768) {
                      s7 = peg$c768;
                      peg$currPos += 17;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c769);
                      }
                    }
                    if (s7 === peg$FAILED) {
                      s7 = null;
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                          s9 = peg$c5;
                          peg$currPos++;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c6);
                          }
                        }
                        if (s9 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c770(s3, s5, s7);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsearrow_length() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 12) === peg$c771) {
              s3 = peg$c771;
              peg$currPos += 12;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c772);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c348(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsetext_position_mode() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 18) === peg$c773) {
              s3 = peg$c773;
              peg$currPos += 18;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c774);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c348(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseextension_height() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 16) === peg$c775) {
              s3 = peg$c775;
              peg$currPos += 16;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c776);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c348(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseextension_offset() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 16) === peg$c777) {
              s3 = peg$c777;
              peg$currPos += 16;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c778);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c348(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsetext_frame() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 10) === peg$c779) {
              s3 = peg$c779;
              peg$currPos += 10;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c780);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c348(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsegroup() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c781) {
              s3 = peg$c781;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c782);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = [];
                    s8 = peg$currPos;
                    s9 = peg$parseuuid();
                    if (s9 === peg$FAILED) {
                      s9 = peg$parsemembers();
                    }
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parse_();
                      if (s10 !== peg$FAILED) {
                        s9 = [s9, s10];
                        s8 = s9;
                      } else {
                        peg$currPos = s8;
                        s8 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s8;
                      s8 = peg$FAILED;
                    }
                    while (s8 !== peg$FAILED) {
                      s7.push(s8);
                      s8 = peg$currPos;
                      s9 = peg$parseuuid();
                      if (s9 === peg$FAILED) {
                        s9 = peg$parsemembers();
                      }
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parse_();
                        if (s10 !== peg$FAILED) {
                          s9 = [s9, s10];
                          s8 = s9;
                        } else {
                          peg$currPos = s8;
                          s8 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s8;
                        s8 = peg$FAILED;
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                          s9 = peg$c5;
                          peg$currPos++;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c6);
                          }
                        }
                        if (s9 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c783(s3, s5, s7);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsemembers() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c784) {
              s3 = peg$c784;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c785);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring_list();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c348(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsemodel() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c786) {
              s3 = peg$c786;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c787);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 === peg$FAILED) {
                  s5 = peg$parsesymbol();
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = [];
                    s8 = peg$currPos;
                    s9 = peg$parsemodel_xyz_attr();
                    if (s9 === peg$FAILED) {
                      s9 = peg$parsehide_prop();
                      if (s9 === peg$FAILED) {
                        s9 = peg$parseopacity();
                      }
                    }
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parse_();
                      if (s10 !== peg$FAILED) {
                        s9 = [s9, s10];
                        s8 = s9;
                      } else {
                        peg$currPos = s8;
                        s8 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s8;
                      s8 = peg$FAILED;
                    }
                    while (s8 !== peg$FAILED) {
                      s7.push(s8);
                      s8 = peg$currPos;
                      s9 = peg$parsemodel_xyz_attr();
                      if (s9 === peg$FAILED) {
                        s9 = peg$parsehide_prop();
                        if (s9 === peg$FAILED) {
                          s9 = peg$parseopacity();
                        }
                      }
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parse_();
                        if (s10 !== peg$FAILED) {
                          s9 = [s9, s10];
                          s8 = s9;
                        } else {
                          peg$currPos = s8;
                          s8 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s8;
                        s8 = peg$FAILED;
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                          s9 = peg$c5;
                          peg$currPos++;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c6);
                          }
                        }
                        if (s9 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c788(s3, s5, s7);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseopacity() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c789) {
              s3 = peg$c789;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c790);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c791(s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsemodel_xyz_attr() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c646) {
              s3 = peg$c646;
              peg$currPos += 2;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c647);
              }
            }
            if (s3 === peg$FAILED) {
              if (input.substr(peg$currPos, 6) === peg$c654) {
                s3 = peg$c654;
                peg$currPos += 6;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c655);
                }
              }
              if (s3 === peg$FAILED) {
                if (input.substr(peg$currPos, 5) === peg$c792) {
                  s3 = peg$c792;
                  peg$currPos += 5;
                } else {
                  s3 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c793);
                  }
                }
                if (s3 === peg$FAILED) {
                  if (input.substr(peg$currPos, 6) === peg$c794) {
                    s3 = peg$c794;
                    peg$currPos += 6;
                  } else {
                    s3 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c795);
                    }
                  }
                }
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsexyz();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c796(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsexyz() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c797) {
              s3 = peg$c797;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c798);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsenumber();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parsenumber();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parse_();
                          if (s10 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 41) {
                              s11 = peg$c5;
                              peg$currPos++;
                            } else {
                              s11 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c6);
                              }
                            }
                            if (s11 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c799(s3, s5, s7, s9);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsestring() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 34) {
          s1 = peg$c35;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c36);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parseDoubleStringCharacter();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parseDoubleStringCharacter();
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 34) {
              s3 = peg$c35;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c36);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c800(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 39) {
            s1 = peg$c801;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c802);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseSingleStringCharacter();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseSingleStringCharacter();
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 39) {
                s3 = peg$c801;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c802);
                }
              }
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c800(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
        return s0;
      }
      function peg$parseDoubleStringCharacter() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 34) {
          s2 = peg$c35;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c36);
          }
        }
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 92) {
            s2 = peg$c803;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c804);
            }
          }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = void 0;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c805);
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c806(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 92) {
            s1 = peg$c803;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c804);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseEscapeSequence();
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c807(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
        return s0;
      }
      function peg$parseSingleStringCharacter() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 39) {
          s2 = peg$c801;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c802);
          }
        }
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 92) {
            s2 = peg$c803;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c804);
            }
          }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = void 0;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c805);
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c806(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 92) {
            s1 = peg$c803;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c804);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseEscapeSequence();
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c807(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
        return s0;
      }
      function peg$parseEscapeSequence() {
        var s0, s1;
        if (input.charCodeAt(peg$currPos) === 39) {
          s0 = peg$c801;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c802);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s0 = peg$c35;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c36);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 92) {
              s0 = peg$c803;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c804);
              }
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 98) {
                s1 = peg$c808;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c809);
                }
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c810();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 102) {
                  s1 = peg$c811;
                  peg$currPos++;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c812);
                  }
                }
                if (s1 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c813();
                }
                s0 = s1;
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  if (input.charCodeAt(peg$currPos) === 110) {
                    s1 = peg$c814;
                    peg$currPos++;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c815);
                    }
                  }
                  if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c816();
                  }
                  s0 = s1;
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 114) {
                      s1 = peg$c817;
                      peg$currPos++;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c818);
                      }
                    }
                    if (s1 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c819();
                    }
                    s0 = s1;
                    if (s0 === peg$FAILED) {
                      s0 = peg$currPos;
                      if (input.charCodeAt(peg$currPos) === 116) {
                        s1 = peg$c820;
                        peg$currPos++;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c821);
                        }
                      }
                      if (s1 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c822();
                      }
                      s0 = s1;
                      if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        if (input.charCodeAt(peg$currPos) === 118) {
                          s1 = peg$c823;
                          peg$currPos++;
                        } else {
                          s1 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c824);
                          }
                        }
                        if (s1 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c825();
                        }
                        s0 = s1;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parsesexp() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s2 = peg$c0;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c1);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              s4 = [];
              s5 = peg$currPos;
              s6 = peg$parseexpression();
              if (s6 !== peg$FAILED) {
                s7 = peg$parse_();
                if (s7 !== peg$FAILED) {
                  s6 = [s6, s7];
                  s5 = s6;
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              } else {
                peg$currPos = s5;
                s5 = peg$FAILED;
              }
              while (s5 !== peg$FAILED) {
                s4.push(s5);
                s5 = peg$currPos;
                s6 = peg$parseexpression();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parse_();
                  if (s7 !== peg$FAILED) {
                    s6 = [s6, s7];
                    s5 = s6;
                  } else {
                    peg$currPos = s5;
                    s5 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s5;
                  s5 = peg$FAILED;
                }
              }
              if (s4 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 41) {
                  s5 = peg$c5;
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c6);
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c826(s4);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseexpression() {
        var s0;
        s0 = peg$parsenumber();
        if (s0 === peg$FAILED) {
          s0 = peg$parsestring();
          if (s0 === peg$FAILED) {
            s0 = peg$parsearray();
            if (s0 === peg$FAILED) {
              s0 = peg$parsesymbol();
              if (s0 === peg$FAILED) {
                s0 = peg$parsesexp();
                if (s0 === peg$FAILED) {
                  s0 = peg$parsehex();
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parsearray() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 91) {
          s1 = peg$c827;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c828);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parsestring();
            if (s3 === peg$FAILED) {
              s3 = peg$parsesymbol();
              if (s3 === peg$FAILED) {
                s3 = peg$parsenumber();
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parsestring();
                if (s7 === peg$FAILED) {
                  s7 = peg$parsesymbol();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsenumber();
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 44) {
                      s9 = peg$c829;
                      peg$currPos++;
                    } else {
                      s9 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c830);
                      }
                    }
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parse_();
                      if (s10 !== peg$FAILED) {
                        s7 = [s7, s8, s9, s10];
                        s6 = s7;
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parsestring();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsesymbol();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsenumber();
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 44) {
                        s9 = peg$c829;
                        peg$currPos++;
                      } else {
                        s9 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c830);
                        }
                      }
                      if (s9 !== peg$FAILED) {
                        s10 = peg$parse_();
                        if (s10 !== peg$FAILED) {
                          s7 = [s7, s8, s9, s10];
                          s6 = s7;
                        } else {
                          peg$currPos = s6;
                          s6 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 93) {
                    s6 = peg$c831;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c832);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c833(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsesymbol() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        if (peg$c834.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c835);
          }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c834.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c835);
              }
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c836(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parse_() {
        var s0, s1;
        peg$silentFails++;
        s0 = [];
        if (peg$c838.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c839);
          }
        }
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (peg$c838.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c839);
            }
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c837);
          }
        }
        return s0;
      }
      function peg$parseEmptyLine() {
        var s0, s1, s2, s3;
        s0 = [];
        s1 = peg$currPos;
        s2 = peg$parseWhitespace();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseNewline();
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          while (s1 !== peg$FAILED) {
            s0.push(s1);
            s1 = peg$currPos;
            s2 = peg$parseWhitespace();
            if (s2 === peg$FAILED) {
              s2 = null;
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parseNewline();
              if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
              } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          }
        } else {
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseWhitespace() {
        var s0, s1;
        s0 = [];
        if (peg$c840.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c841);
          }
        }
        if (s1 !== peg$FAILED) {
          while (s1 !== peg$FAILED) {
            s0.push(s1);
            if (peg$c840.test(input.charAt(peg$currPos))) {
              s1 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c841);
              }
            }
          }
        } else {
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseNewline() {
        var s0;
        if (input.substr(peg$currPos, 2) === peg$c842) {
          s0 = peg$c842;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c843);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 10) {
            s0 = peg$c844;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c845);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 13) {
              s0 = peg$c846;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c847);
              }
            }
          }
        }
        return s0;
      }
      function peg$parsenumber() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$currPos;
        if (peg$c848.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c849);
          }
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseExponential();
          if (s4 === peg$FAILED) {
            s4 = peg$parseReal();
            if (s4 === peg$FAILED) {
              s4 = peg$parseFraction();
              if (s4 === peg$FAILED) {
                s4 = peg$parsedigits();
              }
            }
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c850(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsenumber_() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$parsenumber();
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c851(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseReal() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$currPos;
        s3 = peg$parsedigits();
        if (s3 !== peg$FAILED) {
          s4 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 46) {
            s5 = peg$c852;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c853);
            }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parsedigits();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 46) {
            s3 = peg$c852;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c853);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsedigits();
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c854(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parseExponential() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$currPos;
        s3 = peg$parsedigits();
        if (s3 === peg$FAILED) {
          s3 = peg$parseReal();
        }
        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 101) {
            s4 = peg$c855;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c856);
            }
          }
          if (s4 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 69) {
              s4 = peg$c857;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c858);
              }
            }
          }
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 43) {
              s5 = peg$c859;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c860);
              }
            }
            if (s5 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 45) {
                s5 = peg$c861;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c862);
                }
              }
            }
            if (s5 === peg$FAILED) {
              s5 = null;
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsedigits();
              if (s6 !== peg$FAILED) {
                s3 = [s3, s4, s5, s6];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c863(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parseFraction() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parsedigits();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 47) {
            s2 = peg$c864;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c865);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsedigits();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c866(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsedigits() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c867.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c868);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c867.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c868);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }
        return s0;
      }
      function peg$parsehex() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        if (peg$c869.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c870);
          }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c869.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c870);
              }
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c871(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsebool() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 3) === peg$c376) {
          s1 = peg$c376;
          peg$currPos += 3;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c377);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c422) {
            s1 = peg$c422;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c423);
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c872(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsecu_layer() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c452) {
              s3 = peg$c452;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c453);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parseCU_LAYER();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c88(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseCU_LAYER() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c873) {
          s1 = peg$c873;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c874);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c875) {
            s1 = peg$c875;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c876);
            }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c877) {
              s1 = peg$c877;
              peg$currPos += 6;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c878);
              }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 6) === peg$c879) {
                s1 = peg$c879;
                peg$currPos += 6;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c880);
                }
              }
              if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 6) === peg$c881) {
                  s1 = peg$c881;
                  peg$currPos += 6;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c882);
                  }
                }
                if (s1 === peg$FAILED) {
                  if (input.substr(peg$currPos, 6) === peg$c883) {
                    s1 = peg$c883;
                    peg$currPos += 6;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c884);
                    }
                  }
                  if (s1 === peg$FAILED) {
                    if (input.substr(peg$currPos, 6) === peg$c885) {
                      s1 = peg$c885;
                      peg$currPos += 6;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c886);
                      }
                    }
                    if (s1 === peg$FAILED) {
                      if (input.substr(peg$currPos, 6) === peg$c887) {
                        s1 = peg$c887;
                        peg$currPos += 6;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c888);
                        }
                      }
                      if (s1 === peg$FAILED) {
                        if (input.substr(peg$currPos, 6) === peg$c889) {
                          s1 = peg$c889;
                          peg$currPos += 6;
                        } else {
                          s1 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c890);
                          }
                        }
                        if (s1 === peg$FAILED) {
                          if (input.substr(peg$currPos, 6) === peg$c891) {
                            s1 = peg$c891;
                            peg$currPos += 6;
                          } else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c892);
                            }
                          }
                          if (s1 === peg$FAILED) {
                            if (input.substr(peg$currPos, 6) === peg$c893) {
                              s1 = peg$c893;
                              peg$currPos += 6;
                            } else {
                              s1 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c894);
                              }
                            }
                            if (s1 === peg$FAILED) {
                              if (input.substr(peg$currPos, 7) === peg$c895) {
                                s1 = peg$c895;
                                peg$currPos += 7;
                              } else {
                                s1 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c896);
                                }
                              }
                              if (s1 === peg$FAILED) {
                                if (input.substr(peg$currPos, 7) === peg$c897) {
                                  s1 = peg$c897;
                                  peg$currPos += 7;
                                } else {
                                  s1 = peg$FAILED;
                                  if (peg$silentFails === 0) {
                                    peg$fail(peg$c898);
                                  }
                                }
                                if (s1 === peg$FAILED) {
                                  if (input.substr(peg$currPos, 7) === peg$c899) {
                                    s1 = peg$c899;
                                    peg$currPos += 7;
                                  } else {
                                    s1 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                      peg$fail(peg$c900);
                                    }
                                  }
                                  if (s1 === peg$FAILED) {
                                    if (input.substr(peg$currPos, 7) === peg$c901) {
                                      s1 = peg$c901;
                                      peg$currPos += 7;
                                    } else {
                                      s1 = peg$FAILED;
                                      if (peg$silentFails === 0) {
                                        peg$fail(peg$c902);
                                      }
                                    }
                                    if (s1 === peg$FAILED) {
                                      if (input.substr(peg$currPos, 7) === peg$c903) {
                                        s1 = peg$c903;
                                        peg$currPos += 7;
                                      } else {
                                        s1 = peg$FAILED;
                                        if (peg$silentFails === 0) {
                                          peg$fail(peg$c904);
                                        }
                                      }
                                      if (s1 === peg$FAILED) {
                                        if (input.substr(peg$currPos, 7) === peg$c905) {
                                          s1 = peg$c905;
                                          peg$currPos += 7;
                                        } else {
                                          s1 = peg$FAILED;
                                          if (peg$silentFails === 0) {
                                            peg$fail(peg$c906);
                                          }
                                        }
                                        if (s1 === peg$FAILED) {
                                          if (input.substr(peg$currPos, 7) === peg$c907) {
                                            s1 = peg$c907;
                                            peg$currPos += 7;
                                          } else {
                                            s1 = peg$FAILED;
                                            if (peg$silentFails === 0) {
                                              peg$fail(peg$c908);
                                            }
                                          }
                                          if (s1 === peg$FAILED) {
                                            if (input.substr(peg$currPos, 7) === peg$c909) {
                                              s1 = peg$c909;
                                              peg$currPos += 7;
                                            } else {
                                              s1 = peg$FAILED;
                                              if (peg$silentFails === 0) {
                                                peg$fail(peg$c910);
                                              }
                                            }
                                            if (s1 === peg$FAILED) {
                                              if (input.substr(peg$currPos, 7) === peg$c911) {
                                                s1 = peg$c911;
                                                peg$currPos += 7;
                                              } else {
                                                s1 = peg$FAILED;
                                                if (peg$silentFails === 0) {
                                                  peg$fail(peg$c912);
                                                }
                                              }
                                              if (s1 === peg$FAILED) {
                                                if (input.substr(peg$currPos, 7) === peg$c913) {
                                                  s1 = peg$c913;
                                                  peg$currPos += 7;
                                                } else {
                                                  s1 = peg$FAILED;
                                                  if (peg$silentFails === 0) {
                                                    peg$fail(peg$c914);
                                                  }
                                                }
                                                if (s1 === peg$FAILED) {
                                                  if (input.substr(peg$currPos, 7) === peg$c915) {
                                                    s1 = peg$c915;
                                                    peg$currPos += 7;
                                                  } else {
                                                    s1 = peg$FAILED;
                                                    if (peg$silentFails === 0) {
                                                      peg$fail(peg$c916);
                                                    }
                                                  }
                                                  if (s1 === peg$FAILED) {
                                                    if (input.substr(peg$currPos, 7) === peg$c917) {
                                                      s1 = peg$c917;
                                                      peg$currPos += 7;
                                                    } else {
                                                      s1 = peg$FAILED;
                                                      if (peg$silentFails === 0) {
                                                        peg$fail(peg$c918);
                                                      }
                                                    }
                                                    if (s1 === peg$FAILED) {
                                                      if (input.substr(peg$currPos, 7) === peg$c919) {
                                                        s1 = peg$c919;
                                                        peg$currPos += 7;
                                                      } else {
                                                        s1 = peg$FAILED;
                                                        if (peg$silentFails === 0) {
                                                          peg$fail(peg$c920);
                                                        }
                                                      }
                                                      if (s1 === peg$FAILED) {
                                                        if (input.substr(peg$currPos, 7) === peg$c921) {
                                                          s1 = peg$c921;
                                                          peg$currPos += 7;
                                                        } else {
                                                          s1 = peg$FAILED;
                                                          if (peg$silentFails === 0) {
                                                            peg$fail(peg$c922);
                                                          }
                                                        }
                                                        if (s1 === peg$FAILED) {
                                                          if (input.substr(peg$currPos, 7) === peg$c923) {
                                                            s1 = peg$c923;
                                                            peg$currPos += 7;
                                                          } else {
                                                            s1 = peg$FAILED;
                                                            if (peg$silentFails === 0) {
                                                              peg$fail(peg$c924);
                                                            }
                                                          }
                                                          if (s1 === peg$FAILED) {
                                                            if (input.substr(peg$currPos, 7) === peg$c925) {
                                                              s1 = peg$c925;
                                                              peg$currPos += 7;
                                                            } else {
                                                              s1 = peg$FAILED;
                                                              if (peg$silentFails === 0) {
                                                                peg$fail(peg$c926);
                                                              }
                                                            }
                                                            if (s1 === peg$FAILED) {
                                                              if (input.substr(peg$currPos, 7) === peg$c927) {
                                                                s1 = peg$c927;
                                                                peg$currPos += 7;
                                                              } else {
                                                                s1 = peg$FAILED;
                                                                if (peg$silentFails === 0) {
                                                                  peg$fail(peg$c928);
                                                                }
                                                              }
                                                              if (s1 === peg$FAILED) {
                                                                if (input.substr(peg$currPos, 7) === peg$c929) {
                                                                  s1 = peg$c929;
                                                                  peg$currPos += 7;
                                                                } else {
                                                                  s1 = peg$FAILED;
                                                                  if (peg$silentFails === 0) {
                                                                    peg$fail(peg$c930);
                                                                  }
                                                                }
                                                                if (s1 === peg$FAILED) {
                                                                  if (input.substr(peg$currPos, 7) === peg$c931) {
                                                                    s1 = peg$c931;
                                                                    peg$currPos += 7;
                                                                  } else {
                                                                    s1 = peg$FAILED;
                                                                    if (peg$silentFails === 0) {
                                                                      peg$fail(peg$c932);
                                                                    }
                                                                  }
                                                                  if (s1 === peg$FAILED) {
                                                                    if (input.substr(peg$currPos, 7) === peg$c933) {
                                                                      s1 = peg$c933;
                                                                      peg$currPos += 7;
                                                                    } else {
                                                                      s1 = peg$FAILED;
                                                                      if (peg$silentFails === 0) {
                                                                        peg$fail(peg$c934);
                                                                      }
                                                                    }
                                                                    if (s1 === peg$FAILED) {
                                                                      if (input.substr(peg$currPos, 7) === peg$c935) {
                                                                        s1 = peg$c935;
                                                                        peg$currPos += 7;
                                                                      } else {
                                                                        s1 = peg$FAILED;
                                                                        if (peg$silentFails === 0) {
                                                                          peg$fail(peg$c936);
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c723(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parseLAYER_MASKS() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c937) {
          s1 = peg$c937;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c938);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 6) === peg$c939) {
            s1 = peg$c939;
            peg$currPos += 6;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c940);
            }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c941) {
              s1 = peg$c941;
              peg$currPos += 6;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c942);
              }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 7) === peg$c943) {
                s1 = peg$c943;
                peg$currPos += 7;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c944);
                }
              }
              if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 7) === peg$c945) {
                  s1 = peg$c945;
                  peg$currPos += 7;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c946);
                  }
                }
                if (s1 === peg$FAILED) {
                  if (input.substr(peg$currPos, 6) === peg$c947) {
                    s1 = peg$c947;
                    peg$currPos += 6;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c948);
                    }
                  }
                  if (s1 === peg$FAILED) {
                    if (input.substr(peg$currPos, 7) === peg$c949) {
                      s1 = peg$c949;
                      peg$currPos += 7;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c950);
                      }
                    }
                    if (s1 === peg$FAILED) {
                      if (input.substr(peg$currPos, 5) === peg$c951) {
                        s1 = peg$c951;
                        peg$currPos += 5;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c952);
                        }
                      }
                      if (s1 === peg$FAILED) {
                        if (input.substr(peg$currPos, 7) === peg$c953) {
                          s1 = peg$c953;
                          peg$currPos += 7;
                        } else {
                          s1 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c954);
                          }
                        }
                        if (s1 === peg$FAILED) {
                          s1 = peg$currPos;
                          if (input.substr(peg$currPos, 5) === peg$c955) {
                            s2 = peg$c955;
                            peg$currPos += 5;
                          } else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c956);
                            }
                          }
                          if (s2 !== peg$FAILED) {
                            if (peg$c957.test(input.charAt(peg$currPos))) {
                              s3 = input.charAt(peg$currPos);
                              peg$currPos++;
                            } else {
                              s3 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c958);
                              }
                            }
                            if (s3 !== peg$FAILED) {
                              if (input.substr(peg$currPos, 3) === peg$c959) {
                                s4 = peg$c959;
                                peg$currPos += 3;
                              } else {
                                s4 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c960);
                                }
                              }
                              if (s4 !== peg$FAILED) {
                                s2 = [s2, s3, s4];
                                s1 = s2;
                              } else {
                                peg$currPos = s1;
                                s1 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s1;
                              s1 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s1;
                            s1 = peg$FAILED;
                          }
                          if (s1 === peg$FAILED) {
                            s1 = peg$currPos;
                            if (input.substr(peg$currPos, 6) === peg$c961) {
                              s2 = peg$c961;
                              peg$currPos += 6;
                            } else {
                              s2 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c962);
                              }
                            }
                            if (s2 !== peg$FAILED) {
                              if (peg$c963.test(input.charAt(peg$currPos))) {
                                s3 = input.charAt(peg$currPos);
                                peg$currPos++;
                              } else {
                                s3 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c964);
                                }
                              }
                              if (s3 !== peg$FAILED) {
                                if (input.substr(peg$currPos, 3) === peg$c959) {
                                  s4 = peg$c959;
                                  peg$currPos += 3;
                                } else {
                                  s4 = peg$FAILED;
                                  if (peg$silentFails === 0) {
                                    peg$fail(peg$c960);
                                  }
                                }
                                if (s4 !== peg$FAILED) {
                                  s2 = [s2, s3, s4];
                                  s1 = s2;
                                } else {
                                  peg$currPos = s1;
                                  s1 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s1;
                                s1 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s1;
                              s1 = peg$FAILED;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c723(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parseLAYERS() {
        var s0;
        s0 = peg$parseLAYER();
        if (s0 === peg$FAILED) {
          s0 = peg$parseCU_LAYER();
          if (s0 === peg$FAILED) {
            s0 = peg$parseLAYER_MASKS();
          }
        }
        return s0;
      }
      peg$result = peg$startRuleFunction();
      if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
      } else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
          peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(
          peg$maxFailExpected,
          peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
          peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
        );
      }
    }
    module.exports = {
      SyntaxError: peg$SyntaxError,
      parse: peg$parse
    };
  }
});

// src/symbol-parser.js
var require_symbol_parser = __commonJS({
  "src/symbol-parser.js"(exports, module) {
    "use strict";
    function peg$subclass(child, parent) {
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
    }
    function peg$SyntaxError(message, expected, found, location) {
      this.message = message;
      this.expected = expected;
      this.found = found;
      this.location = location;
      this.name = "SyntaxError";
      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, peg$SyntaxError);
      }
    }
    peg$subclass(peg$SyntaxError, Error);
    peg$SyntaxError.buildMessage = function(expected, found) {
      var DESCRIBE_EXPECTATION_FNS = {
        literal: function(expectation) {
          return '"' + literalEscape(expectation.text) + '"';
        },
        "class": function(expectation) {
          var escapedParts = "", i;
          for (i = 0; i < expectation.parts.length; i++) {
            escapedParts += expectation.parts[i] instanceof Array ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1]) : classEscape(expectation.parts[i]);
          }
          return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
        },
        any: function(expectation) {
          return "any character";
        },
        end: function(expectation) {
          return "end of input";
        },
        other: function(expectation) {
          return expectation.description;
        }
      };
      function hex(ch) {
        return ch.charCodeAt(0).toString(16).toUpperCase();
      }
      function literalEscape(s) {
        return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
          return "\\x0" + hex(ch);
        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
          return "\\x" + hex(ch);
        });
      }
      function classEscape(s) {
        return s.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(ch) {
          return "\\x0" + hex(ch);
        }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) {
          return "\\x" + hex(ch);
        });
      }
      function describeExpectation(expectation) {
        return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
      }
      function describeExpected(expected2) {
        var descriptions = new Array(expected2.length), i, j;
        for (i = 0; i < expected2.length; i++) {
          descriptions[i] = describeExpectation(expected2[i]);
        }
        descriptions.sort();
        if (descriptions.length > 0) {
          for (i = 1, j = 1; i < descriptions.length; i++) {
            if (descriptions[i - 1] !== descriptions[i]) {
              descriptions[j] = descriptions[i];
              j++;
            }
          }
          descriptions.length = j;
        }
        switch (descriptions.length) {
          case 1:
            return descriptions[0];
          case 2:
            return descriptions[0] + " or " + descriptions[1];
          default:
            return descriptions.slice(0, -1).join(", ") + ", or " + descriptions[descriptions.length - 1];
        }
      }
      function describeFound(found2) {
        return found2 ? '"' + literalEscape(found2) + '"' : "end of input";
      }
      return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
    };
    function peg$parse(input, options) {
      options = options !== void 0 ? options : {};
      var peg$FAILED = {}, peg$startRuleFunctions = { kicad_symbol_lib: peg$parsekicad_symbol_lib }, peg$startRuleFunction = peg$parsekicad_symbol_lib, peg$c0 = "(", peg$c1 = peg$literalExpectation("(", false), peg$c2 = "kicad_symbol_lib", peg$c3 = peg$literalExpectation("kicad_symbol_lib", false), peg$c4 = function(type, val) {
        return val;
      }, peg$c5 = ")", peg$c6 = peg$literalExpectation(")", false), peg$c7 = function(type, value) {
        return { type, value };
      }, peg$c8 = "version", peg$c9 = peg$literalExpectation("version", false), peg$c10 = function(type, value) {
        return { type, value: { type: "number", value } };
      }, peg$c11 = "generator", peg$c12 = peg$literalExpectation("generator", false), peg$c13 = function(type, value) {
        return { type, value };
      }, peg$c14 = "generator_version", peg$c15 = peg$literalExpectation("generator_version", false), peg$c16 = "symbol", peg$c17 = peg$literalExpectation("symbol", false), peg$c18 = function(type, rest) {
        return { type, value: rest };
      }, peg$c19 = function(value) {
        return value;
      }, peg$c20 = "exclude_from_sim", peg$c21 = peg$literalExpectation("exclude_from_sim", false), peg$c22 = function(type, value) {
        return { type, value: { type: "boolean", value: value === "yes" } };
      }, peg$c23 = function(value) {
        return { type: "id", value };
      }, peg$c24 = "power", peg$c25 = peg$literalExpectation("power", false), peg$c26 = function(type) {
        return { type, value: { type: "boolean", value: true } };
      }, peg$c27 = "extends", peg$c28 = peg$literalExpectation("extends", false), peg$c29 = "pin_numbers", peg$c30 = peg$literalExpectation("pin_numbers", false), peg$c31 = function(type, val) {
        return val;
      }, peg$c32 = function(type, rest) {
        return { type, value: rest };
      }, peg$c33 = "pin_names", peg$c34 = peg$literalExpectation("pin_names", false), peg$c35 = "hide", peg$c36 = peg$literalExpectation("hide", false), peg$c37 = function(value) {
        return {
          type: "hide",
          value: { type: "boolean", value: true }
        };
      }, peg$c38 = "offset", peg$c39 = peg$literalExpectation("offset", false), peg$c40 = "in_bom", peg$c41 = peg$literalExpectation("in_bom", false), peg$c42 = "on_board", peg$c43 = peg$literalExpectation("on_board", false), peg$c44 = "property", peg$c45 = peg$literalExpectation("property", false), peg$c46 = function(name, value, val) {
        return val;
      }, peg$c47 = function(name, value, rest) {
        return {
          type: "properties",
          value: [
            { type: "key", value: name },
            { type: "value", value },
            ...rest
          ]
        };
      }, peg$c48 = "id", peg$c49 = peg$literalExpectation("id", false), peg$c50 = "arc", peg$c51 = peg$literalExpectation("arc", false), peg$c52 = function(start, mid, end, stroke_definition2, fill2) {
        return { type: "arc", value: [start, mid, end, stroke_definition2, fill2] };
      }, peg$c53 = "circle", peg$c54 = peg$literalExpectation("circle", false), peg$c55 = function(center, radius, stroke_definition2, fill2) {
        return {
          type: "circle",
          value: [center, radius, stroke_definition2, fill2]
        };
      }, peg$c56 = "bezier", peg$c57 = peg$literalExpectation("bezier", false), peg$c58 = function() {
        return { type: "bezier", value: [pts, stroke_definition, fill] };
      }, peg$c59 = "polyline", peg$c60 = peg$literalExpectation("polyline", false), peg$c61 = function(pts2, stroke_definition2, fill2) {
        if (fill2) {
          return {
            type: "polyline",
            value: [pts2, stroke_definition2, fill2]
          };
        } else {
          return {
            type: "polyline",
            value: [pts2, stroke_definition2]
          };
        }
      }, peg$c62 = "rectangle", peg$c63 = peg$literalExpectation("rectangle", false), peg$c64 = function(start, end, stroke_definition2, fill2) {
        return {
          type: "rectangle",
          value: [start, end, stroke_definition2, fill2]
        };
      }, peg$c65 = "radius", peg$c66 = peg$literalExpectation("radius", false), peg$c67 = function(value) {
        return { type: "radius", value };
      }, peg$c68 = "mid", peg$c69 = peg$literalExpectation("mid", false), peg$c70 = "start", peg$c71 = peg$literalExpectation("start", false), peg$c72 = function(x, y) {
        return [
          { type: "x", value: x },
          { type: "y", value: y }
        ];
      }, peg$c73 = "center", peg$c74 = peg$literalExpectation("center", false), peg$c75 = function(type, value) {
        return { type, value };
      }, peg$c76 = "end", peg$c77 = peg$literalExpectation("end", false), peg$c78 = "pts", peg$c79 = peg$literalExpectation("pts", false), peg$c80 = function(type, pts2) {
        return { type, value: pts2.map((x) => x[0]) };
      }, peg$c81 = "xy", peg$c82 = peg$literalExpectation("xy", false), peg$c83 = "text", peg$c84 = peg$literalExpectation("text", false), peg$c85 = function(type, value, at, effects2) {
        return { type, value: [{ type: "value", value }, at, effects2] };
      }, peg$c86 = "pin", peg$c87 = peg$literalExpectation("pin", false), peg$c88 = function(val) {
        return val;
      }, peg$c89 = function(rest) {
        return { type: "pin", value: rest };
      }, peg$c90 = "input", peg$c91 = peg$literalExpectation("input", false), peg$c92 = "output", peg$c93 = peg$literalExpectation("output", false), peg$c94 = "bidirectional", peg$c95 = peg$literalExpectation("bidirectional", false), peg$c96 = "tri_state", peg$c97 = peg$literalExpectation("tri_state", false), peg$c98 = "passive", peg$c99 = peg$literalExpectation("passive", false), peg$c100 = "free", peg$c101 = peg$literalExpectation("free", false), peg$c102 = "unspecified", peg$c103 = peg$literalExpectation("unspecified", false), peg$c104 = "power_in", peg$c105 = peg$literalExpectation("power_in", false), peg$c106 = "power_out", peg$c107 = peg$literalExpectation("power_out", false), peg$c108 = "open_collector", peg$c109 = peg$literalExpectation("open_collector", false), peg$c110 = "open_emitter", peg$c111 = peg$literalExpectation("open_emitter", false), peg$c112 = "no_connect", peg$c113 = peg$literalExpectation("no_connect", false), peg$c114 = function(value) {
        return { type: "pin_electrical_type", value: { type: "string", value } };
      }, peg$c115 = "inverted_clock", peg$c116 = peg$literalExpectation("inverted_clock", false), peg$c117 = "line", peg$c118 = peg$literalExpectation("line", false), peg$c119 = "inverted", peg$c120 = peg$literalExpectation("inverted", false), peg$c121 = "input_low", peg$c122 = peg$literalExpectation("input_low", false), peg$c123 = "clock_low", peg$c124 = peg$literalExpectation("clock_low", false), peg$c125 = "clock", peg$c126 = peg$literalExpectation("clock", false), peg$c127 = "output_low", peg$c128 = peg$literalExpectation("output_low", false), peg$c129 = "edge_clock_high", peg$c130 = peg$literalExpectation("edge_clock_high", false), peg$c131 = "non_logic", peg$c132 = peg$literalExpectation("non_logic", false), peg$c133 = function(value) {
        return { type: "pin_graphic_style", value: { type: "string", value } };
      }, peg$c134 = "name", peg$c135 = peg$literalExpectation("name", false), peg$c136 = function(value) {
        var values = [{ type: "value", value }];
        if (typeof effects !== "undefined") values.push(effects);
        return {
          type: "pin_name",
          value: values
        };
      }, peg$c137 = "number", peg$c138 = peg$literalExpectation("number", false), peg$c139 = function(value) {
        var values = [{ type: "value", value }];
        if (typeof effects !== "undefined") values.push(effects);
        return {
          type: "pin_number",
          value: values
        };
      }, peg$c140 = "alternate", peg$c141 = peg$literalExpectation("alternate", false), peg$c142 = function(type, name, val) {
        return val;
      }, peg$c143 = function(type, name, rest) {
        return { type, value: [{ type: "name", value: name }, ...rest] };
      }, peg$c144 = "length", peg$c145 = peg$literalExpectation("length", false), peg$c146 = "unit_name", peg$c147 = peg$literalExpectation("unit_name", false), peg$c148 = "at", peg$c149 = peg$literalExpectation("at", false), peg$c150 = "unlocked", peg$c151 = peg$literalExpectation("unlocked", false), peg$c152 = function(type, x, y, angle, unlocked) {
        var value = [
          { type: "x", value: x },
          { type: "y", value: y },
          { type: "unlocked", value: { type: "boolean", value: !!unlocked } }
        ];
        if (angle !== null) value.push({ type: "angle", value: angle[0] });
        return { type, value };
      }, peg$c153 = "stroke", peg$c154 = peg$literalExpectation("stroke", false), peg$c155 = "width", peg$c156 = peg$literalExpectation("width", false), peg$c157 = "type", peg$c158 = peg$literalExpectation("type", false), peg$c159 = "dash", peg$c160 = peg$literalExpectation("dash", false), peg$c161 = "dash_dot", peg$c162 = peg$literalExpectation("dash_dot", false), peg$c163 = "dash_dot_dot", peg$c164 = peg$literalExpectation("dash_dot_dot", false), peg$c165 = "dot", peg$c166 = peg$literalExpectation("dot", false), peg$c167 = "default", peg$c168 = peg$literalExpectation("default", false), peg$c169 = "solid", peg$c170 = peg$literalExpectation("solid", false), peg$c171 = function(type, value) {
        return { type, value: { type: "string", value } };
      }, peg$c172 = "color", peg$c173 = peg$literalExpectation("color", false), peg$c174 = function(type, r, g, b, a) {
        return {
          type,
          value: [
            { type: "r", value: r },
            { type: "g", value: g },
            { type: "b", value: b },
            { type: "a", value: a }
          ]
        };
      }, peg$c175 = "fill", peg$c176 = peg$literalExpectation("fill", false), peg$c177 = "effects", peg$c178 = peg$literalExpectation("effects", false), peg$c179 = function(type, effects2) {
        return { type, value: effects2.map((x) => x[0]) };
      }, peg$c180 = "font", peg$c181 = peg$literalExpectation("font", false), peg$c182 = function(type, attrs) {
        return {
          type,
          value: attrs.map((x) => x[0])
        };
      }, peg$c183 = "thickness", peg$c184 = peg$literalExpectation("thickness", false), peg$c185 = "face", peg$c186 = peg$literalExpectation("face", false), peg$c187 = "size", peg$c188 = peg$literalExpectation("size", false), peg$c189 = function(type, width, height) {
        return {
          type,
          value: [
            { type: "height", value: height },
            { type: "width", value: width }
          ]
        };
      }, peg$c190 = "italic", peg$c191 = peg$literalExpectation("italic", false), peg$c192 = function() {
        return { type: "italic", value: { type: "boolean", value: true } };
      }, peg$c193 = "bold", peg$c194 = peg$literalExpectation("bold", false), peg$c195 = function() {
        return { type: "bold", value: { type: "boolean", value: true } };
      }, peg$c196 = "justify", peg$c197 = peg$literalExpectation("justify", false), peg$c198 = function(type, justify) {
        return { type, value: justify.map((x) => x[0]) };
      }, peg$c199 = "left", peg$c200 = peg$literalExpectation("left", false), peg$c201 = "right", peg$c202 = peg$literalExpectation("right", false), peg$c203 = "top", peg$c204 = peg$literalExpectation("top", false), peg$c205 = "bottom", peg$c206 = peg$literalExpectation("bottom", false), peg$c207 = "mirror", peg$c208 = peg$literalExpectation("mirror", false), peg$c209 = function(value) {
        return { type: "string", value };
      }, peg$c210 = "yes", peg$c211 = peg$literalExpectation("yes", false), peg$c212 = "no", peg$c213 = peg$literalExpectation("no", false), peg$c214 = function(value) {
        return { type: "boolean", value: value === "yes" };
      }, peg$c215 = '"', peg$c216 = peg$literalExpectation('"', false), peg$c217 = function(chars) {
        return { type: "string", value: chars.join("") };
      }, peg$c218 = "'", peg$c219 = peg$literalExpectation("'", false), peg$c220 = "\\", peg$c221 = peg$literalExpectation("\\", false), peg$c222 = peg$anyExpectation(), peg$c223 = function(char) {
        return char;
      }, peg$c224 = function(sequence) {
        return sequence;
      }, peg$c225 = "b", peg$c226 = peg$literalExpectation("b", false), peg$c227 = function() {
        return "\b";
      }, peg$c228 = "f", peg$c229 = peg$literalExpectation("f", false), peg$c230 = function() {
        return "\f";
      }, peg$c231 = "n", peg$c232 = peg$literalExpectation("n", false), peg$c233 = function() {
        return "\n";
      }, peg$c234 = "r", peg$c235 = peg$literalExpectation("r", false), peg$c236 = function() {
        return "\r";
      }, peg$c237 = "t", peg$c238 = peg$literalExpectation("t", false), peg$c239 = function() {
        return "	";
      }, peg$c240 = "v", peg$c241 = peg$literalExpectation("v", false), peg$c242 = function() {
        return "\v";
      }, peg$c243 = /^[^"]/, peg$c244 = peg$classExpectation(['"'], true, false), peg$c245 = /^[\\"]/, peg$c246 = peg$classExpectation(["\\", '"'], false, false), peg$c247 = /^[\-+]/, peg$c248 = peg$classExpectation(["-", "+"], false, false), peg$c249 = function(val) {
        return { type: "number", value: val };
      }, peg$c250 = ".", peg$c251 = peg$literalExpectation(".", false), peg$c252 = function(val) {
        return { type: "real", value: val };
      }, peg$c253 = "e", peg$c254 = peg$literalExpectation("e", false), peg$c255 = "E", peg$c256 = peg$literalExpectation("E", false), peg$c257 = "+", peg$c258 = peg$literalExpectation("+", false), peg$c259 = "-", peg$c260 = peg$literalExpectation("-", false), peg$c261 = function(val) {
        return { type: "exponential", value: val };
      }, peg$c262 = "/", peg$c263 = peg$literalExpectation("/", false), peg$c264 = function(n, d) {
        return { type: "fraction", n, d };
      }, peg$c265 = /^[0-9]/, peg$c266 = peg$classExpectation([["0", "9"]], false, false), peg$c267 = /^[^ ();'\n]/, peg$c268 = peg$classExpectation([" ", "(", ")", ";", "'", "\n"], true, false), peg$c269 = function(value) {
        return { type: "string", value };
      }, peg$c270 = peg$otherExpectation("whitespace"), peg$c271 = /^[ \t\n\r]/, peg$c272 = peg$classExpectation([" ", "	", "\n", "\r"], false, false), peg$c273 = /^[ \t]/, peg$c274 = peg$classExpectation([" ", "	"], false, false), peg$c275 = "\r\n", peg$c276 = peg$literalExpectation("\r\n", false), peg$c277 = "\n", peg$c278 = peg$literalExpectation("\n", false), peg$c279 = "\r", peg$c280 = peg$literalExpectation("\r", false), peg$currPos = 0, peg$savedPos = 0, peg$posDetailsCache = [{ line: 1, column: 1 }], peg$maxFailPos = 0, peg$maxFailExpected = [], peg$silentFails = 0, peg$result;
      if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
          throw new Error(`Can't start parsing from rule "` + options.startRule + '".');
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
      }
      function text() {
        return input.substring(peg$savedPos, peg$currPos);
      }
      function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
      }
      function expected(description, location2) {
        location2 = location2 !== void 0 ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildStructuredError(
          [peg$otherExpectation(description)],
          input.substring(peg$savedPos, peg$currPos),
          location2
        );
      }
      function error(message, location2) {
        location2 = location2 !== void 0 ? location2 : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location2);
      }
      function peg$literalExpectation(text2, ignoreCase) {
        return { type: "literal", text: text2, ignoreCase };
      }
      function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts, inverted, ignoreCase };
      }
      function peg$anyExpectation() {
        return { type: "any" };
      }
      function peg$endExpectation() {
        return { type: "end" };
      }
      function peg$otherExpectation(description) {
        return { type: "other", description };
      }
      function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos], p;
        if (details) {
          return details;
        } else {
          p = pos - 1;
          while (!peg$posDetailsCache[p]) {
            p--;
          }
          details = peg$posDetailsCache[p];
          details = {
            line: details.line,
            column: details.column
          };
          while (p < pos) {
            if (input.charCodeAt(p) === 10) {
              details.line++;
              details.column = 1;
            } else {
              details.column++;
            }
            p++;
          }
          peg$posDetailsCache[pos] = details;
          return details;
        }
      }
      function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos), endPosDetails = peg$computePosDetails(endPos);
        return {
          start: {
            offset: startPos,
            line: startPosDetails.line,
            column: startPosDetails.column
          },
          end: {
            offset: endPos,
            line: endPosDetails.line,
            column: endPosDetails.column
          }
        };
      }
      function peg$fail(expected2) {
        if (peg$currPos < peg$maxFailPos) {
          return;
        }
        if (peg$currPos > peg$maxFailPos) {
          peg$maxFailPos = peg$currPos;
          peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected2);
      }
      function peg$buildSimpleError(message, location2) {
        return new peg$SyntaxError(message, null, null, location2);
      }
      function peg$buildStructuredError(expected2, found, location2) {
        return new peg$SyntaxError(
          peg$SyntaxError.buildMessage(expected2, found),
          expected2,
          found,
          location2
        );
      }
      function peg$parsekicad_symbol_lib() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseEmptyLine();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseEmptyLine();
        }
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s2 = peg$c0;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c1);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              if (input.substr(peg$currPos, 16) === peg$c2) {
                s4 = peg$c2;
                peg$currPos += 16;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c3);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                  s6 = [];
                  s7 = peg$currPos;
                  s8 = peg$parseversion();
                  if (s8 === peg$FAILED) {
                    s8 = peg$parsegenerator();
                    if (s8 === peg$FAILED) {
                      s8 = peg$parsegenerator_version();
                      if (s8 === peg$FAILED) {
                        s8 = peg$parsekicad_symbol();
                      }
                    }
                  }
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parse_();
                    if (s9 !== peg$FAILED) {
                      peg$savedPos = s7;
                      s8 = peg$c4(s4, s8);
                      s7 = s8;
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s7;
                    s7 = peg$FAILED;
                  }
                  while (s7 !== peg$FAILED) {
                    s6.push(s7);
                    s7 = peg$currPos;
                    s8 = peg$parseversion();
                    if (s8 === peg$FAILED) {
                      s8 = peg$parsegenerator();
                      if (s8 === peg$FAILED) {
                        s8 = peg$parsegenerator_version();
                        if (s8 === peg$FAILED) {
                          s8 = peg$parsekicad_symbol();
                        }
                      }
                    }
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parse_();
                      if (s9 !== peg$FAILED) {
                        peg$savedPos = s7;
                        s8 = peg$c4(s4, s8);
                        s7 = s8;
                      } else {
                        peg$currPos = s7;
                        s7 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c7(s4, s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseversion() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c8) {
              s3 = peg$c8;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c9);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsedigits();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c10(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsegenerator() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 9) === peg$c11) {
              s3 = peg$c11;
              peg$currPos += 9;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c12);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 === peg$FAILED) {
                  s5 = peg$parsesymbol();
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c13(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsegenerator_version() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 17) === peg$c14) {
              s3 = peg$c14;
              peg$currPos += 17;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c15);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c13(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsekicad_symbol() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c16) {
              s3 = peg$c16;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c17);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$parsekicad_symbol_element();
                if (s6 !== peg$FAILED) {
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$parsekicad_symbol_element();
                  }
                } else {
                  s5 = peg$FAILED;
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c18(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsekicad_symbol_element() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$parselibrary_id();
        if (s1 === peg$FAILED) {
          s1 = peg$parsepower();
          if (s1 === peg$FAILED) {
            s1 = peg$parseextends();
            if (s1 === peg$FAILED) {
              s1 = peg$parsepin_names();
              if (s1 === peg$FAILED) {
                s1 = peg$parsepin_numbers();
                if (s1 === peg$FAILED) {
                  s1 = peg$parseexclude_from_sim();
                  if (s1 === peg$FAILED) {
                    s1 = peg$parsein_bom();
                    if (s1 === peg$FAILED) {
                      s1 = peg$parseon_board();
                      if (s1 === peg$FAILED) {
                        s1 = peg$parsepin();
                        if (s1 === peg$FAILED) {
                          s1 = peg$parserectangle();
                          if (s1 === peg$FAILED) {
                            s1 = peg$parsecircle();
                            if (s1 === peg$FAILED) {
                              s1 = peg$parsearc();
                              if (s1 === peg$FAILED) {
                                s1 = peg$parsepolyline();
                                if (s1 === peg$FAILED) {
                                  s1 = peg$parsetext();
                                  if (s1 === peg$FAILED) {
                                    s1 = peg$parseproperty();
                                    if (s1 === peg$FAILED) {
                                      s1 = peg$parsekicad_symbol();
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c19(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseexclude_from_sim() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 16) === peg$c20) {
              s3 = peg$c20;
              peg$currPos += 16;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c21);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsebool();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c22(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parselibrary_id() {
        var s0, s1;
        s0 = peg$currPos;
        s1 = peg$parsestring();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c23(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsepower() {
        var s0, s1, s2, s3, s4, s5;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c24) {
              s3 = peg$c24;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c25);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 41) {
                  s5 = peg$c5;
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c6);
                  }
                }
                if (s5 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c26(s3);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseextends() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c27) {
              s3 = peg$c27;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c28);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c13(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepin_numbers() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 11) === peg$c29) {
              s3 = peg$c29;
              peg$currPos += 11;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c30);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parseoffset();
                if (s7 === peg$FAILED) {
                  s7 = peg$parsehide_token();
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    peg$savedPos = s6;
                    s7 = peg$c31(s3, s7);
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parseoffset();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsehide_token();
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s6;
                      s7 = peg$c31(s3, s7);
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c32(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepin_names() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 9) === peg$c33) {
              s3 = peg$c33;
              peg$currPos += 9;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c34);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parseoffset();
                if (s7 === peg$FAILED) {
                  s7 = peg$parsehide_token();
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    peg$savedPos = s6;
                    s7 = peg$c31(s3, s7);
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parseoffset();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsehide_token();
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      peg$savedPos = s6;
                      s7 = peg$c31(s3, s7);
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c32(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsehide_token() {
        var s0, s1, s2;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c35) {
          s1 = peg$c35;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c36);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c37(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseoffset() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c38) {
              s3 = peg$c38;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c39);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c7(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsein_bom() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c40) {
              s3 = peg$c40;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c41);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsebool();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c22(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseon_board() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 8) === peg$c42) {
              s3 = peg$c42;
              peg$currPos += 8;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c43);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsebool();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c22(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseproperty() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 8) === peg$c44) {
              s3 = peg$c44;
              peg$currPos += 8;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c45);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsestring();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = [];
                        s10 = peg$currPos;
                        s11 = peg$parseat();
                        if (s11 === peg$FAILED) {
                          s11 = peg$parseeffects();
                          if (s11 === peg$FAILED) {
                            s11 = peg$parseproperty_id();
                          }
                        }
                        if (s11 !== peg$FAILED) {
                          s12 = peg$parse_();
                          if (s12 !== peg$FAILED) {
                            peg$savedPos = s10;
                            s11 = peg$c46(s5, s7, s11);
                            s10 = s11;
                          } else {
                            peg$currPos = s10;
                            s10 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s10;
                          s10 = peg$FAILED;
                        }
                        if (s10 !== peg$FAILED) {
                          while (s10 !== peg$FAILED) {
                            s9.push(s10);
                            s10 = peg$currPos;
                            s11 = peg$parseat();
                            if (s11 === peg$FAILED) {
                              s11 = peg$parseeffects();
                              if (s11 === peg$FAILED) {
                                s11 = peg$parseproperty_id();
                              }
                            }
                            if (s11 !== peg$FAILED) {
                              s12 = peg$parse_();
                              if (s12 !== peg$FAILED) {
                                peg$savedPos = s10;
                                s11 = peg$c46(s5, s7, s11);
                                s10 = s11;
                              } else {
                                peg$currPos = s10;
                                s10 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s10;
                              s10 = peg$FAILED;
                            }
                          }
                        } else {
                          s9 = peg$FAILED;
                        }
                        if (s9 !== peg$FAILED) {
                          if (input.charCodeAt(peg$currPos) === 41) {
                            s10 = peg$c5;
                            peg$currPos++;
                          } else {
                            s10 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c6);
                            }
                          }
                          if (s10 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c47(s5, s7, s9);
                            s0 = s1;
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseproperty_id() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c48) {
              s3 = peg$c48;
              peg$currPos += 2;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c49);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c23(s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsegraphic_item() {
        var s0;
        s0 = peg$parsearc();
        if (s0 === peg$FAILED) {
          s0 = peg$parsecircle();
          if (s0 === peg$FAILED) {
            s0 = peg$parsebezier();
            if (s0 === peg$FAILED) {
              s0 = peg$parsepolyline();
              if (s0 === peg$FAILED) {
                s0 = peg$parserectangle();
                if (s0 === peg$FAILED) {
                  s0 = peg$parsetext();
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parsearc() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c50) {
              s3 = peg$c50;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c51);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestart();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsemid();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parseend();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parse_();
                          if (s10 !== peg$FAILED) {
                            s11 = peg$parsestroke_definition();
                            if (s11 !== peg$FAILED) {
                              s12 = peg$parse_();
                              if (s12 !== peg$FAILED) {
                                s13 = peg$parsefill();
                                if (s13 !== peg$FAILED) {
                                  s14 = peg$parse_();
                                  if (s14 !== peg$FAILED) {
                                    if (input.charCodeAt(peg$currPos) === 41) {
                                      s15 = peg$c5;
                                      peg$currPos++;
                                    } else {
                                      s15 = peg$FAILED;
                                      if (peg$silentFails === 0) {
                                        peg$fail(peg$c6);
                                      }
                                    }
                                    if (s15 !== peg$FAILED) {
                                      peg$savedPos = s0;
                                      s1 = peg$c52(s5, s7, s9, s11, s13);
                                      s0 = s1;
                                    } else {
                                      peg$currPos = s0;
                                      s0 = peg$FAILED;
                                    }
                                  } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                  }
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsecircle() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s2 = peg$c0;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c1);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              if (input.substr(peg$currPos, 6) === peg$c53) {
                s4 = peg$c53;
                peg$currPos += 6;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c54);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsecenter();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parseradius();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parse_();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parsestroke_definition();
                          if (s10 !== peg$FAILED) {
                            s11 = peg$parse_();
                            if (s11 !== peg$FAILED) {
                              s12 = peg$parsefill();
                              if (s12 !== peg$FAILED) {
                                s13 = peg$parse_();
                                if (s13 !== peg$FAILED) {
                                  if (input.charCodeAt(peg$currPos) === 41) {
                                    s14 = peg$c5;
                                    peg$currPos++;
                                  } else {
                                    s14 = peg$FAILED;
                                    if (peg$silentFails === 0) {
                                      peg$fail(peg$c6);
                                    }
                                  }
                                  if (s14 !== peg$FAILED) {
                                    s15 = peg$parse_();
                                    if (s15 !== peg$FAILED) {
                                      peg$savedPos = s0;
                                      s1 = peg$c55(s6, s8, s10, s12);
                                      s0 = s1;
                                    } else {
                                      peg$currPos = s0;
                                      s0 = peg$FAILED;
                                    }
                                  } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                  }
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsebezier() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s2 = peg$c0;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c1);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              if (input.substr(peg$currPos, 6) === peg$c56) {
                s4 = peg$c56;
                peg$currPos += 6;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c57);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsepts();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parsestroke_definition();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parse_();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parsefill();
                          if (s10 !== peg$FAILED) {
                            s11 = peg$parse_();
                            if (s11 !== peg$FAILED) {
                              if (input.charCodeAt(peg$currPos) === 41) {
                                s12 = peg$c5;
                                peg$currPos++;
                              } else {
                                s12 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c6);
                                }
                              }
                              if (s12 !== peg$FAILED) {
                                s13 = peg$parse_();
                                if (s13 !== peg$FAILED) {
                                  peg$savedPos = s0;
                                  s1 = peg$c58();
                                  s0 = s1;
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepolyline() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s2 = peg$c0;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c1);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              if (input.substr(peg$currPos, 8) === peg$c59) {
                s4 = peg$c59;
                peg$currPos += 8;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c60);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsepts();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parsestroke_definition();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parse_();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parsefill();
                          if (s10 === peg$FAILED) {
                            s10 = null;
                          }
                          if (s10 !== peg$FAILED) {
                            s11 = peg$parse_();
                            if (s11 !== peg$FAILED) {
                              if (input.charCodeAt(peg$currPos) === 41) {
                                s12 = peg$c5;
                                peg$currPos++;
                              } else {
                                s12 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c6);
                                }
                              }
                              if (s12 !== peg$FAILED) {
                                s13 = peg$parse_();
                                if (s13 !== peg$FAILED) {
                                  peg$savedPos = s0;
                                  s1 = peg$c61(s6, s8, s10);
                                  s0 = s1;
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parserectangle() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 9) === peg$c62) {
              s3 = peg$c62;
              peg$currPos += 9;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c63);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestart();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseend();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parsestroke_definition();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parse_();
                          if (s10 !== peg$FAILED) {
                            s11 = peg$parsefill();
                            if (s11 !== peg$FAILED) {
                              s12 = peg$parse_();
                              if (s12 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 41) {
                                  s13 = peg$c5;
                                  peg$currPos++;
                                } else {
                                  s13 = peg$FAILED;
                                  if (peg$silentFails === 0) {
                                    peg$fail(peg$c6);
                                  }
                                }
                                if (s13 !== peg$FAILED) {
                                  peg$savedPos = s0;
                                  s1 = peg$c64(s5, s7, s9, s11);
                                  s0 = s1;
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseradius() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c65) {
              s3 = peg$c65;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c66);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c67(s5);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsemid() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c68) {
              s3 = peg$c68;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c69);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsex_y();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c7(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsestart() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c70) {
              s3 = peg$c70;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c71);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsex_y();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c7(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsex_y() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parsenumber();
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = peg$parsenumber();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c72(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parse_start() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c70) {
              s3 = peg$c70;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c71);
              }
            }
            if (s3 === peg$FAILED) {
              if (input.substr(peg$currPos, 6) === peg$c73) {
                s3 = peg$c73;
                peg$currPos += 6;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c74);
                }
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsex_y();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c75(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsecenter() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c73) {
              s3 = peg$c73;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c74);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsex_y();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c7(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseend() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c76) {
              s3 = peg$c76;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c77);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsex_y();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c7(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepts() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c78) {
              s3 = peg$c78;
              peg$currPos += 3;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c79);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parsexy();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                if (s6 !== peg$FAILED) {
                  while (s6 !== peg$FAILED) {
                    s5.push(s6);
                    s6 = peg$currPos;
                    s7 = peg$parsexy();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s7 = [s7, s8];
                        s6 = s7;
                      } else {
                        peg$currPos = s6;
                        s6 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  }
                } else {
                  s5 = peg$FAILED;
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c80(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsexy() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c81) {
              s3 = peg$c81;
              peg$currPos += 2;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c82);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsex_y();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c7(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsetext() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c83) {
              s3 = peg$c83;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c84);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parseat();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parseeffects();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parse_();
                          if (s10 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 41) {
                              s11 = peg$c5;
                              peg$currPos++;
                            } else {
                              s11 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c6);
                              }
                            }
                            if (s11 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c85(s3, s5, s7, s9);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepin() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s2 = peg$c0;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c1);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              if (input.substr(peg$currPos, 3) === peg$c86) {
                s4 = peg$c86;
                peg$currPos += 3;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c87);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                  s6 = [];
                  s7 = peg$currPos;
                  s8 = peg$parsepin_graphic_style();
                  if (s8 === peg$FAILED) {
                    s8 = peg$parsepin_electrical_type();
                    if (s8 === peg$FAILED) {
                      s8 = peg$parsealternate();
                      if (s8 === peg$FAILED) {
                        s8 = peg$parseat();
                        if (s8 === peg$FAILED) {
                          s8 = peg$parselength();
                          if (s8 === peg$FAILED) {
                            s8 = peg$parsehide_token();
                            if (s8 === peg$FAILED) {
                              s8 = peg$parsepin_name();
                              if (s8 === peg$FAILED) {
                                s8 = peg$parsepin_number();
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parse_();
                    if (s9 !== peg$FAILED) {
                      peg$savedPos = s7;
                      s8 = peg$c88(s8);
                      s7 = s8;
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s7;
                    s7 = peg$FAILED;
                  }
                  if (s7 !== peg$FAILED) {
                    while (s7 !== peg$FAILED) {
                      s6.push(s7);
                      s7 = peg$currPos;
                      s8 = peg$parsepin_graphic_style();
                      if (s8 === peg$FAILED) {
                        s8 = peg$parsepin_electrical_type();
                        if (s8 === peg$FAILED) {
                          s8 = peg$parsealternate();
                          if (s8 === peg$FAILED) {
                            s8 = peg$parseat();
                            if (s8 === peg$FAILED) {
                              s8 = peg$parselength();
                              if (s8 === peg$FAILED) {
                                s8 = peg$parsehide_token();
                                if (s8 === peg$FAILED) {
                                  s8 = peg$parsepin_name();
                                  if (s8 === peg$FAILED) {
                                    s8 = peg$parsepin_number();
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parse_();
                        if (s9 !== peg$FAILED) {
                          peg$savedPos = s7;
                          s8 = peg$c88(s8);
                          s7 = s8;
                        } else {
                          peg$currPos = s7;
                          s7 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s7;
                        s7 = peg$FAILED;
                      }
                    }
                  } else {
                    s6 = peg$FAILED;
                  }
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c89(s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepin_electrical_type() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 5) === peg$c90) {
          s1 = peg$c90;
          peg$currPos += 5;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c91);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 6) === peg$c92) {
            s1 = peg$c92;
            peg$currPos += 6;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c93);
            }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 13) === peg$c94) {
              s1 = peg$c94;
              peg$currPos += 13;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c95);
              }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 9) === peg$c96) {
                s1 = peg$c96;
                peg$currPos += 9;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c97);
                }
              }
              if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 7) === peg$c98) {
                  s1 = peg$c98;
                  peg$currPos += 7;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c99);
                  }
                }
                if (s1 === peg$FAILED) {
                  if (input.substr(peg$currPos, 4) === peg$c100) {
                    s1 = peg$c100;
                    peg$currPos += 4;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c101);
                    }
                  }
                  if (s1 === peg$FAILED) {
                    if (input.substr(peg$currPos, 11) === peg$c102) {
                      s1 = peg$c102;
                      peg$currPos += 11;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c103);
                      }
                    }
                    if (s1 === peg$FAILED) {
                      if (input.substr(peg$currPos, 8) === peg$c104) {
                        s1 = peg$c104;
                        peg$currPos += 8;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c105);
                        }
                      }
                      if (s1 === peg$FAILED) {
                        if (input.substr(peg$currPos, 9) === peg$c106) {
                          s1 = peg$c106;
                          peg$currPos += 9;
                        } else {
                          s1 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c107);
                          }
                        }
                        if (s1 === peg$FAILED) {
                          if (input.substr(peg$currPos, 14) === peg$c108) {
                            s1 = peg$c108;
                            peg$currPos += 14;
                          } else {
                            s1 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c109);
                            }
                          }
                          if (s1 === peg$FAILED) {
                            if (input.substr(peg$currPos, 12) === peg$c110) {
                              s1 = peg$c110;
                              peg$currPos += 12;
                            } else {
                              s1 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c111);
                              }
                            }
                            if (s1 === peg$FAILED) {
                              if (input.substr(peg$currPos, 10) === peg$c112) {
                                s1 = peg$c112;
                                peg$currPos += 10;
                              } else {
                                s1 = peg$FAILED;
                                if (peg$silentFails === 0) {
                                  peg$fail(peg$c113);
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c114(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsepin_graphic_style() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 14) === peg$c115) {
          s1 = peg$c115;
          peg$currPos += 14;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c116);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 4) === peg$c117) {
            s1 = peg$c117;
            peg$currPos += 4;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c118);
            }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 8) === peg$c119) {
              s1 = peg$c119;
              peg$currPos += 8;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c120);
              }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 9) === peg$c121) {
                s1 = peg$c121;
                peg$currPos += 9;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c122);
                }
              }
              if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 9) === peg$c123) {
                  s1 = peg$c123;
                  peg$currPos += 9;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c124);
                  }
                }
                if (s1 === peg$FAILED) {
                  if (input.substr(peg$currPos, 5) === peg$c125) {
                    s1 = peg$c125;
                    peg$currPos += 5;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c126);
                    }
                  }
                  if (s1 === peg$FAILED) {
                    if (input.substr(peg$currPos, 10) === peg$c127) {
                      s1 = peg$c127;
                      peg$currPos += 10;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c128);
                      }
                    }
                    if (s1 === peg$FAILED) {
                      if (input.substr(peg$currPos, 15) === peg$c129) {
                        s1 = peg$c129;
                        peg$currPos += 15;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c130);
                        }
                      }
                      if (s1 === peg$FAILED) {
                        if (input.substr(peg$currPos, 9) === peg$c131) {
                          s1 = peg$c131;
                          peg$currPos += 9;
                        } else {
                          s1 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c132);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c133(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsepin_name() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c134) {
              s3 = peg$c134;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c135);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$currPos;
                    s8 = peg$parseeffects();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parse_();
                      if (s9 !== peg$FAILED) {
                        s8 = [s8, s9];
                        s7 = s8;
                      } else {
                        peg$currPos = s7;
                        s7 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                    if (s7 === peg$FAILED) {
                      s7 = null;
                    }
                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s8 = peg$c5;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c6);
                        }
                      }
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c136(s5);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsepin_number() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c137) {
              s3 = peg$c137;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c138);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$currPos;
                    s8 = peg$parseeffects();
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parse_();
                      if (s9 !== peg$FAILED) {
                        s8 = [s8, s9];
                        s7 = s8;
                      } else {
                        peg$currPos = s7;
                        s7 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                    if (s7 === peg$FAILED) {
                      s7 = null;
                    }
                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s8 = peg$c5;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c6);
                        }
                      }
                      if (s8 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c139(s5);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsealternate() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 9) === peg$c140) {
              s3 = peg$c140;
              peg$currPos += 9;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c141);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsesymbol();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = [];
                    s8 = peg$currPos;
                    s9 = peg$parsepin_graphic_style();
                    if (s9 === peg$FAILED) {
                      s9 = peg$parsepin_electrical_type();
                    }
                    if (s9 !== peg$FAILED) {
                      s10 = peg$parse_();
                      if (s10 !== peg$FAILED) {
                        peg$savedPos = s8;
                        s9 = peg$c142(s3, s5, s9);
                        s8 = s9;
                      } else {
                        peg$currPos = s8;
                        s8 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s8;
                      s8 = peg$FAILED;
                    }
                    if (s8 !== peg$FAILED) {
                      while (s8 !== peg$FAILED) {
                        s7.push(s8);
                        s8 = peg$currPos;
                        s9 = peg$parsepin_graphic_style();
                        if (s9 === peg$FAILED) {
                          s9 = peg$parsepin_electrical_type();
                        }
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parse_();
                          if (s10 !== peg$FAILED) {
                            peg$savedPos = s8;
                            s9 = peg$c142(s3, s5, s9);
                            s8 = s9;
                          } else {
                            peg$currPos = s8;
                            s8 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s8;
                          s8 = peg$FAILED;
                        }
                      }
                    } else {
                      s7 = peg$FAILED;
                    }
                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s8 = peg$c5;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c6);
                        }
                      }
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parse_();
                        if (s9 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c143(s3, s5, s7);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parselength() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c144) {
              s3 = peg$c144;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c145);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c7(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseunit_name() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s2 = peg$c0;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c1);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              if (input.substr(peg$currPos, 9) === peg$c146) {
                s4 = peg$c146;
                peg$currPos += 9;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c147);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parsestring();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parse_();
                    if (s7 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 41) {
                        s8 = peg$c5;
                        peg$currPos++;
                      } else {
                        s8 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c6);
                        }
                      }
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parse_();
                        if (s9 !== peg$FAILED) {
                          s1 = [s1, s2, s3, s4, s5, s6, s7, s8, s9];
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseat() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 2) === peg$c148) {
              s3 = peg$c148;
              peg$currPos += 2;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c149);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsenumber();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$currPos;
                        s10 = peg$parsenumber();
                        if (s10 !== peg$FAILED) {
                          s11 = peg$parse_();
                          if (s11 !== peg$FAILED) {
                            s10 = [s10, s11];
                            s9 = s10;
                          } else {
                            peg$currPos = s9;
                            s9 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s9;
                          s9 = peg$FAILED;
                        }
                        if (s9 === peg$FAILED) {
                          s9 = null;
                        }
                        if (s9 !== peg$FAILED) {
                          s10 = peg$currPos;
                          if (input.substr(peg$currPos, 8) === peg$c150) {
                            s11 = peg$c150;
                            peg$currPos += 8;
                          } else {
                            s11 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c151);
                            }
                          }
                          if (s11 !== peg$FAILED) {
                            s12 = peg$parse_();
                            if (s12 !== peg$FAILED) {
                              s11 = [s11, s12];
                              s10 = s11;
                            } else {
                              peg$currPos = s10;
                              s10 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s10;
                            s10 = peg$FAILED;
                          }
                          if (s10 === peg$FAILED) {
                            s10 = null;
                          }
                          if (s10 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 41) {
                              s11 = peg$c5;
                              peg$currPos++;
                            } else {
                              s11 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c6);
                              }
                            }
                            if (s11 !== peg$FAILED) {
                              peg$savedPos = s0;
                              s1 = peg$c152(s3, s5, s7, s9, s10);
                              s0 = s1;
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsestroke_definition() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        s1 = peg$parse_();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 40) {
            s2 = peg$c0;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c1);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parse_();
            if (s3 !== peg$FAILED) {
              if (input.substr(peg$currPos, 6) === peg$c153) {
                s4 = peg$c153;
                peg$currPos += 6;
              } else {
                s4 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c154);
                }
              }
              if (s4 !== peg$FAILED) {
                s5 = peg$parse_();
                if (s5 !== peg$FAILED) {
                  s6 = [];
                  s7 = peg$currPos;
                  s8 = peg$parsewidth();
                  if (s8 === peg$FAILED) {
                    s8 = peg$parsestroke_type();
                    if (s8 === peg$FAILED) {
                      s8 = peg$parsecolor();
                    }
                  }
                  if (s8 !== peg$FAILED) {
                    s9 = peg$parse_();
                    if (s9 !== peg$FAILED) {
                      peg$savedPos = s7;
                      s8 = peg$c31(s4, s8);
                      s7 = s8;
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s7;
                    s7 = peg$FAILED;
                  }
                  while (s7 !== peg$FAILED) {
                    s6.push(s7);
                    s7 = peg$currPos;
                    s8 = peg$parsewidth();
                    if (s8 === peg$FAILED) {
                      s8 = peg$parsestroke_type();
                      if (s8 === peg$FAILED) {
                        s8 = peg$parsecolor();
                      }
                    }
                    if (s8 !== peg$FAILED) {
                      s9 = peg$parse_();
                      if (s9 !== peg$FAILED) {
                        peg$savedPos = s7;
                        s8 = peg$c31(s4, s8);
                        s7 = s8;
                      } else {
                        peg$currPos = s7;
                        s7 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s7;
                      s7 = peg$FAILED;
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c32(s4, s6);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsewidth() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c155) {
              s3 = peg$c155;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c156);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c7(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsestroke_type() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c157) {
              s3 = peg$c157;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c158);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.substr(peg$currPos, 4) === peg$c159) {
                  s5 = peg$c159;
                  peg$currPos += 4;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c160);
                  }
                }
                if (s5 === peg$FAILED) {
                  if (input.substr(peg$currPos, 8) === peg$c161) {
                    s5 = peg$c161;
                    peg$currPos += 8;
                  } else {
                    s5 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c162);
                    }
                  }
                  if (s5 === peg$FAILED) {
                    if (input.substr(peg$currPos, 12) === peg$c163) {
                      s5 = peg$c163;
                      peg$currPos += 12;
                    } else {
                      s5 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c164);
                      }
                    }
                    if (s5 === peg$FAILED) {
                      if (input.substr(peg$currPos, 3) === peg$c165) {
                        s5 = peg$c165;
                        peg$currPos += 3;
                      } else {
                        s5 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c166);
                        }
                      }
                      if (s5 === peg$FAILED) {
                        if (input.substr(peg$currPos, 7) === peg$c167) {
                          s5 = peg$c167;
                          peg$currPos += 7;
                        } else {
                          s5 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c168);
                          }
                        }
                        if (s5 === peg$FAILED) {
                          if (input.substr(peg$currPos, 5) === peg$c169) {
                            s5 = peg$c169;
                            peg$currPos += 5;
                          } else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) {
                              peg$fail(peg$c170);
                            }
                          }
                        }
                      }
                    }
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c171(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsecolor() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 5) === peg$c172) {
              s3 = peg$c172;
              peg$currPos += 5;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c173);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsenumber();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parsenumber();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parse_();
                          if (s10 !== peg$FAILED) {
                            s11 = peg$parsenumber();
                            if (s11 !== peg$FAILED) {
                              s12 = peg$parse_();
                              if (s12 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 41) {
                                  s13 = peg$c5;
                                  peg$currPos++;
                                } else {
                                  s13 = peg$FAILED;
                                  if (peg$silentFails === 0) {
                                    peg$fail(peg$c6);
                                  }
                                }
                                if (s13 !== peg$FAILED) {
                                  peg$savedPos = s0;
                                  s1 = peg$c174(s3, s5, s7, s9, s11);
                                  s0 = s1;
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsefill() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12, s13;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c175) {
              s3 = peg$c175;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c176);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 40) {
                  s5 = peg$c0;
                  peg$currPos++;
                } else {
                  s5 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c1);
                  }
                }
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.substr(peg$currPos, 4) === peg$c157) {
                      s7 = peg$c157;
                      peg$currPos += 4;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c158);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        s9 = peg$parsesymbol();
                        if (s9 !== peg$FAILED) {
                          s10 = peg$parse_();
                          if (s10 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 41) {
                              s11 = peg$c5;
                              peg$currPos++;
                            } else {
                              s11 = peg$FAILED;
                              if (peg$silentFails === 0) {
                                peg$fail(peg$c6);
                              }
                            }
                            if (s11 !== peg$FAILED) {
                              s12 = peg$parse_();
                              if (s12 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 41) {
                                  s13 = peg$c5;
                                  peg$currPos++;
                                } else {
                                  s13 = peg$FAILED;
                                  if (peg$silentFails === 0) {
                                    peg$fail(peg$c6);
                                  }
                                }
                                if (s13 !== peg$FAILED) {
                                  peg$savedPos = s0;
                                  s1 = peg$c13(s3, s9);
                                  s0 = s1;
                                } else {
                                  peg$currPos = s0;
                                  s0 = peg$FAILED;
                                }
                              } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                              }
                            } else {
                              peg$currPos = s0;
                              s0 = peg$FAILED;
                            }
                          } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                          }
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseeffects() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c177) {
              s3 = peg$c177;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c178);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parsefont();
                if (s7 === peg$FAILED) {
                  s7 = peg$parsejustify();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsehide();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsehide_token();
                    }
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parsefont();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsejustify();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsehide();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parsehide_token();
                      }
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c179(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsefont() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c180) {
              s3 = peg$c180;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c181);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parseface();
                if (s7 === peg$FAILED) {
                  s7 = peg$parsesize();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsethickness();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsebold();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parseitalic();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parsebold_token();
                          if (s7 === peg$FAILED) {
                            s7 = peg$parseitalic_token();
                          }
                        }
                      }
                    }
                  }
                }
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parseface();
                  if (s7 === peg$FAILED) {
                    s7 = peg$parsesize();
                    if (s7 === peg$FAILED) {
                      s7 = peg$parsethickness();
                      if (s7 === peg$FAILED) {
                        s7 = peg$parsebold();
                        if (s7 === peg$FAILED) {
                          s7 = peg$parseitalic();
                          if (s7 === peg$FAILED) {
                            s7 = peg$parsebold_token();
                            if (s7 === peg$FAILED) {
                              s7 = peg$parseitalic_token();
                            }
                          }
                        }
                      }
                    }
                  }
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c182(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsethickness() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 9) === peg$c183) {
              s3 = peg$c183;
              peg$currPos += 9;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c184);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c7(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseface() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c185) {
              s3 = peg$c185;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c186);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsestring();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c7(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsesize() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c187) {
              s3 = peg$c187;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c188);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsenumber();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    s7 = peg$parsenumber();
                    if (s7 !== peg$FAILED) {
                      s8 = peg$parse_();
                      if (s8 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 41) {
                          s9 = peg$c5;
                          peg$currPos++;
                        } else {
                          s9 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c6);
                          }
                        }
                        if (s9 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c189(s3, s5, s7);
                          s0 = s1;
                        } else {
                          peg$currPos = s0;
                          s0 = peg$FAILED;
                        }
                      } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseitalic() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 6) === peg$c190) {
              s3 = peg$c190;
              peg$currPos += 6;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c191);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsebool();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c7(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseitalic_token() {
        var s0, s1, s2;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 6) === peg$c190) {
          s1 = peg$c190;
          peg$currPos += 6;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c191);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c192();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsebold() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c193) {
              s3 = peg$c193;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c194);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsebool();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c7(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsebold_token() {
        var s0, s1, s2;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c193) {
          s1 = peg$c193;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c194);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c195();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsejustify() {
        var s0, s1, s2, s3, s4, s5, s6, s7, s8;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 7) === peg$c196) {
              s3 = peg$c196;
              peg$currPos += 7;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c197);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = [];
                s6 = peg$currPos;
                s7 = peg$parseJUSTIFY();
                if (s7 !== peg$FAILED) {
                  s8 = peg$parse_();
                  if (s8 !== peg$FAILED) {
                    s7 = [s7, s8];
                    s6 = s7;
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s6;
                  s6 = peg$FAILED;
                }
                while (s6 !== peg$FAILED) {
                  s5.push(s6);
                  s6 = peg$currPos;
                  s7 = peg$parseJUSTIFY();
                  if (s7 !== peg$FAILED) {
                    s8 = peg$parse_();
                    if (s8 !== peg$FAILED) {
                      s7 = [s7, s8];
                      s6 = s7;
                    } else {
                      peg$currPos = s6;
                      s6 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s6;
                    s6 = peg$FAILED;
                  }
                }
                if (s5 !== peg$FAILED) {
                  if (input.charCodeAt(peg$currPos) === 41) {
                    s6 = peg$c5;
                    peg$currPos++;
                  } else {
                    s6 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c6);
                    }
                  }
                  if (s6 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c198(s3, s5);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseJUSTIFY() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c199) {
          s1 = peg$c199;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c200);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 5) === peg$c201) {
            s1 = peg$c201;
            peg$currPos += 5;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c202);
            }
          }
          if (s1 === peg$FAILED) {
            if (input.substr(peg$currPos, 3) === peg$c203) {
              s1 = peg$c203;
              peg$currPos += 3;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c204);
              }
            }
            if (s1 === peg$FAILED) {
              if (input.substr(peg$currPos, 6) === peg$c205) {
                s1 = peg$c205;
                peg$currPos += 6;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c206);
                }
              }
              if (s1 === peg$FAILED) {
                if (input.substr(peg$currPos, 6) === peg$c207) {
                  s1 = peg$c207;
                  peg$currPos += 6;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c208);
                  }
                }
              }
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c209(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsehide() {
        var s0, s1, s2, s3, s4, s5, s6, s7;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.substr(peg$currPos, 4) === peg$c35) {
              s3 = peg$c35;
              peg$currPos += 4;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c36);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsebool();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 41) {
                      s7 = peg$c5;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c6);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c7(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsebool() {
        var s0, s1;
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 3) === peg$c210) {
          s1 = peg$c210;
          peg$currPos += 3;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c211);
          }
        }
        if (s1 === peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c212) {
            s1 = peg$c212;
            peg$currPos += 2;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c213);
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c214(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsestring() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 34) {
          s1 = peg$c215;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c216);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parseDoubleStringCharacter();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parseDoubleStringCharacter();
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 34) {
              s3 = peg$c215;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c216);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c217(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 39) {
            s1 = peg$c218;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c219);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseSingleStringCharacter();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseSingleStringCharacter();
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 39) {
                s3 = peg$c218;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c219);
                }
              }
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c217(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
        return s0;
      }
      function peg$parseDoubleStringCharacter() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 34) {
          s2 = peg$c215;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c216);
          }
        }
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 92) {
            s2 = peg$c220;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c221);
            }
          }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = void 0;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c222);
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c223(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 92) {
            s1 = peg$c220;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c221);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseEscapeSequence();
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c224(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
        return s0;
      }
      function peg$parseSingleStringCharacter() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 39) {
          s2 = peg$c218;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c219);
          }
        }
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 92) {
            s2 = peg$c220;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c221);
            }
          }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = void 0;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c222);
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c223(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 92) {
            s1 = peg$c220;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c221);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseEscapeSequence();
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c224(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
        return s0;
      }
      function peg$parseEscapeSequence() {
        var s0, s1;
        if (input.charCodeAt(peg$currPos) === 39) {
          s0 = peg$c218;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c219);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s0 = peg$c215;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c216);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 92) {
              s0 = peg$c220;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c221);
              }
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 98) {
                s1 = peg$c225;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c226);
                }
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c227();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 102) {
                  s1 = peg$c228;
                  peg$currPos++;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c229);
                  }
                }
                if (s1 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c230();
                }
                s0 = s1;
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  if (input.charCodeAt(peg$currPos) === 110) {
                    s1 = peg$c231;
                    peg$currPos++;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c232);
                    }
                  }
                  if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c233();
                  }
                  s0 = s1;
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 114) {
                      s1 = peg$c234;
                      peg$currPos++;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c235);
                      }
                    }
                    if (s1 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c236();
                    }
                    s0 = s1;
                    if (s0 === peg$FAILED) {
                      s0 = peg$currPos;
                      if (input.charCodeAt(peg$currPos) === 116) {
                        s1 = peg$c237;
                        peg$currPos++;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c238);
                        }
                      }
                      if (s1 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c239();
                      }
                      s0 = s1;
                      if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        if (input.charCodeAt(peg$currPos) === 118) {
                          s1 = peg$c240;
                          peg$currPos++;
                        } else {
                          s1 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c241);
                          }
                        }
                        if (s1 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c242();
                        }
                        s0 = s1;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parsechar() {
        var s0, s1, s2;
        if (peg$c243.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c244);
          }
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 92) {
            s1 = peg$c220;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c221);
            }
          }
          if (s1 !== peg$FAILED) {
            if (peg$c245.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c246);
              }
            }
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
        return s0;
      }
      function peg$parsenumber() {
        var s0, s1, s2, s3, s4;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$currPos;
        if (peg$c247.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c248);
          }
        }
        if (s3 === peg$FAILED) {
          s3 = null;
        }
        if (s3 !== peg$FAILED) {
          s4 = peg$parseExponential();
          if (s4 === peg$FAILED) {
            s4 = peg$parseReal();
            if (s4 === peg$FAILED) {
              s4 = peg$parseFraction();
              if (s4 === peg$FAILED) {
                s4 = peg$parsedigits();
              }
            }
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c249(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parsenumber_() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = peg$parsenumber();
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c19(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseReal() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$currPos;
        s3 = peg$parsedigits();
        if (s3 !== peg$FAILED) {
          s4 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 46) {
            s5 = peg$c250;
            peg$currPos++;
          } else {
            s5 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c251);
            }
          }
          if (s5 !== peg$FAILED) {
            s6 = peg$parsedigits();
            if (s6 === peg$FAILED) {
              s6 = null;
            }
            if (s6 !== peg$FAILED) {
              s5 = [s5, s6];
              s4 = s5;
            } else {
              peg$currPos = s4;
              s4 = peg$FAILED;
            }
          } else {
            peg$currPos = s4;
            s4 = peg$FAILED;
          }
          if (s4 === peg$FAILED) {
            s4 = null;
          }
          if (s4 !== peg$FAILED) {
            s3 = [s3, s4];
            s2 = s3;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 === peg$FAILED) {
          s2 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 46) {
            s3 = peg$c250;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c251);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsedigits();
            if (s4 !== peg$FAILED) {
              s3 = [s3, s4];
              s2 = s3;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c252(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parseExponential() {
        var s0, s1, s2, s3, s4, s5, s6;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = peg$currPos;
        s3 = peg$parsedigits();
        if (s3 === peg$FAILED) {
          s3 = peg$parseReal();
        }
        if (s3 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 101) {
            s4 = peg$c253;
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c254);
            }
          }
          if (s4 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 69) {
              s4 = peg$c255;
              peg$currPos++;
            } else {
              s4 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c256);
              }
            }
          }
          if (s4 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 43) {
              s5 = peg$c257;
              peg$currPos++;
            } else {
              s5 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c258);
              }
            }
            if (s5 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 45) {
                s5 = peg$c259;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c260);
                }
              }
            }
            if (s5 === peg$FAILED) {
              s5 = null;
            }
            if (s5 !== peg$FAILED) {
              s6 = peg$parsedigits();
              if (s6 !== peg$FAILED) {
                s3 = [s3, s4, s5, s6];
                s2 = s3;
              } else {
                peg$currPos = s2;
                s2 = peg$FAILED;
              }
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
        } else {
          peg$currPos = s2;
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c261(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parseFraction() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$parsedigits();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 47) {
            s2 = peg$c262;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c263);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsedigits();
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c264(s1, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsedigits() {
        var s0, s1, s2;
        s0 = peg$currPos;
        s1 = [];
        if (peg$c265.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c266);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c265.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c266);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s0 = input.substring(s0, peg$currPos);
        } else {
          s0 = s1;
        }
        return s0;
      }
      function peg$parsesymbol() {
        var s0, s1, s2, s3;
        s0 = peg$currPos;
        s1 = peg$currPos;
        s2 = [];
        if (peg$c267.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c268);
          }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c267.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c268);
              }
            }
          }
        } else {
          s2 = peg$FAILED;
        }
        if (s2 !== peg$FAILED) {
          s1 = input.substring(s1, peg$currPos);
        } else {
          s1 = s2;
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c269(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parse_() {
        var s0, s1;
        peg$silentFails++;
        s0 = [];
        if (peg$c271.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c272);
          }
        }
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (peg$c271.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c272);
            }
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c270);
          }
        }
        return s0;
      }
      function peg$parseEmptyLine() {
        var s0, s1, s2, s3;
        s0 = [];
        s1 = peg$currPos;
        s2 = peg$parseWhitespace();
        if (s2 === peg$FAILED) {
          s2 = null;
        }
        if (s2 !== peg$FAILED) {
          s3 = peg$parseNewline();
          if (s3 !== peg$FAILED) {
            s2 = [s2, s3];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$FAILED;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          while (s1 !== peg$FAILED) {
            s0.push(s1);
            s1 = peg$currPos;
            s2 = peg$parseWhitespace();
            if (s2 === peg$FAILED) {
              s2 = null;
            }
            if (s2 !== peg$FAILED) {
              s3 = peg$parseNewline();
              if (s3 !== peg$FAILED) {
                s2 = [s2, s3];
                s1 = s2;
              } else {
                peg$currPos = s1;
                s1 = peg$FAILED;
              }
            } else {
              peg$currPos = s1;
              s1 = peg$FAILED;
            }
          }
        } else {
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseWhitespace() {
        var s0, s1;
        s0 = [];
        if (peg$c273.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c274);
          }
        }
        if (s1 !== peg$FAILED) {
          while (s1 !== peg$FAILED) {
            s0.push(s1);
            if (peg$c273.test(input.charAt(peg$currPos))) {
              s1 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s1 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c274);
              }
            }
          }
        } else {
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseNewline() {
        var s0;
        if (input.substr(peg$currPos, 2) === peg$c275) {
          s0 = peg$c275;
          peg$currPos += 2;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c276);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 10) {
            s0 = peg$c277;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c278);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 13) {
              s0 = peg$c279;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c280);
              }
            }
          }
        }
        return s0;
      }
      peg$result = peg$startRuleFunction();
      if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
      } else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
          peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(
          peg$maxFailExpected,
          peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
          peg$maxFailPos < input.length ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1) : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
        );
      }
    }
    module.exports = {
      SyntaxError: peg$SyntaxError,
      parse: peg$parse
    };
  }
});

// src/parse.ts
var import_module_parser = __toESM(require_module_parser());
var import_symbol_parser = __toESM(require_symbol_parser());

// src/utils.ts
var verbose = false;
function simplify_primitive(x) {
  verbose && console.log("simplify_primitive: ", x);
  switch (x.type) {
    case "string":
    case "hex":
    case "boolean":
      return x.value;
    case "number":
      return parseFloat(x.value);
    case "array":
      return x.value.map(
        (x2) => x2.type === "number" ? parseFloat(x2.value) : x2.value
      );
    default:
      if (x.type === "at") {
        console.log(x);
        process.exit();
      }
      return {
        type: x.type,
        value: simplify_primitive(x.value)
      };
  }
}
var post_process = (x, long = true) => {
  let current = x;
  let next;
  let values = [];
  let i = 0;
  let SI;
  const stack = [];
  while (true) {
    verbose && console.log(
      "> " + stack.map((x2) => `${x2[0].type}[${x2[1]}]`).join("/") + `/${current.type}[${i}]`
    );
    if (i >= current.value.length) {
      let out;
      if (long && (current.type === "kicad_pcb" || current.type === "module" || current.type === "kicad_symbol_lib")) {
        out = { type: current.type, value: values };
      } else {
        out = _process(values, current.type, stack);
      }
      let SI2 = stack.pop();
      if (typeof SI2 === "undefined") {
        verbose && console.log("post_process returning", JSON.stringify(out, null, 2));
        return out;
      }
      [current, i, values] = SI2;
      values.push(out);
      i++;
      continue;
    }
    next = current.value[i];
    verbose && console.log("curent", current);
    verbose && console.log("next", next);
    if (Array.isArray(next.value)) {
      SI = [current, i, values];
      stack.push(SI);
      current = next;
      verbose && console.log("recurse\n>>>");
      i = 0;
      values = [];
    } else {
      values.push(
        simplify_primitive(next)
      );
      i++;
    }
  }
};
var has_dups = [];
function _process(values, type, stack) {
  verbose && console.log(">> _process:", values, type);
  switch (type) {
    case "setup":
      gather(values, "user_trace_width");
      gather(values, "user_via");
      break;
    case "zone":
      gather(values, "filled_polygon");
      gather(values, "polygon");
      break;
    case "fill_segments":
      gather(values, "pts");
      break;
    case "net_class":
      gather(values, "add_net");
      break;
    case "kicad_symbol_lib":
      gather(values, "symbol");
      break;
    case "symbol":
      gather(values, "symbol");
      gather(values, "pin");
      gather(values, "properties");
      gather(values, "arc");
      gather(values, "circle");
      gather(values, "polyline");
      gather(values, "rectangle");
      gather(values, "text");
      break;
    case "pin":
      gather(values, "alternate");
      break;
  }
  switch (type) {
    case "kicad_pcb":
      return {
        type,
        value: gather_all(values, [
          "version",
          "general",
          "page info",
          "page",
          "paper",
          "host",
          "title_block",
          "setup",
          "layers"
        ])
      };
    case "module":
      return {
        type,
        value: gather_all(values, [
          "name",
          "layer",
          "tedit",
          "tstamp",
          "at",
          "descr",
          "tags"
        ])
      };
    case "kicad_symbol_lib":
      return {
        type,
        value: gather_all(values, [
          "version",
          "generator",
          "generator_version",
          "symbol"
        ])
      };
    case "area":
    case "layers":
    // setup options:
    case "user_via":
    case "user_diff_pair":
    case "pcb_text_size":
    case "mod_text_size":
    case "pad_size":
    case "aux_axis_origin":
    case "grid_origin":
    // pad
    case "primitives":
    case "justify":
      if (values.every((x) => typeof x === "object" && "type" in x))
        return { type, value: values.map((x) => x.value) };
      return { type, value: values };
    case "pts":
      return { type, value: values.map((x) => x.value) };
    case "net_tie_pad_groups":
      return { type, value: values.map((x) => x.value) };
    default:
      if (!values.every((x) => typeof x.type !== "undefined")) {
        console.error(values);
        throw `Invalid values array ${stack.map((x) => `${x[0].type}[${x[1]}]`).join("/")}/` + type;
      }
      const ukeys = new Set(values.map((x) => x.type));
      if (has_dups.indexOf(type) === -1 && ukeys.size < values.length) {
        const tallies = {};
        for (let v of values) {
          tallies[v.type] = (tallies[v.type] || 0) + 1;
        }
        console.log(
          "duplicate keys: " + Object.entries(tallies).filter((x) => x[1] > 1).map((x) => `${x[0]}(${x[1]})`).join(", ")
        );
        console.log(values);
        throw `Duplicate Keys in ${stack.map((x) => `${x[0].type}[${x[1]}]`).join("/")}/` + type;
      }
      return {
        type,
        value: Object.fromEntries(values.map((x) => [x.type, x.value]))
      };
  }
}
function gather(values, key) {
  var indexes = [];
  for (let [i, x] of values.entries()) {
    if (x.type === key) indexes.unshift(i);
  }
  if (!indexes.length) return;
  const vals = [];
  for (let indx of indexes) {
    vals.unshift(values.splice(indx, 1)[0].value);
  }
  values.splice(indexes[indexes.length - 1], 0, { type: key, value: vals });
}
function gather_all(values, singletons) {
  const out = {};
  for (let x of values) {
    if (typeof x.type === "undefined") {
      console.log(x);
      throw "problem";
    }
    if (singletons.indexOf(x.type) !== -1) {
      if (x.type in out)
        throw `Duplicate values encountered for singleton '${x.type}'`;
      out[x.type] = x.value;
    } else {
      if (!(x.type in out)) out[x.type] = [];
      out[x.type].push(x.value);
    }
  }
  return out;
}

// src/parse.ts
import chalk from "chalk";
function parseModule(mod, format, options) {
  return parse(import_module_parser.parse, mod, format, options);
}
function parseSymbolVerbose(mod, format, options) {
  return parse_verbose(import_symbol_parser.parse, mod, format, options);
}
function parse(parser, mod, format, options) {
  const data = parser(mod, options);
  if (format === "bare") return data;
  const sdata = post_process(data, format === "long");
  return Object.fromEntries([[sdata.type, sdata.value]]);
}
function parse_verbose(parser, mod, format, options) {
  let data;
  try {
    data = parser(mod, options);
  } catch (err) {
    console.log(
      chalk.bgRed.black(
        `Falied to parse module with options: ${JSON.stringify(options)}`
      )
    );
    throw err;
  }
  if (format === "bare") return data;
  let sdata;
  try {
    sdata = post_process(data, format === "long");
  } catch (err) {
    console.log(chalk.bgRed.black("Something Went Wrong with post_process"));
    throw err;
  }
  return Object.fromEntries([[sdata.type, sdata.value]]);
}

// src/index.ts
var parse2 = {
  module: (x, format = "compact", options = {}) => parseModule(x, format, { startRule: "module", ...options }),
  board: (x, format = "compact", options = {}) => parseModule(x, format, { startRule: "board", ...options }),
  symbol: (x, format = "compact", options = {}) => parseSymbolVerbose(x, format, {
    startRule: "kicad_symbol_lib",
    ...options
  })
};
export {
  parse2 as parse
};
//# sourceMappingURL=index.mjs.map