import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();

  // เพิ่มข้อมูลเป็น 10 รายการ
  const feedData = [
    { id: '1', user: 'Intocomputerlab', avatar: 'https://i.pravatar.cc/150?u=1', image: 'https://picsum.photos/600/600?random=1', caption: 'ยินดีต้อนรับสู่แผนกคอมพิวเตอร์ อี.เทค! 💻✨' },
    { id: '2', user: 'TechMaster', avatar: 'https://i.pravatar.cc/150?u=2', image: 'https://picsum.photos/600/600?random=2', caption: 'Coding life is the best life. 🚀' },
    { id: '3', user: 'DesignDaily', avatar: 'https://i.pravatar.cc/150?u=3', image: 'https://picsum.photos/600/600?random=3', caption: 'Exploring UI/UX trends in 2026. 🎨' },
    { id: '4', user: 'CoffeeCode', avatar: 'https://i.pravatar.cc/150?u=4', image: 'https://picsum.photos/600/600?random=4', caption: 'กาแฟแก้วที่ 3 ของวัน... ☕️💻' },
    { id: '5', user: 'Etech_Student', avatar: 'https://i.pravatar.cc/150?u=5', image: 'https://picsum.photos/600/600?random=5', caption: 'วันนี้เรียน Network สนุกมากครับ!' },
    { id: '6', user: 'GadgetLover', avatar: 'https://i.pravatar.cc/150?u=6', image: 'https://picsum.photos/600/600?random=6', caption: 'Unboxing new mechanical keyboard! ⌨️' },
    { id: '7', user: 'TravelDev', avatar: 'https://i.pravatar.cc/150?u=7', image: 'https://picsum.photos/600/600?random=7', caption: 'Work from anywhere. 🌴🌊' },
    { id: '8', user: 'DataScience', avatar: 'https://i.pravatar.cc/150?u=8', image: 'https://picsum.photos/600/600?random=8', caption: 'Analyzing the future with AI. 📊' },
    { id: '9', user: 'Startup_Life', avatar: 'https://i.pravatar.cc/150?u=9', image: 'https://picsum.photos/600/600?random=9', caption: 'Pitching day! Wish us luck. 🤝' },
    { id: '10', user: 'NightCoder', avatar: 'https://i.pravatar.cc/150?u=10', image: 'https://picsum.photos/600/600?random=10', caption: 'Bug fixed at 2 AM. 🌙🔧' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.logo}>Aomtagram</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <FontAwesome6 name="heart" size={22} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <Image source={{ uri: feedData[0].avatar }} style={styles.topAvatar} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Post List */}
      <FlatList
        data={feedData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false} // ซ่อนแถบเลื่อน
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            {/* Post Header */}
            <TouchableOpacity style={styles.postHeader} onPress={() => router.push('/profile')}>
              <Image source={{ uri: item.avatar }} style={styles.avatarHeader} />
              <Text style={styles.userName}>{item.user}</Text>
            </TouchableOpacity>

            {/* Post Content */}
            <Image source={{ uri: item.image }} style={styles.postImage} />

            {/* Action Bar (Like, Comment, Share) */}
            <View style={styles.actionBar}>
              <FontAwesome6 name="heart" size={22} color="black" style={styles.actionIcon} />
              <FontAwesome6 name="comment" size={22} color="black" style={styles.actionIcon} />
              <FontAwesome6 name="paper-plane" size={22} color="black" style={styles.actionIcon} />
            </View>

            {/* Post Footer */}
            <View style={styles.postFooter}>
              <Text style={styles.caption}>
                <Text style={{ fontWeight: 'bold' }}>{item.user}</Text> {item.caption}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    paddingVertical: 10, 
    alignItems: 'center', 
    borderBottomWidth: 0.2, 
    borderBottomColor: '#ccc' 
  },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  logo: { fontSize: 24, fontWeight: 'bold', fontFamily: 'serif' }, // ปรับ Font ให้ใกล้เคียง Logo
  topAvatar: { width: 28, height: 28, borderRadius: 14 },
  postCard: { marginBottom: 15 },
  postHeader: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  avatarHeader: { width: 34, height: 34, borderRadius: 17, marginRight: 10 },
  userName: { fontWeight: 'bold', fontSize: 14 },
  postImage: { width: '100%', height: 400 },
  actionBar: { flexDirection: 'row', padding: 10 },
  actionIcon: { marginRight: 15 },
  postFooter: { paddingHorizontal: 10, paddingBottom: 5 },
  caption: { fontSize: 14, lineHeight: 18 }
});