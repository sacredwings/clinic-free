'use client'

import React, {useState, useEffect} from 'react'
import Hf from '@/component/hf/list'
import SpecialistGet from '@/component/specialist/list'
import ResearchGet from '@/component/research/list'

export default function HfConstructor ({hf, specialist, research}) {
    let [selectHf, setSelectHf] = useState(null)

    //выбран вредный фактор
    const SelectHf = (hf) => {
        setSelectHf(hf)
    }

    return <div className="row">
        <div className="col-6">
            <Hf SelectHf={SelectHf} list={hf}/>
        </div>
        <div className="col-6">
            <SpecialistGet selectHf={selectHf} list={specialist} module={'hf'}/>
            <hr/>
            <ResearchGet selectHf={selectHf}  list={research} module={'hf'}/>
        </div>
    </div>
}