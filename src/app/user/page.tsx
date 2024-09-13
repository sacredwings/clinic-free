// @ts-nocheck

import UserList from '@/component/user/list'

export default async function User ({
                                        params,
                                        searchParams
                                    }:{
    params: { id: string },
    searchParams: { page: number, q: string }
}) {
    return (
        <>
            <UserList searchParams={searchParams}/>
        </>
    )
}
