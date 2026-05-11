import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    KeyboardAvoidingView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;
const { width } = Dimensions.get('window');

export default function Login({ navigation }: Props) {
    const [nome, setNome] = useState('');
    const [error, setError] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleLogin = () => {
        if (nome.trim().length < 2) {
            setError('Digite pelo menos 2 caracteres 🐾');
            return;
        }
        setError('');
        navigation.navigate('MainTabs', { usuario: nome.trim() });
    };

    return (
        <KeyboardAvoidingView style={styles.root} behavior="padding">
            <StatusBar barStyle="dark-content" backgroundColor="#FDF6EE" />
            <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
                <View style={styles.logoArea}>
                    <Text style={styles.appName}>PetAdopt 🐾</Text>
                    <Text style={styles.tagline}>O teu novo amigo está à espera</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Bem-vindo!</Text>
                    <View style={styles.inputWrap}>
                        <TextInput
                            style={styles.input}
                            placeholder="Como te chamas?"
                            value={nome}
                            onChangeText={setNome}
                        />
                    </View>
                    {error ? <Text style={styles.error}>{error}</Text> : null}

                    <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                        <Text style={styles.btnText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: '#FDF6EE' },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 28 },
    logoArea: { alignItems: 'center', marginBottom: 36 },
    appName: { fontSize: 36, fontWeight: '800', color: '#3D2314' },
    tagline: { fontSize: 14, color: '#9A7A6A', fontStyle: 'italic' },
    card: { backgroundColor: '#FFFFFF', borderRadius: 28, padding: 28, width: '100%', elevation: 6 },
    cardTitle: { fontSize: 20, fontWeight: '700', color: '#3D2314', marginBottom: 20 },
    inputWrap: { backgroundColor: '#FDF6EE', borderRadius: 14, borderWidth: 2, borderColor: '#EDE0D4', paddingHorizontal: 14 },
    input: { height: 50, fontSize: 16, color: '#3D2314' },
    error: { fontSize: 13, color: '#E05C5C', marginTop: 5 },
    btn: { backgroundColor: '#E8A87C', borderRadius: 14, height: 52, justifyContent: 'center', alignItems: 'center', marginTop: 20 },
    btnText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
});