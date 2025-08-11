import React, { useState } from 'react';
import { SafeAreaView, View, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import * as DocumentPicker from 'expo-document-picker';
import Pdf from 'react-native-pdf';
import Epub from 'epubjs-rn';

export default function App() {
  const [file, setFile] = useState(null);
  const [type, setType] = useState(null);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'application/epub+zip'],
    });
    if (result.type === 'success') {
      const uri = result.assets ? result.assets[0].uri : result.uri;
      const mime = result.mimeType || (result.name && result.name.endsWith('.pdf')
        ? 'application/pdf'
        : 'application/epub+zip');
      setFile(uri);
      setType(mime);
    }
  };

  const renderContent = () => {
    if (!file) {
      return (
        <WebView
          originWhitelist={['*']}
          source={require('./assets/paged.html')}
          style={styles.viewer}
        />
      );
    }
    if (type === 'application/pdf') {
      return <Pdf source={{ uri: file }} style={styles.viewer} />;
    }
    return <Epub src={file} style={styles.viewer} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.toolbar}>
        <Button title="Open file" onPress={pickDocument} />
      </View>
      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  toolbar: {
    padding: 8,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderColor: '#dddddd',
  },
  viewer: { flex: 1 },
});
