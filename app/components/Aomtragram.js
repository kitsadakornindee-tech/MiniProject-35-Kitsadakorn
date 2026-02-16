import React, { useState } from 'react'; // เพิ่ม useState
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// สร้าง Component แยกสำหรับแต่ละ Post เพื่อจัดการ Like State ของใครของมัน
const PostItem = ({ item, onProfilePress }) => {
  const [liked, setLiked] = useState(false);

  return (
    <View style={styles.postCard}>
      {/* Post Header */}
      <TouchableOpacity style={styles.postHeader} onPress={onProfilePress}>
        <Image source={{ uri: item.avatar }} style={styles.avatarHeader} />
        <Text style={styles.userName}>{item.user}</Text>
      </TouchableOpacity>

      {/* Post Content */}
      <Image source={{ uri: item.image }} style={styles.postImage} />

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          <FontAwesome6 
            name={liked ? "heart" : "heart"} 
            solid={liked} // ถ้าไลค์ให้เป็นไอคอนแบบทึบ
            size={24} 
            color={liked ? "#ff3b30" : "black"} // เปลี่ยนเป็นสีแดงถ้าไลค์
            style={styles.actionIcon} 
          />
        </TouchableOpacity>
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
  );
};

export default function Home() {
  const router = useRouter();

  const feedData = [
    { id: '1', user: 'Intocomputerlab', avatar: 'https://i.pravatar.cc/150?u=1', image: 'https://picsum.photos/600/600?random=1', caption: 'ยินดีต้อนรับสู่แผนกคอมพิวเตอร์ อี.เทค! 💻✨' },
    { id: '2', user: 'TechMaster', avatar: 'https://i.pravatar.cc/150?u=2', image: 'https://picsum.photos/600/600?random=2', caption: 'Coding life is the best life. 🚀' },
    // ... ข้อมูลอื่นๆ คงเดิม
  ];

  return (
    <SafeAreaView style={styles.container}>
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

      <FlatList
        data={feedData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PostItem 
            item={item} 
            onProfilePress={() => router.push('/profile')} 
          />
        )}
      />
    </SafeAreaView>
  );
}

// ... styles คงเดิม (เพิ่มนิดหน่อยด้านล่าง)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10, alignItems: 'center', borderBottomWidth: 0.2, borderBottomColor: '#ccc' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  logo: { fontSize: 24, fontWeight: 'bold' }, 
  topAvatar: { width: 28, height: 28, borderRadius: 14 },
  postCard: { marginBottom: 15 },
  postHeader: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  avatarHeader: { width: 34, height: 34, borderRadius: 17, marginRight: 10 },
  userName: { fontWeight: 'bold', fontSize: 14 },
  postImage: { width: '100%', height: 400 },
  actionBar: { flexDirection: 'row', padding: 10, alignItems: 'center' },
  actionIcon: { marginRight: 18 }, // เพิ่มระยะห่างให้กดง่ายขึ้น
  postFooter: { paddingHorizontal: 10, paddingBottom: 5 },
  caption: { fontSize: 14, lineHeight: 18 }
});