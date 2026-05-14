import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Animated,
    StatusBar,
    ActivityIndicator,
    Modal,
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
    const [loading, setLoading] = useState(true);
    const [selectedOng, setSelectedOng] = useState<typeof ONGS_DATA[0] | null>(null);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleOngPress = (item: typeof ONGS_DATA[0]) => {
        setSelectedOng(item);
    };

    const closeModal = () => {
        setSelectedOng(null);
    };

    const renderOng = ({ item }: { item: typeof ONGS_DATA[0] }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.9}
            onPress={() => handleOngPress(item)}
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
            <Modal
                visible={!!selectedOng}
                transparent
                animationType="fade"
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{selectedOng?.nome}</Text>
                        <Text style={styles.modalDescription}>{selectedOng?.descricao}</Text>
                        <Text style={styles.modalDetails}>📍 {selectedOng?.cidade}</Text>
                        <Text style={styles.modalDetails}>📞 {selectedOng?.numero}</Text>

                        <TouchableOpacity
                            style={styles.modalClose}
                            onPress={closeModal}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.modalCloseText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <StatusBar barStyle="dark-content" />
            <View style={styles.headerArea}>
                <Text style={styles.welcome}>Olá, {usuario}!</Text>
                <Text style={styles.title}>Instituições</Text>
            </View>

            <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#3D2314" />
                        <Text style={styles.loadingText}>Carregando...</Text>
                    </View>
                ) : (
                    <FlatList
                        data={ONGS_DATA}
                        renderItem={renderOng}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        contentContainerStyle={styles.listContent}
                        columnWrapperStyle={styles.columnWrapper}
                    />
                )}
            </Animated.View>
        </View>
    );
}

const ONGS_DATA = [
    { id: '1', nome: 'Amigos dos Animais', cidade: 'Lisboa', emoji: '🏠', cor: '#FFE8CC', numero: '(11) 1234-5678', descricao: 'Atendemos animais em situação de rua com abrigo temporário e cuidados médicos básicos.' },
    { id: '2', nome: 'Patas Felizes', cidade: 'Porto', emoji: '🏚️', cor: '#FFD1A9', numero: '(21) 9876-5432', descricao: 'Focada em adoção responsável, promovemos eventos de conscientização na comunidade.' },
    { id: '3', nome: 'Lar dos Bichos', cidade: 'Coimbra', emoji: '🏡', cor: '#FFB380', numero: '(23) 4567-8901', descricao: 'Oferecemos suporte veterinário e socialização para pets resgatados antes da adoção.' },
    { id: '4', nome: 'Refúgio Animal', cidade: 'Faro', emoji: '🏘️', cor: '#FF8C4B', numero: '(28) 2345-6789', descricao: 'Uma rede de voluntários que abriga animais resgatados e busca novas famílias.' },
];

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F2EB',
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
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F0E5D7',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
        elevation: 5,
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
        backgroundColor: '#FFFFFF',
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#9A7A6A',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    modalContent: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 22,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.14,
        shadowRadius: 20,
        elevation: 8,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: '#3D2314',
        marginBottom: 12,
    },
    modalDescription: {
        fontSize: 14,
        color: '#6E7C89',
        lineHeight: 20,
        marginBottom: 16,
    },
    modalDetails: {
        fontSize: 14,
        color: '#9A7A6A',
        marginBottom: 4,
    },
    modalClose: {
        marginTop: 20,
        paddingVertical: 12,
        borderRadius: 14,
        alignItems: 'center',
        backgroundColor: '#E8A87C',
    },
    modalCloseText: {
        fontSize: 15,
        color: '#3D2314',
        fontWeight: '700',
    },
});