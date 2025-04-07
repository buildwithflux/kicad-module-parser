
board /* parseBOARD_unchecked */
    = EmptyLine* "(" _
    type: "kicad_pcb" _
    rest:( val:(
        general /
        host /
        generator /
        generator_version /
        version /
        paper /
        title_block /
        board_layers /
        setup /
        net /
        net_class /
        gr_arc /
        gr_circle /
        gr_curve /
        gr_line /
        gr_rect /
        gr_poly /
        gr_text /
        module /
        segment /
        arc /
        via /
        zone /
        target /
        dimension) _ {return val})*
    ")" _ {
        return {type, value: rest}
};


// --------------------------------------------------
// headers
// --------------------------------------------------

general /* parseGeneralSection */
 =  "(" _ type:"general" _
        options: (general_opt/general_array_opt)*
    ")" {
    return { type,value: options }
 }

general_opt
 = ( "(" _
        type:("thickness"/"drawings"/"tracks"/"zones"/"modules"/"nets"/"links"/"no_connects"/"area") _
        value:number_
    ")" _ {
        return {type, value}
    })

general_array_opt
 =  "(" _
        type:("area") _
        value:number_*
    ")" _ {return {type, value}}


paper /* parsePAGE_INFO */
 =  "(" _
        ("page"/"paper") _
        ('"'/'"')? _
        size:("A0"/"A1"/"A2"/"A3"/"A4"/"A5"/"A"/"B"/"C"/"D") _
        ('"'/'"')? _
        portrait:("portrait" _ )?
        ")" {
        const value = [
            { type: "size", value: {type: "string", value: size } },
            { type: "portrait", value: { type: "boolean", value: !!portrait } }
        ]
    return {type: "page", value}
 }

title_block /* parseTITLE_BLOCK */
 =  "(" _
        type:"title_block" _
        options: ( "(" _ $("title" / "date"  / "rev"  / "company" / ("comment" _ [0-8])) _ (string/symbol) _ ")" _) *
    ")" {
    return {type, value: options.map(x => ({ type: x[2],value: x[4]}))}
 }

// --------------------------------------------------
// layers
// --------------------------------------------------

board_layers  /* parseLayers */
 =  "(" _
        type:"layers" _
        value:( v:_board_layer _ {return v})*
    ")"{
        return { type, value }
}

_board_layer  /* parseLayer */
 =  "(" _
        index:(symbol / number) _
        name:symbol _
        layer_type: (("user" _ value:string {return value})/symbol) _
        hide:("hide" _ )?
    ")"{
    const value = [
        {type: "index", value: index},
        {type: "name", value: name},
        {type: "layer_type", value: layer_type},
        {type: "hide", value: { type: "boolean", value: !!hide }}

        ]
    return { type: "layer", value }
}

// --------------------------------------------------
// setup
// --------------------------------------------------

setup /* parseSetup */
 =  "(" _
    type:"setup" _
    values:(
        (setup_boardunits /
        setup_flag /
        setup_array /
        setup_hex /
        defaults /
        pcbplotparams /
        unsupported_setup) _
        )*
    ")"{
    return {type, value:values.map(x => x[0])}
 }

setup_flag
    = "(" _ type:SETUP_FLAG _ value:bool _ ")" { return { type, value } }
SETUP_FLAG
 = "filled_areas_thickness"
 / "blind_buried_vias_allowed"
 / "uvias_allowed"
 / "zone_45_only"

setup_boardunits
 = "(" _ type:SETUP_BOARDUNITS _ value:number _ ")" { return { type, value } }

SETUP_BOARDUNITS
 = "last_trace_width"
 / "user_trace_width"
 / "trace_clearance"
 / "zone_clearance"
 / "clearance_min"
 / "trace_min"
 / "via_size"
 / "via_drill"
 / "via_min_annulus"
 / "via_min_size"
 / "through_hole_min"
 / "via_min_drill"
 / "hole_to_hole_min"
 / "uvia_size"
 / "uvia_drill"
 / "uvia_min_size"
 / "uvia_min_drill"
 / "segment_width"
 / "edge_width"
 / "mod_edge_width"
 / "pcb_text_width"
 / "mod_text_width"
 / "pad_to_mask_clearance"
 / "solder_mask_min_width"
 / "pad_to_paste_clearance_ratio"
 / "pad_to_paste_clearance"
 / "max_error"
 / "pad_drill"
 / "pad_to_paste_clearance_ratio" // double, not board units...

setup_hex
 = "(" _ type:"visible_elements" _ value:hex _ ")" { return { type, value } }

setup_array
 = "(" _ type:SETUP_ARRAY _ value:(number _)+ ")" {
     return {type,value: value.map(x => x[0])}
     }
SETUP_ARRAY
 = "user_via"
 / "user_diff_pair"
 / "pcb_text_size"
 / "mod_text_size"
 / "pad_size"
 / "aux_axis_origin"
 / "grid_origin"


defaults /* parseSetup */
 =  "(" _ type:"defaults" _ values:(default_boardunits / default_int / default_text_dims _ )* ")"{
    return {type, value:values.map(x => x[0])}
}

default_boardunits
 = "(" _ type:DEFAULT_BOARDUNITS _ value:number _ ")" { return { type, value } }

DEFAULT_BOARDUNITS
 = "T_edge_clearance"
 / "T_copper_line_width"
 / "T_courtyard_line_width"
 / "T_edge_cuts_line_width"
 / "T_silk_line_width"
 / "T_fab_layers_line_width"
 / "T_other_layers_line_width"

default_int
 = "(" _ type:DEFAULT_INT _ value:digits _ ")" { return { type, value } }

DEFAULT_INT
 = "dimension_units"
 / "dimension_precision"

