import './LoansPage.css'

import { Breadcrumbs } from '../../components/others/Breadcrumbs'
import { LoanItem } from '../../components/others/LoanItem'

import { useFetch } from '../../hooks/useFetch'

import { ROUTES } from '../../config/apiRoutes'
import { getCookie } from '../../utils/cookies'

export function LoansPage() {
    const { data } = useFetch({ url:`${ROUTES.USER_LOANS}/${encodeURIComponent(getCookie('email'))}`})
    const loans = data ? Object.values(data) : []
    return (
        <main className='loans-page'>
            <Breadcrumbs />
            <section>
                { loans !== undefined &&
                    loans.map((loan) => {
                        return (
                            <LoanItem key={loan.product} information={loan}></LoanItem>
                        )
                    })
                }
                
            </section>
        </main>
    )
}