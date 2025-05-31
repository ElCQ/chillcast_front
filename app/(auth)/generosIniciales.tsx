import { useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import {View, Text, TouchableOpacity, ScrollView, Animated,} from 'react-native';

const GENRES = [
    'Noticias',
    'Politica',
    'Economia',
    'Comedia',
    'Educativo',
    'Idiomas',
    'Ciencias',
    'Historia',
    'Psicología',
    'Tecnología',
    'Cultura y sociedad',
    'Salud y bienestar',
    'Negocios',
    'Cine y TV',
    'Música',
    'Deportes',
    'Crímenes reales',
    'Terror y Suspenso',
    'Ficción'
];


export default function WelcomeScreen() {
    const router = useRouter();
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    const toggleGenre = (genre: string) => {
        setSelectedGenres((prev) =>
            prev.includes(genre)
                ? prev.filter((g) => g !== genre)
                : [...prev, genre]
        );
    };

    const handleContinue = () => {
        // Más adelante: enviar selectedGenres al backend
        console.log('Enviar al back:', selectedGenres);
        // router.push('/home') o donde vayas después
    };

    return (
        <Animated.View
            style={{ flex: 1, backgroundColor: '#121212', opacity: fadeAnim }}
            className="px-6 justify-center"
        >
            <Text className="text-white text-3xl font-bold mb-2 text-center">¡Bienvenido!</Text>
            <Text className="text-white text-lg mb-6 text-center">
                Elegí los géneros que te interesan
            </Text>

            <ScrollView
                contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}
                className="mb-6"
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

            <TouchableOpacity
                onPress={() => router.push('//(tabs)/home)')}
                className="bg-purple-600 py-3 rounded-full"
            >
                <Text className="text-white text-center font-semibold">Continuar</Text>
            </TouchableOpacity>
        </Animated.View>
    );
}
