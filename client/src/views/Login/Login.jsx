import './Login.css'
import { Footer } from '../../components/Footer/Footer.jsx';
import { Header } from '../../components/Header/Header.jsx';
import { LoginMain } from './Main/LoginMain.jsx';
import useMobileQuery from "../../hooks/useMobileQuery.js";


export function Login() {

    const isMobile = useMobileQuery('(max-width: 1023px)')
    return (
        <>
        { isMobile && <Header />}
        <LoginMain />
        <Footer />
        </>
    )
}
