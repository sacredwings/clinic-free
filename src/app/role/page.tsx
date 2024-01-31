// @ts-nocheck
import RoleList from '@/component/role/list'

export default async function Role ({
                                        params,
                                        //searchParams
                                    }:{
    params: { id: string },
    //searchParams: { page: number, q: string }
}) {
    return (
        <>
            <RoleList />
        </>
    )
}
