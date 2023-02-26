import React, {useState, useEffect} from 'react'
import ContractType from '../../app/components/contract-type/Get'
import SpecialistGet from '../../app/components/specialist/Get'
import ResearchGet from '../../app/components/research/Get'
import TemplatesMain from "../../app/components/template/main"

export default function () {
    let [selectHf, setSelectHf] = useState(null)

    //выбран вредный фактор
    const SelectHf = (hf) => {
        setSelectHf(hf)
    }

    return <TemplatesMain title={'Конструктор вредных факторов'}>
        <h1>Типы договоров</h1>
        <div className="row">
            <div className="col-6">
                <ContractType SelectHf={SelectHf}/>
            </div>
            <div className="col-6">
                <SpecialistGet selectHf={selectHf} module={'ct'}/>
                <hr/>
                <ResearchGet selectHf={selectHf} module={'ct'}/>
            </div>
        </div>
    </TemplatesMain>
}

/*



 */