// screens/PostDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { samplePosts, sampleComments } from '../data/sampleData';
import Card from '../components/Card';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PostDetailScreen = ({ route, navigation }) => {
  const { postId, postTitle } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Find the post (this is inefficient for large data, real app would fetch by ID)
    let foundPost = null;
    for (const communityKey in samplePosts) {
      const p = samplePosts[communityKey].find(p => p.id === postId);
      if (p) {
        foundPost = p;
        break;
      }
    }
    setPost(foundPost);
    setComments(sampleComments[postId] || []);
  }, [postId]);

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: post?.title || 'Post Details' });
  }, [navigation, post]);

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    const commentToAdd = {
      id: `cm${Date.now()}`, // Simple unique ID
      postId: postId,
      author: 'CurrentUser', // Placeholder
      text: newComment.trim(),
      timestamp: 'Just now',
    };
    setComments(prevComments => [commentToAdd, ...prevComments]); // Add to top
    setNewComment('');
    // In a real app, you'd also update sampleComments or send to backend
    // For now, this only updates local state for this screen
  };

  if (!post) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading post...</Text>
      </View>
    );
  }

  const renderCommentItem = ({ item }) => (
    <Card style={styles.commentCard}>
      <Text style={styles.commentAuthor}>{item.author} - <Text style={styles.commentTimestamp}>{item.timestamp}</Text></Text>
      <Text style={styles.commentText}>{item.text}</Text>
    </Card>
  );

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust as needed
    >
      <ScrollView style={styles.scrollContainer}>
        <Card>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postAuthor}>by {post.author} - {post.timestamp}</Text>
          <View style={styles.statsContainer}>
             <MaterialCommunityIcons name="arrow-up-bold" size={20} color="#4CAF50" />
             <Text style={styles.statText}>{post.upvotes}</Text>
          </View>
          <Text style={styles.postContent}>{post.content}</Text>
        </Card>

        <Text style={styles.commentsHeader}>Comments ({comments.length})</Text>
        {comments.length > 0 ? (
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id}
                // scrollEnabled={false} // If inside ScrollView, disable its own scroll
                // Alternatively, don't use FlatList if comments are few and map them
            />
        ) : (
            <Text style={styles.noCommentsText}>No comments yet. Be the first to comment!</Text>
        )}
      </ScrollView>
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Write a comment..."
          value={newComment}
          onChangeText={setNewComment}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
          <MaterialCommunityIcons name="send" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  scrollContainer: {
    flex: 1, // Allows ScrollView to take space before input
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  postAuthor: { fontSize: 13, color: '#777', marginBottom: 15 },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
  postContent: { fontSize: 16, lineHeight: 24, color: '#444' },
  commentsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
    marginLeft: 16,
    color: '#333',
  },
  commentCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 12,
  },
  commentAuthor: { fontSize: 14, fontWeight: 'bold', color: '#007AFF' },
  commentTimestamp: { fontSize: 11, color: '#888', fontWeight: 'normal'},
  commentText: { fontSize: 14, color: '#555', marginTop: 4 },
  noCommentsText: {
    textAlign: 'center',
    color: '#777',
    marginVertical: 20,
    fontStyle: 'italic',
  },
  commentInputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center', // Align items for multiline input
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100, // For multiline
    fontSize: 15,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostDetailScreen;
