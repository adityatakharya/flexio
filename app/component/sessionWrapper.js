"use client"

import Loading from "../dashboard/loading";
import { Suspense } from "react";

const Wrapper = ({children}) => {
    return(
        <Suspense fallback={<Loading/>}>
            {children}
        </Suspense>
    )
}

export default Wrapper;