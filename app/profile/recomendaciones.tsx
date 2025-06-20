import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";

const GENRES = [
    'Noticias', 'Politica', 'Economia', 'Comedia', 'Educativo',
    'Idiomas', 'Ciencias', 'Historia', 'Psicología', 'Tecnología',
    'Cultura y sociedad', 'Salud y bienestar', 'Negocios', 'Cine y TV',
    'Música', 'Deportes', 'Crímenes reales', 'Terror y Suspenso', 'Ficción'
];

export default function GenerosUsuariosScreen() {
    const router = useRouter();
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchUserGenres();
    }, []);

    const fetchUserGenres = async () => {
        try {

            const usuario = await AsyncStorage.getItem('usuario');
            console.log(usuario);
            if (!usuario) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'No se pudieron recuperar los géneros guardados',
                });
                return;
            }


            const { username } = JSON.parse(usuario);

            const response = await fetch(
                `https://chillcast-backend.onrender.com/api/v1/auth/get-user?username=${encodeURIComponent(username)}`
            );

            if (!response.ok) {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'No se pudieron recuperar los géneros guardados',
                });
                return;
            }

            const data = await response.json();
            if (data?.generos) setSelectedGenres(data.generos);
        } catch (err: any) {
            console.error(err.message);
        }
    };

    const toggleGenre = (genre: string) => {
        setError(false);
        setSelectedGenres((prev) =>
            prev.includes(genre)
                ? prev.filter((g) => g !== genre)
                : prev.length < 5
                    ? [...prev, genre]
                    : prev
        );
    };

    const handleSave = async () => {
        if (selectedGenres.length === 0) {
            setError(true);
            return;
        }

        try {
            const usuario = await AsyncStorage.getItem('usuario');
            if (!usuario) throw new Error('Usuario no encontrado');

            const { username } = JSON.parse(usuario);

            const response = await fetch(
                `https://chillcast-backend.onrender.com/api/v1/auth/edit-user?username=${encodeURIComponent(username)}`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ generos: selectedGenres }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al guardar géneros');
            }

            router.push('/(tabs)/profile');
        } catch (err: any) {
            Alert.alert('Error', err.message);
        }
    };

    return (
        <View className="bg-background flex-1 px-6 pt-20 pb-24">
            <Text className="text-white text-2xl font-bold mb-10 text-center">Géneros recomendados</Text>
            <ScrollView
                contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}
                className="mb-6"
                showsVerticalScrollIndicator={false}
            >
                {GENRES.map((genre) => {
                    const isSelected = selectedGenres.includes(genre);
                    return (
                        <TouchableOpacity
                            key={genre}
                            onPress={() => toggleGenre(genre)}
                            className={`px-4 py-2 rounded-full border mb-2 mr-2 ${
                                isSelected ? 'bg-purple-600 border-purple-600' : 'border-white'
                            }`}
                        >
                            <Text className="text-white font-inter">{genre}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {error && (
                <Text className="text-red-400 text-center mb-4 font-inter">
                    Debe seleccionar al menos un género
                </Text>
            )}

            <TouchableOpacity
                onPress={handleSave}
                className="bg-purple-600 py-3 rounded-full mb-3"
            >
                <Text className="text-white text-center font-semibold font-inter">Guardar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
                <Text className="text-gray-400 text-center mt-2 font-inter">Descartar</Text>
            </TouchableOpacity>
        </View>
    );
}


