import MenuScreen from '../../menu/components/MenuScreen';

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
            {
              title: 'Speed Settings',
              route: 'SettingsSpeed',
            },
          ],
        },
      ],
    };
}

export default MoreScreen;
