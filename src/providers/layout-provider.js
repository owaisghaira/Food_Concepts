import React from 'react';

const LayoutContext = React.createContext();

const isMobileScreen = () => {
    const width = window.innerWidth;
    return (width <= 768);
}


function LayoutProvider({ children }) {
    const [isMobileLayout, setIsMobileLayout] = React.useState(isMobileScreen())
    const value = [isMobileLayout, setIsMobileLayout]
    return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
}

function useLayout() {
    const context = React.useContext(LayoutContext)
    if (context === undefined) {
        throw new Error('useLayout must be used within a LayoutProvider')
    }
    return context
}

export { LayoutProvider, useLayout }
