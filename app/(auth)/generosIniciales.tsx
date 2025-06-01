import { useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';

const GENRES = [
    'Noticias', 'Politica', 'Economia', 'Comedia', 'Educativo',
    'Idiomas', 'Ciencias', 'Historia', 'Psicología', 'Tecnología',
    'Cultura y sociedad', 'Salud y bienestar', 'Negocios', 'Cine y TV',
    'Música', 'Deportes', 'Crímenes reales', 'Terror y Suspenso', 'Ficción'
];

export default function WelcomeScreen() {
    const router = useRouter();
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [error, setError] = useState(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    const toggleGenre = (genre: string) => {
        setSelectedGenres((prev) => {
            setError(false); // limpiamos el error si toca algo
            if (prev.includes(genre)) {
                return prev.filter((g) => g !== genre);
            } else if (prev.length < 5) {
                return [...prev, genre];
            } else {
                return prev;
            }
        });
    };

    const handleContinue = () => {
        if (selectedGenres.length === 0) {
            setError(true);
            return;
        }

        console.log('Enviar al back:', selectedGenres);
        router.push('/(tabs)/home');
    };

    return (
        <Animated.View
            style={{ flex: 1, opacity: fadeAnim }}
            className="bg-background px-6 pt-20 pb-20"
        >
            <Text className="text-white text-3xl font-bold mb-2 text-center">¡Bienvenido!</Text>
            <Text className="text-white mb-10 text-center text-sm">
                Elegí los géneros que te interesan (máximo 5)
            </Text>

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
                            <Text className="text-white">{genre}</Text>
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
                onPress={handleContinue}
                className="bg-purple-600 py-3 rounded-full"
            >
                <Text className="text-white text-center font-semibold">Registrarse</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}
