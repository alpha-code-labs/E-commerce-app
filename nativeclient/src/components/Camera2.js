import {StatusBar} from 'expo-status-bar'
import React from 'react'
import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native'
import {Camera} from 'expo-camera'
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import Btn from '../common/Btn';
// let camera: Camera
export default function App() {
  const [startCamera, setStartCamera] = React.useState(false)
  const [previewVisible, setPreviewVisible] = React.useState(false)
  const [capturedImage, setCapturedImage] = React.useState(null)
  const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
  const [flashMode, setFlashMode] = React.useState('off')

  const __startCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }
  const __takePicture = async () => {
    const photo = await camera.takePictureAsync()
    console.log("__takePicture",photo)
    setPreviewVisible(true)
    //setStartCamera(false)
    setCapturedImage(photo)
  }
  const __savePhoto = async () => {
    if (capturedImage) {
      const formData = new FormData();
      formData.append('file', {
        uri: capturedImage.uri,
        type: 'image/jpeg', // Change the type if needed based on the image format
        name: 'image.jpg',
      });
  
      try {
        const response = await fetch('http://172.16.1.28:9001/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        const data = await response.json();
        console.log('Image uploaded:', data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };
  

  // const __savePhoto = async () => {
  //   if (capturedImage && capturedImage.uri) {
  //     try {
  //       const formData = new FormData();
  //       formData.append('image', {
  //         uri: capturedImage.uri,
  //         type: 'image/jpeg', // Change the type if needed based on the image format
  //         name: 'image.jpg',
  //       });

  //       const apiUrl = 'http://172.16.1.28:9001/upload';

  //       const response = await axios.post(apiUrl, formData,{
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       });

  //       // Handle the response from the backend here (e.g., show a success message)
  //       console.log('Image uploaded successfully:', response.data);
  //       Alert.alert('Image uploaded successfully!');
  //     } catch (error) {
  //       // Handle any errors that occurred during the upload process
  //       console.error('Error uploading image:', error);
  //       Alert.alert('Error uploading image.');
  //     }
  //   }else {
  //     console.error('Invalid captured image:', capturedImage);
  //     Alert.alert('Error: Invalid captured image.');
  //   }
  // };
  // const __savePhoto = () => {
  //   console.log('this function is not there')
   
  // }
  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
    }

    
  const __handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off')
    } else if (flashMode === 'off') {
      setFlashMode('on')
    } else {
      setFlashMode('auto')
    }
  }
  const __switchCamera = () => {
    if (cameraType === 'back') {
      setCameraType('front')
    } else {
      setCameraType('back')
    }
  }
  return (
    <View style={styles.container}>
           {startCamera ? (
        <View style={{ flex: 1, width: '100%' }}>
          {previewVisible && capturedImage ? (
            <CameraPreview
              photo={capturedImage}
              savePhoto={__savePhoto}
              retakePicture={__retakePicture}
            />

          ) : (
            <Camera
              type={cameraType}
              flashMode={flashMode}
              style={{flex: 1}}
              ref={(r) => {
                camera = r
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    left: '5%',
                    top: '10%',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <TouchableOpacity
                    onPress={__handleFlashMode}
                    style={{
                      backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                    //   borderRadius: '50%',
                      height: 25,
                      width: 25
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    >
                      ⚡️
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={__switchCamera}
                    style={{
                      marginTop: 20,
                    //   borderRadius: '50%',
                      height: 25,
                      width: 25
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    >
                      {cameraType === 'front' ? '🤳' : '📷'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        // borderRadius: 50,
                        backgroundColor: '#fff'
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

const CameraPreview = ({photo, retakePicture, savePhoto}) => {
  console.log('cameraPreview', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%'
      }}
    >
      <ImageBackground
        source={{uri: photo && photo.uri}}
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end'
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              {/* <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                Re-take
              </Text> */}
              <Btn onPress={retakePicture}  icon={'camera-retake-outline'}/>
            </TouchableOpacity>
            <TouchableOpacity
             
              style={{
                width: 130,
                height: 40,

                alignItems: 'center',
                borderRadius: 4
              }}
            >
              {/* <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
              >
                save photo
              </Text> */}
              <Btn icon={"content-save-outline"}  onPress={savePhoto}/>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}
// import {StatusBar} from 'expo-status-bar'
// import React from 'react'
// import {StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native'
// import {Camera} from 'expo-camera'
// // let camera: Camera
// export default function App() {
//   const [startCamera, setStartCamera] = React.useState(false)
//   const [previewVisible, setPreviewVisible] = React.useState(false)
//   const [capturedImage, setCapturedImage] = React.useState(null)
//   const [cameraType, setCameraType] = React.useState(Camera.Constants.Type.back)
//   const [flashMode, setFlashMode] = React.useState('off')

//   const __startCamera = async () => {
//     const {status} = await Camera.requestCameraPermissionsAsync()
//     console.log(status)
//     if (status === 'granted') {
//       setStartCamera(true)
//     } else {
//       Alert.alert('Access denied')
//     }
//   }
//   const __takePicture = async () => {
//     const photo = await camera.takePictureAsync()
//     console.log("__takePicture",photo)
//     setPreviewVisible(true)
//     //setStartCamera(false)
//     setCapturedImage(photo)
//   }
//   const __savePhoto = () => {
//     console.log('this function is not there')
   
//   }
//   const __retakePicture = () => {
//     setCapturedImage(null)
//     setPreviewVisible(false)
//     __startCamera()
//     }


//   const __handleFlashMode = () => {
//     if (flashMode === 'on') {
//       setFlashMode('off')
//     } else if (flashMode === 'off') {
//       setFlashMode('on')
//     } else {
//       setFlashMode('auto')
//     }
//   }
//   const __switchCamera = () => {
//     if (cameraType === 'back') {
//       setCameraType('front')
//     } else {
//       setCameraType('back')
//     }
//   }
//   return (
//     <View style={styles.container}>
//       {startCamera ? (
//         <View
//           style={{
//             flex: 1,
//             width: '100%'
//           }}
//         >
//           {previewVisible && capturedImage ? (
//             <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
//           ) : (
//             <Camera
//               type={cameraType}
//               flashMode={flashMode}
//               style={{flex: 1}}
//               ref={(r) => {
//                 camera = r
//               }}
//             >
//               <View
//                 style={{
//                   flex: 1,
//                   width: '100%',
//                   backgroundColor: 'transparent',
//                   flexDirection: 'row'
//                 }}
//               >
//                 <View
//                   style={{
//                     position: 'absolute',
//                     left: '5%',
//                     top: '10%',
//                     flexDirection: 'column',
//                     justifyContent: 'space-between'
//                   }}
//                 >
//                   <TouchableOpacity
//                     onPress={__handleFlashMode}
//                     style={{
//                       backgroundColor: flashMode === 'off' ? '#000' : '#fff',
//                     //   borderRadius: '50%',
//                       height: 25,
//                       width: 25
//                     }}
//                   >
//                     <Text
//                       style={{
//                         fontSize: 20
//                       }}
//                     >
//                       ⚡️
//                     </Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={__switchCamera}
//                     style={{
//                       marginTop: 20,
//                     //   borderRadius: '50%',
//                       height: 25,
//                       width: 25
//                     }}
//                   >
//                     <Text
//                       style={{
//                         fontSize: 20
//                       }}
//                     >
//                       {cameraType === 'front' ? '🤳' : '📷'}
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View
//                   style={{
//                     position: 'absolute',
//                     bottom: 0,
//                     flexDirection: 'row',
//                     flex: 1,
//                     width: '100%',
//                     padding: 20,
//                     justifyContent: 'space-between'
//                   }}
//                 >
//                   <View
//                     style={{
//                       alignSelf: 'center',
//                       flex: 1,
//                       alignItems: 'center'
//                     }}
//                   >
//                     <TouchableOpacity
//                       onPress={__takePicture}
//                       style={{
//                         width: 70,
//                         height: 70,
//                         bottom: 0,
//                         // borderRadius: 50,
//                         backgroundColor: '#fff'
//                       }}
//                     />
//                   </View>
//                 </View>
//               </View>
//             </Camera>
//           )}
//         </View>
//       ) : (
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: '#fff',
//             justifyContent: 'center',
//             alignItems: 'center'
//           }}
//         >
//           <TouchableOpacity
//             onPress={__startCamera}
//             style={{
//               width: 130,
//               borderRadius: 4,
//               backgroundColor: '#14274e',
//               flexDirection: 'row',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: 40
//             }}
//           >
//             <Text
//               style={{
//                 color: '#fff',
//                 fontWeight: 'bold',
//                 textAlign: 'center'
//               }}
//             >
//               Take picture
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       <StatusBar style="auto" />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// })

// const CameraPreview = ({photo, retakePicture, savePhoto}) => {
//   console.log('cameraPreview', photo)
//   return (
//     <View
//       style={{
//         backgroundColor: 'transparent',
//         flex: 1,
//         width: '100%',
//         height: '100%'
//       }}
//     >
//       <ImageBackground
//         source={{uri: photo && photo.uri}}
//         style={{
//           flex: 1
//         }}
//       >
//         <View
//           style={{
//             flex: 1,
//             flexDirection: 'column',
//             padding: 15,
//             justifyContent: 'flex-end'
//           }}
//         >
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between'
//             }}
//           >
//             <TouchableOpacity
//               onPress={retakePicture}
//               style={{
//                 width: 130,
//                 height: 40,

//                 alignItems: 'center',
//                 borderRadius: 4
//               }}
//             >
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: 20
//                 }}
//               >
//                 Re-take
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={savePhoto}
//               style={{
//                 width: 130,
//                 height: 40,

//                 alignItems: 'center',
//                 borderRadius: 4
//               }}
//             >
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: 20
//                 }}
//               >
//                 save photo
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ImageBackground>
//     </View>
//   )
// }
