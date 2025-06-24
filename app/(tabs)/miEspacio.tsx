import FilterTabs from '@/components/filterTabs'
import { Podcast } from '@/interfaces/interfaces'
import { fetchCrearLista, fetchFavorites, fetchListas } from '@/services/chillastApi'
import { FontAwesome } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Dimensions, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'

const tabs = ['Favoritos', 'Listas', 'Reseñas', 'Historial']

const MiEspacio = () => {
  const [tab, setTab] = useState('Favoritos')
  const [favorites, setFavorites] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [newListName, setNewListName] = useState("")
  const [listas, setListas] = useState<{ id: string; title: string; image: any }[]>([])
  const router = useRouter()

  const cardMargin = 8
  const cardWidth = (Dimensions.get('window').width - 48 - cardMargin) / 2

  const fecthData = async () => {
    const usernameStr = await AsyncStorage.getItem("usuario")
    const username = usernameStr ? JSON.parse(usernameStr) : null
    if (!username?.username) throw new Error("No username found")

    try {
      setLoading(true)
      const data = await fetchFavorites(username.username)
      setFavorites(data)
      setLoading(false)
    } catch (error) {
      setError(error instanceof Error ? error : new Error("Error fetching favorites"))
    }
  }

  const fecthListas = async () => {
    const usernameStr = await AsyncStorage.getItem("usuario")
    const username = usernameStr ? JSON.parse(usernameStr) : null
    if (!username?.username) throw new Error("No username found")

    try {
      const listasBackend = await fetchListas(username.username)
      const listasFormateadas = listasBackend.map(lista => ({
        id: lista._id,
        title: lista.nombre,
        image: require('@/assets/images/podcastImage.png'), // Cambiar img
      }))
      setListas(listasFormateadas)
    } catch (error) {
      console.error("Error fetching listas", error)
    }
  }

  const crearListaHandler = async () => {
    if (!newListName.trim()) {
      Alert.alert("Error", "El nombre de la lista no puede estar vacío")
      return
    }

    const usernameStr = await AsyncStorage.getItem("usuario")
    const username = usernameStr ? JSON.parse(usernameStr)?.username : null
    if (!username) {
      Alert.alert("Error", "No se encontró el usuario")
      return
    }

    try {
      const nuevaLista = await fetchCrearLista({
        username,
        nombre_lista: newListName,
      })

      setListas(prev => [
        ...prev,
        {
          id: nuevaLista._id || Date.now().toString(),
          title: newListName,
          image: require("@/assets/images/podcastImage.png"),
        },
      ])

      Alert.alert("Éxito", "Lista creada correctamente")
      setModalVisible(false)
      setNewListName("")
    } catch (err) {
      Alert.alert("Error", "No se pudo crear la lista")
    }
  }

  useEffect(() => {
    fecthData()
    fecthListas()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      fecthData()
      fecthListas()
    }, [])
  )

  return (
    <View style={{ flex: 1, backgroundColor: "#232323" }}>
      <View className="px-6" style={{ backgroundColor: "#232323", paddingTop: 50 }}>
        <Text className="text-white text-2xl font-bold mb-6 text-center">Espacio Personal</Text>
        <FilterTabs tabs={tabs} activeTab={tab} setActiveTab={setTab} />
        <View
          className="flex-row items-center justify-between mb-6 mt-4 py-2"
          style={{ minHeight: 40 }}
        >
          <View className="flex-row items-center">
            <FontAwesome name="sliders" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text className="text-white font-medium" style={{ fontFamily: "System" }}>
              Ordenar y Filtrar
            </Text>
          </View>
          {tab === "Listas" && (
            <TouchableOpacity
              className="px-3 py-1 border-2 border-[#A259FF] rounded-full ml-4"
              activeOpacity={0.8}
              onPress={() => setModalVisible(true)}
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
        contentContainerStyle={{ paddingTop: 0, paddingBottom: 30, paddingHorizontal: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* FAVORITOS */}
        {tab === "Favoritos" ? (
          loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : error ? (
            <Text className="text-red-400">{error.message}</Text>
          ) : (
            <View style={{ gap: 16 }}>
              {favorites?.map((podcast, idx) => (
                <TouchableOpacity
                  key={podcast._id || idx}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/podcast/${podcast._id}`)}
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
                            style={{ color: "white", fontSize: 14, fontFamily: "System" }}
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
          )
        ) : null}

        {/* LISTAS */}
        {tab === "Listas" && (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            {listas.map((lista, idx) => (
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
          <Text className="text-white text-center mt-10" style={{ fontFamily: "System" }}>
            Aca van tus reseñas
          </Text>
        )}

        {/* HISTORIAL */}
        {tab === "Historial" && (
          <View style={{ gap: 16 }}>
            {favorites?.slice(0, 2).map((podcast, idx) => (
              <TouchableOpacity
                key={podcast._id || idx}
                activeOpacity={0.8}
                onPress={() => router.push(`/podcast/${podcast._id}`)}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#393939",
                  borderRadius: 18,
                  alignItems: "center",
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
                          style={{ color: "white", fontSize: 14, fontFamily: "System" }}
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

      {/* MODAL PARA CREAR LISTA */}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <View
            style={{
              width: '100%',
              backgroundColor: '#2c2c2c',
              padding: 20,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: 'white', fontSize: 18, marginBottom: 10 }}>Nombre de la lista</Text>
            <TextInput
              placeholder="Ej: Para viajes"
              placeholderTextColor="#999"
              value={newListName}
              onChangeText={setNewListName}
              style={{
                borderWidth: 1,
                borderColor: '#555',
                borderRadius: 8,
                paddingHorizontal: 10,
                paddingVertical: 8,
                color: 'white',
                marginBottom: 16,
              }}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: '#aaa', marginRight: 20 }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={crearListaHandler}>
                <Text style={{ color: '#A259FF', fontWeight: 'bold' }}>Crear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default MiEspacio
