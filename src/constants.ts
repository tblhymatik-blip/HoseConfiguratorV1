// Constants and data for Hose Configurator

export const HOSE_SERIES_OPTIONS = ["462TC", "797TC"]; // focus hoses
export const COVER_OPTIONS = ["TC"]; // extend if needed (e.g., ST)
export const DASH_OPTIONS_462 = ["-04","-05","-06","-08","-10","-12","-16","-20","-24","-32"];
export const DASH_OPTIONS_797 = ["-06","-08","-10","-12","-16","-20","-24"];

// Supported fitting standards (Metric removed)
export const STANDARD_OPTIONS = ["BSP","JIC","ORFS","DIN-L","DIN-S"];

// End configuration codes shown as Parker codes (chips), filtered by standard
export const END_CODES_BY_STANDARD: Record<string, string[]> = {
  "DIN-L": ["CA","CE","CF","D0"],
  "DIN-S": ["C9","0C","1C","D2"],
  BSP: ["92","B1","B2","B4","EA","EB","D9","B5"],
  ORFS: ["J9","J7","J1","J5","JM","JD"],
  JIC: ["03","06","68","37","3V","39","3W"],
};

// For DIN: end-size is the tube-size (middle number in e.g. 1CA46-8-6), keyed by dash
export const DIN_BASE_END_SIZES: Record<string, Record<string, string[]>> = {
  "DIN-L": {
    "-04": ["6","8","10","12"],
    "-05": ["8","10","12"],
    "-06": ["8","10","12","15","18"],
    "-08": ["12","15","18"],
    "-10": ["15","18","22"],
    "-12": ["18","22","28"],
    "-16": ["22","28","35"],
    "-20": ["28","35","42"],
    "-24": ["35","42"],
  },
  "DIN-S": {
    "-04": ["6","8","10","12","14"],
    "-05": ["8","10","12","14","16"],
    "-06": ["8","10","12","14","16"],
    "-08": ["12","14","16","20"],
    "-10": ["16","20"],
    "-12": ["12","16","20","25"],
    "-16": ["25","30"],
    "-20": ["25","38"],
    "-24": ["38"],
  },
};

// For BSP / ORFS / JIC: map of allowed end sizes
export const THREAD_MAP: Record<string, Record<string, string[]>> = {
  BSP: {
    "-02": ["1/8x28"],
    "-04": ["1/4x19"],
    "-05": ["1/4x19","3/8x19"],
    "-06": ["3/8x19"],
    "-08": ["1/2x14"],
    "-10": ["5/8x14"],
    "-12": ["3/4x14"],
    "-16": ["1x11"],
    "-20": ["1-1/4x11"],
    "-24": ["1-1/2x11"],
    "-32": ["2x11"],
  },
  ORFS: {
    "-04": ["9/16-18"],
    "-05": ["11/16-16"],
    "-06": ["11/16-16"],
    "-08": ["13/16-16"],
    "-10": ["1-14"],
    "-12": ["1-3/16-12"],
    "-16": ["1-7/16-12"],
    "-20": ["1-11/16-12"],
    "-24": ["2-12"],
  },
  JIC: {
    "-04": ["4","5","6"],
    "-05": ["5","6","8"],
    "-06": ["4","5","6","8","10"],
    "-08": ["8","10","12"],
    "-10": ["10","12"],
    "-12": ["12","14","16"],
    "-16": ["12","16","20"],
    "-20": ["16","20"],
    "-24": ["24"],
    "-32": ["32"],
  },
};

