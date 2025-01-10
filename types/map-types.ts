export interface ViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

export interface DataPoint {
  position: [number, number];
  height?: number;
  name?: string;
  population?: number;
}
