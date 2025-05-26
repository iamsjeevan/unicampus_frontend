import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import { useNavigation } from '@react-navigation/native';

const StudentLoginScreen = () => {
  const navigation = useNavigation();

  const [emailOrUsn, setEmailOrUsn] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const handleLogin = () => {
    if (!selectedDate) {
      Alert.alert('Select your password date');
    } else {
      // You can also add validation here before navigating
      navigation.navigate('MainApp');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Login</Text>

      <View style={styles.inputContainer}>
        <Icon name="person-outline" size={20} color="#888" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email or USN"
          value={emailOrUsn}
          onChangeText={setEmailOrUsn}
        />
      </View>

      <TouchableOpacity style={styles.inputContainer} onPress={() => setOpen(true)}>
        <Icon name="calendar-outline" size={20} color="#888" style={styles.icon} />
        <Text style={[styles.input, { color: selectedDate ? '#000' : '#999' }]}>
          {selectedDate ? selectedDate : 'Select Password Date'}
        </Text>
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
          const formatted = date.toISOString().split('T')[0];
          setSelectedDate(formatted);
        }}
        onCancel={() => setOpen(false)}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Alert.alert('Reset not implemented')}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === 'ios' ? 15 : 12,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgot: {
    textAlign: 'center',
    marginTop: 15,
    color: '#2563eb',
    fontSize: 14,
  },
});

export default StudentLoginScreen;
