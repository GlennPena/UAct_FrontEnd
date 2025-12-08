import { StyleSheet } from "react-native";

export default StyleSheet.create({
    bg: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    container: { 
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 20, 
    },    

    card: {
        backgroundColor: "rgba(255,255,255,0.9)",
        padding: 15,
        borderRadius: 8,
        width: '80%',
        alignSelf: 'center',
    },

    nobgcard: {
        padding: 15,
        borderRadius: 8,
        width: '80%',
        alignSelf: 'center',
    },
    
    header: {
        fontSize: 28,            
        fontWeight: '700',          
        marginBottom: 20,         
        textAlign: 'center',      
    },

    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        backgroundColor: "#fff",
    },

    linkText: {
        color: "#007bff",
        fontWeight: "bold",
    },

    footerText: { 
        textAlign: "center", 
        marginTop: 15,
        color: "#fff",
    },

    button: { backgroundColor: "#0b131dff", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 10 },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    link: { textAlign: "center", marginTop: 15, color: "#007bff" },

    img: {
        alignSelf: 'center',
        height: 200,
        width: 200,
    },

    programBarItem: {
    marginBottom: 15,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    },

    
    programNameText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#021c2eff',
    },
    programCountText: {
        fontSize: 14,
        marginBottom: 5,
        color: '#666',
    },
    programBarTrack: {
        height: 12,
        backgroundColor: '#e0e0e0', // Track color (background of the bar)
        borderRadius: 6,
        overflow: 'hidden', // Clip the filling bar
    },
    // Ensure you have these basic card styles too:
    dashboardCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#021c2eff',
        paddingBottom: 5,
    }

});
