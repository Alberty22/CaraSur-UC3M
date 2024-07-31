import './LoansPage.css'
import { Breadcrumbs } from '../../components/Breadcrumbs'
import { useFetch } from '../../hooks/useFetch'
import { LoanItem } from '../../components/LoanItem'

export function LoansPage() {
    const { data } = useFetch({ url:'/loans.json' })
    const loans = data?.loans
    return (
        <main className='loans-page'>
            <Breadcrumbs />
            <section>
                { loans !== undefined &&
                    Object.values(loans).map((loan) => {
                        return (
                            <LoanItem key={loan.id} information={loan}></LoanItem>
                        )
                    })
                }
                
            </section>
        </main>
    )
}