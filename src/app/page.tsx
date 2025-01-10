"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Map } from "react-map-gl/maplibre";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { DataFilterExtension } from "@deck.gl/extensions";
import { MapView } from "@deck.gl/core";
import RangeInput from "@/components/range-input";
import type { DataFilterExtensionProps } from "@deck.gl/extensions";

const DATA_URL =
  "https://raw.githubusercontent.com/uber-web/kepler.gl-data/master/earthquakes/data.csv";

const MAP_VIEW = new MapView({
  repeat: true,
  farZMultiplier: 10,
});

const INITIAL_VIEW_STATE = {
  latitude: 36.5,
  longitude: -120,
  zoom: 5.5, //this increases the zoom
  pitch: 0,
  bearing: 0,
};

// const MAP_STYLE =
//   "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";
// The above style is the plain map base without color, u might need to get a json for the style of the map you want

const MAP_STYLE = "https://demotiles.maplibre.org/style.json";

const MS_PER_DAY = 8.64e7;

type Earthquake = {
  timestamp: number;
  latitude: number;
  longitude: number;
  depth: number;
  magnitude: number;
};

const dataFilter = new DataFilterExtension({ filterSize: 1, fp64: false });

function formatLabel(timestamp: number) {
  const date = new Date(timestamp);
  return `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}`;
}

function getTimeRange(data: Earthquake[]) {
  return data.reduce<[number, number]>(
    (range, d) => {
      const t = d.timestamp;
      // Validate timestamp (ensure it's a valid number)
      if (typeof t !== "number" || isNaN(t)) {
        console.warn("Invalid timestamp:", t, d); // Debug log for invalid timestamps
        return range; // Skip this entry
      }
      range[0] = Math.min(range[0], t);
      range[1] = Math.max(range[1], t);
      return range;
    },
    [Infinity, -Infinity]
  );
}

export default function Home() {
  const [data, setData] = useState<Earthquake[] | null>(null);
  const [filter, setFilter] = useState<[number, number] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(DATA_URL);
      const text = await response.text();

      // Parse CSV data
      const rows = text
        .split("\n")
        .slice(1)
        .map((line) => line.split(","));
      const parsedData = rows.map((row) => ({
        timestamp: new Date(`${row[0]} UTC`).getTime(),
        latitude: parseFloat(row[1]),
        longitude: parseFloat(row[2]),
        depth: parseFloat(row[3]),
        magnitude: parseFloat(row[4]),
      }));
      setData(parsedData);
    };

    fetchData();
  }, []);

  const timeRange = useMemo(() => (data ? getTimeRange(data) : null), [data]);
  console.log({ timeRange });
  const filterValue = timeRange ?? filter;
  console.log({ filterValue });

  const layers = [
    filterValue &&
      new ScatterplotLayer<Earthquake, DataFilterExtensionProps<Earthquake>>({
        id: "earthquakes",
        data: data || [],
        opacity: 0.8,
        radiusScale: 100,
        radiusMinPixels: 1,
        wrapLongitude: true,

        getPosition: (d) => [d.longitude, d.latitude, -d.depth * 1000],
        getRadius: (d) => Math.pow(2, d.magnitude),
        getFillColor: (d) => {
          const r = Math.sqrt(Math.max(d.depth, 0));
          return [255 - r * 15, r * 5, r * 10];
        },
        extensions: [dataFilter],
        filterRange: [filterValue[0], filterValue[1]],
        filterSoftRange: [
          filterValue[0] * 0.9 + filterValue[1] * 0.1,
          filterValue[0] * 0.1 + filterValue[1] * 0.9,
        ],
        // parameters: {
        //   depthTest: false, // Disable depth testing to avoid conflicts
        // },
        pickable: true,
      }),
  ];

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="flex flex-col items-center space-y-2">
          {/* Spinner */}
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

          {/* Loading Text */}
          <p className="text-sm font-medium text-blue-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen">
      <DeckGL
        views={MAP_VIEW}
        layers={layers}
        initialViewState={INITIAL_VIEW_STATE}
        controller
        getTooltip={(info) => {
          const { object } = info;
          return object
            ? `Time: ${new Date(object.timestamp).toUTCString()}\nMagnitude: ${
                object.magnitude
              }\nDepth: ${object.depth}`
            : null;
        }}
      >
        <Map reuseMaps mapStyle={MAP_STYLE} />
      </DeckGL>
      {timeRange && filterValue !== null && (
        <RangeInput
          min={timeRange[0]}
          max={timeRange[1]}
          value={filterValue}
          animationSpeed={MS_PER_DAY * 30}
          formatLabel={formatLabel}
          onChange={setFilter}
        />
      )}
    </div>
  );
}
