// components/ResourceListItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../consts/theme'; // Adjust path
import Card from './Card'; // Adjust path

const ResourceListItem = ({ resource, onPressDownload }) => {
  const getFileIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'pdf': return 'file-pdf-box';
      case 'doc': case 'docx': return 'file-word-box';
      case 'ppt': case 'pptx': return 'file-powerpoint-box';
      case 'xls': case 'xlsx': return 'file-excel-box';
      case 'link': return 'link-variant';
      case 'image': case 'jpg': case 'png': return 'file-image-box';
      default: return 'file-document-outline';
    }
  };

  const handlePress = () => {
    if (resource.url) {
      if (resource.type === 'link') {
        Linking.openURL(resource.url).catch(err => Alert.alert("Error", "Could not open link."));
      } else {
        // For file downloads, you'd typically use a library like expo-file-system
        // or Linking.openURL if it's a direct download link that the browser can handle.
        Alert.alert("Download", `Simulating download of: ${resource.title}\nURL: ${resource.url}`);
        // Example: Linking.openURL(resource.url).catch(err => Alert.alert("Error", "Could not open file link."));
      }
    } else {
      Alert.alert("Info", `No URL available for: ${resource.title}`);
    }
  };

  return (
    <Card style={styles.card}>
      <View style={styles.contentContainer}>
        <MaterialCommunityIcons
          name={getFileIcon(resource.type)}
          size={36}
          color={COLORS.accent} // Or a color based on file type
          style={styles.fileIcon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>{resource.title}</Text>
          <Text style={styles.detailText}>
            {resource.uploadedBy && `Uploaded by: ${resource.uploadedBy} • `}
            {resource.date && `Date: ${resource.date}`}
          </Text>
          <Text style={styles.detailText}>
            {resource.fileSize && `File Size: ${resource.fileSize} • `}
            {resource.semester && `Semester: ${resource.semester.startsWith('sem') ? resource.semester.replace('sem', 'Sem ') : resource.semester}`}
          </Text>
        </View>
        <TouchableOpacity onPress={onPressDownload || handlePress} style={styles.actionIconContainer}>
          <MaterialCommunityIcons
            name={resource.type === 'link' ? "open-in-new" : "download-circle-outline"}
            size={28}
            color={COLORS.textSecondary}
          />
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SIZES.paddingS,
    paddingVertical: SIZES.paddingS,
    backgroundColor: COLORS.secondary, // Ensure your dark theme card color
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fileIcon: {
    marginRight: SIZES.paddingS,
  },
  textContainer: {
    flex: 1,
    marginRight: SIZES.paddingXS,
  },
  title: {
    ...FONTS.h4, // Using your FONTS definitions
    color: COLORS.textPrimary, // Dark theme text color
    fontWeight: '600',
    marginBottom: SIZES.paddingXS / 2,
  },
  detailText: {
    ...FONTS.body4,
    color: COLORS.textSecondary, // Dark theme secondary text color
    lineHeight: SIZES.body4.fontSize * 1.4,
  },
  actionIconContainer: {
    padding: SIZES.paddingXS,
  },
});

export default ResourceListItem;