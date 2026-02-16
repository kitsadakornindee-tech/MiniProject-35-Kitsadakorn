import React from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, 
  ScrollView, SafeAreaView, FlatList 
} from 'react-native';
import { FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';

// --- 1. ข้อมูล Database ---
const suggestedChars = [
  { id: '1', name: 'Mouri Ran', image: 'https://f.ptcdn.info/371/046/000/oed45110iik1AKyFMz2e-o.jpg', mutual: '12 mutual friends' },
  { id: '2', name: 'Ai Haibara', image: 'https://shorturl.at/uGKW4', mutual: '5 mutual friends' },
  { id: '3', name: 'Kaito Kid', image: 'https://shorturl.at/pPRY4', mutual: '8 mutual friends' },
  { id: '4', name: 'Amuro Toru', image: 'https://shorturl.at/oBSY2', mutual: '20 mutual friends' },
  { id: '5', name: 'Akai Shuichi', image: 'https://shorturl.at/vHKM0', mutual: '3 mutual friends' },
  { id: '6', name: 'Hattori Heiji', image: 'https://picsum.photos/200/200?random=11', mutual: '15 mutual friends' },
  { id: '7', name: 'Toyama Kazuha', image: 'https://picsum.photos/200/200?random=12', mutual: '10 mutual friends' },
  { id: '8', name: 'Mouri Kogoro', image: 'https://shorturl.at/jSTX1', mutual: '46 mutual friends' },
  { id: '9', name: 'Dr. Agasa', image: 'https://picsum.photos/200/200?random=13', mutual: '7 mutual friends' },
  { id: '10', name: 'Vermouth', image: 'https://picsum.photos/200/200?random=14', mutual: '1 mutual friend' },
];

const postsData = [
  { id: '1', user: 'Edogawa Conan', time: '2h', content: 'นักสืบที่ต้อนคนร้ายจนมุมจนถึงต้องฆ่าตัวตายในที่สุด ไม่ต่างอะไรกับฆาตกรหรอก', img: 'https://f.ptcdn.info/912/046/000/ofuy4rp6wlLV2PcntKl-o.png' },
  { id: '2', user: 'Mouri Ran', time: '4h', content: 'วัคำว่ากล้าหาญเป็นคำแห่งคุณธรรม หมายถึงขจัดความกลัวของตนแล้วลุกขึ้นสู้... เอามาใช้กับเหตุผลในการฆ่าคนอย่างนี้มันไม่ถูก', img: 'https://cms.dmpcdn.com/moviearticle/2023/06/02/510e8610-0128-11ee-a4e8-651b469347c8_webp_original.webp' },
  { id: '3', user: 'Ai Haibara', time: '5h', content: 'ตัดสินคนแค่ภายนอกน่ะไม่ได้หรอกนะ อย่างกุหลาบที่เห็นสวย ๆ ก็ยังมีหนามแหลม เพราะฉะนั้นต่อให้เป็นคนดีแค่ไหนก็ตาม เราก็ไม่มีทางรู้ได้หรอกว่าในใจของเขาคิดะไรอยู่กันแน่', img: 'https://truevisions.co.th/static/8508b64b-3e49-4837-ba5b-ea736919786f.jpg' },
  { id: '4', user: 'Amuro Toru', time: '1d', content: 'คนรักของฉันคือประเทศนี้ไงล่ะ', img: 'https://cms.dmpcdn.com/moviearticle/2025/03/21/7c542cd0-0635-11f0-acd9-272768f86766_webp_original.webp' },
  { id: '5', user: 'Kaito Kid', time: '2d', content: 'ก็เหมือนกับนักสืบกับจอมโจรนั่นแหละ ถึงจะดูห่างไกลกันเหมือนฟ้ากับดิน แต่ถ้าเอาหลักพื้นฐานมาเทียบกันแล้ว เรามันก็พวกคนที่ไม่มีมารยาทที่ชอบใช้ความอยากรู้อยากเห็นเป็นกุญแจผีคอยเปิดดูว่าใครแอบซุกซ่อนอะไรเอาไว้เหมือนกันนั่นแหละ 🃏', img: 'https://truevisions.co.th/static/cfa16e33-4846-47aa-89b8-e9f8d7683759.jpg'},
  { id: '6', user: 'Akai Shuichi', time: '3d', content: 'คนที่ได้รับความช่วยเหลือจากปิศาจจนประสบความสำเร็จในการหลบหนีพวกนั้นก็ต้องหลบ ๆ ซ่อน ๆ และอ่อนล้าจากการที่ต้องใช้ชีวิตอยู่ด้วยความหวาดระแวง ถ้าตัดคนที่ยอมมอบตัวกับฆ่าตัวตายออกไปแล้ว คนที่พูดได้ว่าประสบความสำเร็จจริง ๆ แทบจะไม่มีเลยด้วยซ้ำไป', img: 'https://cms.dmpcdn.com/moviearticle/2024/09/12/b045f1c0-70ff-11ef-b6ab-45b9a17a6635_webp_original.webp' },
  { id: '7', user: 'Hattori Heiji', time: '4d', content: 'ความอมตะไม่แก่ตายเป็นเรื่องเพ้อฝัน เมื่อชีวิตมีจำกัดก็ควรถนอมมันไว้ ยิ่งมีจำกัดก็ยิ่งต้องพยายามดิ้นรน', img: 'https://www.theconanclub.com/wp-content/uploads/2021/01/heiji.jpg' },
  { id: '8', user: 'Mouri Kogoro', time: '5d', content: ' ความรู้สึกของฆาตกรน่ะ ฉันไม่อยากรู้หรอกเฟ้ย', img: 'https://truevisions.co.th/static/57672fa5-0d06-4ccf-8945-65524841153a.jpg' },
  { id: '9', user: 'Dr. Agasa', time: '6d', content: 'สิ่งประดิษฐ์ชิ้นใหม่เสร็จแล้ว!', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrmXg9IWHRbRCUu8IGHd2x5w2lCvdKsUgUPg&s' },
  { id: '10', user: 'Vermouth', time: '1w', content: 'A secret makes a woman woman...', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfJ9QoAC9OJGzryF-1jonzPjPkHSI9vi2sjw&s' },
];

export default function FullConanApp() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* --- SECTION 1: Profile Header --- */}
        <View style={styles.navHeader}>
              <Text>Proflie Me</Text>
        </View>

        <View style={styles.imageSection}>
          <View style={styles.profilePicWrapper}>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiklzM96puteiegx9rwP2IH42h5Ah15lJyHQ&s' }} style={styles.profilePic} />
            <View style={styles.thoughtBubble}><Text style={styles.thoughtText}>ความจริงมีเพียงหนึ่งเดียวเท่านั้น</Text></View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.userName}>Edogawa Conan 🔍</Text>
          <Text style={styles.friendCount}>46 friends</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.btn, styles.btnBlue]}><Text style={styles.btnTextWhite}>Add to story</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnGray]}><Text style={styles.btnTextBlack}>Edit profile</Text></TouchableOpacity>
          </View>
        </View>

        {/* --- SECTION 2: People You May Know --- */}
        <View style={styles.divider} />
        <View style={styles.suggestionHeader}>
          <Text style={styles.suggestionTitle}>People you may know</Text>
          <Ionicons name="close" size={20} color="gray" />
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={suggestedChars}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingLeft: 15, paddingBottom: 15 }}
          renderItem={({ item }) => (
            <View style={styles.suggestCard}>
              <Image source={{ uri: item.image }} style={styles.suggestImg} />
              <View style={styles.suggestInfo}>
                <Text style={styles.suggestName}>{item.name}</Text>
                <Text style={styles.mutualText}>{item.mutual}</Text>
                <TouchableOpacity style={styles.addFriendBtn}><Text style={styles.addFriendText}>Add friend</Text></TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* --- SECTION 3: All Posts --- */}
        <View style={styles.feedSection}>
          <Text style={styles.postSectionTitle}>Posts</Text>
          {postsData.map((post) => (
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
              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionBtn}><FontAwesome6 name="thumbs-up" size={16} color="gray" /><Text>Like</Text></TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}><FontAwesome6 name="comment" size={16} color="gray" /><Text>Comment</Text></TouchableOpacity>
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
  navHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 15 },
  imageSection: { marginTop:50,height: 260, position: 'relative' },
  coverPhoto: { width: '100%', height: 100, backgroundColor: '#ddd' },
  profilePicWrapper: { position: 'absolute', bottom: 0, left: 15 },
  profilePic: { marginStart:120,width: 140, height: 300, borderWidth: 4, borderColor: 'white' },
  thoughtBubble: { position: 'absolute', top: -20, left: 30, backgroundColor: 'white', padding: 8, borderRadius: 15, borderWidth: 1, borderColor: '#ddd' },
  thoughtText: { fontSize: 10, color: 'gray' },
  infoSection: { padding: 15 },
  userName: { fontSize: 24,marginStart:100, fontWeight: 'bold' },
  friendCount: { color: 'gray', marginVertical: 5,marginStart:150},
  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 10 },
  btn: { flex: 1, height: 38, borderRadius: 6, justifyContent: 'center', alignItems: 'center' },
  btnBlue: { backgroundColor: '#1877F2' },
  btnGray: { backgroundColor: '#E4E6EB' },
  btnTextWhite: { color: 'white', fontWeight: 'bold' },
  btnTextBlack: { color: 'black', fontWeight: 'bold' },
  divider: { height: 8, backgroundColor: '#f0f2f5' },
  suggestionHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 15},
  suggestionTitle: { fontSize: 16, fontWeight: 'bold' },
  suggestCard: { width: 150, backgroundColor: 'white', borderRadius: 8, marginRight: 10, borderWidth: 1, borderColor: '#ddd', overflow: 'hidden' },
  suggestImg: { width: '100%', height: 140 },
  suggestInfo: { padding: 8, alignItems: 'center' },
  suggestName: { fontWeight: 'bold', fontSize: 13 },
  mutualText: { fontSize: 10, color: 'gray', marginBottom: 8 },
  addFriendBtn: { backgroundColor: '#1877F2', width: '100%', paddingVertical: 5, borderRadius: 5, alignItems: 'center' },
  addFriendText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  feedSection: { backgroundColor: '#f0f2f5'},
  postSectionTitle: { fontSize: 18, fontWeight: 'bold', padding: 15, backgroundColor: 'white',},
  postItem: { backgroundColor: 'white', marginBottom: 10, paddingVertical: 10 },
  postUserHeader: { flexDirection: 'row', paddingHorizontal: 15, marginBottom: 10},
  postAvatar: { width: 35, height: 35, borderRadius: 17.5, marginRight: 10},
  postUserName: { fontWeight: 'bold'},
  postTime: { fontSize: 11, color: 'gray'},
  postContentText: { paddingHorizontal: 15, marginBottom: 10},
  postMainImage: { width: '100%', height: 250 },
  postActions: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, marginTop: 5 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
});