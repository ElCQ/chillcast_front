import CardContainer from '@/components/cardContainer'
import SearchBar from '@/components/SearchBar'
import { fetchPodcasts } from '@/services/chillastApi'
import useFetch from '@/services/useFetch'
import { useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const Home = () => {

  const router = useRouter();

  const {data, loading, error} = useFetch(() => fetchPodcasts({query: 'podcast'}));

  const firstTen = data?.slice(0, 10);

  return (
    <View className="bg-[#282828] flex-1 items-center justify-start gap-5 pt-10">
      <View className="px-6 w-full items-center justify-between gap-5">
        <Text className="text-white text-2xl font-bold ">Home</Text>
        <SearchBar
          placeholder="Buscar"
          onPress={() => router.push("/search")}
        />
      </View> 

      <ScrollView className="w-full h-full p-0">
        <View className="gap-5 pb-10">
          {loading ? (
            <Text className="text-white text-center mt-10">Cargando...</Text>
          ) : error ? (
            <Text className="text-red-400 text-center mt-10">{error.message}</Text>
          ) : (
            <>
              <CardContainer
                datos={firstTen}
                loading={loading}
                error={error}
                nombre="Recomendaciones del dia"
              />
              <CardContainer
                datos={firstTen}
                loading={loading}
                error={error}
                nombre="Según tus gustos"
                color="#5C0055"
              />
              <CardContainer
                datos={firstTen}
                loading={loading}
                error={error}
                nombre="Escuchar algo nuevo"
                color="#073120"
              />
            </>
           )}
        </View>
      </ScrollView>
    </View>
  );
}

export default Home