default_text_dims
 = "(" _ type:DEFAULT_TEXT_DIMS _ attrs:(( size/thickness/bold/italic) _ )* ")" {
    return { type, value: attrs.map(x => x[0]) }
}
DEFAULT_TEXT_DIMS
 = "copper_text_dims"
 / "silk_text_dims"
 / "fab_layers_text_dims"
 / "other_layers_text_dims"

pcbplotparams
 =  "(" _
    type:"pcbplotparams" _
     values:(
        (pcbplotparams_flag /
        pcbplotparams_numeric /
        pcbplotparams_layerselection /
        pcbplotparams_plot_on_all_layers_selection /
        pcbplotparams_outputdirectory) _
        )*
    ")"{
    return {type, value:values.map(x => x[0])}
 }

pcbplotparams_layerselection
    = "(" _ type:"layerselection" _ value:(string/symbol) _ ")" {
        return { type, value }
    }

pcbplotparams_plot_on_all_layers_selection
    = "(" _ type:"plot_on_all_layers_selection" _ value:(string/symbol) _ ")" {
        return { type, value }
    }

pcbplotparams_outputdirectory
    = "(" _ type:"outputdirectory" _ value:(string/symbol) _ ")" {
        return { type, value }
    }

pcbplotparams_numeric
    = "(" _ type:PCBPLOTPARAMS_NUMERIC _ value:number _ ")" { return { type, value } }

PCBPLOTPARAMS_NUMERIC
 = "linewidth"
 / "mode"
 / "hpglpennumber"
 / "hpglpenspeed"
 / "hpglpendiameter"
 / "hpglpenoverlay"
 / "outputformat"
 / "drillshape"
 / "scaleselection"
 / "svgprecision"
 / "dashed_line_dash_ratio"
 / "dashed_line_gap_ratio"

pcbplotparams_flag
    = "(" _ type:PCBPLOTPARAMS_FLAG _ value:pcbplotparams_bool _ ")" { return { type, value } }

PCBPLOTPARAMS_FLAG
 = "disableapertmacros"
 / "usegerberextensions"
 / "usegerberattributes"
 / "usegerberadvancedattributes"
 / "creategerberjobfile"
 / "svguseinch"
 / "excludeedgelayer"
 / "plotframeref"
 / "viasonmask"
 / "useauxorigin"
 / "dxfpolygonmode"
 / "dxfimperialunits"
 / "dxfusepcbnewfont"
 / "psnegative"
 / "psa4output"
 / "plotreference"
 / "plotvalue"
 / "plotinvisibletext"
 / "plotothertext"
 / "sketchpadsonfab"
 / "padsonsilk"
 / "subtractmaskfromsilk"
 / "mirror"

pcbplotparams_bool
  = value:("true" / "false"){ return { type: "boolean", value: value === "true" } }

unsupported_setup
 = "(" _ type:("stackup") _ (expression _ )* ")" {
     // console.log(`Warning: unsupported setup section ${type}`)
     return {type,value: { type: "string", value: "unsupported" } }
}

// --------------------------------------------------
// nets
// --------------------------------------------------

net /* parseNETINFO_ITEM */
 =  "(" _ type:"net" _ net_number:digits _ name:(v:(string/symbol) _ {return v})? ")"{
     var value = [
         { type: "net_number", value: { type: "string", value: net_number } }
     ]
     if(name)
        value.push({ type: "name", value:name })
    return {type, value }
}

net_class /* parseNETCLASS */
 =  "(" _
    type:"net_class" _
    name: (string/symbol) _
    description: (string/symbol) _
    options: ( opt:(net_class_symbol / net_class_boardunit) _ { return opt })*
    ")"{
    return {type,
        value: [
            { type: "name", value: name},
            { type: "description", value: description},
            ...options ]
    }
}

net_class_symbol
 = "(" _ type:"add_net" _ value:(string/ symbol / number ) _ ")" { return { type, value } }

net_class_boardunit
 = "(" _ type:NET_CLASS_BOARDUNIT _ value:number _ ")" { return { type, value } }

NET_CLASS_BOARDUNIT
 = "clearance"
 / "trace_width"
 / "via_dia"
 / "via_drill"
 / "uvia_dia"
 / "uvia_drill"
 / "diff_pair_width"
 / "diff_pair_gap"

dimension /* parseDIMENSION() */
 =  "(" _
        type:"dimension" _
        dimension:number? _
        options: ((
          dimension_type
            / layer
            / pts
            / height
            / width
            / tstamp
            / gr_text
            / dimension_xy
            / format
            / style
            / orientation
        ) _ )* ")" {
    return {
        type ,
        value: [
            ...(dimension ? [{ type: "dimension", value: dimension }] : []),
            ...options.map(x => x[0])
        ],
    }
}

dimension_xy
 =  "(" _ type:DIMENSION_XY _ value:pts _ ")" { return { type, value:[value] } }

DIMENSION_XY
 = "feature1"
 / "feature2"
 / "crossbar"
 / "arrow1a"
 / "arrow1b"
 / "arrow2a"
 / "arrow2b"

segment /* parseTRACK() */
 =  "(" _ type:"segment" _ value:(v:(start / end / width / net / layer / tstamp / status ) _ { return v } )* ")"{
     return { type, value }
}

arc /* parseARC() */
 =  "(" _ type:"arc" _ value: (v:(start / mid / end / width / net / layer / tstamp / status ) _ { return v } )* ")"{
     return {type, value }
}

target /* parsePCB_TARGET() */
 =  "(" _ type:"target" _ value:((target_flag / at / size1 / width / layer / tstamp) _ )* ")"{
     return {type, value: value.map(x => x[0])}
}

target_flag
 = value:("x"/"plus") {
     return {type:"shape",value: { type: "string", value: value} }
 }


via  /* parseVIA */
 =  "(" _ type:"via" _ value:((via_param / via_flag / at  / size1  / layers / tstamp / status / free / remove_unused_layers / keep_end_layers) _ )*  ")"{
    return { type, value: value.map(x => x[0])}
}

