import {
    getWeek,
    MBKEYWORD,
    BPNKEYWORD,
    pickUpStationByCMVendor,
    pickUpStationByCMVendorForPie,
    extractModelName,
    getSevenDayBoundary,
  
} from './ParsingHelpFunction'

// Main function to parsing yieldRate json to specfic format for each models and some meta data
export function parseForYieldRate(updatedJson) {
    /* Start Parsing */

    /* 1. Initial n ( new object ) for the output object format */
    let n = {
        vendor: updatedJson.YieldRate[0]['Vendor'],
        startDate:
            updatedJson.YieldRate.reduce((a, b) => (a.Date > b.Date ? b : a))
                .Date || new Date(),
        endDate:
            updatedJson.YieldRate.reduce((a, b) => (a.Date > b.Date ? a : b))
                .Date || new Date(),
        MB: [],
        BPN: [],
        Other: [],
    }

    // 2. loop through {YieldRate:[{...},....]}
    // Date: Wed Jun 10 2020 00:00:00 GMT+0800 (台北標準時間) {}
    // each obj would be: { Fail: 0,Line: "PD2-H",MO: "6005130-UG",Model: "2701-004240-00(BPN-SAS3-833A)",Month: 6,
    // Pass: 44,Refail: 0,Repass: 0,Start_date: Sat Jun 06 2020 00:00:00 GMT+0800 (台北標準時間) {},
    // Total: 44,Type: "ASM",Vendor: "USI",Version: 1, YR: 1  }
    updatedJson.YieldRate.forEach(obj => {
        /* 
      3.Seperate raw data for MB, BPN ,and Other groups 
    */
        const proName = extractModelName(obj.Vendor, obj.Model)

        if (BPNKEYWORD.includes(proName.substring(0, 3).toUpperCase())) {
            n.BPN.push(obj)
        } else if (MBKEYWORD.includes(proName.substring(0, 3).toUpperCase())) {
            n.MB.push(obj)
        } else {
            n.Other.push(obj)
        }
        /* 4. get the correspond station types by CM vendor  */
        const station = pickUpStationByCMVendor(obj.Vendor)

        /* 5. 
          collect data for each model as 
         "model name":{ Pass:int,Fail:int,Total:int,data:[],mo:[],weekly:[],monthly:[]}
    */
        if (n[obj.Model] === undefined || n[obj.Model] === null) {
            n[obj.Model] = {}
            // n[obj.Model]['RowData'] = [obj]

            for (let s of station) {
                // e.g. X11QPH+ : { SMT1:{Pass,Fail,....},SMT2:{...},ASM:{...},FCT:{...}}
                // data:[{Date,Pass,Fail,Total},...] ,mo:[{MO,PASS,FAIL,TOTAL,STARTDATE},...]
                // weekly:[{Week,PASS,FAIL,TOTAL},...],month:[{Month,PASS,FAIL,TOTAL},...]
                n[obj.Model][s] = {
                    Pass: 0,
                    Fail: 0,
                    Total: 0,
                    data: [],
                    mo: [],
                    weekly: [],
                    monthly: [],
                }
            }
            if (
                // if the station is what we need, grab it; Otherwise, ignore this row
                station.includes(obj.Type)
            ) {
                n[obj.Model][obj.Type].Pass += obj.Pass
                n[obj.Model][obj.Type].Fail += obj.Fail
                n[obj.Model][obj.Type].Total += obj.Total
                // forming data by Data(Date)/MO/Weekly/Monthly
                const { Date, Pass, Fail, Total, MO, Start_date, Month } = obj
                const weekNumber = getWeek(Date)

                n[obj.Model][obj.Type].data = [{ Date, Pass, Fail, Total }]
                n[obj.Model][obj.Type].mo = [
                    { MO, Pass, Fail, Total, Start_date },
                ]
                n[obj.Model][obj.Type].weekly = [
                    { weekNumber, Pass, Fail, Total },
                ]
                n[obj.Model][obj.Type].monthly = [{ Month, Pass, Fail, Total }]
            }
        } else {
            // n[obj.Model]['RowData'].push(obj)
            if (
                // if the station is what we need, grab it; Otherwise, ignore this row
                station.includes(obj.Type)
            ) {
                n[obj.Model][obj.Type].Pass += obj.Pass
                n[obj.Model][obj.Type].Fail += obj.Fail
                n[obj.Model][obj.Type].Total += obj.Total
                const { Date, Pass, Fail, Total, MO, Start_date, Month } = obj
                const weekNumber = getWeek(Date)
                // gather same date/mo/weekly/monthly
                // for same date:
                const sameDateObje = n[obj.Model][obj.Type].data.find(
                    elem => elem.Date.toString() === Date.toString()
                )
                if (sameDateObje) {
                    sameDateObje.Pass += Pass
                    sameDateObje.Fail += Fail
                    sameDateObje.Total += Total
                } else {
                    n[obj.Model][obj.Type].data.push({
                        Date,
                        Pass,
                        Fail,
                        Total,
                    })
                }
                // for same mo:
                const sameMoObj = n[obj.Model][obj.Type].mo.find(
                    elem => elem.MO === MO
                )
                if (sameMoObj) {
                    sameMoObj.Pass += Pass
                    sameMoObj.Fail += Fail
                    sameMoObj.Total += Total
                } else {
                    n[obj.Model][obj.Type].mo.push({
                        MO,
                        Pass,
                        Fail,
                        Total,
                        Start_date,
                    })
                }
                // for same weekly:
                const sameWeeklyObj = n[obj.Model][obj.Type].weekly.find(
                    elem => elem.weekNumber === weekNumber
                )
                if (sameWeeklyObj) {
                    sameWeeklyObj.Pass += Pass
                    sameWeeklyObj.Fail += Fail
                    sameWeeklyObj.Total += Total
                } else {
                    n[obj.Model][obj.Type].weekly.push({
                        weekNumber,
                        Pass,
                        Fail,
                        Total,
                    })
                }
                // for same monthly:
                const sameMonthObj = n[obj.Model][obj.Type].monthly.find(
                    elem => elem.Month === Month
                )
                if (sameMonthObj) {
                    sameMonthObj.Pass += Pass
                    sameMonthObj.Fail += Fail
                    sameMonthObj.Total += Total
                } else {
                    n[obj.Model][obj.Type].monthly.push({
                        Month,
                        Pass,
                        Fail,
                        Total,
                    })
                }
            }
        }
    })

    /* 6. YieldRate.ForEach completed, we have a handfull data of n ( our models data n) as below structure:
  //{startDate: Wed Apr 01 2020 00:00:00 GMT+0800 (Taipei Standard Time), endDate: Thu Jun 04 2020 00:00:00 GMT+0800 (Taipei Standard Time), 2701-005240-60(X11DPG-SN): {…}, 2701-005280-61(X11DPG-OT-CPU): {…}, 2701-005222-61(X11DPFR-SN-LC019): {…}, …}
  //2701-001520-65(AOC-STGN-i2S): {RowData: Array(312), SMT1: {…}, SMT2: {…}, ASM: {…}, FCT: {…}, …}
  //ASM: {Pass: 5001, Fail: 0, Total: 5001, data: Array(10)}
  */

    const result = transformToArray(generateFTY(n))
    /* 7. calling transformToArray to make all models into an array to be easily rendered in the list*/
    // const result = transformToArray(n)

    /* 8. 
        Construct app state object
  */

    const { startDate, endDate, models, vendor, BPN, MB, Other } = result
    const BPNData = calculateSMT2AndFctYieldByGroup(BPN, vendor)
    const MBData = calculateSMT2AndFctYieldByGroup(MB, vendor)
    const OtherData = calculateSMT2AndFctYieldByGroup(Other, vendor)
    // const BPNSMT2Total = BPNData.SMT2.reduce((acc, elem) => acc + elem.Total, 0);
    // const BPNSMT2Total = calculateTotal(BPNData, "SMT2");
    const BPNFCTTotal = calculateTotal(BPNData, vendor)
    // const MBSMT2Total = calculateTotal(MBData, "SMT2");
    const MBFCTTotal = calculateTotal(MBData, vendor)
    // const OtherSMT2Total = calculateTotal(OtherData, "SMT2");
    const OtherFCTTotal = calculateTotal(OtherData, vendor)
    // const smt2PieData = { BPNSMT2Total, MBSMT2Total, OtherSMT2Total };
    // const fct2PieData = { BPNFCTTotal, MBFCTTotal, OtherFCTTotal };
    const piesData = { BPNFCTTotal, MBFCTTotal, OtherFCTTotal }

    return {
        vendor,
        startDate,
        endDate,
        models,
        BPNData,
        MBData,
        OtherData,
        piesData,
    }
}

