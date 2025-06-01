import { useLocalSearchParams, useRouter } from 'expo-router'
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import useFetch from '@/services/useFetch'
import { fetchPodcasts } from '@/services/chillastApi'

export const options = {
  headerShown: false,
}

export default function ListaDetalle() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const { data: podcastData, loading } = useFetch(() => fetchPodcasts({ query: "podcast" }))

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#232323', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }

  if (!podcastData || podcastData.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: '#232323' }} />
    )
  }

  const podcasts = podcastData.slice(0, 3).map((p, idx) => ({
    id: p._id || idx,
    title: p.title,
    subtitle: p.description || 'Podcast',
    rating: 4.7,
    image: p.image ? { uri: p.image } : require('@/assets/images/podcastImage.png'),
    genres: ['Género', 'Género', 'Género'],
  }))

  return (
    <View style={{ flex: 1, backgroundColor: '#232323' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 50, paddingHorizontal: 20, marginBottom: 10 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 10 }}>
          <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={{ flex: 1, color: 'white', fontSize: 28, fontWeight: 'bold', textAlign: 'center' }}>
          Lista
        </Text>
        <View style={{ width: 34 }} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 20, marginBottom: 18 }}>
        <FontAwesome name="sliders" size={18} color="#fff" style={{ marginRight: 8 }} />
        <Text style={{ color: 'white', fontFamily: 'System', fontSize: 16 }}>Ordenar y Filtrar</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}>
        {podcasts.map((podcast) => (
          <TouchableOpacity
            key={podcast.id}
            activeOpacity={0.8}
            onPress={() => router.push(`/podcast/${podcast.id}`)}
            style={{
              flexDirection: 'row',
              backgroundColor: '#393939',
              borderRadius: 18,
              marginBottom: 18,
              alignItems: 'center',
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.10,
              shadowRadius: 4,
              elevation: 2,
              padding: 0,
              height: 100,
              overflow: 'hidden',
            }}
          >
            <Image
              source={podcast.image}
              style={{
                width: 100, // MÁS ANCHO
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
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 18,
                    flex: 1,
                  }}
                  numberOfLines={1}
                >
                  {podcast.title}
                </Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome name="plus-circle" size={14} color="#B0B0B0" style={{ marginRight: 4 }} />
                  <Text style={{ color: '#B0B0B0', fontSize: 13 }}>Eliminar</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ color: '#D0D0D0', fontSize: 14, flex: 1 }} numberOfLines={1}>
                  {podcast.subtitle}
                </Text>
                <FontAwesome name="star" size={14} color="#FFD600" style={{ marginLeft: 8, marginRight: 2 }} />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 13 }}>
                  {podcast.rating}/5
                </Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 4 }}>
                {podcast.genres.map((g, i) => (
                  <Text
                    key={i}
                    style={{
                      backgroundColor: '#2ECC71',
                      color: 'white',
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 16,
                      fontSize: 13,
                      marginRight: 8,
                      overflow: 'hidden',
                    }}
                  >
                    {g}
                  </Text>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}