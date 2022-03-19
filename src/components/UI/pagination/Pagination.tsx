import React from 'react';
import {getPagesArray} from "../../../utils/pages";

interface PaginationPropsType {
    totalPages: number
    page: number
    changePage: (p: number) => void
}

const Pagination = ({totalPages, page, changePage}: PaginationPropsType) => {
    let pagesArray = getPagesArray(totalPages)

    return (
        <div className={"page__wrapper"}>
            {pagesArray.map(p =>
                <span
                    key={p}
                    className={page === p ? "page page__current" : "page"}
                    onClick={() => changePage(p)}
                >
                        {p}
                    </span>
            )}
        </div>
    );
};

export default Pagination;