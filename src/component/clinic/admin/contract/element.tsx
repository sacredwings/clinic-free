// @ts-nocheck
import Link from 'next/link'

export default function Element ({element, clinic_id}){
    let href=`/clinic/${clinic_id}/admin/contract?org_id=${element._id}`

    const ContractType = (arList) => {
        if (!arList) return null
        return arList.map((list, i) => {
            return <span key={i} className="badge bg-primary" style={{margin: '2px'}}>
                {list.name}
            </span>
        })
    }

    return <Link className="list-group-item list-group-item-action" href={href}>
        {element.name}
        <br/>
        {ContractType(element._contract_type_ids)}
    </Link>
}
