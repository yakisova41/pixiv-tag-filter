import React, { useState } from "react";
import ToggleButton from "./ToggleButton";
import OptionPanel from "./OptionPanel";

const OptionScreen = () => {
    const [panelOpen, setPanelOpen] = useState(false);

    const handleTogglebutton = () => {
        if (panelOpen) {
            setPanelOpen(false);
        } else {
            setPanelOpen(true);
        }
    };

    return (
        <>
            <ToggleButton onClick={handleTogglebutton} />

            {panelOpen && <OptionPanel />}
        </>
    );
};

export default OptionScreen;
