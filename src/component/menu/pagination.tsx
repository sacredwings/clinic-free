// @ts-nocheck
import Style from "./pagination.module.sass";
import Link from "next/link";

export default function Pagination ({searchParams, url, count, step}) {
    if (searchParams.page) searchParams.page = Number(searchParams.page)
    if (!searchParams.page) searchParams.page = 1

    let pageCountAr = Array.from({length: Math.ceil(Number(count) / Number(step))})
    let pageCount = pageCountAr.length

    let edge = 3

    const ButtonLeft = () => {
        if (searchParams.page-2 < 1) return null
        if (searchParams.page-1 > edge) {
            let countAr = Array.from({length: Math.ceil(edge-1)})

            return countAr.map((item, i) => {
                return <li key={i} className="page-item"><Link className={"page-link"} href={`${url}?${new URLSearchParams({...searchParams, page: searchParams.page-edge+i+1})}`}>{searchParams.page-edge+i+1}</Link></li>
            })
        } else {
            let countAr = Array.from({length: Math.ceil(searchParams.page-2)})

            return countAr.map((item, i) => {
                return <li key={i} className="page-item"><Link className={"page-link"} href={`${url}?${new URLSearchParams({...searchParams, page: i+2})}`}>{i+2}</Link></li>
            })
        }
    }
    const ButtonRight = () => {
        if (pageCount-searchParams.page < 1) return null

        if (pageCount-searchParams.page > edge) {
            let countAr = Array.from({length: Math.ceil(edge-1)})

            return countAr.map((item, i) => {
                return <li key={i} className="page-item"><Link className={"page-link"} href={`${url}?${new URLSearchParams({...searchParams, page: searchParams.page+i+1})}`}>{searchParams.page+i+1}</Link></li>
            })
        } else {
            let countAr = Array.from({length: Math.ceil(pageCount-searchParams.page-1)})

            return countAr.map((item, i) => {
                return <li key={i} className="page-item"><Link className={"page-link"} href={`${url}?${new URLSearchParams({...searchParams, page: searchParams.page+i+1})}`}>{searchParams.page+i+1}</Link></li>
            })
        }
    }
    const CenterButton = () => {
        if (searchParams.page !== 1 && searchParams.page !== pageCount)
            return pageCountAr.map((item, i) => {
                if (i+1 === searchParams.page)
                    return <li key={i} className="page-item"><Link className={"page-link disabled"} href={`${url}?${new URLSearchParams({...searchParams, page: searchParams.page})}`}>{searchParams.page}</Link></li>
                else
                    return null
            })
        else null
    }

    return (
        <div className={Style.pagination}>
            <nav aria-label="Page navigation example">
                <ul className="pagination">

                    <li className="page-item"><Link className={(searchParams.page === 1) ? "page-link disabled" : "page-link"} href={`${url}?${new URLSearchParams({...searchParams, page: 1})}`}>1</Link></li>

                    {(searchParams.page > edge+1) ? <li className="page-item"><Link className={"page-link disabled"} href={`#`}>...</Link></li> : null}

                    {ButtonLeft()}

                    {CenterButton()}

                    {ButtonRight()}

                    {(pageCount > 3) && (searchParams.page < pageCount - edge) ? <li className="page-item"><Link className={"page-link disabled"} href={`#`}>...</Link></li> : null}

                    {(pageCount > 1) ? <li className="page-item"><Link className={(searchParams.page < pageCount) ? "page-link" : "page-link disabled"} href={`${url}?${new URLSearchParams({...searchParams, page: pageCount})}`}>{pageCount}</Link></li> : null}

                </ul>
            </nav>
        </div>
    )
}