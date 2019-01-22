import React from "react";
import MenuScreen from "./MenuScreen";

class MoreScreen extends MenuScreen {

    state = {
        menuSections: [
            {
                title: 'SETTINGS',
                data: [
                    {
                        title: 'Main Settings',
                        route: 'SettingsMain',
                    },
                ],
            }
        ]
    };

}

export default MoreScreen;