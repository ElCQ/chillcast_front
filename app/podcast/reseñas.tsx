import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import SearchBar from '@/components/SearchBar';
import FilterButton from '@/components/filterButton';

const Reseñas = ({ id }: { id: string }) => {
  const [search, setSearch] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [rating, setRating] = useState<number>(3);
  const [comment, setComment] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const reseñas = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      valoracion: 4.7,
      texto: 'Excelente podcast, lo escucho todos los días.',
    },
    {
      id: 2,
      nombre: 'Ana Gómez',
      valoracion: 5,
      texto: 'Muy recomendable, excelente contenido.',
    },
    {
      id: 3,
      nombre: 'Carlos López',
      valoracion: 3.5,
      texto: 'Está bien, pero podría mejorar.',
    },
  ];

  const filteredReviews = reseñas.filter(
    (r) =>
      r.nombre.toLowerCase().includes(search.toLowerCase()) ||
      r.texto.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (comment.trim() === '') {
      setError(true);
    } else {
      setError(false);
      console.log('ID asociado:', id);
      console.log('Rating:', rating);
      console.log('Comentario:', comment);
      setComment('');
      setRating(3);
      setMostrarFormulario(false);
    }
  };

  const fechaActual = new Date().toLocaleDateString('es-ES');

  return (
    <View style={{ flex: 1, paddingHorizontal: 12, gap: 12 }}>
      {mostrarFormulario ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <View style={styles.formContainer}>
              <Text style={styles.date}>Fecha de calificación: {fechaActual}</Text>

              <View style={styles.labelRow}>
                <Text style={styles.label}>Reseña</Text>
                {error && <Text style={styles.required}> *</Text>}
              </View>

              <TextInput
                style={styles.textInput}
                multiline
                placeholder="Escribe tu reseña aquí..."
                placeholderTextColor="#888"
                value={comment}
                onChangeText={(text) => {
                  setComment(text);
                  if (error) setError(false);
                }}
              />

              <View style={styles.starsContainer}>
                <View style={styles.stars}>
                  {[1, 2, 3, 4, 5].map((val) => (
                    <TouchableOpacity key={val} onPress={() => setRating(val)}>
                      <Text
                        style={{
                          fontSize: 28,
                          color: val <= (rating ?? 0) ? '#facc15' : '#555',
                          marginHorizontal: 5,
                        }}
                      >
                        {val <= (rating ?? 0) ? '★' : '☆'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.ratingText}>{rating}/5</Text>
              </View>
            </View>

            {error && (
              <Text style={styles.validationError}>*El campo de reseña es obligatorio</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Publicar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#444', marginTop: 10 }]}
              onPress={() => setMostrarFormulario(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <>
          <SearchBar
            placeholder="Buscar reseñas..."
            value={search}
            onChangeText={setSearch}
            style={{ marginBottom: 10 }}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <FilterButton onPress={() => console.log('Ordenar/Filtrar')} />
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#A259FF',
                borderRadius: 25,
                paddingVertical: 8,
                paddingHorizontal: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setMostrarFormulario(true)}
            >
              <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>
                Escribir reseña
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }}>
            {filteredReviews.length > 0 ? (
              filteredReviews.map((r) => (
                <View
                  key={r.id}
                  style={{
                    backgroundColor: '#1E1E1E',
                    borderRadius: 12,
                    padding: 15,
                    marginBottom: 15,
                  }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: '#555',
                        borderRadius: 20,
                        marginRight: 10,
                      }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                        {r.nombre}
                      </Text>
                      <Text style={{ color: '#FFD700', fontSize: 14 }}>⭐ {r.valoracion}</Text>
                    </View>
                  </View>
                  <Text style={{ color: '#ddd', marginVertical: 10, fontSize: 14 }}>{r.texto}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={{ marginRight: 15 }}>
                      <Text style={{ color: '#888', fontSize: 18 }}>👍</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={{ color: '#888', fontSize: 18 }}>👎</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            ) : (
              <Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>
                No se encontraron reseñas.
              </Text>
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
  },
  date: {
    color: '#A0A0A0',
    fontSize: 13,
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
  required: {
    color: 'red',
    fontSize: 16,
  },
  textInput: {
    backgroundColor: '#2C2C2E',
    color: 'white',
    padding: 15,
    borderRadius: 10,
    minHeight: 120,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#3A3A3C',
    marginBottom: 20,
  },
  starsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  ratingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  validationError: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#A259FF',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Reseñas;