const calculateTotal = (obj, cm) => {
    const station = pickUpStationByCMVendorForPie(cm)
    return obj[station].monthly.reduce((acc, elem) => acc + elem.Total, 0)
}

// transform yieldRate object into array for result page easy to render
/* Just optimize the data structure */
function transformToArray(obj) {
    const { startDate, endDate, MB, BPN, Other, vendor } = obj
    const o = { vendor, startDate, endDate, MB, BPN, Other, models: [] }
    const keys = Object.keys(obj).filter(
        item =>
            item !== 'startDate' &&
            item !== 'endDate' &&
            item !== 'MB' &&
            item !== 'BPN' &&
            item !== 'Other' &&
            item !== 'vendor'
    )
    keys.forEach(model => {
        const newObject = { model, ...obj[model] }
        o.models.push(newObject)
    })
    return o
}

const calculateData = (arr, type) => {
    const data = arr
        .filter(obj => obj.Type === type)
        .map(obj => ({
            Week: getWeek(obj.Date),
            Pass: obj.Pass,
            Total: obj.Total,
        }))

    const finalResult = {}
    data.forEach(obj => {
        if (
            finalResult[obj.Week] === undefined ||
            finalResult[obj.Week] === null
        ) {
            finalResult[obj.Week] = {
                Week: obj.Week,
                Pass: obj.Pass,
                Total: obj.Total,
            }
        } else {
            finalResult[obj.Week].Pass += obj.Pass
            finalResult[obj.Week].Total += obj.Total
        }
    })
    const keys = Object.keys(finalResult)
    const finalArray = []
    keys.forEach(key => {
        finalArray.push(finalResult[key])
    })
    return finalArray
}

