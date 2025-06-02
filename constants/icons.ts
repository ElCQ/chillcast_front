import { ImageSourcePropType } from 'react-native';

export type IconName = 
'HomeIcon' | 'SearchIcon' | 'ProfileIcon' | 'MiEspacioIcon' | 'MagnifyingGlassIcon' | 
'StarIcon' | 'FilterIcon' | 'ArrowBackIcon' | 'CirclePlusIcon' | 'FolderPlusIcon' |
'ThumbsUpIcon' | 'ThumbsDownIcon';

export const Icons: Record<IconName, ImageSourcePropType> = Object.freeze({
  HomeIcon: require("../assets/icons/homeIcon.png"),
  SearchIcon: require("../assets/icons/searchIcon.png"),
  ProfileIcon: require("../assets/icons/profileIcon.png"),
  MiEspacioIcon: require("../assets/icons/miEspacioIcon.png"),
  MagnifyingGlassIcon: require("../assets/icons/magnifyingGlassIcon.png"),
  StarIcon: require("../assets/icons/starIcon.png"),
  FilterIcon: require("../assets/icons/filterIcon.png"),
  ArrowBackIcon: require("../assets/icons/arrowBackIcon.png"),
  CirclePlusIcon: require("../assets/icons/circlePlusIcon.png"),
  FolderPlusIcon: require("../assets/icons/folderPlusIcon.png"),
  ThumbsUpIcon: require("../assets/icons/thumbsUpIcon.png"),
  ThumbsDownIcon: require("../assets/icons/thumbsDownIcon.png")
});