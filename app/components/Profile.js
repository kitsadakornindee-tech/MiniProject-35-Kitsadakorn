import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, 
  ScrollView, SafeAreaView, FlatList, TextInput 
} from 'react-native';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

// --- ข้อมูลจำลอง ---
const initialPosts = [
  { id: '1', user: 'Edogawa Conan', time: '2h', content: 'นักสืบที่ต้อนคนร้ายจนมุมจนถึงต้องฆ่าตัวตายในที่สุด ไม่ต่างอะไรกับฆาตกรหรอก', img: 'https://f.ptcdn.info/912/046/000/ofuy4rp6wlLV2PcntKl-o.png', likeCount: 15 },
  { id: '2', user: 'Mouri Ran', time: '4h', content: 'คำว่ากล้าหาญเป็นคำแห่งคุณธรรม หมายถึงขจัดความกลัวของตนแล้วลุกขึ้นสู้...', img: 'https://cms.dmpcdn.com/moviearticle/2023/06/02/510e8610-0128-11ee-a4e8-651b469347c8_webp_original.webp', likeCount: 42 },
];

export default function FullConanApp() {
  // --- Logic สำหรับ "ชื่อที่ชอบ" ---
  const [favoriteName, setFavoriteName] = useState("");
  const [allFavorites, setAllFavorites] = useState([]);

  // --- Logic สำหรับ "Like" ---
  const [likedPosts, setLikedPosts] = useState({}); // เก็บ { postId: boolean }
  const [postLikes, setPostLikes] = useState(
    initialPosts.reduce((acc, post) => ({ ...acc, [post.id]: post.likeCount }), {})
  );

  useEffect(() => {
    loadFavorites();
  }, []);

  // ฟังก์ชันจัดการไลก์
  const toggleLike = (postId) => {
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));

    setPostLikes(prev => ({
      ...prev,
      [postId]: likedPosts[postId] ? prev[postId] - 1 : prev[postId] + 1
    }));
  };

  // ฟังก์ชัน AsyncStorage
  async function addFavorite() {
    if (!favoriteName.trim()) return;
    const newFavorites = [...allFavorites, favoriteName];
    setAllFavorites(newFavorites);
    await AsyncStorage.setItem('allFavorites', JSON.stringify(newFavorites));
    setFavoriteName('');
  }

  async function loadFavorites() {
    const data = await AsyncStorage.getItem('allFavorites');
    setAllFavorites(data ? JSON.parse(data) : []);
  }

  async function clearFavorites() {
    await AsyncStorage.removeItem('allFavorites');
    setAllFavorites([]);
  }

  async function removeFavorite(index) {
    const newFavorites = allFavorites.filter((_, i) => i !== index);
    setAllFavorites(newFavorites);
    await AsyncStorage.setItem('allFavorites', JSON.stringify(newFavorites));
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* --- Header --- */}
        <View style={styles.navHeader}>
          <Text style={styles.navTitle}>Profile Me</Text>
          <Ionicons name="search" size={24} color="black" />
        </View>

        {/* --- Profile Pic --- */}
        <View style={styles.imageSection}>
          <View style={styles.profilePicWrapper}>
            <Image 
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiklzM96puteiegx9rwP2IH42h5Ah15lJyHQ&s' }} 
              style={styles.profilePic} 
            />
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.userName}>Edogawa Conan 🔍</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.btn, styles.btnBlue]}><Text style={styles.btnTextWhite}>Add to story</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnGray]}><Text style={styles.btnTextBlack}>Edit profile</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        {/* --- SECTION: เพิ่มชื่อที่ชอบ --- */}
        <View style={styles.favoriteSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>✨ ชื่อที่ชอบ</Text>
            <TouchableOpacity onPress={clearFavorites}>
              <Text style={styles.clearText}>ล้างทั้งหมด</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="พิมพ์ชื่อที่ประทับใจ..."
              value={favoriteName}
              onChangeText={setFavoriteName}
            />
            <TouchableOpacity style={styles.addButton} onPress={addFavorite}>
              <FontAwesome6 name="plus" size={16} color="white" />
            </TouchableOpacity>
          </View>

          <View style={styles.badgeContainer}>
            {allFavorites.map((item, index) => (
              <View key={index} style={styles.favoriteBadge}>
                <Text style={styles.badgeText}>{item}</Text>
                <TouchableOpacity onPress={() => removeFavorite(index)}>
                  <Ionicons name="close-circle" size={16} color="#FF5252" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.divider} />

        {/* --- SECTION: Feed Posts --- */}
        <View style={styles.feedSection}>
          {initialPosts.map((post) => (
            <View key={post.id} style={styles.postItem}>
              <View style={styles.postUserHeader}>
                <Image source={{ uri: post.img }} style={styles.postAvatar} />
                <View>
                  <Text style={styles.postUserName}>{post.user}</Text>
                  <Text style={styles.postTime}>{post.time} • 🌏</Text>
                </View>
              </View>
              
              <Text style={styles.postContentText}>{post.content}</Text>
              <Image source={{ uri: post.img }} style={styles.postMainImage} />
              
              {/* Like Count Bar */}
              <View style={styles.statusRow}>
                <View style={styles.likeIconGroup}>
                  <Ionicons name="thumbs-up" size={14} color="white" style={styles.miniLikeIcon} />
                  <Text style={styles.statusText}>{postLikes[post.id]}</Text>
                </View>
              </View>

              <View style={styles.postActions}>
                <TouchableOpacity 
                  style={styles.actionBtn} 
                  onPress={() => toggleLike(post.id)}
                >
                  <FontAwesome6 
                    name="thumbs-up" 
                    size={18} 
                    color={likedPosts[post.id] ? "#1877F2" : "gray"} 
                  />
                  <Text style={{ color: likedPosts[post.id] ? "#1877F2" : "gray", fontWeight: '600' }}>Like</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.actionBtn}>
                  <FontAwesome6 name="comment" size={18} color="gray" />
                  <Text style={{ color: "gray", fontWeight: '600' }}>Comment</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  navHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' },
  navTitle: { fontSize: 18, fontWeight: 'bold' },
  imageSection: { marginTop: 10, alignItems: 'center' },
  profilePic: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: '#1877F2' },
  infoSection: { padding: 15, alignItems: 'center' },
  userName: { fontSize: 22, fontWeight: 'bold' },
  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 15, width: '100%' },
  btn: { flex: 1, height: 38, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  btnBlue: { backgroundColor: '#1877F2' },
  btnGray: { backgroundColor: '#E4E6EB' },
  btnTextWhite: { color: 'white', fontWeight: 'bold' },
  btnTextBlack: { color: 'black', fontWeight: 'bold' },
  divider: { height: 8, backgroundColor: '#f0f2f5', marginVertical: 5 },

  // Favorite Section
  favoriteSection: { padding: 15 },
  sectionHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold' },
  clearText: { color: '#FF5252', fontSize: 12 },
  inputContainer: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  input: { flex: 1, backgroundColor: '#f0f2f5', borderRadius: 20, paddingHorizontal: 15, height: 40 },
  addButton: { backgroundColor: '#1877F2', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  badgeContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  favoriteBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E7F3FF', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 15, gap: 5 },
  badgeText: { color: '#1877F2', fontSize: 13, fontWeight: '500' },

  // Feed Section
  feedSection: { backgroundColor: '#f0f2f5' },
  postItem: { backgroundColor: 'white', marginBottom: 10, paddingVertical: 12 },
  postUserHeader: { flexDirection: 'row', paddingHorizontal: 15, marginBottom: 10 },
  postAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  postUserName: { fontWeight: 'bold', fontSize: 15 },
  postTime: { fontSize: 12, color: 'gray' },
  postContentText: { paddingHorizontal: 15, marginBottom: 10, lineHeight: 20 },
  postMainImage: { width: '100%', height: 300 },
  statusRow: { paddingHorizontal: 15, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  likeIconGroup: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  miniLikeIcon: { backgroundColor: '#1877F2', padding: 3, borderRadius: 10 },
  statusText: { color: 'gray', fontSize: 13 },
  postActions: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 5 },
});