import React from "react";
import {
  ComposableMap,
  ZoomableGlobe,
  Geographies,
  Geography
} from "react-simple-maps";
import { Motion, spring } from "react-motion";

const mapStyles = {
  width: "600px",
  height: "auto"
};


const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};


const Map = ({ center, content }) => (
  <div>
    <Motion
      defaultStyle={{
        x: center[0],
        y: center[1]
      }}
      style={{
        x: spring(center[0]),
        y: spring(center[1])
      }}
    >
      {({ x, y }) => (
        <ComposableMap
          width={500}
          height={500}
          projection="orthographic"
          projectionConfig={{ scale: 220 }}
          style={mapStyles}
        >
          <ZoomableGlobe center={[x, y]}>
            <circle
              cx={250}
              cy={250}
              r={220}
              fill="transparent"
              stroke="#CFD8DC"
            />
            <Geographies
              disableOptimization
              geography=
              // "https://unpkg.com/world-atlas@1.1.4/world/110m.json"
              "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

            >
              {(geos, proj) =>
                geos.map((geo, i) => (
                  <Geography
                    key={geo.id + i}
                    geography={geo}
                    projection={proj}
                    style={content===geo.properties.NAME?{fill:'black'}:{
                      default: { fill: "#CFD8DC" },
                      hover: {fill:'black'},

                    }}
                    onMouseEnter={() => {
                      const { NAME, POP_EST } = geo.properties;
                      console.log(geo.properties)
                      // content=`${NAME}`;
                    }}
                    onMouseLeave={() => {
                      // content=''
                    }}
                  />
                ))
              }
            </Geographies>
          </ZoomableGlobe>
        </ComposableMap>
      )}
    </Motion>
  </div>
);

export default Map;
