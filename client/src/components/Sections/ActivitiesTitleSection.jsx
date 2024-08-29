import './ActivitiesTitleSection.css';
import { useTranslation } from 'react-i18next';

const ActivityTitle = ({ color, text }) => {
    return <div className="grid-item" style={{ backgroundColor: color.primary, color: color.secondary, borderColor: color.border }}> {text} </div>;
};

export function ActivitiesTitleSection() {

    const { t } = useTranslation();

    const gridItems = [
        {
            'color': {
                primary:'#f7f7f7',
                secondary:'#235371',
                border:'#235371',
            },
            'text': t('home.activitiesTitleSection.activity1')
        },
        {
            'color': {
                primary:'#235371',
                secondary:'#f7f7f7',
                border:'#235371',
            },
            'text': t('home.activitiesTitleSection.activity2')
        },
        {
            'color': {
                primary:'#f7f7f7',
                secondary:'#235371',
                border:'#235371',
            },
            'text': t('home.activitiesTitleSection.activity3')
        },
        {
            'color': {
                primary:'#f7f7f7',
                secondary:'#235371',
                border:'#235371',
            },
            'text': t('home.activitiesTitleSection.activity4')
        },
        {
            'color': {
                primary:'#235371',
                secondary:'#f7f7f7',
                border:'#235371',
            },
            'text': t('home.activitiesTitleSection.activity5')
        },
        {
            'color': {
                primary:'#f7f7f7',
                secondary:'#235371',
                border:'#235371',
            },
            'text': t('home.activitiesTitleSection.activity6')
        },

    ];

    return(
        <section className='activities-title-section'>
            <div></div>
            <div>
                <div className="grid-container">
                    {gridItems.map((item) => (
                        <ActivityTitle key={item.text} color={item.color}  text={item.text} />
                    ))}
                </div>
            </div>
            <div>
                <h2>{t('home.activitiesTitleSection.title')}</h2>
            </div>
        </section>
    )
}