via_flag
 = type:$("blind"/"micro") {
     return {
         type,
         value: { type: "boolean", value: true }
    }
 }

via_param
 =  "(" _
        type:$("zone"/"drill"/"net") _
        value:(v:(number/symbol) _ {return v})
    ")"{
    return { type, value }
}

free
  = "(" _ type:"free" _ ")" {
      return { type, value: { type: "boolean", value: true } }
  }

polygon
  = "(" _ type:("polygon"/"filled_polygon") _ value:(v:(pts/layer/island) _ { return v })* ")" {
       return { type, value }
   }

island
  = "(" _ type:"island" _ value:bool? _ ")" {
    return { type, value: value !== "no" }
  }

zone  /* parseZONE_CONTAINER */
 =  "(" _ type:"zone" _ value:( v:(
        layers/
        layer/
        zone_param/
        tstamp /
        zone_connect_pads/
        zone_hatch/
        zone_fill/
        zone_keepout /
        polygon /
        fill_segments /
        uuid /
        placement /
        name
        ) _ { return v })*
    ")"{
    return { type, value }
}

fill_segments
  = "(" _ type:"fill_segments" _ value:(pts:pts _ {return pts})+ ")" {
      return { type, value }
  }

zone_param
 = "(" _ type:$("net_name"  /
                "net" /
                "target" /
                "priority" /
                "min_thickness" /
                "filled_areas_thickness" )
        _ value:(v:(string/symbol/number) _ {return v}) ")"{
            return { type, value }
}

zone_hatch
 = "(" _
        type:"hatch" _
        style:("none"/"edge"/"full") _
        pitch:number _
    ")" {
     return {
         type,
         value: [
             { type: "style", value: { type: "string", value: style } },
             { type: "pitch", value: pitch },
             ] }
 }

enabled = "(" _ type:"enabled" _ value:("yes" / "no") _ ")" {
     return { type, value: { type: "boolean", value: value === "yes" } }
}

sheetname = "(" _ type:"sheetname" _ value:string _ ")" {
     return { type, value }
}

placement = "(" _ type:"placement" _ value:( v:(
        enabled /
        sheetname
    ) _ { return v })* ")" {
    return {
        type,
        value
    }
}

zone_fill
    = "(" _
        type:"fill" _
        filled:("yes" _ )?
        value: ( (fill_options / fill_mode / fill_smoothing / fill_hatch_border_algorithm) _ )*
    ")"
    {
        value = value.map(x => x[0])
        if(filled)
            value.push({ type:"filled", value: { type: "boolean", value: true } })
        else
            value.push({ type:"filled", value: { type: "boolean", value: false }})
        return {type, value}
}

fill_mode = "(" _ type:"mode" _ value:("polygon" / "hatch" / "segment") _ ")" {
    return { type, value: { type: "string", value } }
}

fill_smoothing = "(" _ type:"smoothing" _ value:("none" / "chamfer" / "fillet") _ ")" {
    return { type, value: { type: "string", value } }
}

fill_hatch_border_algorithm = "(" _ type:"hatch_border_algorithm" _ value:("hatch_thickness" / "min_thickness") _ ")" {
    return { type, value: { type: "string", value } }
}

fill_options
  =  "(" _
    type:(
        "hatch_thickness" /
        "hatch_gap" /
        "hatch_orientation" /
        "hatch_smoothing_level" /
        "hatch_smoothing_value" /
        "hatch_min_hole_area" /
        "arc_segments" /
        "thermal_gap" /
        "thermal_bridge_width" /
        "radius"
        ) _
        value:number _
        ")"{
      return { type, value }
  }

zone_keepout
 = "(" _
        type:"keepout" _
        value: ( "(" _
            t:("tracks"/"vias"/"copperpour"/"pads"/"footprints") _
            v:("allowed"/"not_allowed") _
        ")" _
        { return { type: t, value: { type: "string", value: v } } } )*
    ")" {
    return { type, value }
 }

zone_connect_pads
    = "(" _
        type: "connect_pads" _
        connection:( v:("yes"/"no"/"thru_hole_only") _ { return { type: "string", value: v } })?
        clearance:("(" _ "clearance" _ c:number _ ")" _ { return c })?
    ")" {
    var value = []
    if(connection)
        value.push({ type: "connection", value: connection })
    if(clearance)
        value.push({ type: "clearance", value: clearance })
    return { type, value }
}

generator
    = "(" _
        type:"generator" _
        value:symbol _
        ")" {
            return { type, value }
        }

generator_version
    = "(" _
        type:"generator_version" _
        value:symbol _
        ")" {
            return { type, value }
        }

host
 = "(" _
        "host" _
        application:symbol _
        version:(string/symbol) _
        ")" {
        const value = [
            { type: "application", value: application},
            { type: "version", value: version}
        ]

    return { type: "host", value }
}

header /* parseHeader */
  =  "(" _ generator:symbol _ layer:(string/symbol) _ attr:(string/symbol _)? ")"
    {
        return {
            type: "header",
            value: {
                generator: { type: "string", value: generator },
                generator_version: { type: "string", value: generator_version },
                layer: { type: "string", value: layer },
                attr: { type: "string", value: attr }
            }
        };
    };

version
    = "(" _
        type:"version" _
        value:digits _
        ")" {
            return { type, value: { type:"number", value } }
        }

module  /* parseMODULE_unchecked */
    = EmptyLine*  "(" _
            type:("footprint"/"module") _
            value:(string/symbol) _
            contents:( module_contents _ )*
        ")" _  {
        return {
            type: "module",
            value: [
                {type: "name", value},
                ...contents.map(x=>x[0])
            ]
        }
    }