// generate yield rate/ output data by "Month"
// duplicate from calculateData
// This duplicate function is kind of awkward, Maybe will be fixed in the future
const calculateMonthlyData = (arr, type) => {
    const data = arr
        .filter(obj => obj.Type === type)
        .map(obj => ({
            Month: obj.Month,
            Pass: obj.Pass,
            Total: obj.Total,
        }))

    const finalResult = {}
    data.forEach(obj => {
        if (
            finalResult[obj.Month] === undefined ||
            finalResult[obj.Month] === null
        ) {
            finalResult[obj.Month] = {
                Month: obj.Month,
                Pass: obj.Pass,
                Total: obj.Total,
            }
        } else {
            finalResult[obj.Month].Pass += obj.Pass
            finalResult[obj.Month].Total += obj.Total
        }
    })
    const keys = Object.keys(finalResult)
    const finalArray = []
    keys.forEach(key => {
        finalArray.push(finalResult[key])
    })
    return finalArray
}

// pass group raw data array and return an obj {SMT2 :[{Week:1,Total:100,Pass:99,Yield:99%}...],FCT:[{Week:1,Total:100,Pass:99,Yield:99%}...]}
const calculateSMT2AndFctYieldByGroup = (arr, vendor) => {
    const station = pickUpStationByCMVendor(vendor)
    const resultObj = {}
    station.forEach(s => {
        resultObj[s] = {
            weekly: calculateData(arr, s).sort(sortByWeek),
            monthly: calculateMonthlyData(arr, s).sort(sortByMonth),
        }
    })
    return resultObj
}

function sortByWeek(a, b) {
    if (a.Week > b.Week) {
        return 1
    } else {
        return -1
    }
}

function sortByMonth(a, b) {
    if (a.Month > b.Month) {
        return 1
    } else {
        return -1
    }
}

<<<<<<< HEAD

=======
// CM_PN: "65G1225-207X"
// Count: 1
// Cust_PN: "CAP-0530L"
// Cust_PartName: "CER 2.2UF 6.3V M X6S 0402"
// Date: Tue Jan 14 2020 00:00:00 GMT+0800 (台北標準時間) {}
// Error_Code: "SMT-M01"
// Error_Description: "MISSING COMP(WITH SOLDER)"
// Line: "22W1"
// MO: 11204604
// Model: "AOC-UR-i4XTF-ST031"
// Month: 1
// Reason: "MISSING COMP(WITH SOLDER)"
// START_DATE: Mon Jan 13 2020 00:00:00 GMT+0800 (台北標準時間) {}
// Type: "AOI-A1"
// Vendor: "OSE"
// Version: 1.01
// item: "C218"

