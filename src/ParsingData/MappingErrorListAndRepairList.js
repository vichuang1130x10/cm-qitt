// Mapping error list and repair list
export function mappingErrorListAndRepairList(objA, objB) {
    objB.RepairList.forEach((repairElement) => {
        let errorListElement = objA.ErrorList.find((errorListElement) => {
            return (
                repairElement['CM_SN'] === errorListElement['CM_SN'] &&
                repairElement['Error_Description'] ===
                    errorListElement['Error_Description'] &&
                repairElement['Type'] === errorListElement['Type']
            )
        })
        if (errorListElement) {
            Object.assign(errorListElement, repairElement)
        }
    })
}

export function mappingErrorListAndRepairListVersion2(objA, objB) {
    objB.forEach((repairElement) => {
        let errorListElement = objA.find((errorListElement) => {
            return (
                repairElement['CM_SN'] === errorListElement['CM_SN'] &&
                repairElement['Error_Description'] ===
                    errorListElement['Error_Description'] &&
                repairElement['Type'] === errorListElement['Type']
            )
        })
        if (errorListElement) {
            Object.assign(errorListElement, repairElement)
        }
    })
}