module_contents
    = version
    / generator
    / generator_version
    / module_property
    / locked
    / embedded_fonts
    / placed
    / layer
    / tedit
    / tstamp
    / at
    / descr
    / tags
    / path
    / common_numeric // / solder_mask_margin / solder_paste_margin / solder_paste_ratio / clearance / thermal_width / thermal_gap
    / common_int // / autoplace_cost90 / autoplace_cost180 / zone_connect
    / module_attr // T_attr
    / fp_text
    / fp_text_box
    / fp_arc
    / fp_circle
    / fp_curve
    / fp_line
    / fp_rect
    / fp_poly
    / pad
    / model
    / zone
    / net_tie_pad_groups
    / private_layers
    / dimensions
    / group;


locked  = "locked" { return { type: "locked", value: { type: "boolean", value: true }  }}
placed  = "placed"{ return { type: "placed", value: { type: "boolean", value: true }}}

// ----------------------------------------
// ----------------------------------------

// layer = "(" _ "layer" _ layers:((LAYER / symbol) _)* ")" {
//     return {
//         type:"layer",
//         value:layers.map(x => x[0])
//     }
// }

layer = "(" _ type: "layer" _ "\""? value:(LAYER / symbol) "\""? _ ")" {
    return { type, value }
}

_LAYER
    = value:("B.Adhes"
     /"F.Adhes"
     /"B.Paste"
     /"F.Paste"
     /"B.SilkS"
     /"F.SilkS"
     /"B.Mask"
     /"F.Mask"
     /"B.Fab"
     /"F.Fab"
     /"B.CrtYd"
     /"F.CrtYd"
     /"Dwgs.User"
     /"Cmts.User"
     /"Eco1.User"
     /"Eco2.User"
     /"Edge.Cuts"
     ) {
        return { type: "string", value }
    }

LAYER =
    _LAYER / CU_LAYER



// ----------------------------------------
// ----------------------------------------

tedit = "(" _ "tedit" _  tedit:hex _ ")" { return { type:"tedit", value:tedit } }

tstamp = "(" _ "tstamp" _  tstamp:(string/symbol) _ ")" { // TODO: (string/symbol) is probably wrong
    return {
        type:"tstamp",
        value:tstamp
    }
}

// ------------------------------
// `at` (with effects)
// ------------------------------

effects
    = "(" _ type:"effects" _ effects:((font / justify / hide) _ )*  ")" {
        return { type, value: effects.map(x => x[0]) }
    }

font
    = "(" _ type:"font" _ attrs:(( face/size/thickness/bold_prop/bold/italic_prop/italic) _ )* _ ")" {
        return {
            type,
            value: attrs.map(x => x[0])
        }
    }

face = "(" _ type:"face" _ value:string _ ")" {
  return { type, value }
}

thickness
    = "(" _ type:"thickness" _ value:number _ ")" {
        return { type, value }
    }

bold = type:"bold" { return { type, value: { type: "boolean", value: true } }}

bold_prop = "(" _ type:"bold" _ value:("yes" / "no") _ ")" {
                  return { type, value:{ type: "boolean", value: value === "yes" } }
              }

italic_prop = "(" _ type:"italic" _ value:("yes" / "no") _ ")" {
                  return { type, value:{ type: "boolean", value: value === "yes" } }
              }

italic = type:"italic" { return { type, value: { type: "boolean", value: true } }}

justify = "(" _ type:"justify" _ justify: (JUSTIFY _ )* ")" {
    return { type, value: justify.map(x => x[0]) }
}

JUSTIFY
    = value:("left"
    / "right"
    / "top"
    / "bottom"
    / "mirror") {
        return {type:"string",value}
    };

hide = type:"hide" { return { type, value:{ type: "boolean", value: true } }}

border
    = "(" _ type:"border" _ value:("yes" / "no") _ ")" {
        return { type, value:{ type: "boolean", value: value === "yes" } }
    }

embedded_fonts
    = "(" _ type:"embedded_fonts" _ value:("yes" / "no") _ ")" {
        return { type, value:{ type: "boolean", value: value === "yes" } }
    }

unlocked
    = "(" _ type:"unlocked" _ value:("yes" / "no") _ ")" {
        return { type, value:{ type: "boolean", value: value === "yes" } }
    }

hide_prop
    = "(" _ type:"hide" _ value:("yes" / "no") _ ")" {
        return { type, value:{ type: "boolean", value: value === "yes" } }
    }

remove_unused_layers
    = "(" _ type:"remove_unused_layers" _ value:("yes" / "no")? _ ")" {
        return { type, value:{ type: "boolean", value: value !== "no" } }
    }

keep_end_layers
    = "(" _ type:"keep_end_layers" _ value:("yes" / "no")? _ ")" {
        return { type, value:{ type: "boolean", value: value !== "no" } }
    }

pad_property
    = "(" _ type:"property" _ value:("pad_prop_bga" / "pad_prop_heatsink") _ ")" {
        return { type, value:{ type: "string", value } }
    }

// ----------------------------------------
// more module attributes
// ----------------------------------------

descr = "(" _ type:"descr" _ value:(string/symbol) _ ")" {
    return { type, value } // TODO: symbols is probably wrong
    }
tags = "(" _ type:"tags" _ value:(array/string/symbol/number) _ ")" {
    return { type, value }
    }
path = "(" _ type:"path" _ value:(string/symbol/number) _ ")" {
    return { type, value }
    }

// --------------------------------------------------
// common between pad and mocule
// --------------------------------------------------

common_numeric =   "(" _ type: COMMON_NUMERIC _ value:number _ ")" { return { type, value }}
COMMON_NUMERIC
    = "solder_paste_margin_ratio"
    / "solder_mask_margin"
    / "solder_paste_margin"
    / "solder_paste_ratio"
    / "thermal_width"
    / "clearance"
    / "thermal_gap"

common_int =   "(" _ type: COMMON_INT _ value:number _ ")" { return { type, value }}
COMMON_INT
    = "zone_connect"
    / "autoplace_cost90"
    / "autoplace_cost180"

