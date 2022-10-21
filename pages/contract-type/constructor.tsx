import React, {useState, useEffect} from 'react'
import ContractType from '../../components/contract-type/Get'
import SpecialistGet from '../../components/specialist/Get'
import ResearchGet from '../../components/research/Get'
import TemplatesMain from "../../components/template/main"

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