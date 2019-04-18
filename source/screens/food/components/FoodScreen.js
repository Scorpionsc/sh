import MenuScreen from '../../menu/components/MenuScreen';

class FoodScreen extends MenuScreen {
  state = {
    menuSections: [
      {
        title: 'FOOD TYPES',
        data: [
          {
            title: 'Products',
            route: 'Products',
          },
          {
            title: 'Dishes',
            route: 'Dishes',
          },
          {
            title: 'Menus',
            route: 'Menus',
          },
        ],
      },
    ],
  };
}


export default FoodScreen;
