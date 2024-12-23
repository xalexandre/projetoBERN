import { useEffect, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import { UserDispatchContext, UserActionType } from '@/store/UserStore';

export function useAuth() {
  const dispatch = useContext(UserDispatchContext);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        dispatch({
          type: UserActionType.LOGAR,
          user: {
            email: user.email,
            token: user.uid,
            status: true,
          }
        });
      } else {
        dispatch({
          type: UserActionType.DESLOGAR
        });
      }
    });

    return unsubscribe;
  }, []);
} 