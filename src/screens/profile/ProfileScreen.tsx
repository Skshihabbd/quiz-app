/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pdf from 'react-native-pdf';
import ReactNativeBlobUtil from 'react-native-blob-util';

// ✅ 1. Sub-component always outside
const PdfCard = ({ item, onView, onDownload, isDownloading }: any) => (
  <View style={styles.card}>
    <View style={styles.cardInfo}>
      <View style={styles.iconContainer}>
        <Ionicons name="document-text" size={28} color="#E74C3C" />
      </View>
      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.cardDate}>Source: Archive.org</Text>
      </View>
    </View>
    <View style={styles.actionButtons}>
      <TouchableOpacity
        style={[styles.btn, styles.viewBtn]}
        onPress={() => onView(item.url)}
      >
        <Text style={styles.btnText}>View</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, styles.downloadBtn]}
        onPress={() => onDownload(item.url, item.title)}
        disabled={isDownloading}
      >
        <Ionicons name="download-outline" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  </View>
);

export default function PdfListScreen() {
  // ✅ All Hooks MUST be at the very top, before any 'if' or 'return' statements
  const [pdfList, setPdfList] = useState<any[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    fetchPdfs();
  }, []);

  const fetchPdfs = async () => {
    try {
      const response = await fetch(
        'https://archive.org/advancedsearch.php?q=subject:programming+AND+format:pdf&fl[]=identifier,title&rows=50&output=json',
      );
      const data = await response.json();
      const formattedData = data.response.docs.map((doc: any) => ({
        id: doc.identifier,
        title: doc.title || 'Untitled PDF',
        url: `https://archive.org/download/${doc.identifier}/${doc.identifier}.pdf`,
      }));
      setPdfList(formattedData);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch PDF list');
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = (url: string, title: string) => {
    setDownloading(true);
    const { config, fs } = ReactNativeBlobUtil;
    const fileName = title.replace(/\s+/g, '_').substring(0, 20) + '.pdf';
    const path =
      Platform.OS === 'android'
        ? `${fs.dirs.DownloadDir}/${fileName}`
        : `${fs.dirs.DocumentDir}/${fileName}`;

    config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path,
        description: 'Downloading...',
      },
    })
      .fetch('GET', url)
      .then(() => {
        setDownloading(false);
        Alert.alert('Success ✅', 'File Saved!');
      })
      .catch(() => {
        setDownloading(false);
        Alert.alert('Error ❌', 'Link broken');
      });
  };

  // ✅ Hooks call hoye jaoar por conditional logic check korbi
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Digital Library</Text>

      {/* Logic based on states inside the main return */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#3498DB" />
          <Text style={{ marginTop: 10 }}>Loading PDFs...</Text>
        </View>
      ) : selectedPdf ? (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={styles.backHeader}
            onPress={() => setSelectedPdf(null)}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
            <Text style={styles.backText}>Back to Library</Text>
          </TouchableOpacity>
          <Pdf
            trustAllCerts={false}
            source={{ uri: selectedPdf, cache: true }}
            style={styles.pdfViewer}
          />
        </View>
      ) : (
        <FlatList
          data={pdfList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PdfCard
              item={item}
              onView={setSelectedPdf}
              onDownload={downloadPdf}
              isDownloading={downloading}
            />
          )}
        />
      )}

      {downloading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', paddingHorizontal: 15 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 50,
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  cardInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconContainer: { backgroundColor: '#FDEDEC', padding: 8, borderRadius: 8 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: '#2C3E50' },
  cardDate: { fontSize: 11, color: '#95A5A6' },
  actionButtons: { flexDirection: 'row', gap: 5 },
  btn: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 6 },
  viewBtn: { backgroundColor: '#3498DB' },
  downloadBtn: { backgroundColor: '#27AE60' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  pdfViewer: { flex: 1, width: Dimensions.get('window').width - 30 },
  backHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  backText: { fontSize: 16, marginLeft: 10, fontWeight: '600' },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});
