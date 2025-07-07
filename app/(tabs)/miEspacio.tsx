import React, { useEffect, useState, useCallback } from 'react'
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native'
import FilterTabs from '@/components/filterTabs'
import { Podcast } from '@/interfaces/interfaces'
import {
  fetchCrearLista,
  fetchFavorites,
  fetchListas,
  fetchDeleteLista,
  fetchDeleteFavorite,
} from '@/services/chillastApi'
import { FontAwesome } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import { Swipeable } from 'react-native-gesture-handler'
import Toast from "react-native-toast-message";

const tabs = ['Favoritos', 'Listas', 'Reseñas', 'Historial']

const MiEspacio = () => {
  const [tab, setTab] = useState('Favoritos')
  const [favorites, setFavorites] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [newListName, setNewListName] = useState('')
  const [listas, setListas] = useState<{ id: string; title: string; image: any }[]>([])
  const [selectedListId, setSelectedListId] = useState<string | null>(null)
  const router = useRouter()

  const cardMargin = 8
  const cardWidth = (Dimensions.get('window').width - 48 - cardMargin) / 2

  const fetchData = async () => {
    const usernameStr = await AsyncStorage.getItem('usuario')
    const username = usernameStr ? JSON.parse(usernameStr) : null
    if (!username?.username) throw new Error('No username found')

    try {
      setLoading(true)
      const data = await fetchFavorites(username.username)
      setFavorites(data)
      setLoading(false)
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Error fetching favorites'))
    }
  }

  const fetchListasData = async () => {
    const usernameStr = await AsyncStorage.getItem('usuario')
    const username = usernameStr ? JSON.parse(usernameStr) : null
    if (!username?.username) throw new Error('No username found')

    try {
      const listasBackend = await fetchListas(username.username)
      const listasFormateadas = listasBackend.map((lista) => ({
        id: lista._id,
        title: lista.nombre,
        image: require('@/assets/images/podcastImage.png'),
      }))
      setListas(listasFormateadas)
    } catch (error) {
      console.error('Error fetching listas', error)
    }
  }

  const crearListaHandler = async () => {
    if (!newListName.trim()) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "El nombre de la lista no puede estar vacío",
      });
      return
    }

    const usernameStr = await AsyncStorage.getItem('usuario')
    const username = usernameStr ? JSON.parse(usernameStr)?.username : null
    if (!username) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se encontró el usuario",
      });
      return
    }

    try {
      const nuevaLista = await fetchCrearLista({
        username,
        nombre_lista: newListName,
      })

      setListas((prev) => [
        ...prev,
        {
          id: nuevaLista._id || Date.now().toString(),
          title: newListName,
          image: require('@/assets/images/podcastImage.png'),
        },
      ])


      Toast.show({
        type: "success",
        text1: "¡Éxito!",
        text2: "Lista creada correctamente",
      });
      setModalVisible(false)
      setNewListName('')
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se pudo crear la lista",
      });
    }
  }

  const eliminarListaHandler = async (listaId: string) => {
    const usernameStr = await AsyncStorage.getItem('usuario')
    const username = usernameStr ? JSON.parse(usernameStr)?.username : null
    if (!username) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se encontró el usuario",
      });
      return
    }

    Alert.alert(
      'Confirmar eliminación',
      '¿Seguro querés eliminar esta lista?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await fetchDeleteLista({ username, listaId })
              setListas((prev) => prev.filter((l) => l.id !== listaId))
              setSelectedListId(null)
              Toast.show({
                type: "success",
                text1: "Exito",
                text2: "Lista eliminada correctamente",
              });
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "No se pudo eliminar la lista",
              });
            }
          },
        },
      ],
      { cancelable: true }
    )
  }

  const eliminarFavoritoHandler = async (podcastId: string) => {
    const usernameStr = await AsyncStorage.getItem('usuario')
    const username = usernameStr ? JSON.parse(usernameStr)?.username : null
    if (!username) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "No se encontró el usuario",
      });
      return
    }

    Alert.alert(
      'Eliminar favorito',
      '¿Querés eliminar este podcast de tus favoritos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await fetchDeleteFavorite({ username, podcastId })
              setFavorites((prev) => prev.filter((p) => p._id !== podcastId))
              Toast.show({
                type: "success",
                text1: "¡Éxito!",
                text2: "Eliminado de favoritos",
              });
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "No se pudo eliminar el favorito",
              });
            }
          },
        },
      ],
      { cancelable: true }
    )
  }

  useEffect(() => {
    fetchData()
    fetchListasData()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      fetchData()
      fetchListasData()
    }, [])
  )

  const handleOutsidePress = useCallback(() => {
    if (selectedListId) {
      setSelectedListId(null)
    }
  }, [selectedListId])

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={{ flex: 1, backgroundColor: '#232323' }}>
        <View className="px-6" style={{ backgroundColor: '#232323', paddingTop: 50 }}>
          <Text className="text-white text-2xl font-bold mb-6 text-center">Espacio Personal</Text>
          <FilterTabs tabs={tabs} activeTab={tab} setActiveTab={setTab} />
          <View
            className="flex-row items-center justify-between mb-6 mt-4 py-2"
            style={{ minHeight: 40 }}
          >
            <View className="flex-row items-center">
              <FontAwesome name="sliders" size={18} color="#fff" style={{ marginRight: 8 }} />
              <Text className="text-white font-medium" style={{ fontFamily: 'System' }}>
                Ordenar y Filtrar
              </Text>
            </View>
            {tab === 'Listas' && (
              <TouchableOpacity
                className="px-3 py-1 border-2 border-[#A259FF] rounded-full ml-4"
                activeOpacity={0.8}
                onPress={() => setModalVisible(true)}
              >
                <Text
                  className="text-white font-bold"
                  style={{
                    fontFamily: 'System',
                    fontWeight: 'bold',
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
          {tab === 'Favoritos' ? (
            loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : error ? (
              <Text className="text-red-400">{error.message}</Text>
            ) : (
              <View style={{ gap: 16 }}>
                {favorites.map((podcast) => {
                  const podcastId = podcast._id

                  const renderRightActions = () => (
                    <TouchableOpacity
                      onPress={() => eliminarFavoritoHandler(podcastId)}
                      style={{
                        backgroundColor: '#E74C3C',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 100,
                        height: 100,
                        borderTopRightRadius: 18,
                        borderBottomRightRadius: 18,
                      }}
                    >
                      <FontAwesome name="trash" size={24} color="white" />
                    </TouchableOpacity>
                  )

                  return (
                    <Swipeable key={podcastId} renderRightActions={renderRightActions}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => router.push(`/podcast/${podcastId}`)}
                        style={{
                          flexDirection: 'row',
                          backgroundColor: '#393939',
                          borderRadius: 18,
                          marginBottom: 0,
                          alignItems: 'center',
                          shadowColor: '#000',
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: 0.1,
                          shadowRadius: 4,
                          elevation: 2,
                          padding: 0,
                          height: 100,
                          overflow: 'hidden',
                        }}
                      >
                        <Image
                          source={
                            podcast.image
                              ? { uri: podcast.image }
                              : require('@/assets/images/podcastImage.png')
                          }
                          style={{
                            width: 100,
                            height: '100%',
                            borderTopLeftRadius: 18,
                            borderBottomLeftRadius: 18,
                            backgroundColor: '#222',
                          }}
                          resizeMode="cover"
                        />
                        <View
                          style={{
                            flex: 1,
                            paddingLeft: 24,
                            paddingRight: 24,
                            justifyContent: 'center',
                            height: '100%',
                          }}
                        >
                          <Text
                            style={{
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: 18,
                              fontFamily: 'System',
                              marginBottom: 2,
                            }}
                            numberOfLines={1}
                          >
                            {podcast.title}
                          </Text>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            {podcast.genero && podcast.genero.length > 0 && (
                              <View
                                style={{
                                  backgroundColor: '#2ECC71',
                                  paddingHorizontal: 8,
                                  paddingVertical: 4,
                                  borderRadius: 16,
                                  marginRight: 8,
                                  maxWidth: 120,
                                  flexShrink: 1,
                                }}
                              >
                                <Text
                                  style={{ color: 'white', fontSize: 14, fontFamily: 'System' }}
                                  numberOfLines={1}
                                  ellipsizeMode="tail"
                                >
                                  {podcast.genero[0]}
                                </Text>
                              </View>
                            )}
                            <FontAwesome
                              name="star"
                              size={14}
                              color="#FFD600"
                              style={{ marginRight: 4 }}
                            />
                            <Text
                              style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 13,
                                fontFamily: 'System',
                              }}
                            >
                              {'5'}/5
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Swipeable>
                  )
                })}
              </View>
            )
          ) : null}

          {/* LISTAS */}
          {tab === 'Listas' && (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
              }}
            >
              {listas.map((lista, idx) => (
                <TouchableOpacity
                  key={lista.id}
                  activeOpacity={0.8}
                  onPress={() => {
                    if (selectedListId) {
                      setSelectedListId(null)
                    } else {
                      router.push(`/listas/${lista.id}`)
                    }
                  }}
                  onLongPress={() => setSelectedListId(lista.id)}
                  delayLongPress={1500}
                  style={{
                    width: cardWidth,
                    aspectRatio: 1,
                    backgroundColor: '#393939',
                    borderRadius: 18,
                    marginBottom: 16,
                    marginRight: idx % 2 === 0 ? cardMargin : 0,
                    overflow: 'hidden',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 2,
                    position: 'relative',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                  }}
                >
                  {lista.image ? (
                    <Image
                      source={lista.image}
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        borderRadius: 18,
                      }}
                      resizeMode="cover"
                    />
                  ) : (
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#444',
                        position: 'absolute',
                        borderRadius: 18,
                      }}
                    />
                  )}

                  <View
                    style={{
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: '100%',
                      padding: 10,
                      backgroundColor: 'rgba(0,0,0,0.18)',
                      borderBottomLeftRadius: 18,
                      borderBottomRightRadius: 18,
                    }}
                  >
                    <Text
                      className="text-white font-bold text-base"
                      style={{
                        fontFamily: 'System',
                        fontWeight: 'bold',
                        textShadowColor: 'rgba(0,0,0,0.7)',
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 4,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {lista.title}
                    </Text>
                  </View>

                  {selectedListId === lista.id && (
                    <TouchableOpacity
                      onPress={() => eliminarListaHandler(lista.id)}
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: '#E74C3C',
                        padding: 10,
                        borderRadius: 30,
                        zIndex: 999,
                      }}
                    >
                      <FontAwesome name="trash" size={20} color="#fff" />
                    </TouchableOpacity>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* RESEÑAS */}
          {tab === 'Reseñas' && (
            <View
              style={{
                height: 350,
                borderWidth: 1,
                borderColor: '#444',
                borderRadius: 12,
                padding: 24,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 24,
                marginBottom: 24,
              }}
            >
              <Text
                className="text-white text-center text-lg"
                style={{ fontFamily: 'System' }}
              >
                No hay reseñas
              </Text>
            </View>
          )}

          {/* HISTORIAL */}
          {tab === 'Historial' && (
            <View
              style={{
                height: 350,
                borderWidth: 1,
                borderColor: '#444',
                borderRadius: 12,
                padding: 24,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 24,
                marginBottom: 24,
              }}
            >
              <Text
                className="text-white text-center text-lg"
                style={{ fontFamily: 'System' }}
              >
                No hay historial
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Modal para crear lista */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.75)',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 24,
              }}
            >
              <TouchableWithoutFeedback>
                <View
                  style={{
                    backgroundColor: '#232323',
                    padding: 24,
                    borderRadius: 24,
                    width: '100%',
                    maxWidth: 400,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'System',
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: 'white',
                      marginBottom: 12,
                    }}
                  >
                    Crear nueva lista
                  </Text>
                  <TextInput
                    placeholder="Nombre de la lista"
                    placeholderTextColor="#666"
                    value={newListName}
                    onChangeText={setNewListName}
                    style={{
                      backgroundColor: '#333',
                      padding: 12,
                      borderRadius: 12,
                      color: 'white',
                      marginBottom: 16,
                      fontFamily: 'System',
                    }}
                  />
                  <TouchableOpacity
                    onPress={crearListaHandler}
                    style={{
                      backgroundColor: '#A259FF',
                      paddingVertical: 14,
                      borderRadius: 12,
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'System',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}
                    >
                      Crear
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default MiEspacio
