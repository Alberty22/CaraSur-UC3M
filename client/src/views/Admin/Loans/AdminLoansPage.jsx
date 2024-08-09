import './AdminLoansPage.css'
import { Breadcrumbs } from '../../../components/others/Breadcrumbs'

import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { useFetch } from '../../../hooks/useFetch'


const addDays = (dateString, days) => {
    const [day, month, year] = dateString.split('-').map(Number)
    const result = new Date(year, month - 1, day)
    result.setDate(result.getDate() + days)

    const dayFormatted = String(result.getDate()).padStart(2, '0')
    const monthFormatted = String(result.getMonth() + 1).padStart(2, '0')
    const yearFormatted = result.getFullYear()

    return `${dayFormatted}-${monthFormatted}-${yearFormatted}`
};


export function AdminLoansPage() {

    const { t } = useTranslation();

    const [section, setSection] = useState('pending')

    const { data:dataPending } = useFetch({ url:`/loans-pending.json`})
    const { data:dataProcessed } = useFetch({ url:`/loans-processed.json`})

    const [pendingLoans, setPendingLoans] = useState([])
    const [processedLoans, setProcessedLoans] = useState([])

    useEffect(() => {
        if (dataPending) {
            setPendingLoans(dataPending ? dataPending : [])
            
        }
        if (dataProcessed){
            setProcessedLoans(dataProcessed ? dataProcessed : [])
        }
    }, [dataPending, dataProcessed]);

    const handleAccept = (index) => {
        const loan = pendingLoans[index]
        
        setPendingLoans((prev) => {
            const updated = [...prev]
            updated.splice(index, 1)
            return updated
        });

        const updatedLoan = {
            ...loan,
            returnDate: addDays(loan.loanDate, 10)
        };

        setProcessedLoans((prev) => [...prev, updatedLoan])
        
    };

    return (
        <main className='admin-loans-page'>
            <Breadcrumbs />
            <div >
                <h2 onClick={() => setSection('pending')}>{t('adminLoans.title1')}</h2>
                <h2 onClick={() => setSection('processed')}>{t('adminLoans.title2')}</h2>    
            </div>
            
            { section === 'pending' 
            ? <section>
                 <table className='table'>
                    <thead>
                    <tr>
                        <th>{t('adminLoans.column1')}</th>
                        <th>{t('adminLoans.column2')}</th>
                        <th>{t('adminLoans.column3')}</th>
                        <th>{t('adminLoans.column4')}</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                    pendingLoans.map((loan,index) => {
                        return (
                            <tr key={index}>
                                <td>{loan.product}</td>
                                <td>{loan.user}</td>
                                <td>{loan.loanDate}</td>
                                <td>{t(`adminLoans.${loan.returnDate}`)}</td>
                                <td className='button'><button onClick={() => handleAccept(index)}>{t('adminLoans.accept')}</button></td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
            </section>

            : <section>
                <table className='table'>
                    <thead>
                    <tr>
                        <th>{t('adminLoans.column1')}</th>
                        <th>{t('adminLoans.column2')}</th>
                        <th>{t('adminLoans.column3')}</th>
                        <th>{t('adminLoans.column4')}</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                     processedLoans.map((loan,index) => {
                        return (
                            <tr key={index}>
                                <td>{loan.product}</td>
                                <td>{loan.user}</td>
                                <td>{loan.loanDate}</td>
                                <td>{loan.returnDate}</td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
            </section>
            }
            
            
            
        </main>
    )
}