import FilterTabs from '@/components/filterTabs'
import { fetchFavorites } from '@/services/chillastApi'
import useFetch from '@/services/useFetch'
import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const tabs = ['Favoritos', 'Listas', 'Reseñas', 'Historial']

const listasMock = [
  {
    id: '1',
    title: 'Mis favoritos',
    image: require('@/assets/images/podcastImage.png'),
  },
  {
    id: '2',
    title: 'Para viajes',
    image: require('@/assets/images/podcastImage.png'),
  },
]

const MiEspacio = () => {
  const [tab, setTab] = useState('Favoritos')
  const router = useRouter()

  const username = "preuba8" // Prueba usuario dsp cambiar

  const { data: podcastData, loading, error } = useFetch(() =>
      fetchFavorites(username)
  )

  const cardMargin = 8
  const cardWidth = (Dimensions.get('window').width - 48 - cardMargin) / 2

  return (
    <View style={{ flex: 1, backgroundColor: "#232323" }}>
      <View
        className="px-6"
        style={{ backgroundColor: "#232323", paddingTop: 50 }}
      >
        <Text className="text-white text-2xl font-bold mb-6 text-center">
          Espacio Personal
        </Text>
        <FilterTabs tabs={tabs} activeTab={tab} setActiveTab={setTab} />
        {/* Ordenar y Filtrar */}
        <View
          className="flex-row items-center justify-between mb-6 mt-4 py-2"
          style={{ minHeight: 40 }}
        >
          <View className="flex-row items-center">
            <FontAwesome
              name="sliders"
              size={18}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text
              className="text-white font-medium"
              style={{ fontFamily: "System" }}
            >
              Ordenar y Filtrar
            </Text>
          </View>
          {tab === "Listas" && (
            <TouchableOpacity
              className="px-3 py-1 border-2 border-[#A259FF] rounded-full ml-4"
              activeOpacity={0.8}
              style={{
                backgroundColor: "transparent",
              }}
            >
              <Text
                className="text-white font-bold"
                style={{
                  fontFamily: "System",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                Crear Lista
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingTop: 0,
          paddingBottom: 30,
          paddingHorizontal: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* FAVORITOS */}
        {tab === "Favoritos" &&
          (loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : error ? (
            <Text className="text-red-400">{error.message}</Text>
          ) : (
            <View style={{ gap: 16 }}>
              {podcastData?.map((podcast, idx) => (
                <TouchableOpacity
                  key={podcast._id || idx}
                  activeOpacity={0.8}
                  onPress={() =>
                    router.push(`/podcast/${podcast._id}`)
                  }
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#393939",
                    borderRadius: 18,
                    marginBottom: 0,
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                    padding: 0,
                    height: 100,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={
                      podcast.image
                        ? { uri: podcast.image }
                        : require("@/assets/images/podcastImage.png")
                    }
                    style={{
                      width: 100,
                      height: "100%",
                      borderTopLeftRadius: 18,
                      borderBottomLeftRadius: 18,
                      backgroundColor: "#222",
                    }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      flex: 1,
                      paddingLeft: 24,
                      paddingRight: 24,
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 2,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 18,
                          flex: 1,
                          fontFamily: "System",
                        }}
                        numberOfLines={1}
                      >
                        {podcast.title}
                      </Text>
                    </View>
                    {/* Género y calificación juntos */}
                    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
                      {podcast.genero && podcast.genero.length > 0 && (
                        <View
                          style={{
                            backgroundColor: "#2ECC71",
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            borderRadius: 16,
                            marginRight: 8,
                            maxWidth: 120,
                            flexShrink: 1,
                          }}
                        >
                          <Text
                            style={{
                              color: "white",
                              fontSize: 14,
                              fontFamily: "System",
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                          >
                            {podcast.genero[0]}
                          </Text>
                        </View>
                      )}
                      <FontAwesome name="star" size={14} color="#FFD600" style={{ marginRight: 4 }} />
                      <Text
                        style={{
                          color: "white",
                          fontWeight: "bold",
                          fontSize: 13,
                          fontFamily: "System",
                        }}
                      >
                        {"5"}/5
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}

        {/* LISTAS */}
        {tab === "Listas" && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            {listasMock.map((lista, idx) => (
              <TouchableOpacity
                key={lista.id}
                activeOpacity={0.8}
                onPress={() => router.push(`/listas/${lista.id}`)}
                style={{
                  width: cardWidth,
                  aspectRatio: 1,
                  backgroundColor: "#393939",
                  borderRadius: 18,
                  marginBottom: 16,
                  marginRight: idx % 2 === 0 ? cardMargin : 0,
                  overflow: "hidden",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                  position: "relative",
                  justifyContent: "flex-end",
                  alignItems: "flex-start",
                }}
              >
                {lista.image ? (
                  <Image
                    source={lista.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      borderRadius: 18,
                    }}
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#444",
                      position: "absolute",
                      borderRadius: 18,
                    }}
                  />
                )}
                <View
                  style={{
                    position: "absolute",
                    left: 0,
                    bottom: 0,
                    width: "100%",
                    padding: 10,
                    backgroundColor: "rgba(0,0,0,0.18)",
                    borderBottomLeftRadius: 18,
                    borderBottomRightRadius: 18,
                  }}
                >
                  <Text
                    className="text-white font-bold text-base"
                    style={{
                      fontFamily: "System",
                      fontWeight: "bold",
                      textShadowColor: "rgba(0,0,0,0.7)",
                      textShadowOffset: { width: 0, height: 1 },
                      textShadowRadius: 4,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {lista.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* RESEÑAS */}
        {tab === "Reseñas" && (
          <Text
            className="text-white text-center mt-10"
            style={{ fontFamily: "System" }}
          >
            Aca van tus reseñas
          </Text>
        )}

        {/* HISTORIAL */}
        {tab === "Historial" && (
          <View style={{ gap: 16 }}>
            {podcastData?.slice(0, 2).map((podcast, idx) => (
              <TouchableOpacity
                key={podcast._id || idx}
                activeOpacity={0.8}
                onPress={() =>
                  router.push(`/podcast/${podcast._id}`)
                }
                style={{
                  flexDirection: "row",
                  backgroundColor: "#393939",
                  borderRadius: 18,
                  alignItems: "center",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2,
                  padding: 0,
                  height: 100,
                  overflow: "hidden",
                  marginBottom: 0,
                }}
              >
                <Image
                  source={
                    podcast.image
                      ? { uri: podcast.image }
                      : require("@/assets/images/podcastImage.png")
                  }
                  style={{
                    width: 100,
                    height: "100%",
                    borderTopLeftRadius: 18,
                    borderBottomLeftRadius: 18,
                    backgroundColor: "#222",
                  }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    flex: 1,
                    paddingLeft: 24,
                    paddingRight: 24,
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 18,
                      fontFamily: "System",
                      marginBottom: 2,
                    }}
                    numberOfLines={1}
                  >
                    {podcast.title}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {podcast.genero && podcast.genero.length > 0 && (
                      <View
                        style={{
                          backgroundColor: "#2ECC71",
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 16,
                          marginRight: 8,
                          maxWidth: 120,
                          flexShrink: 1,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 14,
                            fontFamily: "System",
                          }}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >
                          {podcast.genero[0]}
                        </Text>
                      </View>
                    )}
                    <FontAwesome name="star" size={14} color="#FFD600" style={{ marginRight: 4 }} />
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 13,
                        fontFamily: "System",
                      }}
                    >
                      {"5"}/5
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default MiEspacio
