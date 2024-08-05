import { Children } from 'react';
import useMobileQuery from '../../hooks/useMobileQuery';
import './FormSection.css'
import { useLocation } from 'react-router-dom';

export const FormSection = ({ children, divideBy }) => {

    const isMobile = useMobileQuery('(max-width: 1024px)')
    const location = useLocation();

    const childrenArray = Children.toArray(children)
    const [firstGroup, secondGroup] = childrenArray.reduce(
        ([group1, group2], child) => {
            if (divideBy(child.props.group)) {
              return [[...group1, child], group2];
            } 
            else {
              return [group1, [...group2, child]];
            }
          },
          [[], []]
    )

    const route = location.pathname.split('/');
    return(
        <>
        { (!isMobile || route[route.length - 1] === 'login') && 
        <section className={route[route.length - 1] === 'login' ? 'left-login' : 'left-singup'}>
                {firstGroup}
        </section>}
        { (!isMobile || route[route.length - 1] === 'singup') && 
        <section className={route[route.length - 1]=== 'login' ? 'right-login' : 'right-singup'}>
                {secondGroup}
        </section>}
        </>
        
    )
}