export function parsingRepairList(repairList,isSevenDay,date){
    let n = {}

    let dateFilteredRepairList = null
    
    if(isSevenDay){
        // const inTheSevenDaysData = e[str].ErorrDescriptions.filter(
        //     obj => new Date(obj.date) > getSevenDayBoundary(dEndDate, 14)
        // )
        dateFilteredRepairList = repairList.filter(obj => new Date(obj.Date) > getSevenDayBoundary(date,7))
    
    }else{
        dateFilteredRepairList = repairList
    }

    const updateRepairList = dateFilteredRepairList.filter(rep => rep.Cust_PN && !rep.Cust_PN.includes('PCB')&& !rep.Cust_PN.includes('MBD') && !rep.Cust_PN.includes('AOC') && !rep.Cust_PN.includes('AOM') && rep.Cust_PN.trim().length > 0 && rep.Cust_PN !== "N/A" && rep.Cust_PN !== "NTF")
        console.log(updateRepairList)
    

    updateRepairList.forEach(rep => {
        if (n[rep.Cust_PN] === undefined || n[rep.Cust_PN] === null) {
            n[rep.Cust_PN] = {qty:1,data:[]}
            n[rep.Cust_PN].data.push(rep)
            
          
       }else{
        n[rep.Cust_PN].qty += 1   
        n[rep.Cust_PN].data.push(rep)
       }
    })
    return n
}
>>>>>>> f422b20f6db98e1567bc15e074b945d0b0a75458
// parsing errorlist json to specfic format for each station failure symptom
export function parsingErrorList(errorList) {
    let n = {}
    console.log('error list here', errorList)
    const station = pickUpStationByCMVendor(errorList[0].Vendor)

    errorList.forEach(obj => {
        if (n[obj.Model] === undefined || n[obj.Model] === null) {
            n[obj.Model] = {}

            for (let s of station) {
                n[obj.Model][s] = { ErorrDescriptions: [] }
            }

            if (station.includes(obj.Type)) {
                n[obj.Model][obj.Type].ErorrDescriptions = [
                    {
                        description: obj['Error_Description'],
                        reasons: [
                            {
                                reason: obj.Reason,
                                item: obj.item,
                                date: obj.Date,
                            },
                        ],
                        date: obj.Date,
                    },
                ]
            }
        } else {
            if (station.includes(obj.Type)) {
                n[obj.Model][obj.Type].ErorrDescriptions.push({
                    description: obj['Error_Description'],
                    reasons: [
                        { reason: obj.Reason, item: obj.item, date: obj.Date },
                    ],
                    date: obj.Date,
                })
            }
        }
    })

    return n
}

/* 
   generate FTY for each main station of model 
   Because each cm has different station name in the model object
   therefore, i use station 0~ 3 to replace the original name

   another attribute to add for each model:
   1. productType: "MB","BPN","Other" for easy data sort
   2. isSelect: this attribute for Redux for UI control

*/
function generateFTY(obj) {
    /* extract non-model obj*/
    const keys = Object.keys(obj).filter(
        item =>
            item !== 'vendor' &&
            item !== 'startDate' &&
            item !== 'endDate' &&
            item !== 'MB' &&
            item !== 'BPN' &&
            item !== 'Other'
    )
    const stations = pickUpStationByCMVendor(obj.vendor)

    /* iterate each model to add station 0 -3 FTY*/
    keys.forEach(key => {
        let model = obj[key]
        const station0FTY = calculateStationFTY(model, stations[0])
        const station1FTY = calculateStationFTY(model, stations[1])
        const station2FTY = calculateStationFTY(model, stations[2])
        const station3FTY = calculateStationFTY(model, stations[3])
        const proName = extractModelName(obj.vendor, key)
        let productType = ''
        if (BPNKEYWORD.includes(proName.substring(0, 3).toUpperCase())) {
            productType = 'BPN'
        } else if (MBKEYWORD.includes(proName.substring(0, 3).toUpperCase())) {
            productType = 'MB'
        } else {
            productType = 'Other'
        }

        const inTheSevenDaysData = model[stations[3]].data.filter(
            fctData => new Date(fctData.Date) > getSevenDayBoundary(obj.endDate)
        )

        let sevenDayPass = 0
        let sevenDayTotal = 0
        let sevenDayFty = 0

        if (inTheSevenDaysData.length) {
            sevenDayPass =
                inTheSevenDaysData.reduce((accu, ele) => accu + ele.Pass, 0) ||
                0
            sevenDayTotal =
                inTheSevenDaysData.reduce((accu, ele) => accu + ele.Total, 0) ||
                1
            sevenDayFty = parseFloat(
                ((sevenDayPass / sevenDayTotal) * 100).toFixed(2)
            )
        }

        obj[key] = {
            ...obj[key],
            station0FTY,
            station1FTY,
            station2FTY,
            station3FTY,
            productType,
            isSelect: false,
            inTheSevenDaysData,
            sevenDayPass,
            sevenDayTotal,
            sevenDayFty,
        }
    })

    console.log('generateFTY', obj)
    return obj
}

const calculateStationFTY = (model, station) => {
    const pass = model[station].Pass || 0
    const total = model[station].Total || 0
    return parseFloat(((pass / total) * 100).toFixed(1)) || 0
}
