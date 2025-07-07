import Loader from '@/components/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Toast from 'react-native-toast-message';

const GENRES = [
    'Noticias', 'Politica', 'Economia', 'Comedia', 'Educativo',
    'Idiomas', 'Ciencias', 'Historia', 'Psicología', 'Tecnología',
    'Cultura y sociedad', 'Salud y bienestar', 'Negocios', 'Cine y TV',
    'Música', 'Deportes', 'Crímenes reales', 'Terror y Suspenso', 'Ficción',
];

export default function GenerosUsuariosScreen() {
    const router = useRouter();
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUserGenres();
    }, []);

    const fetchUserGenres = async () => {
        setLoading(true);
        try {
            const generos = await getUserGenres();
            setSelectedGenres(generos);
        } catch (err: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: err.message || 'No se pudieron recuperar los géneros guardados',
            });
        } finally {
            setLoading(false);
        }
    };


    const toggleGenre = (genre: string) => {
        setError(false);
        setSelectedGenres((prev) =>
            prev.includes(genre)
                ? prev.filter((g) => g !== genre)
                : prev.length < 10
                    ? [...prev, genre]
                    : prev
        );
    };

    const handleSave = async () => {
        if (selectedGenres.length === 0) {
            setError(true);
            return;
        }

        setLoading(true);
        try {
            await updateUserGenres(selectedGenres);

            Toast.show({
                type: 'success',
                text1: 'Géneros guardados',
            });

            router.push('/(tabs)/profile');
        } catch (err: any) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: err.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <View className="bg-background flex-1 px-6 pt-20 pb-24">
            <Text className="text-white text-2xl font-bold mb-2 text-center">
                Géneros recomendados
            </Text>
            <Text className="text-white mb-12 text-center text-sm">
                Elegí los géneros que te interesan (máximo 10)
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
                                isSelected
                                    ? 'bg-purple-600 border-purple-600'
                                    : 'border-white'
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
                <Text className="text-white text-center font-semibold font-inter">
                    Guardar
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/(tabs)/profile')}>
                <Text className="text-gray-400 text-center mt-2 font-inter">
                    Descartar
                </Text>
            </TouchableOpacity>
        </View>
            <Loader visible={loading} />
        </>
    );
}