module_attr
    =   "(" _ "attr" _ value:("allow_missing_courtyard"/"board_only"/"smd"/"virtual"/"through_hole"/"exclude_from_pos_files"/"exclude_from_bom") _ tags:(tag:(array/string/symbol/number) _ {return tag}) * ")" {
        return  {
            type: "module_attribute",
            value: {type:"string",value},
            tags
        }
}

private_layers
    =   "(" _ type:"private_layers" _ value:string _ ")" {
        return  {
            type,
            value
        }
}

net_tie_pad_groups
    =   "(" _ type:"net_tie_pad_groups" _ value:string_list _ ")" {
        return  {
            type,
            value
        }
}

string_list
    = head:string tail:(_ string)* {
        return [head, ...tail.map(item => item[1])];
    }

bare_uuid_list
    = head:bare_uuid tail:(_ bare_uuid)* {
        return [head, ...tail.map(item => item[1])];
    }

module_property
    =   "(" _
            "property" _
            key:string _
            value:string _
            attrs:((at/layer/uuid/effects/unlocked/hide_prop) _)*
            ")" {
            return  {
                type: "module_property",
                value: [
                    { type: "key", value: key },
                    { type: "value", value },
                    ...attrs.map(x => x[0])
                ]
            }
}

// --------------------------------------------------
// fp text
// --------------------------------------------------

// parseTEXTE_MODULE

fp_text
    = "("_
        type:"fp_text" _
        text_type:("reference"/"value"/"user") _
        value:(string/symbol/number) _
        at:at? _
        attrs:((layer/hide/effects/tstamp/uuid/unlocked/hide_prop) _)*
        ")" {
        return {
            type,
            value: [
                {type:"text",value},
                {
                    type: "type",
                    value: {
                        type:"string",
                        value:text_type
                        }
                    },
                 at,
                 ...attrs.map(x => x[0])
                 ]
        }
    }

fp_text_box
    = "("_
        type:"fp_text_box" _
        value:(string/symbol/number) _
        start:start _
        end:end _
        attrs:((layer/hide/effects/tstamp/uuid/unlocked/border/stroke/hide_prop/margins) _)*
        ")" {
        return {
            type,
            value: [
                {type:"text", value},
                 start,
                 end,
                 ...attrs.map(x => x[0])
                 ]
        }
    }

//text_at = "(" _ "at" _ x:number _ y:number _ ")" { return { type:"at", value: [x, y]} }

// --------------------------------------------------
// fp SHAPES
// --------------------------------------------------

fp_arc
    =  "(" _ type:"fp_arc" _ start:start _ mid:(mid _ )? end:end _ angle:(angle _ )? generics:fp_generics  ")" {
        const out = [start];
        if (mid !== null) {
            out.push(mid[0]);
        }
        out.push(end);
        if(angle !== null){
            out.push( angle[0])
        }
        return {
            type,
            value: [ ...out , ...generics ]
        };
    }

fp_circle
    =  "(" _ type:"fp_circle" _  center:center _ end:end _  generics:fp_generics _ ")" {
        return {
            type,
            value: [ center, end, ...generics ]
        };
    }

fp_curve
    =  "(" _ type:"fp_curve" _ pts:curve_points _   generics:fp_generics ")" {
        return {
            type,
            value:[ ...pts, ...generics ]
        };
    }

fp_line
    =  "(" _ type:"fp_line" _  start:start _ end:end _  generics:fp_generics ")" {
        return {
            type,
            value: [ start, end, ...generics ]
        };
    }

fp_rect
    =  "(" _ type:"fp_rect" _  start:start _ end:end _  generics:fp_generics ")" {
        return {
            type,
            value: [ start, end, ...generics ]
        };
    }

fp_poly
    =  "(" _ type:"fp_poly" _  pts:pts _   generics:fp_generics ")" {
        return {
            type,
            value: [ pts , ...generics ]
        };
    }

fp_generics
    = generics:(( stroke / layer / width / fill / tstamp / status / uuid / unlocked ) _ )* {
        return generics.map(x => x[0])
    }

// --------------------------------------------------
// pads
// --------------------------------------------------

pad
    = "(" _
        "pad" _
        no:(string/symbol)? _
        pad_type:pad_type _
        shape:pad_shape _
        (locked:locked _)?
        attrs:(pad_attr _)* ")" {

        var values = [
            { type: "pad_id", value: no },
            pad_type,
            shape,
            ...attrs.map(x => x[0])
        ]

        if (typeof locked !== "undefined") values.push(locked)

        return {
            type: "pad",
            value: values
        }
    }

pad_type
    = value:("thru_hole"/"np_thru_hole" /"smd"/"connect") {
         return { type: "pad_type", value: { type: "string", value } }
    }

pad_shape
    = value:("circle"/"rect"/"oval"/"trapezoid"/"roundrect"/"custom")  {
        return { type: "pad_shape", value: { type: "string", value } }
    }

locked_group
    = "(" _ "locked" _ ")" { return { type: "locked", value: { type: "boolean", value: true }  }}

pad_attr
    = size
    / locked_group
    / at
    / rect_delta
    / drill
    / layers
    / tstamp
    / net  // not relvant for modules
    / common_numeric // / solder_mask_margin / solder_paste_margin / solder_paste_ratio / clearance / thermal_width / thermal_gap
    / common_int // / autoplace_cost90 / autoplace_cost180 / zone_connect
    / pad_numeric
    / chamfer
    / pad_options
    / primitives
    / uuid
    / remove_unused_layers
    / keep_end_layers
    / pintype
    / pinfunction
    / pad_property;

chamfer
 = "(" _
    type:"chamfer" _
    value:chamfer_options _
    ")" {
        return {type,value}
    }

chamfer_options
    = head:("top_left"/"top_right"/"bottom_left"/"bottom_right")? tail:(_ ("top_left"/"top_right"/"bottom_left"/"bottom_right"))* {
        return [
            {type: head, value: {type: "boolean", value: true}},
            ...tail.map(item => {
                return {type: item[1], value: {type: "boolean", value: true}}
            })
        ];
    }

