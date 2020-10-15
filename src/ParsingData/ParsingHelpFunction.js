export function outputDate(date) {
    return new Date(date).toLocaleDateString('en-US')
}

export function shrinkDateString(str) {
    const [month, day] = str.split('/')
    return `${month}/${day}`
}

export function separateString(str) {
    return str.split('(')
}

export function getWeek(d) {
    const target = new Date(d.valueOf())
    const dayNr = (d.getDay() + 6) % 7
    target.setDate(target.getDate() - dayNr + 3)
    const jan4 = new Date(target.getFullYear(), 0, 4)
    const dayDiff = (target - jan4) / 86400000
    const weekNr = 1 + Math.ceil(dayDiff / 7)
    return weekNr
}

export function getDateOfISOWeek(w, y) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7)
    var dow = simple.getDay()
    var ISOweekStart = simple
    if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1)
    else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay())
    return ISOweekStart
}

export function getSevenDayBoundary(d, n = 7) {
    return new Date(new Date(d).valueOf() + -n * 24 * 3600 * 1000)
}

export function milToMiliMeter(mil) {
    return parseFloat((mil * 0.0254).toFixed(2))
}

export const category = [
    { value: 'MB', label: 'MBData' },
    { value: 'BPN', label: 'BPNData' },
    { value: 'OTHER', label: 'OtherData' },
]

export const MBKEYWORD = [
    'MBD',
    'X10',
    'X11',
    'X12',
    'M11',
    'P8D',
    'X8D',
    'H11',
    'H12',
    'B11',
    'B8D',
    'X9D',
    'B9D',
    'A2S',
    'A1S',
    'A3S',
    'B1D',
    'C2C',
    'C9X',
    'C9Z',
    'C7C',
    'C7H',
    'C2S',
    'B2S',
    'B10',
    'B11',
    'B12',
    'B1S',
    'BH1',
    'X9S',
    'C7Z',
    'X9D',
]

export const BPNKEYWORD = ['BPN', 'SAS', 'SAT', 'CSE']

// For CM station types
const USITYPE = ['SMT1', 'SMT2', 'ASM', 'FCT']
const WZSTYPE = ['SMT_AOI(BOT)', 'SMT_AOI(TOP)', 'DIP_AOI', 'DIP_Function_A']
const WIHTYPE = ['AOI BOT', 'AOI TOP', 'DIP Final Inspection', 'DIP Function A']
const OSETYPE = ['AOI-A1', 'AOI-A2', 'DIP-VI', 'First & Function TEST']
const RISETYPE = ['SMT1', 'AOI1', 'DIP1', 'FCT']
const CPWTYPE = ['04_AOI_B', '09_AOI_T', '24_DIP_VI_T', '34_FT_1']

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
}

// const VENDOR_CODE_WITH_STATION_FUNCTION = {
//     USI: 'FCT',
//     WZS: 'DIP_AOI',
//     WIH: 'DIP Final Inspection',
//     VPS: 'First & Function TEST',
//     USISZ: 'FCT',
//     RISECOM: 'FCT',
//     OSE: 'First & Function TEST',
//     CPW: '34_FT_1',
// }

const VENDOR_CODE_WITH_STATION_PIE = {
    USI: 'FCT',
    WZS: 'DIP_Function_A',
    WIH: 'DIP Function A',
    VPS: 'DIP-VI',
    USISZ: 'FCT',
    RISECOM: 'FCT',
    OSE: 'DIP-VI',
    CPW: '34_FT_1',
}

export function pickUpStationByCMVendor(cm) {
    return VENDOR_CODE_WITH_STATION[cm]
}

export function pickUpStationByCMVendorForPie(cm) {
    return VENDOR_CODE_WITH_STATION_PIE[cm]
}

export function generateLabelValueSelectionByCM(cm) {
    return pickUpStationByCMVendor(cm).map(station => ({
        value: station,
        label: station,
    }))
}

export function getCurrentYear() {
    return new Date().toLocaleDateString().split('/')[0]
}

export function getCurrentMonth(d = new Date()) {
    const month = []
    month[0] = 'January'
    month[1] = 'February'
    month[2] = 'March'
    month[3] = 'April'
    month[4] = 'May'
    month[5] = 'June'
    month[6] = 'July'
    month[7] = 'August'
    month[8] = 'September'
    month[9] = 'October'
    month[10] = 'November'
    month[11] = 'December'
    return month[d.getMonth()].substr(0, 3)
}

export function getDataMonth(date) {
    return date.getMonth() + 1
}

export function translateToMonthCharater(num) {
    switch (num) {
        case 0:
            return 'Jan'
        case 1:
            return 'Feb'
        case 2:
            return 'Mar'
        case 3:
            return 'Apr'
        case 4:
            return 'May'
        case 5:
            return 'Jun'
        case 6:
            return 'Jul'
        case 7:
            return 'Aug'
        case 8:
            return 'Sep'
        case 9:
            return 'Oct'
        case 10:
            return 'Nov'
        case 11:
            return 'Dec'
        default:
            break
    }
}

export function extractModelName(vendor, model) {
    switch (vendor) {
        case 'RISECOM':
            return model.split('(')[0] || model.split('-')[0]
        case 'WIH':
        case 'WZS':
            return model.split(' ')[0]
        case 'OSE':
        case 'VPS':
        case 'CPW':
            return model
        case 'USI':
        case 'USISZ':
            return model.split('(')[1] || model.split('-')[0]

        default:
            return model
    }
}
