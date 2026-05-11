import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList, // Importação do componente de lista performática
    TouchableOpacity,
    Animated,
    StatusBar,
} from 'react-native';

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabParamList, RootStackParamList } from '../types/navigation';

type Props = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, 'Ongs'>,
    NativeStackScreenProps<RootStackParamList>
>;

export default function Home({ route, navigation }: Props) {
    const usuario = route.params?.usuario || 'Visitante';
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    // Função que define como CADA item da lista será desenhado
    const renderOng = ({ item }: { item: typeof ONGS_DATA[0] }) => (
        <TouchableOpacity
            style={[styles.card, { backgroundColor: item.cor }]}
            activeOpacity={0.8}
            onPress={() => navigation}
        >
            <View style={styles.cardEmoji}>
                <Text style={styles.emojiText}>{item.emoji}</Text>
            </View>

            <View style={styles.cardInfo}>
                <Text style={styles.ongNome}>{item.nome}</Text>
                <Text style={styles.ongDetalhes}>
                    {item.nome} • {item.cidade}
                </Text>
                <Text style={styles.ongCity}>
                    📍 {item.cidade}
                </Text>
            </View>

            <View style={styles.arrowBox}>
                <Text style={styles.arrowText}>→</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                <FlatList
                    data={ONGS_DATA} // 1. A fonte de dados
                    renderItem={renderOng} // 2. Como cada item deve ser renderizado
                    keyExtractor={(item) => item.id} // 3. Identificador único para cada item
                    contentContainerStyle={styles.listContent} // 4. Estilo do conteúdo da lista
                />
            </Animated.View>
        </View>
    );
}

// ===== DADOS MOCKADOS DAS ONGS =====
const ONGS_DATA = [
    { id: '1', nome: 'Amigos dos Animais', cidade: 'Lisboa', emoji: '🏠', cor: '#FFE8CC' },
    { id: '2', nome: 'Patas Felizes', cidade: 'Porto', emoji: '🏚️', cor: '#FFD1A9' },
    { id: '3', nome: 'Lar dos Bichos', cidade: 'Coimbra', emoji: '🏡', cor: '#FFB380' },
    { id: '4', nome: 'Refúgio Animal', cidade: 'Faro', emoji: '🏘️', cor: '#FF8C4B' },
    { id: '5', nome: 'Casa dos Animais', cidade: 'Braga', emoji: '🛖', cor: '#FF6A1B' },
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF',
    },

    listContent: {
        padding: 24,
        paddingTop: 60,
    },

    header: {
        marginBottom: 24,
    },

    welcome: {
        fontSize: 16,
        color: '#607D8A',
        fontWeight: '500',
    },

    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#132B34',
        marginTop: 4,
    },

    card: {
        flexDirection: 'row',
        borderRadius: 24,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#03213F',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },

    cardEmoji: {
        width: 70,
        height: 70,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    emojiText: {
        fontSize: 36,
    },

    cardInfo: {
        flex: 1,
        marginLeft: 16,
    },

    ongNome: {
        fontSize: 20,
        fontWeight: '800',
        color: '#132B34',
    },

    ongDetalhes: {
        fontSize: 14,
        color: '#607D8A',
        marginTop: 2,
    },

    ongCity: {
        fontSize: 12,
        color: '#607D8A',
        marginTop: 6,
    },

    arrowBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    arrowText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#132B34',
    },
});