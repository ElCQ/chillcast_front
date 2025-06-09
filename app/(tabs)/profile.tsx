import FilterTabs from "@/components/filterTabs";
import { Icons } from "@/constants/icons";
import React, { useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import OptionButton from "./../../components/buttons/optionButton";

const Profile = () => {

  const tabs = ["Personal", "Personalización"];
  const [activeTab, setActiveTab] = useState('Personal');


  return (
    <View className="bg-[#282828] flex-1 items-center justify-start gap-3 pt-20">
      <View className="items-center justify-center gap-3">
        <Image
          source={Icons.ProfileCircleIcon}
          className="size-24"
          style={{ tintColor: "#fff" }}
        />
        <Text className="text-white font-semibold text-xl">Profile</Text>
      </View>
      <View className="w-full h-fit px-6 items-start justify-start">
        <FilterTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </View>
      <View className=" items-start w-full px-5 mt-5">
        <Text className="text-neutral-200 font-bold pb-2 text-center font-inter">
          Email
        </Text>

        <TextInput
          className={`bg-[#1f1f1f] w-full text-white px-4 py-3 rounded-xl mb-6 font-inter border border-neutral-600`}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={false}
        />

        <Text className="text-neutral-200 font-bold pb-2 text-center font-inter">
          Email
        </Text>

        <TextInput
          className={`bg-[#1f1f1f] w-full text-white px-4 py-3 rounded-xl mb-6 font-inter border border-neutral-600`}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={false}
        />

        <Text className="text-neutral-200 font-bold pb-2 text-center font-inter">
          Email
        </Text>

        <TextInput
          className={`bg-[#1f1f1f] w-full text-white px-4 py-3 rounded-xl mb-6 font-inter border border-neutral-600`}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={false}
        />
      </View>

      <OptionButton texto={"Editar"} activo={true} onPress={() => ""} />
    </View>
  );
};

export default Profile;
