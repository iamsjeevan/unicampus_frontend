// screens/NoticesScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { sampleNotices } from '../data/sampleData';
import NoticeItem from '../components/NoticeItem';
import Card from '../components/Card';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const NoticesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);

  const openNoticeDetail = (notice) => {
    setSelectedNotice(notice);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>College Notices</Text>
      {sampleNotices.length > 0 ? (
        <FlatList
          data={sampleNotices}
          renderItem={({ item }) => (
            <NoticeItem item={item} onPress={() => openNoticeDetail(item)} />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
         <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No notices to display.</Text>
        </View>
      )}


      {selectedNotice && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <Card style={styles.modalContentCard}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                 <MaterialCommunityIcons name="close-circle" size={28} color="#555" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedNotice.title}</Text>
              <Text style={styles.modalDate}>Posted on: {selectedNotice.date} by {selectedNotice.postedBy}</Text>
              <ScrollView style={styles.modalBodyScroll}>
                <Text style={styles.modalBody}>{selectedNotice.content}</Text>
              </ScrollView>
            </Card>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContentCard: { // Using Card styles
    width: '90%',
    maxHeight: '80%',
    // backgroundColor, padding, borderRadius, shadow are handled by Card
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 0, // Adjusted as Card has padding
    marginTop: -5, // Nudge it up a bit
    marginRight: -5, // Nudge it right a bit
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
    textAlign: 'center',
  },
  modalDate: {
    fontSize: 13,
    color: '#777',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalBodyScroll: {
    maxHeight: 300, //  Adjust as needed or make it more dynamic
  },
  modalBody: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },
});

export default NoticesScreen;
