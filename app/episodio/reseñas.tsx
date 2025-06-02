import React, { useState } from 'react'Add commentMore actions
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const Reseñas = () => {
  const [rating, setRating] = useState(3)
  const [comment, setComment] = useState('')
  const [error, setError] = useState(false)

  const handleRating = (value: number) => {
    setRating(value)
  }

  const handleSubmit = () => {
    if (comment.trim() === '') {
      setError(true)
    } else {
      setError(false)
      console.log('Rating:', rating)
      console.log('Comentario:', comment)
    }
  }


  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <Text style={styles.date}>Fecha de calificación: 01/06/2025</Text>

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
              setComment(text)
              if (error) setError(false)
            }}
          />

          <View style={styles.starsContainer}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((value) => (
                <TouchableOpacity key={value} onPress={() => handleRating(value)}>
                  <Icon
                    name="star"
                    size={28}
                    color={value <= rating ? '#FFD700' : '#555'}
                    style={styles.star}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.ratingText}>{rating}/5</Text>
          </View>
        </View>
      </ScrollView>

       {error && <Text style={styles.validationError}>*Error de validación</Text>}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Publicar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1C1C1E',
  },
  validationError: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
 paddingHorizontal: 20,
  }
,
  scroll: {
    paddingBottom: 20,
  },
  container: {
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
  star: {
    marginHorizontal: 5,
  },
  ratingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
})

export default Reseñas
