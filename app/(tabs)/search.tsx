import FilterButton from '@/components/filterButton'
import FilterTabs from '@/components/filterTabs'
import SearchBar from '@/components/SearchBar'
import React, { useState } from 'react'
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const Search = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [sortOption, setSortOption] = useState('alphabetical')
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)

  const [rating, setRating] = useState<number | null>(null)
  const [providers, setProviders] = useState<string[]>([])
  const [userRated, setUserRated] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [releaseDate, setReleaseDate] = useState<string | null>(null)
  const [country, setCountry] = useState<string | null>(null)
  const [language, setLanguage] = useState<string | null>(null)
  const [duration, setDuration] = useState<string | null>(null)

  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const tabs = ['Podcasts', 'Episodios', 'Hosts'];
  const [activeTab, setActiveTab] = useState('Podcasts');
  

  const toggleSection = (key: string) => {
    setExpandedSections(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    )
  }

  const toggleMultipleSelect = (list: string[], item: string, setter: (val: string[]) => void) => {
    if (list.includes(item)) {
      setter(list.filter(i => i !== item))
    } else {
      setter([...list, item])
    }
  }

  const filterSections = [
    {
      title: 'Ordenar Por',
      key: 'ordenar',
      render: () =>
        ['alphabetical', 'duration', 'rating'].map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => setSortOption(option)}
            className={`py-2 px-4 rounded mt-1 ${
              sortOption === option ? 'bg-purple-600' : 'bg-[#1f1f1f]'
            }`}
          >
            <Text className="text-white capitalize">
              {option === 'alphabetical'
                ? 'Alfabéticamente'
                : option === 'duration'
                ? 'Duración'
                : 'Puntuación'}
            </Text>
          </TouchableOpacity>
        )),
    },
    {
      title: 'Calificación Promedio',
      key: 'rating',
      render: () => (
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {[1, 2, 3, 4, 5].map(val => (
            <TouchableOpacity key={val} onPress={() => setRating(val)}>
              <Text style={{ fontSize: 28, color: val <= (rating ?? 0) ? '#facc15' : '#555' }}>
                {val <= (rating ?? 0) ? '★' : '☆'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )
    },
    {
      title: 'Proveedor',
      key: 'providers',
      render: () =>
        ['Spotify', 'Apple', 'YouTube', 'Otros'].map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => toggleMultipleSelect(providers, option, setProviders)}
            className={`py-2 px-4 rounded mt-1 ${
              providers.includes(option) ? 'bg-purple-600' : 'bg-[#1f1f1f]'
            }`}
          >
            <Text className="text-white">{option}</Text>
          </TouchableOpacity>
        )),
    },
    {
      title: 'Calificado por mí',
      key: 'userRated',
      render: () =>
        ['Incluir', 'No incluir'].map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => setUserRated(option)}
            className={`py-2 px-4 rounded mt-1 ${
              userRated === option ? 'bg-purple-600' : 'bg-[#1f1f1f]'
            }`}
          >
            <Text className="text-white">{option}</Text>
          </TouchableOpacity>
        )),
    },
    {
      title: 'Categoría',
      key: 'categories',
      render: () =>
        ['Instrumental', 'Vocal', 'Experimental'].map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => toggleMultipleSelect(categories, option, setCategories)}
            className={`py-2 px-4 rounded mt-1 ${
              categories.includes(option) ? 'bg-purple-600' : 'bg-[#1f1f1f]'
            }`}
          >
            <Text className="text-white">{option}</Text>
          </TouchableOpacity>
        )),
    },
    {
      title: 'Fecha de Lanzamiento',
      key: 'fecha',
      render: () =>
        ['Últimas 24 horas', 'Últimos 3 días','Última semana', 'Último mes', 'Últimos 3 meses','Última Año'].map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => setReleaseDate(option)}
            className={`py-2 px-4 rounded mt-1 ${
              releaseDate === option ? 'bg-purple-600' : 'bg-[#1f1f1f]'
            }`}
          >
            <Text className="text-white">{option}</Text>
          </TouchableOpacity>
        )),
    },
    {
      title: 'País Disponible',
      key: 'pais',
      render: () =>
        ['Argentina', 'México', 'Chile'].map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => setCountry(option)}
            className={`py-2 px-4 rounded mt-1 ${
              country === option ? 'bg-purple-600' : 'bg-[#1f1f1f]'
            }`}
          >
            <Text className="text-white">{option}</Text>
          </TouchableOpacity>
        )),
    },
    {
      title: 'Idioma',
      key: 'idioma',
      render: () =>
        ['Español', 'Inglés', 'Portugués'].map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => setLanguage(option)}
            className={`py-2 px-4 rounded mt-1 ${
              language === option ? 'bg-purple-600' : 'bg-[#1f1f1f]'
            }`}
          >
            <Text className="text-white">{option}</Text>
          </TouchableOpacity>
        )),
    },
    {
      title: 'Duración',
      key: 'duracion',
      render: () =>
        ['1 a 5 minutos','5 a 10 minutos', '10 a 30 minutos','30 a 60 minutos','Más de una hora'].map(option => (
          <TouchableOpacity
            key={option}
            onPress={() => setDuration(option)}
            className={`py-2 px-4 rounded mt-1 ${
              duration === option ? 'bg-purple-600' : 'bg-[#1f1f1f]'
            }`}
          >
            <Text className="text-white">{option}</Text>
          </TouchableOpacity>
        )),
    },
  ]

  return (
    <View className='bg-[#282828] flex-1 items-center justify-start gap-3 pt-20'>
      <View className='px-6 w-full items-center justify-between gap-5'>
        <SearchBar placeholder="Buscar" onPress={() => {}} />
      </View>

      <View className='w-full h-10 px-6 items-start justify-start'>
        <FilterButton onPress={() => setModalVisible(true)} />
      </View>

      <View className='w-full h-fit px-6 items-start justify-start'>
        <FilterTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </View>

      {/* MODAL DE FILTROS */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: '#121212', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '90%' }}>
            <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#333', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 50 }}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ color: 'white', fontSize: 18 }}>{'<'}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Filtros</Text>
              </View>
              <View style={{ width: 50 }} />
            </View>

            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 32,
              }}
              showsVerticalScrollIndicator={true}
            >
              {filterSections.map(section => {
                const isExpanded = expandedSections.includes(section.key)
                return (
                  <View key={section.key} style={{ marginTop: 24 }}>
                    <TouchableOpacity
                      onPress={() => toggleSection(section.key)}
                      style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{section.title}</Text>
                      <Text style={{ color: 'white', fontSize: 20 }}>{isExpanded ? '˄' : '>'}</Text>
                    </TouchableOpacity>

                    {isExpanded && (
                      <View style={{ marginTop: 8 }}>
                        {section.render()}
                      </View>
                    )}
                  </View>
                )
              })}

              {/* Botones */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 32, gap: 8 }}>
                <TouchableOpacity style={{ flex: 1, backgroundColor: '#7c3aed', padding: 12, borderRadius: 8 }}>
                  <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Aplicar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setSortOption('alphabetical')
                    setSelectedGenre(null)
                    setRating(null)
                    setProviders([])
                    setUserRated(null)
                    setCategories([])
                    setReleaseDate(null)
                    setCountry(null)
                    setLanguage(null)
                    setDuration(null)
                    setExpandedSections([])
                  }}
                  style={{ flex: 1, backgroundColor: '#333', padding: 12, borderRadius: 8 }}
                >
                  <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Restablecer</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>



    </View>
  )
}

export default Search
