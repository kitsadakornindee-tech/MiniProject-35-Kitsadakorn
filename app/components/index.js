import { View, Text ,Button ,TextInput , Image} from 'react-native'
import React from 'react'
import { router, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'

export default function App () {

    const router = useRouter()
      const [side, setSide] = useState(0)
      const [area, setArea] = useState(0)
    
      function CalSquare(){
        var result = side * side
        setArea (result)
      }

    return (
        <SafeAreaView style={{backgroundColor : "green", height:1000 }}>

          <Text style={{fontSize:40 , marginStart:30, marginTop : 0, color:"red", fontWeight : 'bold'}}>เครื่องคำนวณหรรษา</Text>
          <View style={{backgroundColor : "orange",marginStart: 6, marginEnd:6, marginTop: 90, rowGap : 20}}>
             <View style={{backgroundColor : "orange",marginStart: 10, marginEnd:10, marginTop: 20,marginBottom:20, rowGap : 20}}>
          <Button  color={"purple"} title='หน้าคำนวณสี่เหลี่ยมจัตุรัส' onPress={() => router.navigate("/Cel")}/>
          <Button color={"purple"} title='หน้าคำนวณเส้นรอบรูปสามเหลี่ยม ' onPress={() => router.navigate("/")}/>
            </View>
          </View>
          <View
          >
              <Image source={{ uri: "https://yt3.googleusercontent.com/Yh_OwS9ULso6ct27p691VXNA727Egt45wLuL_G4W7bKA_IERsmw1RSYFx7TIFnviGbAB1Qym_A=s160-c-k-c0x00ffffff-no-rj" }} style={{ marginStart: 6, height: 300, marginEnd:6,marginTop:50 , borderRadius: 1000 }} />
          <Text style={{fontSize:40 , marginStart:90, marginTop : 20, color:"red"}}>BY JOHN DKP</Text>
          </View>
        
        </SafeAreaView>
    )
}