size1
    = "(" _ type:"size" _ value:number _ ")" {
        return { type, value }
    }


size
    = "(" _ type:"size" _ width:number _ height:number _ ")" {
        return {
           type,
            value:  [
                { type: "height", value: height },
                { type: "width", value: width },
                ]
            }
    }

margins = "(" _ type:"margins" _ left:number _ top:number _ right:number _ bottom:number _ ")" {
    return {
       type,
        value:  [
            { type: "left", value: left },
            { type: "top", value: top },
            { type: "right", value: right },
            { type: "bottom", value: bottom },
        ]
    }
}

at
    = "(" _ type:"at" _ x:number _ y:number _ angle:(number _)? unlocked:("unlocked" _)?")" {
        var value = [
            { type: "x", value:x },
            { type: "y", value:y },
            { type: "unlocked", value: { type: "boolean", value: !!unlocked } },
        ]
        if(angle !== null) value.push( { type: "angle", value:angle[0] } )
        return { type, value }
    }

rect_delta
    = "(" _ type:"rect_delta" _ width:number _ height:number _ ")" {
        return {
                type,
                value: [
                        { type:"width", value:width },
                        { type:"height", value:height },
                    ]
                }
    }

pintype
    = "(" _
      type:"pintype" _
      value:string _
    ")" {
      return { type, value }
    }

pinfunction
    = "(" _
      type:"pinfunction" _
      value:string _
    ")" {
      return { type, value }
    }


// --------------------------------------------------
// drill
// --------------------------------------------------

drill
    = "(" _ type:"drill" _ attrs:((oval/number/offset) _ ) * ")" {

        var height,width
        var value = []
        for(const ATTR of attrs){
            var attr = ATTR[0]
            if(attr.type == "number" ){
                height = { type: "height", value: attr }
                if(!width){
                    width = { type: "width", value: attr }
                }
            }else{
                value.push(attr)
            }
        }

        if(height)
            value.splice(0,0,height)

        if(width)
            value.splice(0,0,width)

        return { type, value }

    }

oval =  type:"oval" { return { type, value: { type: "boolean", value: true } } }
offset = "(" _ type:"offset" _ x:number _ y:number _ ")" {
    return {
        type,
        value: [
            { type: "x", value: x },
            { type: "y", value: y }
        ]
    }

}


// parseBoardItemLayersAsMask
layers
    = "(" _ type:"layers" _ value:(val:(LAYERS/string/symbol) _ {return val})*  ")" {
        return { type, value }
    }

// --------------------------------------------------
//  pad specific numeric options
// --------------------------------------------------

pad_numeric =   "(" _ type: PAD_NUMERIC _ value:number _ ")" { return { type, value } }

PAD_NUMERIC
    = "chamfer_ratio"
    / "roundrect_rratio"
    / "die_length"
    / "thermal_bridge_angle"
    / "thermal_bridge_width"

// --------------------------------------------------
// pad options
// --------------------------------------------------

pad_options  /* parseD_PAD_option */
    = "(" _ type:"options" _ value:(val:(option_anchor/option_clearance) _ {return val})*  ")" {
        return { type, value }
    }

option_anchor
    = "(" _ type:"anchor" _ value:("circle"/"rect") _ ")" {
        return { type, value: { type: "string", value: value}}
    }

option_clearance
    = "(" _ type:"clearance" _ value:("outline"/"convexhull") _ ")" {
        return { type, value: { type: "string", value } }
    }

// --------------------------------------------------
// pad primitives
// --------------------------------------------------

primitives
    = "(" _ type:"primitives" _ value:( val:primitive_shape _  { return val })* ")" {
        return { type, value }
    }

primitive_shape
    = gr_arc
    / gr_line
    / gr_rect
    / gr_circle
    / gr_poly
    / gr_curve ;

gr_arc
    =  "(" _ type:"gr_arc" _ center:_start _ mid:mid? _ end:end _  generics:gr_generics  ")" {

        if (mid) {
            return {
                type,
                value:[ center, mid, end, ...generics ]
            };
        } else {
            return {
                type,
                value:[ center, end, ...generics ]
            };
        }
    }

gr_circle
    =  "(" _ type:"gr_circle" _  center:center _ end:end _ generics:gr_generics ")" {
        return {
            type,
            value:[ center, end, ...generics ]
        };
    }

gr_curve
    =  "(" _ type:"gr_curve" _ pts:curve_points _ generics:gr_generics ")" {
        return {
            type,
            value:[ ...pts, ...generics ]
        };
    }

curve_points
    = "(" _ "pts" _ start:xy _ control1:xy _ control2:xy _ end:xy _ ")" {
        // console.log("start", start)
        // console.log("control1", control1)
        // console.log("control2", control2)
        // console.log("end", end)
        // console.log(JSON.stringify([
        //         { type:"start", value: start.value  },
        //         { type:"control1", value:  control1.value },
        //         { type:"control2", value:  control2.value },
        //         { type:"end", value: end.value },
        //     ],null,2))
        // process.exit()
        return [
                { type:"start", value: start.value  },
                { type:"control1", value:  control1.value },
                { type:"control2", value:  control2.value },
                { type:"end", value: end.value },
            ]
    }

gr_line
    =  "(" _ type:"gr_line" _  start:_start _ end:end _ generics:gr_generics ")" {
        return {
            type,
            value:[ start, end, ...generics ]
        };
    }

gr_rect
    =  "(" _ type:"gr_rect" _  start:_start _ end:end _ generics:gr_generics ")" {
        return {
            type,
            value:[ start, end, ...generics ]
        };
    }

gr_poly
    =  "(" _ type:"gr_poly" _  pts:pts _  generics:gr_generics  ")" {
        return {
            type,
            value: [ pts, ...generics ]
        };
    }

