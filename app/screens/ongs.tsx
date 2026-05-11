import React, { useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
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

export default function OngsScreen({ route, navigation }: Props) {
    const usuario = route.params?.usuario || 'Visitante';
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const renderOng = ({ item }: { item: typeof ONGS_DATA[0] }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => { }} // Adicione a navegação aqui depois
        >
            {/* Topo do Card com Cor de Fundo Diferente */}
            <View style={[styles.cardHeader, { backgroundColor: item.cor }]}>
                <Text style={styles.emojiText}>{item.emoji}</Text>
            </View>

            {/* Corpo do Card com Info Centralizada */}
            <View style={styles.cardBody}>
                <Text style={styles.ongNome}>{item.nome}</Text>

                <View style={styles.badgeCidade}>
                    <Text style={styles.badgeText}>📍 {item.cidade}</Text>
                </View>

                <Text style={styles.ongContato}>
                    📞 {item.numero}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.headerArea}>
                <Text style={styles.welcome}>Olá, {usuario}!</Text>
                <Text style={styles.title}>Instituições</Text>
            </View>

            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                <FlatList
                    data={ONGS_DATA}
                    renderItem={renderOng}
                    keyExtractor={(item) => item.id}
                    numColumns={2} // Exercício: Lista em 2 colunas (Grid)
                    contentContainerStyle={styles.listContent}
                    columnWrapperStyle={styles.columnWrapper}
                />
            </Animated.View>
        </View>
    );
}

const ONGS_DATA = [
    { id: '1', nome: 'Amigos dos Animais', cidade: 'Lisboa', emoji: '🏠', cor: '#FFE8CC', numero: '(11) 1234-5678' },
    { id: '2', nome: 'Patas Felizes', cidade: 'Porto', emoji: '🏚️', cor: '#FFD1A9', numero: '(21) 9876-5432' },
    { id: '3', nome: 'Lar dos Bichos', cidade: 'Coimbra', emoji: '🏡', cor: '#FFB380', numero: '(23) 4567-8901' },
    { id: '4', nome: 'Refúgio Animal', cidade: 'Faro', emoji: '🏘️', cor: '#FF8C4B', numero: '(28) 2345-6789' },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Fundo branco puro para contrastar com os cards
    },
    headerArea: {
        paddingHorizontal: 24,
        paddingTop: 60,
        marginBottom: 10,
    },
    welcome: { fontSize: 16, color: '#9A7A6A' },
    title: { fontSize: 28, fontWeight: '900', color: '#3D2314' },

    listContent: {
        padding: 16,
    },
    columnWrapper: {
        justifyContent: 'space-between', // Espaçamento entre as duas colunas
    },
    card: {
        width: '48%', // Garante que caibam dois cards por linha
        backgroundColor: '#FDF6EE',
        borderRadius: 28,
        marginBottom: 16,
        overflow: 'hidden', // Importante para o header colorido não sair das bordas arredondadas
        borderWidth: 1,
        borderColor: '#EDE0D4',
        elevation: 4,
    },
    cardHeader: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emojiText: {
        fontSize: 44,
    },
    cardBody: {
        padding: 16,
        alignItems: 'center',
    },
    ongNome: {
        fontSize: 16,
        fontWeight: '800',
        color: '#3D2314',
        textAlign: 'center',
        marginBottom: 8,
    },
    badgeCidade: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '600',
        color: '#E8A87C',
    },
    ongContato: {
        fontSize: 12,
        color: '#9A7A6A',
    },
});