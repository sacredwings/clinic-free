// @ts-nocheck
import Link from 'next/link'
import OrgElement from './element'

export default function OrgList ({list, clinic_id}) {
    const List = () => {
        return <div className="list-group">
            {list.map((item, i) => {
                return <OrgElement key={i} element={item} clinic_id={clinic_id}/>
            })}
        </div>
    }

    const NoList = () => {
        return <div className="alert alert-warning" role="alert">
            Организаций нет
        </div>
    }

    return (
        <>
            <h1>Организации <Link type="button" className="btn btn-outline-success" href={'/org/add'}> + </Link></h1>
            {(list.length) ? List() : NoList()}
        </>
    )
}
