import './FiltersSidebar.css'

export function FiltersSidebar({ children }) {

    return (
        <aside className="filters-sidebar">
            <div>
                {children}
            </div>
        </aside>
    )
}