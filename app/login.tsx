import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { router } from 'expo-router';
import { UserDispatchContext, UserActionType } from '@/store/UserStore';
import { useState, useContext, useEffect } from 'react';
import { firebaseAuth } from '@/lib/firebase';
import env from '@/constants/env';
import { UserContext } from '@/store/UserStore';
import { Stack } from 'expo-router';

export default function LoginScreen() {
    const theme = useTheme();
    const dispatch = useContext(UserDispatchContext);
    const userAuth = useContext(UserContext);
    
    const [email, setEmail] = useState(userAuth?.email || '');
    const [password, setPassword] = useState(userAuth?.password || '');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (email && password) {
            handleLogin();
        }
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        try {
            setError(null);
            if (email && password) {
                const apiKey = env.API_KEY;
                const apiUrl = env.API_URL;
                const response = await fetch(`${apiUrl}/v1/accounts:signInWithPassword?key=${apiKey}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true,
                    })
                });
                const { status } = response;
                if (status == 200) {
                    const body = await response.json();
                    dispatch({
                        type: UserActionType.LOGAR,
                        user: {
                            email: body.email,
                            password: password,
                            token: body.idToken,
                        }
                    });
                    router.push('/(private)');
                } else if (status == 400) {
                    const body = await response.json();
                    setError(body.error.message);
                } else {
                    setError(`Status ${status}`);
                }
            } else {
                if (!email) setError("Preencha este campo.");
                if (!password) setError("Preencha este campo.");
            }
        } catch (error) {
            const err = error as { message: string };
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Stack.Screen 
                options={{
                    title: "Login",
                    headerShown: false  // Geralmente escondemos o header na tela de login
                }}
            />
            <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
                <View style={styles.logoContainer}>
                    <Image 
                        source={require('@/assets/images/logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text 
                        variant="headlineLarge" 
                        style={[styles.title, { color: theme.colors.primary }]}
                    >
                        BERN
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <TextInput
                        mode="outlined"
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        left={<TextInput.Icon icon="email" />}
                        style={styles.input}
                        theme={{ colors: { primary: theme.colors.primary }}}
                    />

                    <TextInput
                        mode="outlined"
                        label="Senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        left={<TextInput.Icon icon="lock" />}
                        right={<TextInput.Icon 
                            icon={showPassword ? "eye-off" : "eye"}
                            onPress={() => setShowPassword(!showPassword)}
                        />}
                        style={styles.input}
                        theme={{ colors: { primary: theme.colors.primary }}}
                    />

                    {error && (
                        <Text style={[styles.error, { color: theme.colors.error }]}>
                            {error}
                        </Text>
                    )}

                    <Button
                        mode="contained"
                        onPress={handleLogin}
                        loading={loading}
                        disabled={loading}
                        style={[styles.button, { backgroundColor: theme.colors.primary }]}
                        contentStyle={styles.buttonContent}
                    >
                        Entrar
                    </Button>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    title: {
        fontWeight: 'bold',
    },
    formContainer: {
        flex: 2,
        padding: 24,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#fff',
        elevation: 8,
    },
    input: {
        marginBottom: 16,
        backgroundColor: 'transparent',
    },
    button: {
        marginTop: 8,
        borderRadius: 8,
    },
    buttonContent: {
        paddingVertical: 8,
    },
    error: {
        textAlign: 'center',
        marginBottom: 16,
    },
});