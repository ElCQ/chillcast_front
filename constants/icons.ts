import { ImageSourcePropType } from 'react-native';

export type IconName = 'HomeIcon' | 'SearchIcon' | 'ProfileIcon' | 'MiEspacioIcon' | 'MagnifyingGlassIcon' | 'StarIcon' | 'FilterIcon';

export const Icons: Record<IconName, ImageSourcePropType> = Object.freeze({
    HomeIcon: require('../assets/icons/homeIcon.png'),
    SearchIcon: require('../assets/icons/searchIcon.png'),
    ProfileIcon: require('../assets/icons/profileIcon.png'),
    MiEspacioIcon: require('../assets/icons/miEspacioIcon.png'),
    MagnifyingGlassIcon: require('../assets/icons/magnifyingGlassIcon.png'),
    StarIcon: require('../assets/icons/starIcon.png'),
    FilterIcon: require('../assets/icons/filterIcon.png'),
});