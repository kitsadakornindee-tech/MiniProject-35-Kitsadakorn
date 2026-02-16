import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function KnowledgeApp() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>สวัสดีตอนเช้า,</Text>
          <Text style={styles.brandName}>สาระน่ารู้ DKP</Text>
        </View>

        {/* Featured Section (รูปภาพใหญ่) */}
        <View style={styles.featuredCard}>
          <Image 
            source={{ uri: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80" }} 
            style={styles.featuredImage} 
          />
          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredTag}>เรื่องเด่นวันนี้</Text>
            <Text style={styles.featuredTitle}>เทคนิคการเรียนรู้ตลอดชีวิต</Text>
          </View>
        </View>

        {/* Categories Menu */}
        <Text style={styles.sectionTitle}>เลือกหมวดหมู่ความรู้</Text>
        
        <View style={styles.gridContainer}>
          <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: '#E3F2FD' }]}
            onPress={() => router.navigate("/Math")}
          >
            <Text style={styles.icon}>📐</Text>
            <Text style={styles.menuLabel}>คณิตศาสตร์</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: '#F3E5F5' }]}
            onPress={() => router.navigate("/Science")}
          >
            <Text style={styles.icon}>🔬</Text>
            <Text style={styles.menuLabel}>วิทยาศาสตร์</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: '#FFF3E0' }]}
            onPress={() => router.navigate("/History")}
          >
            <Text style={styles.icon}>📜</Text>
            <Text style={styles.menuLabel}>ประวัติศาสตร์</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: '#E8F5E9' }]}
            onPress={() => router.navigate("/Tech")}
          >
            <Text style={styles.icon}>💻</Text>
            <Text style={styles.menuLabel}>เทคโนโลยี</Text>
          </TouchableOpacity>
        </View>

        {/* Footer / Author */}
        <View style={styles.footer}>
          <Image 
            source={{ uri: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" }} 
            style={styles.avatar} 
          />
          <View>
            <Text style={styles.footerText}>เรียบเรียงโดย</Text>
            <Text style={styles.authorName}>JOHN DKP</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    marginBottom: 25,
  },
  greeting: {
    fontSize: 16,
    color: '#636e72',
  },
  brandName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2d3436',
  },
  featuredCard: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  featuredTag: {
    color: '#fab1a0',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  menuItem: {
    width: '47%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 30,
    marginBottom: 8,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2d3436',
  },
  footer: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 50,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    backgroundColor: '#eee',
  },
  footerText: {
    fontSize: 12,
    color: '#b2bec3',
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e17055',
  },
})