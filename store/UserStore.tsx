import { ReactElement, createContext, useReducer, Reducer } from "react";
import { sendImmediateNotification } from '@/services/NotificationService';
import { firebaseAuth } from '@/lib/firebase';

export enum UserActionType {
    LOGAR, DESLOGAR
};

interface User {
    email: string;
    password: string;
    token: string | null;
    status: boolean;
    message: string | null;
}

interface UserReducerAction {
    type: UserActionType,
    user: User
};

// Estado
export const UserContext = createContext<User | null>(null);
// Dispatch -> Manipulacao
export const UserDispatchContext = createContext<any>(null);

export default function UserProvider({ children }: { children: ReactElement }) {

    const [user, dispatch] = useReducer<Reducer<User, UserReducerAction>>(
        UserReducer, 
        initialUser
    );

    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
};

// Função auxiliar para notificações
const sendAuthNotification = async (type: UserActionType) => {
    if (type === UserActionType.LOGAR) {
        await sendImmediateNotification(
            'Login Realizado ✅',
            'Bem-vindo de volta ao BERN!'
        );
    } else if (type === UserActionType.DESLOGAR) {
        await sendImmediateNotification(
            'Logout Realizado 👋',
            'Até a próxima viagem!'
        );
    }
};

// Reducer síncrono
function UserReducer(user: User, { type, user: userAuth }: UserReducerAction): User {
    switch (type) {
        case UserActionType.LOGAR: {
            // Dispara notificação sem bloquear o reducer
            sendAuthNotification(type).catch(console.error);
            
            return {
                ...userAuth,
                status: true,
                message: 'Autenticado com sucesso.',
            };
        }
        case UserActionType.DESLOGAR: {
            // Dispara notificação sem bloquear o reducer
            sendAuthNotification(type).catch(console.error);
            
            return {
                email: user.email,
                password: user.password,
                token: null,
                status: false,
                message: null,
            };
        }
        default: {
            throw Error('Operação desconhecida.');
        }
    }
}

const initialUser: User = {
    email: 'alexandre@brodt.com.br', password: 'abacate', token: '', status: false, message: ''
}

/* 
app.tsx
index.tsx
_layout.tsx

<UserProvider>
    <View>...</...>
</...>
*/