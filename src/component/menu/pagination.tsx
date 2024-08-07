// @ts-nocheck
import Style from "./pagination.module.sass";
import Link from "next/link";

export default function Pagination ({searchParams, url, count, step}) {
    if (searchParams.page) searchParams.page = Number(searchParams.page)
    if (!searchParams.page) searchParams.page = 1

    let pageCountAr = Array.from({length: Math.ceil(Number(count) / Number(step))})
    let pageCount = pageCountAr.length

    return (
        <div className={Style.pagination}>
            <nav aria-label="Page navigation example">
                <ul className="pagination">

                    <li className="page-item"><a className={(searchParams.page > 1) ? "page-link" : "page-link disabled"} href={`${url}?${new URLSearchParams({...searchParams, page: 1})}`}>&laquo;</a></li>
                    <li className="page-item"><a className={(searchParams.page > 1) ? "page-link" : "page-link disabled"} href={`${url}?${new URLSearchParams({...searchParams, page: searchParams.page - 1})}`}>&lt;</a></li>

                    {pageCountAr.map((item, i) => {
                        if (i+1 === searchParams.page)
                            return <li key={i} className="page-item"><a className={"page-link disabled"} href={`${url}?${new URLSearchParams({...searchParams, page: searchParams.page})}`}>{searchParams.page}</a></li>
                        else
                            return null
                    })}

                    <li className="page-item"><a className={(searchParams.page < pageCount) ? "page-link" : "page-link disabled"} href={`${url}?${new URLSearchParams({...searchParams, page: searchParams.page + 1})}`}>&gt;</a></li>
                    <li className="page-item"><a className={(searchParams.page < pageCount) ? "page-link" : "page-link disabled"} href={`${url}?${new URLSearchParams({...searchParams, page: pageCount})}`}>&raquo;</a></li>

                </ul>
            </nav>
        </div>
    )
}
/*
export default function Pagination ({searchParams, url, count, step}) {
    let page = searchParams.page
    if (!page) page = 1
    page = Number(page)
    let pageCount = Array.from({length: Math.ceil(count / step)})

    delete searchParams.page

    return (
        <div className={Style.pagination}>
            <ul className="pagination">

                {(page > 1) ? <li className="page-item">
                    <Link className="page-link" href={`${url}?page=${page-1}&${new URLSearchParams(searchParams)}`} aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </Link>
                </li> : null}

                {pageCount.map((item, i) => {
                    if ((page-i>3) || ((page-i)*-1>1))
                        return <div className={Style.hidden} key={i}><li className="page-item"><Link className="page-link" href={`${url}?page=${i+1}&${new URLSearchParams(searchParams)}`}>{i+1}</Link></li></div>

                    if (Number(i)===Number(page-1))
                        return <div key={i}><li className="page-item active"><Link className="page-link" href={`${url}?page=${i+1}&${new URLSearchParams(searchParams)}`}>{i+1}</Link></li></div>

                    return <div key={i}><li className="page-item"><Link className="page-link" href={`${url}?page=${i+1}&${new URLSearchParams(searchParams)}`}>{i+1}</Link></li></div>
                })}

                {(pageCount.length > page) ? <li className="page-item">
                    <Link className="page-link" href={`${url}?page=${page+1}&${new URLSearchParams(searchParams)}`} aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </Link>
                </li> : null}

            </ul>
        </div>
    )
}*/