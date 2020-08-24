export function outputDate(date) {
  return date.toLocaleString().split(",")[0] || "";
}

export function separateString(str) {
  return str.split("(");
}

export function getWeek(d) {
  const target = new Date(d.valueOf());
  const dayNr = (d.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const jan4 = new Date(target.getFullYear(), 0, 4);
  const dayDiff = (target - jan4) / 86400000;
  const weekNr = 1 + Math.ceil(dayDiff / 7);
  return weekNr;
}

export function getDateOfISOWeek(w, y) {
  var simple = new Date(y, 0, 1 + (w - 1) * 7);
  var dow = simple.getDay();
  var ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
}

export function getSevenDayBoundary(d) {
  return new Date(new Date(d).valueOf() + -14 * 24 * 3600 * 1000);
}

export function milToMiliMeter(mil) {
  return parseFloat((mil * 0.0254).toFixed(2));
}

export const MBKEYWORD = [
  "MBD",
  "X10",
  "X11",
  "X12",
  "M11",
  "P8D",
  "X8D",
  "H11",
  "H12",
  "B11",
  "B8D",
  "X9D",
  "B9D",
  "A2S",
  "A1S",
  "A3S",
  "B1D",
  "C2C",
  "C9X",
  "C9Z",
  "C7C",
  "C7H",
  "C2S",
  "B2S",
  "B10",
  "B11",
  "B12",
  "B1S",
  "BH1",
  "X9S",
  "C7Z",
  "X9D",
];

export const BPNKEYWORD = ["BPN", "SAS", "SAT", "CSE"];

// For CM station types
const USITYPE = ["SMT1", "SMT2", "ASM", "FCT"];
const WZSTYPE = ["SMT_AOI(BOT)", "SMT_AOI(TOP)", "DIP_AOI", "DIP_Function_A"];
const WIHTYPE = [
  "AOI BOT",
  "AOI TOP",
  "DIP Final Inspection",
  "DIP Function A",
];
const OSETYPE = ["AOI-A1", "AOI-A2", "DIP-VI", "First & Function TEST"];
const RISETYPE = ["SMT1", "AOI1", "DIP1", "FCT"];
const CPWTYPE = ["04_AOI_B", "09_AOI_T", "24_DIP_VI", "24_DIP_VI_T", "34_FT_1"];

// eight cm vendor code with six statyion type
const VENDOR_CODE_WITH_STATION = {
  USI: USITYPE,
  WZS: WZSTYPE,
  WIH: WIHTYPE,
  VPS: OSETYPE,
  USISZ: USITYPE,
  RISECOM: RISETYPE,
  OSE: OSETYPE,
  CPW: CPWTYPE,
};

const VENDOR_CODE_WITH_STATION_FUNCTION = {
  USI: "FCT",
  WZS: "DIP_Function_A",
  WIH: "DIP Function A",
  VPS: "First & Function TEST",
  USISZ: "FCT",
  RISECOM: "FCT",
  OSE: "First & Function TEST",
  CPW: "34_FT_1",
};

export function pickUpStationByCMVendor(cm) {
  return VENDOR_CODE_WITH_STATION[cm];
}

export function pickUpStationByCMVendorForPie(cm) {
  return VENDOR_CODE_WITH_STATION_FUNCTION[cm];
}

export function getCurrentMonth() {
  const d = new Date();
  const month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";
  return month[d.getMonth()].substr(0, 3);
}
