// screens/communities/CreatePostScreen.js
import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../consts/theme';

const CreatePostScreen = ({ route, navigation }) => {
  const { communityId, communityName } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [imageUri, setImageUri] = useState(null); // For image uploads

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Post to ${communityName}`,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: SIZES.padding }}>
          <MaterialCommunityIcons name="close" size={26} color={COLORS.textPrimary} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handlePostSubmit} style={{ marginRight: SIZES.padding }}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, communityName, title, content]); // Add title, content to update Post button state if needed

  const handlePostSubmit = () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('Title and content cannot be empty.');
      return;
    }
    // In a real app, submit this data to your backend
    console.log({ communityId, title, content });
    alert('Post submitted (demo)!');
    navigation.goBack();
  };

  // const handlePickImage = async () => { /* ... image picker logic ... */ };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust as needed for modal
      >
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
          <TextInput
            style={styles.inputTitle}
            placeholder="Post Title"
            placeholderTextColor={COLORS.textTertiary}
            value={title}
            onChangeText={setTitle}
          />
          <View style={styles.divider} />
          <TextInput
            style={styles.inputContent}
            placeholder="What's on your mind?"
            placeholderTextColor={COLORS.textTertiary}
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top" // Android
          />
          {/* 
          <TouchableOpacity style={styles.imagePickerButton} onPress={handlePickImage}>
            <MaterialCommunityIcons name="image-plus" size={24} color={COLORS.accent} />
            <Text style={styles.imagePickerText}>Add Image (Optional)</Text>
          </TouchableOpacity>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}
          */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.secondary, // Modal background
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: SIZES.padding,
  },
  postButtonText: {
    ...FONTS.h4,
    color: COLORS.accent,
    fontWeight: '600',
  },
  inputTitle: {
    ...FONTS.h2,
    color: COLORS.textPrimary,
    paddingVertical: SIZES.paddingS,
    borderBottomWidth: 0, // No border, use divider
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: SIZES.paddingXS,
  },
  inputContent: {
    ...FONTS.body1,
    color: COLORS.textPrimary,
    minHeight: 200, // Ample space for content
    paddingVertical: SIZES.paddingS,
    lineHeight: 22,
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.paddingS,
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.radiusS,
    marginTop: SIZES.padding,
    alignSelf: 'flex-start',
  },
  imagePickerText: {
    ...FONTS.body2,
    color: COLORS.accent,
    marginLeft: SIZES.paddingXS,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radiusS,
    marginTop: SIZES.paddingS,
    backgroundColor: COLORS.tertiary,
  },
});

export default CreatePostScreen;
