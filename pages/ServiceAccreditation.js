import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export default function ServiceAccreditation() {
    const [serviceLogs, setServiceLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                setError("You must be logged in to view service accreditation.");
                setLoading(false);
                return;
            }

            const response = await axios.get(`${API_BASE_URL}/logs/`, {
                headers: { Authorization: `Token ${token}` }
            });

            setServiceLogs(response.data || []);
        } catch (err) {
            console.error("Error fetching logs:", err.response?.data || err.message);
            setError("Failed to load service logs.");
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (logId) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (!token) {
                Alert.alert("Error", "You must be logged in to approve.");
                return;
            }

            await axios.post(`${API_BASE_URL}/logs/${logId}/approve/`, {}, {
                headers: { Authorization: `Token ${token}` }
            });

            setServiceLogs(prevLogs =>
                prevLogs.map(log =>
                    log.id === logId ? { ...log, status: "completed", approved: true } : log
                )
            );
        } catch (err) {
            console.error("Error approving log:", err.response?.data || err.message);
            Alert.alert("Error", "Failed to approve log.");
        }
    };

    const formatStatus = (status) => {
        if (!status) return 'N/A';
        return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    };

    if (loading) {
        return (
            <View style={[styles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: 'red', marginBottom: 10 }}>❌ {error}</Text>
            </View>
        );
    }

    if (serviceLogs.length === 0) {
        return (
            <View style={[styles.container, { flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: 'gray', marginBottom: 10 }}>
                    No service logs found.
                </Text>
            </View>
        );
    }

    const LogEntry = ({ log }) => {
        const isCompleted = log.status && log.status.toLowerCase() === "completed" || log.approved;

        return (
            <View key={log.id} style={{
                backgroundColor: '#fff',
                padding: 15,
                borderRadius: 12,
                marginBottom: 15,
                elevation: 3,
                borderWidth: 1,
                borderColor: '#ececec'
            }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>
                    👤 {log.student_full_name}
                </Text>
                <Text style={{ fontSize: 16, marginBottom: 5 }}>
                    Program: {log.program_name} | Facilitator: {log.facilitator_name || 'N/A'}
                </Text>
                <Text style={{ fontSize: 14, marginBottom: 10 }}>
                    Required Hours: {log.program_hours || 'N/A'}
                </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', color: isCompleted ? 'green' : 'orange' }}>
                        Status: {formatStatus(log.status)}
                    </Text>
                    <TouchableOpacity
                        style={{
                            paddingVertical: 6,
                            paddingHorizontal: 15,
                            borderRadius: 8,
                            backgroundColor: isCompleted ? "gray" : "green"
                        }}
                        disabled={isCompleted}
                        onPress={() => handleApprove(log.id)}
                    >
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                            {isCompleted ? "Approved" : "Approve Log"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.container, { flex: 1, paddingTop: 40, alignItems: 'center' }]}>
            <View style={{
                width: '50%',
                flex: 1,
                backgroundColor: '#fff',
                borderWidth: 1,
                borderColor: '#e0e0e0',
                borderRadius: 12,
                overflow: 'hidden'
            }}>
                {/* HEADER */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: '#f0f0f0',
                    elevation: 4,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e6e6e6'
                }}>
                    <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Service Logs</Text>
                </View>

                <ScrollView style={{ flex: 1, paddingHorizontal: 20 }} contentContainerStyle={{ paddingVertical: 20 }}>
                    {serviceLogs.map((log) => (
                        <LogEntry key={log.id} log={log} />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}
