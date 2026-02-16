import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // นำเข้าชุดไอคอน

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fbbf24", // สีของไอคอนเมื่อถูกเลือก
      }}
    >
      {/* หน้า Home */}
      <Tabs.Screen
        name="index"
        options={{
          title: "หน้าหลัก",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
            
          ),
        }}
      />

            <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
            
          ),
        }}
      />

      {/* หน้า Settings */}
      <Tabs.Screen
        name="settings"
        options={{
          title: "ตั้งค่า",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}