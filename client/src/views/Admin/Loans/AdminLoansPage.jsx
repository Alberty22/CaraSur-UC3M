import './AdminLoansPage.css'
import { Breadcrumbs } from '../../../components/others/Breadcrumbs'

import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { useFetch } from '../../../hooks/useFetch'

import { ROUTES } from '../../../config/apiRoutes'
import { sendData, updateData } from '../../../utils/communications'


const addDays = (dateString, days) => {
    const [year, month, day] = dateString.split('-').map(Number)
    const result = new Date(year, month - 1, day)
    result.setDate(result.getDate() + days)

    const dayFormatted = String(result.getDate()).padStart(2, '0')
    const monthFormatted = String(result.getMonth() + 1).padStart(2, '0')
    const yearFormatted = result.getFullYear()

    return `${yearFormatted}-${monthFormatted}-${dayFormatted}`
};


function AdminLoansPage() {

    const { t } = useTranslation();

    const [section, setSection] = useState('pending')

    const { data:dataPending } = useFetch({ url: ROUTES.PENDING_LOANS})
    const { data:dataProcessed } = useFetch({ url: ROUTES.PROCCESED_LOANS})

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

    const handleAccept = async(index) => {
        const loan = pendingLoans[index]

        const updatedLoan = {
            ...loan,
            returnDate: addDays(loan.loanDate, 10)
        }

        const res = await sendData(updatedLoan, ROUTES.PROCCESED_LOANS)
        
        if(res.code) {
            setPendingLoans((prev) => {
                const updated = [...prev]
                updated.splice(index, 1)
                return updated
            })
            
            setProcessedLoans((prev) => [...prev, updatedLoan])
        }   
    }

    const handleDecline = async (index) => {
        const loan = pendingLoans[index]
        const res = await updateData(loan, ROUTES.PENDING_LOANS)

        if(res.code) {
            setPendingLoans((prev) => {
                const updated = [...prev]
                updated.splice(index, 1)
                return updated
            })
        }
        
    }

    const handleConfirm = async (index) => {
        const loan = processedLoans[index]

        const res = await updateData(loan, ROUTES.PROCCESED_LOANS)

        if(res.code) {
            setProcessedLoans((prev) => {
                const updated = [...prev]
                updated.splice(index, 1)
                return updated
            })
        }
    }

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
                                <td>{loan.name}</td>
                                <td>{loan.user}</td>
                                <td>{loan.loanDate}</td>
                                <td>{t(`adminLoans.${loan.returnDate}`)}</td>
                                <td className='button'><button onClick={() => handleDecline(index)}>{t('adminLoans.decline')}</button></td>
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
                                <td>{loan.name}</td>
                                <td>{loan.user}</td>
                                <td>{loan.loanDate}</td>
                                <td>{loan.returnDate}</td>
                                <td className='button'><button onClick={() => handleConfirm(index)}>{t('adminLoans.accept')}</button></td>
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

export default AdminLoansPage;
