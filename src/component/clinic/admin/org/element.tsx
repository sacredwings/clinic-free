// @ts-nocheck
import Link from 'next/link'

export default function Element ({element, clinic_id}){
    let href=`/clinic/${clinic_id}/admin/contract?org_id=${element._id}`

    return (
        <Link className="list-group-item list-group-item-action" href={href}>
            {element.title}
        </Link>
    )
}
