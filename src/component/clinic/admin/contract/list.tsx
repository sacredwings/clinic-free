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
            <h1>Договора</h1>
            {org_id ?
                <Link type="button" className="btn btn-outline-success"
                      href={`/clinic/${clinic_id}/admin/contract/add?org_id=${org_id}`}> Новый договор + </Link> :
                <div className="alert alert-warning" role="alert">
                    Выберите организацию, чтобы <b>добавить</b> договор
                </div>}

            {(list.length) ? List() : NoList()}
        </>
    )
}
