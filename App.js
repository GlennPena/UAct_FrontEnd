import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import LoginPage from './pages/LoginPage'
import StudentDashboard from './pages/StudentDashboard'
import AdminDashboard from './pages/AdminDashboard'

const Stack = createNativeStackNavigator(); 

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
                <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
            </Stack.Navigator> 
        </NavigationContainer>
    )
}