import { fetchLista, fetchUniquePodcast } from '@/services/chillastApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

export const options = {
  headerShown: false,
}

export default function ListaDetalle() {
  const { id } = useLocalSearchParams()
  const router = useRouter()

  const [username, setUsername] = useState(null)
  const [podcasts, setPodcasts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUsername() {
      const storedUser = await AsyncStorage.getItem("usuario")
      const user = storedUser ? JSON.parse(storedUser) : null
      if (user?.username) setUsername(user.username)
    }
    loadUsername()
  }, [])

  useEffect(() => {
    if (!username || !id) return

    async function loadLista() {
      setLoading(true)
      try {
        const listaData = await fetchLista(username, id)
        if (listaData?.podcast?.length > 0) {
          const podcastsData = await Promise.all(
            listaData.podcast.map((pid) => fetchUniquePodcast({ id: pid }))
          )
          setPodcasts(podcastsData)
        } else {
          setPodcasts([])
        }
      } catch (error) {
        console.error(error)
        setPodcasts([])
      }
      setLoading(false)
    }

    loadLista()
  }, [username, id])

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#232323', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  if (podcasts.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: '#232323', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>No hay podcasts en esta lista.</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#232323" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 50,
          paddingHorizontal: 20,
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginRight: 10 }}
        >
          <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text
          style={{
            flex: 1,
            color: "white",
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Lista
        </Text>
        <View style={{ width: 34 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}>
        {podcasts.map((podcast) => (
          <TouchableOpacity
            key={podcast.id ? podcast.id : podcast._id}
            activeOpacity={0.8}
            onPress={() =>
              router.push(`/podcast/${podcast.id ? podcast.id : podcast._id}`)
            }
            style={{
              flexDirection: "row",
              backgroundColor: "#393939",
              borderRadius: 18,
              marginBottom: 16,
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
                {podcast.generos && podcast.generos.length > 0 && (
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
                      {podcast.generos[0]}
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
                  5/5
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
