import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import * as MediaLibrary from 'expo-media-library';
import Btn from '../common/Btn';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Add a delay of 500 milliseconds (adjust as needed).
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
        autoFocus={Camera.Constants.AutoFocus.on}
      />
      <View>
        <Button btnText={'Click Me!'} icon={'camera'} onPress={takePicture} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 15,
  },
  camera: {
    borderRadius: 20,
  },
});

// import { StatusBar } from 'expo-status-bar';
// import  {Camera,ExponentCamera}  from 'expo-camera';
// import React, { useEffect, useRef, useState } from 'react';
// import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

// import * as MediaLibrary from 'expo-media-library';
// import Button from '../common/Button';

// export default function App() {
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [image, setImage] = useState(null);
//   const [type, setType] = useState(Camera.Constants.Type.back);
//   const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     (async () => {
//       MediaLibrary.requestPermissionsAsync();
//       const cameraStatus = await Camera.requestCameraPermissionsAsync();
//       setHasCameraPermission(cameraStatus.status === 'granted');
//     })();
//   }, []);

//   const takePicture = async () => {
//     if (cameraRef) {
//       try {
//         await new Promise((resolve) => setTimeout(resolve, 500)); // Add a delay of 500 milliseconds (adjust as needed).
//         const data = await cameraRef.current.takePictureAsync();
//         console.log(data);
//         setImage(data.uri);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   // const takePicture = async () => {
//   //   if (cameraRef) {
//   //     try {
//   //       const data = await cameraRef.current.takePictureAsync();
//   //       console.log(data);
//   //       setImage(data.uri);
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   }
//   // };
  

//   if (hasCameraPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <Camera
//   style={styles.camera}
//   type={type}
//   flashMode={flash}
//   ref={cameraRef}
//   autoFocus={Camera.Constants.AutoFocus.on}
// />
//       {/* <Camera style={styles.camera}
//        type={type} 
//        flashMode={flash} 
//        ref={cameraRef} 
//         ></Camera> */}
//       <View>
//         <Button btnText={'Click Me!'} icon={'camera'} onPress={takePicture} />
//       </View>
//       <StatusBar style="auto"/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingBottom: 15,
//   },
//   camera: {
//     borderRadius: 20,
//   },
// });
