// @ts-nocheck

import UserSearchList from '@/component/user/search/list'

export default async function User ({
                                        params,
                                        searchParams
                                    }:{
    params: { id: string },
    searchParams: { page: number, q: string }
}) {
    return (
        <>
            <UserSearchList searchParams={searchParams}/>
        </>
    )
}
