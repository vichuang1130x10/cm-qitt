export function outputDate(date) {
    return new Date(date).toLocaleDateString('en-US')
}

export function shrinkString(str) {
    if (str.length < 7) {
        return str
    } else {
        return `${str.substr(0, 5)}...`
    }
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

export function getWeekVersion2(d) {
    const target = new Date(d)
    const dayNr = (target.getDay() + 6) % 7
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

// The primary model list from QA team, will update it to DB in the future
export const PRIMARY_MODEL = {
    USI: [
        '2701-005400-64(X11QPH+)',
        '2701-005570-62(H12DSG-O-CPU)',
        '2701-005200-64(X11DPG-QT)',
        '2701-005560-61(H12DSU-iN)',
    ],
    OSE: [
        'MBD-X11DPU',
        'MBD-X11DPT-PS',
        'X10DRW-i',
        'MBD-X12DDW-A6',
        'MBD-X12DPFR-AN6',
    ],
    WIH: [
        'H11SSL-I 2.00 (B/S) MB W/O DIMM',
        'H11DSI 2.00 (B/S) MB W/O DIMM',
        'X11SSW-LN4F-II008 1.00(B/S)MB W/O CPU',
        'H12DST-B 1.00A (B/S) MB W/O DIMM',
        'H12SSL-i 1.01 (B/S) MB W/O DIMM DIP',
        'H12SSW-NT 1.01 (B/S) MB W/O DIMM',
    ],
}

export const VENDOR_NAME = Object.keys(VENDOR_CODE_WITH_STATION)

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
    return pickUpStationByCMVendor(cm).map((station) => ({
        value: station,
        label: station,
    }))
}

export function getCurrentYear(d = new Date()) {
    return d.toLocaleDateString().split('/')[0]
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

export function parsingToQty(e, str, isFourteenDay, dEndDate) {
    if (e === undefined || e === null) {
        return []
    }
    const allDefects = {}

    if (isFourteenDay) {
        const inTheSevenDaysData = e[str].ErorrDescriptions.filter(
            (obj) => new Date(obj.date) > getSevenDayBoundary(dEndDate, 14)
        )

        inTheSevenDaysData.forEach((defect) => {
            if (
                allDefects[defect.description] === null ||
                allDefects[defect.description] === undefined
            ) {
                allDefects[defect.description] = 1
            } else {
                allDefects[defect.description] += 1
            }
        })
    } else {
        e[str].ErorrDescriptions.forEach((defect) => {
            if (
                allDefects[defect.description] === null ||
                allDefects[defect.description] === undefined
            ) {
                allDefects[defect.description] = 1
            } else {
                allDefects[defect.description] += 1
            }
        })
    }

    let sortable = []
    for (let defect in allDefects) {
        sortable.push([defect, allDefects[defect]])
    }

    sortable.sort(function (a, b) {
        return b[1] - a[1]
    })
    const totalDefects = sortable.reduce((acc, elem) => acc + elem[1], 0)
    const result = []
    let accumulate = 0
    sortable.forEach((d) => {
        const indiv = parseInt((d[1] / totalDefects) * 100)
        accumulate += d[1]
        result.push({
            defectName: d[0],
            qty: d[1],
            indiv: indiv,
            accu: parseInt((accumulate / totalDefects) * 100),
        })
    })

    return result
}

export function parsingRootCause(failureName, e, str, isFourteenDay, dEndate) {
    if (!failureName) return
    const result = []
    const rootCause = {}
    const failures = isFourteenDay
        ? e[str].ErorrDescriptions.filter(
              (obj) => new Date(obj.date) > getSevenDayBoundary(dEndate)
          )
        : e[str].ErorrDescriptions

    const f = failures.filter((failure) => failure.description === failureName)
    f.forEach((reason) => {
        result.push(`${reason.reasons[0].reason}/${reason.reasons[0].item}`)
    })

    console.log(result)

    result.forEach((item) => {
        if (rootCause[item] === null || rootCause[item] === undefined) {
            rootCause[item] = 1
        } else {
            rootCause[item] += 1
        }
    })

    let sortable = []
    for (let defect in rootCause) {
        sortable.push([defect, rootCause[defect]])
    }

    sortable.sort(function (a, b) {
        return b[1] - a[1]
    })

    const totalDefects = sortable.reduce((acc, elem) => acc + elem[1], 0)
    const rootCauseResult = []
    let accumulate = 0
    sortable.forEach((d) => {
        const indiv = parseInt((d[1] / totalDefects) * 100)
        accumulate += d[1]
        rootCauseResult.push({
            defectName: d[0],
            qty: d[1],
            indiv: indiv,
            accu: parseInt((accumulate / totalDefects) * 100),
        })
    })
    return rootCauseResult
}
