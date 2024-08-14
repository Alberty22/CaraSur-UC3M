import './LoansPage.css';

import { Breadcrumbs } from '../../components/others/Breadcrumbs';
import { LoanItem } from '../../components/others/LoanItem';

import { useUserLoans } from '../../hooks/useUserLoans';


function LoansPage() {
    const { loans } = useUserLoans()
    return (
        <main className='loans-page'>
            <Breadcrumbs />
            <section>
                { loans !== undefined &&
                    loans.map((loan, index) => {
                        return (
                            <LoanItem key={index} information={loan}></LoanItem>
                        )
                    })
                }
                
            </section>
        </main>
    )
}

export default LoansPage;