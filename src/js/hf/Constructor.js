import React, {useState, useEffect} from 'react'
import Hf from './harmfulFactor/Get'
import SpecialistGet from './specialist/Get'
import ResearchGet from './research/Get'

function Get (props) {

    let [selectHf, setSelectHf] = useState(null)

    useEffect(async () => {
    }, [selectHf])

    //выбран вредный фактор
    const SelectHf = (hf) => {
        setSelectHf(hf)
    }

    return (
        <div className="row">
            <div className="col-6">
                <Hf SelectHf={SelectHf}/>
            </div>
            <div className="col-6">
                <SpecialistGet selectHf={selectHf}/>
                <hr/>
                <ResearchGet selectHf={selectHf}/>
            </div>
        </div>
    )
}

export default Get

