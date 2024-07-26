import './ActivitiesTitleSection.css'

export function ActivitiesTitleSection() {

    const ActivityTitle = ({ color, text }) => {
        return <div className="grid-item" style={{ backgroundColor: color.primary, color: color.secondary, borderColor: color.border }}> {text} </div>;
    };

    const gridItems = [
        {
            'color': {
                primary:'#f7f7f7',
                secondary:'#235371',
                border:'#235371',
            },
            'text': 'Trekking'
        },
        {
            'color': {
                primary:'#235371',
                secondary:'#f7f7f7',
                border:'#235371',
            },
            'text': 'Montañismo'
        },
        {
            'color': {
                primary:'#f7f7f7',
                secondary:'#235371',
                border:'#235371',
            },
            'text': 'Alpinismo'
        },
        {
            'color': {
                primary:'#f7f7f7',
                secondary:'#235371',
                border:'#235371',
            },
            'text': 'Escalada'
        },
        {
            'color': {
                primary:'#235371',
                secondary:'#f7f7f7',
                border:'#235371',
            },
            'text': 'BTT'
        },
        {
            'color': {
                primary:'#f7f7f7',
                secondary:'#235371',
                border:'#235371',
            },
            'text': 'Senderismo'
        },

    ];

    return(
        <section className='activities-title-section'>
            <div></div>
            <div>
                <div className="grid-container">
                    {gridItems.map((item, index) => (
                        <ActivityTitle key={index} color={item.color}  text={item.text} />
                    ))}
                </div>
            </div>
            <div>
                <h2>ACTIVIDADES</h2>
            </div>
        </section>
    )
}