import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import { useRouter } from 'expo-router';

export default function PostAnItem() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [showCamera, setShowCamera] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<any>(null);

  const cameraRef = useRef<any>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>No camera permission</Text>
        <TouchableOpacity onPress={requestPermission}>
          <Text>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCameraType = () => {setCameraType((prev) => (prev === 'back' ? 'front' : 'back'));};

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5,
          base64: true,
        });
        setCapturedPhoto(photo);
        setShowCamera(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSavePicture = () => {  
    if (capturedPhoto) {
      router.push({
        pathname: '/item-details',
        params: { image: capturedPhoto.uri },
      });
    }
  };

  const handleRetakePhoto = () => {
  setCapturedPhoto(null);
  setShowCamera(true);
};

return (
  <View style={styles.container}>
    
    <View style={styles.header}>
      <Text style={styles.heading}>Post an Item</Text>
      <Text style={styles.subheading}>Take a clear photo of your item</Text>
    </View>

    <View style={styles.content}>

      {!capturedPhoto && !showCamera && ( //we only want to open the camera if we don't have a photo yet and we're not already showing the camera
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => setShowCamera(true)}
        >
          <Text style={styles.primaryButtonText}>+ Add Photo</Text>
        </TouchableOpacity>
      )}

      {showCamera && (
        <CameraView
          style={styles.camera}
          facing={cameraType}
          ref={cameraRef}
        >
          <View style={styles.cameraOverlay}>


  <View style={styles.topControls}>
    <TouchableOpacity style={styles.controlButton} onPress={handleCameraType}>
      <Text style={styles.text}>Flip</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.controlButton}
      onPress={() => setShowCamera(false)}
    >
      <Text style={styles.text}>Close</Text>
    </TouchableOpacity>
  </View>

  {/* BOTTOM CAPTURE BUTTON */}
  <TouchableOpacity
    style={styles.captureButton}
    onPress={handleTakePicture}
  >
    <Text style={styles.captureText}>Capture</Text>
  </TouchableOpacity>

</View>
        </CameraView>
      )}

      {/* PHOTO PREVIEW */}
      {capturedPhoto && (
        <View style={styles.previewSection}>

          <Image
            source={{ uri: capturedPhoto.uri }}
            style={styles.previewImage}
          />

          <View style={styles.actionRow}>
            
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleRetakePhoto}
            >
              <Text style={styles.secondaryText}>Retake Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleSavePicture}
            >
              <Text style={styles.primaryButtonText}>Add Information</Text>
            </TouchableOpacity>

          </View>

        </View>
      )}

    </View>
  </View>
);
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    padding: 10,
  },
  subheading: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  savebutton: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
  },
  preview: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  photoActions: {
  marginTop: 15,
  width: '100%',
  alignItems: 'center',
  gap: 10,
  },
  header: {
  paddingTop: 20,
  paddingBottom: 10,
  alignItems: 'center',
},

content: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},

primaryButton: {
  backgroundColor: 'grey',
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 10,
  marginTop: 10,
},

primaryButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},

secondaryButton: {
  backgroundColor: 'grey',
  paddingVertical: 14,
  paddingHorizontal: 20,
  borderRadius: 10,
  marginTop: 10,
},

secondaryText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},

cameraOverlay: {
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: 50,
  paddingBottom: 30,
},

topControls: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  paddingHorizontal: 20,
},

captureButton: {
  backgroundColor: '#fff',
  width: 80,
  height: 80,
  borderRadius: 40,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 3,
  borderColor: 'grey',
},

captureText: {
  fontSize: 12,
  fontWeight: 'bold',
},

controlButton: {
  backgroundColor: '#fff',
  padding: 10,
  borderRadius: 8,
},

previewSection: {
  alignItems: 'center',
  marginTop: 20,
},

actionRow: {
  flexDirection: 'row',
  gap: 10,
  marginTop: 15,
},

camera: {
  width: '100%',
  height: 400,
},
});