gr_text
 = "(" _
    type:"gr_text" _
    text: (string / symbol) _
    at:at _
    options:( (layer / tstamp / effects / uuid / render_cache) _ ) *
    ")" {

     const value  = [
         {type: "text", value: text},
         at,
         ...options.map(x => x[0])
         ]
     return {type, value}

}

gr_generics
    = generics:( ( stroke / angle /layer / width / fill / tstamp / status / uuid )_)* {
        return generics.map(x => x[0])
    }

render_cache = "(" _ type:"render_cache" _ key:string _ ttl:number _ contents:(v:polygon _ { return v })* _ ")" {
    return { type, value: {
      key,
      ttl,
      contents
    }}
}

status = "(" _ type:"status" _  value:hex _ ")" {
    return { type, value }
}

name = "(" _ type:"name" _  value:string _ ")" {
    return { type, value }
}

uuid = "(" _ type:"uuid" _  value:string _ ")" {
    return { type, value }
}

fill
    = "(" _ type:"fill" _  value:symbol _ ")" {
        return { type, value }
    }

stroke
    = "(" _ type:"stroke" _  width:width _ stroke_type:stroke_type _ ")" {
        return { type,
                value:
                [
                    width,
                    stroke_type,
                ]
         }
    }

stroke_type
    = "(" _ type:"type" _  value:STROKE_TYPES _ ")" {
        return { type, value }
    }

STROKE_TYPES
    = value:(
        "dash" /
        "dash_dot" /
        "dash_dot_dot" /
        "dot" /
        "default" /
        "solid"
    ) {
        return { type: "string", value}
    }


width
    = "(" _ type:"width" _  value:number _ ")" {
        return { type, value }
    }

angle
    = "(" _ type:"angle" _ value:number _ ")" {
        return { type, value }
    }

mid
    = "(" _ type:"mid" _ value:x_y _ ")" {
        return { type, value }
}

start
    = "(" _ type:"start" _ value:x_y _ ")" {
        return { type, value }
}

x_y =
  x:(number) _ y:(number) {
      return [
                {type: "x", value:x},
                {type: "y", value:y},
            ]

  }

_start
    = "(" _ type: ("start" / "center" ) _ value:x_y _ ")" {
        return { type, value } // yep, "center"
}
center
    = "(" _ type: ( "center" ) _ value:x_y _ ")" {
        return { type, value }
    }
end
    = "(" _ type:"end" _ value:x_y _ ")" {
        return { type, value }
    }

pts
    = "(" _ type:"pts" _ points:((xy / pointList_arc)_)* _ ")" {
        return { type, value: points.filter((x) => x).map((x) => {
            return x[0];
        }) }
    }

// Rule to parse xy type
xy
    = "(" _ type:"xy" _ value:x_y _ ")" {
        return { type, value }
    }

// Rule to parse arc type, including start, mid, and end
pointList_arc
    = "(" _ type:"arc" _ start:arcPoint _ mid:arcPoint _ end:arcPoint _ ")" {
        return {
            type,
            value: [start, mid, end]
        }
    }

// Rule to parse individual arc points (start, mid, end)
arcPoint
    = "(" _ type:("start" / "mid" / "end") _ value:x_y _ ")" {

        return { type, value }
    }


// ----------------------------------------
// dimensions:
// ----------------------------------------

dimensions
    = "("_
        type:"dimension" _
        options:((dimension_type
                     / layer
                     / uuid
                     / tstamp
                     / pts
                     / height
                     / gr_text
                     / format
                     / orientation
                     / style) _)*
        _")" {
        return {
            type,
            value: options.map(x => x[0]) // Only return the actual parsed attributes
        };
    }

dimension_type = "(" _ type:"type" _ value:("aligned" / "leader" / "center" / "orthogonal") _ ")" {
    return { type: "dimension_type", value: { type: "string", value } }
}

height = "(" _ type:"height" _  value:number _ ")" {
    return { type, value }
}

orientation = "(" _ type:"orientation" _  value:number _ ")" {
    return { type, value }
}

format
    = "("_
            type:"format" _
            options:((prefix/suffix/units/units_format/precision/override_value) _)*
            ")" {
            return {
                type,
                value: [
                     ...options.map(x => x[0])
                     ]
            }
        }

prefix = "(" _ type:"prefix" _  value:string _ ")" {
    return { type, value }
}

suffix = "(" _ type:"suffix" _  value:string _ ")" {
    return { type, value }
}

units = "(" _ type:"units" _  value:number _ ")" {
    return { type, value }
}

units_format = "(" _ type:"units_format" _  value:number _ ")" {
    return { type, value }
}

precision = "(" _ type:"precision" _  value:number _ ")" {
    return { type, value }
}

override_value = "(" _ type:"override_value" _  value:string _ ")" {
    return { type, value }
}

style
    = "("_
            type:"style" _
            options:((thickness/arrow_length/arrow_direction/keep_text_aligned/text_position_mode/extension_height/extension_offset/text_frame) _)* _
            value:"keep_text_aligned"? _
            ")" {
            return {
                type,
                value: [
                     ...options.map(x => x[0])
                     ]
            }
        }

arrow_length = "(" _ type:"arrow_length" _  value:number _ ")" {
    return { type, value }
}

arrow_direction = "(" _ type:"arrow_direction" _  value:("outward" / "inward") _ ")" {
    return { type, value: { type: "string", value } }
}

keep_text_aligned = "(" _ type:"keep_text_aligned" _  value:bool _ ")" {
    return { type, value }
}

text_position_mode = "(" _ type:"text_position_mode" _  value:number _ ")" {
    return { type, value }
}

extension_height = "(" _ type:"extension_height" _  value:number _ ")" {
    return { type, value }
}

extension_offset = "(" _ type:"extension_offset" _  value:number _ ")" {
    return { type, value }
}

text_frame = "(" _ type:"text_frame" _  value:number _ ")" {
    return { type, value }
}

