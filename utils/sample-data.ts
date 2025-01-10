// // import { DataPoint } from "../types/map-types";

// // // Generate sample data points around Washington state
// // export const generateSampleData = (): DataPoint[] => {
// //   const data: DataPoint[] = [];

// //   // Washington state bounds
// //   const bounds = {
// //     minLat: 45.5,
// //     maxLat: 49.0,
// //     minLng: -124.8,
// //     maxLng: -116.9,
// //   };

// //   // Generate 1000 random points
// //   for (let i = 0; i < 1000; i++) {
// //     const lat = bounds.minLat + Math.random() * (bounds.maxLat - bounds.minLat);
// //     const lng = bounds.minLng + Math.random() * (bounds.maxLng - bounds.minLng);

// //     data.push({
// //       position: [lng, lat],
// //       height: Math.random() * 100,
// //       population: Math.floor(Math.random() * 10000),
// //       name: `Location ${i}`,
// //     });
// //   }

// //   return data;
// // };

// // // Washington state polygon for highlighting
// // export const washingtonPolygon = {
// //   type: "Feature",
// //   properties: {},
// //   geometry: {
// //     type: "Polygon",
// //     coordinates: [
// //       [
// //         [-124.848974, 48.184433],
// //         [-123.317392, 48.184433],
// //         [-122.904488, 47.284652],
// //         [-122.904488, 46.384872],
// //         [-117.017578, 46.384872],
// //         [-117.017578, 49.009051],
// //         [-124.848974, 49.009051],
// //         [-124.848974, 48.184433],
// //       ],
// //     ],
// //   },
// // };

// import { DataPoint } from "../types/map-types";

// // Generate sample data points for Washington state with categories
// export const generateSampleData = (): DataPoint[] => {
//   const data: DataPoint[] = [];

//   // Washington state bounds
//   const bounds = {
//     minLat: 45.5,
//     maxLat: 49.0,
//     minLng: -124.8,
//     maxLng: -116.9,
//   };

//   // Generate 2000 random points
//   for (let i = 0; i < 2000; i++) {
//     const lat = bounds.minLat + Math.random() * (bounds.maxLat - bounds.minLat);
//     const lng = bounds.minLng + Math.random() * (bounds.maxLng - bounds.minLng);

//     data.push({
//       position: [lng, lat],
//       height: Math.random() * 100,
//       category: Math.random() > 0.5 ? "green" : "red", // Assign randomly to "red" or "green"
//       name: `Location ${i}`,
//     });
//   }

//   return data;
// };

// export const washingtonPolygon = {
//   type: "Feature",
//   properties: {},
//   geometry: {
//     type: "Polygon",
//     coordinates: [
//       [
//         [-124.848974, 48.184433],
//         [-124.848974, 49.009051],
//         [-123.117326, 49.009051],
//         [-117.033359, 49.0],
//         [-117.033359, 47.282486],
//         [-116.917989, 47.020891],
//         [-117.113936, 46.79887],
//         [-118.068562, 46.378738],
//         [-119.026275, 46.378738],
//         [-120.000657, 46.000656],
//         [-121.001167, 45.628192],
//         [-121.217369, 45.604991],
//         [-122.762142, 45.608201],
//         [-122.762142, 46.264122],
//         [-123.26327, 46.292035],
//         [-124.068662, 46.296485],
//         [-124.068662, 46.723603],
//         [-124.733174, 47.138854],
//         [-124.848974, 47.848366],
//         [-124.848974, 48.184433],
//       ],
//     ],
//   },
// };

import { DataPoint } from "../types/map-types";

// Generate sample data points around Washington state
export const generateSampleData = (): DataPoint[] => {
  const data: DataPoint[] = [];

  // Washington state bounds
  const bounds = {
    minLat: 45.5,
    maxLat: 49.0,
    minLng: -124.8,
    maxLng: -116.9,
  };

  // Generate 1000 random points
  for (let i = 0; i < 1000; i++) {
    const lat = bounds.minLat + Math.random() * (bounds.maxLat - bounds.minLat);
    const lng = bounds.minLng + Math.random() * (bounds.maxLng - bounds.minLng);

    data.push({
      position: [lng, lat],
      height: Math.random() * 100,
      population: Math.floor(Math.random() * 10000),
      name: `Location ${i}`,
    });
  }

  return data;
};

// Washington state polygon for highlighting
export const washingtonPolygon = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-124.848974, 48.184433],
        [-123.317392, 48.184433],
        [-122.904488, 47.284652],
        [-122.904488, 46.384872],
        [-117.017578, 46.384872],
        [-117.017578, 49.009051],
        [-124.848974, 49.009051],
        [-124.848974, 48.184433],
      ],
    ],
  },
};
