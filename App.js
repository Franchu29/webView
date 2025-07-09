import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [ip, setIp] = useState('');
  const [storedIp, setStoredIp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWebView, setShowWebView] = useState(false);

  useEffect(() => {
    const loadIp = async () => {
      const savedIp = await AsyncStorage.getItem('server_ip');
      if (savedIp) {
        setIp(savedIp);
        setStoredIp(savedIp);
      }
      setLoading(false);
    };
    loadIp();
  }, []);

  const handleSaveIp = async () => {
    if (ip.trim()) {
      await AsyncStorage.setItem('server_ip', ip.trim());
      setStoredIp(ip.trim());
      setShowWebView(true);
    } else {
      Alert.alert('Error', 'Por favor ingresa una IP válida');
    }
  };

  const handleChangeIp = async () => {
    await AsyncStorage.removeItem('server_ip');
    setStoredIp(null);
    setIp('');
    setShowWebView(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (showWebView && storedIp) {
    return (
      <>
        <WebView
          source={{ uri: `http://${storedIp}` }}
          style={{ flex: 1 }}
          javaScriptEnabled
          domStorageEnabled
          originWhitelist={['*']}
          mixedContentMode="always"
        />
      </>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.label}>Ingresa la IP del frontend (ej: 192.168.0.15:3000)</Text>
      <TextInput
        placeholder="192.168.0.15:3000"
        value={ip}
        onChangeText={setIp}
        style={styles.input}
        keyboardType="default"
      />
      <Button title="Ingresar al sistema" onPress={handleSaveIp} />
      {storedIp && (
        <View style={{ marginTop: 10 }}>
          <Button title="Borrar IP guardada" onPress={handleChangeIp} color="red" />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    marginBottom: 20,
    borderRadius: 8,
  },
  changeIpButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});