// ----------------------------------------
// group:
// ----------------------------------------

group = "(" _ type:"group" _ value:string _ options:((id/uuid/members) _)* _ ")" {
    return { type, value }
}

members = "(" _ type:"members" _ value:(string_list/bare_uuid_list) _ ")" {
    return { type, value }
}

id = "(" _ type:"id" _  value:bare_uuid _ ")" {
    return { type, value }
}

// ----------------------------------------
// 3d model:
// ----------------------------------------

model
    = "(" _
        type:"model" _
        filename:(string/symbol) _
        options:((model_xyz_attr / hide_prop / opacity)_ )* _
        ")" {
        return {
            type,
            value: [
                {type:"filename",value:filename},
                ...options.map(x => x[0])
            ]
        }
    }

opacity = "(" _ "opacity" _  value:number _ ")" { return { type:"opacity", value:value } }

model_xyz_attr
 = "(" _
        type:("at"/"offset"/"scale"/"rotate") _
        value:xyz _
    ")" {
        return { type, value: [ value ]  }
    }

xyz =   "(" _
            type:"xyz" _
            x:number _
            y:number _
            z:number _
        ")" {
            return { type, value:[
                {type: "x", value:x},
                {type: "y", value:y},
                {type: "z", value:z}
            ] }
        }

// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------
// --------------------------------------------------

// --------------------------------------------------
// strings
// --------------------------------------------------

string
  = '"' chars:DoubleStringCharacter* '"' { return {type:"string",value:chars.join('')}; }
  / "'" chars:SingleStringCharacter* "'" { return {type:"string",value:chars.join('')}; }

DoubleStringCharacter
  = !('"' / "\\") char:. { return char; }
  / "\\" sequence:EscapeSequence { return sequence; }

SingleStringCharacter
  = !("'" / "\\") char:. { return char; }
  / "\\" sequence:EscapeSequence { return sequence; }

EscapeSequence
  = "'"
  / '"'
  / "\\"
  / "b"  { return "\b";   }
  / "f"  { return "\f";   }
  / "n"  { return "\n";   }
  / "r"  { return "\r";   }
  / "t"  { return "\t";   }
  / "v"  { return "\x0B"; }


// skipping net, die_llength

// --------------------------------------------------
// generic s-expression (for ignoring things...)
// --------------------------------------------------

sexp
 = _ "(" _ contents:( expression _ )* ")" _ {
     return {
         type: "sexp",
         value: contents.map(x => x[0])
       }
 }

expression = number / string / array / symbol / sexp / hex

// --------------------------------------------------
// BASIC TYPES
// --------------------------------------------------

array
    = "[" _ value:(string/symbol/number) _  values:((string/symbol/number) _ "," _ )*"]" {
        return {
            type: "array",
            value: [ value, ...values.map(x => x[0])]
        }
    }


symbol
   = value:$([^ ();'\n]+) {
       return {type:"string",value}

   }

_ "whitespace"
  = [ \t\n\r]*

// Define a rule for matching an empty line (whitespace + newline)
EmptyLine = (Whitespace? Newline)+

// Define a rule for matching whitespace (spaces or tabs)
Whitespace = [ \t]+

// Define a rule for matching a newline (CRLF, LF, or CR)
Newline = "\r\n" / "\n" / "\r"

// <number>::= [<sign>] [<positive_integer> | <real> | <fraction>]
number
    = val:$([-+]? (Exponential/Real/Fraction/digits)) {
        return { type:"number", value:val }
    }

number_
    = value:number _
        { return value }

Real
  = val:$(digits("."(digits?)?)? / "." digits) {
      return { type:"real", value:val }
  }

// e.g. -.6e-3
Exponential
    = val:$([-+]? Real [eE] [+-]? digits) {
      return { type:"exponential", value:val }
    }

Fraction
  = n:digits "/" d:digits {
      return { type:"fraction", n:n, d:d }
  }

// <positive_integer>::= [<digit> | <digit><positive_integer>]
digits = $([0-9]+)

// <sign>::= [+ | -]
// <real>::= [<positive_integer>. | <positive_integer>.<positive_integer> | <positive_integer>]
// <fraction>::= <positive_integer> / <positive_integer>

hex
    = value:$([0-9a-fA-F]+) {
        return {type: "hex", value}
    }

bare_uuid
    = value:$([0-9a-fA-F-]+) {
        return {type: "bare_uuid", value}
    }

bool
  = value:("yes" / "no"){ return { type: "boolean", value: value === "yes" } }

cu_layer
    = "(" _ type:"layer" _  value: CU_LAYER _ ")" { return { type, value } }

CU_LAYER
    = value:("F.Cu" / "B.Cu" /
      "In1.Cu" / "In2.Cu" / "In3.Cu" / "In4.Cu" / "In5.Cu" /
      "In6.Cu" / "In7.Cu" / "In8.Cu" / "In9.Cu" / "In10.Cu" /
      "In11.Cu" / "In12.Cu" / "In13.Cu" / "In14.Cu" / "In15.Cu" /
      "In16.Cu" / "In17.Cu" / "In18.Cu" / "In19.Cu" / "In20.Cu" /
      "In21.Cu" / "In22.Cu" / "In23.Cu" / "In24.Cu" / "In25.Cu" /
      "In26.Cu" / "In27.Cu" / "In28.Cu" / "In29.Cu" / "In30.Cu"
    ) {
        return { type: "string", value}
    }


LAYER_MASKS
    = value:("*.Cu"
    / "*In.Cu"
    / "F&B.Cu"
    / "*.Adhes"
    / "*.Paste"
    / "*.Mask"
    / "*.SilkS"
    / "*.Fab"
    / "*.CrtYd"
    / "Inner"[1-9]".Cu"
    / "Inner1"[01-4]".Cu") {
        return { type: "string", value}
    }

LAYERS
    = LAYER / CU_LAYER / LAYER_MASKS;
