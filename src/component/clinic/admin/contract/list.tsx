// @ts-nocheck
import Link from 'next/link'
import ContractElement from './element'

export default function OrgList ({list, clinic_id, org_id}) {

    const List = () => {
        return <div className="list-group">
            {list.map((item, i) => {
                return <ContractElement key={i} element={item} clinic_id={clinic_id}/>
            })}
        </div>
    }

    const NoList = () => {
        return <div className="alert alert-warning" role="alert">
            Договоров нет
        </div>
    }

    return (
        <>
            <h1>Договора <Link type="button" className="btn btn-outline-success" href={`/org/${org_id}/contract/add`}> + </Link></h1>
            {(list.length) ? List() : NoList()}
        </>
    )
}
