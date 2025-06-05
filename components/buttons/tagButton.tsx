import React from "react";
import { Text, TouchableOpacity } from "react-native";

const TagButton = ({nombre, onPress}: {nombre: string, onPress: () => void}) => {
  return (
    <TouchableOpacity
      onPress={() => onPress()}
      className={`px-4 py-2 rounded-full border mb-2 mr-2 border-white`}
    >
      <Text className="text-white text-sm">{nombre}</Text>
    </TouchableOpacity>
  );
};

export default TagButton;
