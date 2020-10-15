import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { readxlsx } from '../Utilities/HandlePickUpFile'
import { parseForYieldRate } from '../ParsingData/ParsingCMData'

export default function Dropzone({ callback, fileType, setFlag }) {
    const [filename, setFilename] = useState('')

    const onDrop = useCallback(
        acceptedFiles => {
            acceptedFiles.forEach(file => {
                const reader = new FileReader()
                reader.onabort = () => console.log('file reading was abort')
                reader.onerror = () => console.log('file reading has failed')
                reader.onload = e => {
                    console.log('received file ...')
                    const data = e.target.result

                    const retJson = readxlsx(data)
                    console.log(retJson)
                    const key = Object.keys(retJson)

                    switch (fileType) {
                        case 'YieldRate':
                            if (
                                key[0].split(' ')[0] !== 'YieldRate' ||
                                retJson[key] === null
                            ) {
                                alert(
                                    'The file you dropped is wrong, it should be yeild rate excel file'
                                )
                                setFlag(false)
                            } else {
                                const updatedJson = { YieldRate: retJson[key] }

                                const n = parseForYieldRate(updatedJson)
                                console.log(n)

                                callback(n)
                                setFlag(true)
                            }
                            break
                        case 'ErrorList':
                            if (
                                key[0].split(' ')[0] !== 'ErrorList' ||
                                retJson[key] === null
                            ) {
                                alert(
                                    'The file you dropped is wrong, it should be error list excel file'
                                )
                                setFlag(false)
                            } else {
                                const updatedJson = { ErrorList: retJson[key] }
                                // console.log(updatedJson);
                                callback(updatedJson)
                                setFlag(true)
                            }
                            break

                        case 'RepairList':
                            if (
                                key[0].split(' ')[0] !== 'RepairList' ||
                                retJson[key] === null
                            ) {
                                alert(
                                    'The file you dropped is wrong, it should be repair list excel file'
                                )
                                setFlag(false)
                            } else {
                                const updatedJson = { RepairList: retJson[key] }
                                //        console.log(updatedJson);
                                callback(updatedJson)
                                setFlag(true)
                            }
                            break

                        default:
                            break
                    }
                }
                // reader.readAsArrayBuffer(file)
                reader.readAsBinaryString(file)
            })

            setFilename(acceptedFiles[0].name)
        },
        [callback, fileType, setFlag]
    )

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    })

    return (
        <div>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag and drop file here, or click to select files</p>
            </div>
            <div>
                <h4>{filename}</h4>
            </div>
        </div>
    )
}
