Here’s a **README.md** file for your project, describing its functionality, purpose, setup instructions, and usage details:

## Demo link

https://sample-map-app.vercel.app/

---

# **Earthquake Data Visualization**

This project is a web application that visualizes earthquake data using a **Map** and **Scatterplot Layer** with **Deck.gl** and **MapLibre**. It allows users to view earthquake events on a map, filter data by time range, and play animations of events over time.

## **Features**

- Interactive map with earthquake data visualization.
- Scatterplot layers representing earthquake events with color-coded depth and radius based on magnitude.
- Time range slider to filter earthquake data.
- Play/Pause animation to visualize earthquake progression over time.
- Tooltips displaying earthquake details (time, magnitude, and depth) on hover.

---

## **Technologies Used**

- **React**: Front-end framework for building the UI.
- **Next.js**: Framework for server-side rendering and routing.
- **Deck.gl**: Library for advanced WebGL-based visualization.
- **MapLibre**: Open-source map rendering library.
- **Loaders.gl**: For parsing CSV earthquake data.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Lucide Icons**: For play/pause buttons in the slider.

---

## **Setup and Installation**

### **Prerequisites**

- **Node.js**: Ensure you have Node.js (v14 or later) installed on your system.
- **npm** or **yarn**: A package manager for installing dependencies.

### **Clone the Repository**

```bash
git clone <repository-url>
cd <repository-directory>
```

### **Install Dependencies**

```bash
npm install
```

---

## **How to Run**

### **Development Server**

To start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## **Data**

This app uses earthquake data from the [Kepler.gl Data Repository](https://raw.githubusercontent.com/uber-web/kepler.gl-data/master/earthquakes/data.csv). Each data point includes the following fields:

- `timestamp`: Time of the earthquake event (in UTC).
- `latitude`: Latitude of the earthquake's location.
- `longitude`: Longitude of the earthquake's location.
- `depth`: Depth of the earthquake (in kilometers).
- `magnitude`: Magnitude of the earthquake.

The `timestamp` is used for filtering and animating events, while other fields are visualized on the map.

---

## **Usage**

1. **View Earthquakes on the Map**:

   - Earthquake events are represented as scatterplot points on the map.
   - The color intensity reflects the depth, while the radius corresponds to the magnitude.

2. **Filter by Time Range**:

   - Use the range slider at the bottom to filter earthquakes by time range.
   - The slider displays the minimum and maximum time range in the dataset.

3. **Animate Earthquake Progression**:

   - Click the **Play** button to animate earthquake events over time.
   - Click **Pause** to stop the animation.

4. **View Details**:
   - Hover over a point on the map to see details about the earthquake:
     - Time (UTC)
     - Magnitude
     - Depth

---

## **File Structure**

```
.
├── app/
│   └── page.tsx           # Main page component
│   └── globals.css        # Global Tailwind CSS styles
├── components/
│   ├── range-input.tsx    # Range slider for filtering data by time
├── public/
│   └── favicon.ico        # App favicon
├── utils/
│   └── getTimeRange.ts    # Utility function to calculate time range
└── README.md              # Documentation
```

---

## **Key Functions**

### **getTimeRange**

Calculates the minimum and maximum timestamp in the earthquake data.

```ts
function getTimeRange(data: Earthquake[]): [number, number];
```

- **Parameters**:
  - `data`: Array of earthquake objects.
- **Returns**:
  - `[number, number]`: Minimum and maximum timestamps.

---

## **Environment Variables**

Ensure you configure the following environment variables in a `.env.local` file if needed:

```
NEXT_PUBLIC_MAP_STYLE=https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json
```

---

## **Dependencies**

Here are the key dependencies used in the project:

- `deck.gl`: Visualization framework for WebGL.
- `maplibre-gl`: Open-source map rendering library.
- `@loaders.gl/csv`: For parsing CSV data.
- `react-map-gl`: For interactive map rendering.
- `tailwindcss`: CSS framework for styling.

---

## **Potential Issues**

### **NaN in Range Slider**

If the range slider displays `NaN` for min/max values:

- Ensure the `timestamp` values in the earthquake data are valid.
- Check for empty or malformed datasets.

### **Blank Map**

If the map appears blank:

- Verify the map style URL in `MAP_STYLE` is accessible.
- Check the container’s height and width (use Tailwind classes `h-screen w-screen`).

---

## **Contributing**

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`.
3. Make your changes and commit them: `git commit -m "Add new feature"`.
4. Push to your branch: `git push origin my-feature-branch`.
5. Open a pull request.

---

## **License**

This project is not under any license and just a demo project but can evolve as time goes on

---

Let me know if you'd like additional sections or customization!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
