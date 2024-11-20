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
            {(list.length) ? List() : NoList()}
        </>
    )
}
