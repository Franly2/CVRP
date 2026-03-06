import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
  const router = useRouter(); // Hook navigasi
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const API_URL = 'http://192.168.1.XX:3000/auth/register';

  async function handleRegister() {
    if (!username || !password) {
      Alert.alert('Eits!', 'Isi username dan password dulu ya.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password,
          role: 'DRIVER', 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Berhasil!', 'Akun kurir berhasil dibuat. Silakan Login.');
        router.push('/'); // Kembali ke halaman Login otomatis
      } else {
        Alert.alert('Gagal Daftar', data.message || 'Username mungkin sudah dipakai.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Gagal koneksi ke server.');
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
        <View >
        <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder='Username'
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
        />
         <Button
            onPress={()=>handleRegister()}
            title="Daftar"
            color="#4991CC"
            accessibilityLabel="Tombol daftar"
          />
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#4991CC" />
        ) : (
          <View style={{ marginTop: 20, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => router.push('/')}>
                      <Text style={{ color: '#4991CC', fontWeight: 'bold', marginTop: 5 }}>
                        Masuk
                      </Text>
                    </TouchableOpacity>
                  </View>
        )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 10 },
  reactLogo: { height: 178, width: 290, bottom: 0, left: 0, position: 'absolute' },
  title: { textAlign: 'center', marginBottom: 20 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4991CC', 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  linkButton: { marginTop: 15, alignItems: 'center' },
  linkText: { color: '#0a7ea4', textDecorationLine: 'underline' },
});


