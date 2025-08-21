// Utility functions for Hose Configurator

export function hosePrefix(hoseSeries: string) {
  if (hoseSeries === "462TC") return "D"; // 46-series
  if (hoseSeries === "797TC") return "F"; // 77-series
  return "P"; // fallback default
}

export function normalizeToMM(length: string | number, unit: string) {
  const n = Number(length) || 0;
  if (unit === "MM") return Math.round(n);
  if (unit === "CM") return Math.round(n * 10);
  if (unit === "M") return Math.round(n * 1000);
  return 0;
}

// Exact Parker sequence:
// <Prefix><HoseType><F1End><F2End><F1Size><F2Size><Dash>-<LengthMM>-<Displacement>[ -<Accessory> ]
export function generateHoseStringExact(state: any) {
  const mm = normalizeToMM(state.length, state.unit);
  const dash = String(state.idDash || "").replace("-", "").padStart(2, "0");
  const prefix = hosePrefix(state.hoseSeries);
  const partsCore = [
    prefix,
    state.hoseSeries || "",
    state.fittingAEnd || "",
    state.fittingBEnd || "",
    state.fittingAThread || "",
    state.fittingBThread || "",
    dash,
  ].join("");
  const displacement = String(state.angleDisplacement ?? "0");
  const accessories = state.accessory && state.accessory.trim().length ? `-${state.accessory.trim()}` : "";
  return `${partsCore}-${mm}-${displacement}${accessories}`;
}

export function canBuildExact(state: any) {
  return Boolean(
    state.hoseSeries && state.cover && state.idDash &&
    state.fittingAStd && state.fittingBStd &&
    state.fittingAThread && state.fittingBThread &&
    state.fittingAEnd && state.fittingBEnd &&
    state.length
  );
}

