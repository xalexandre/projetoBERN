import { fireEvent, render, screen, userEvent } from '@testing-library/react-native';
import LoginScreen from '@/app/login';

describe('', () => {
    it('', async () => {
        render(<LoginScreen />);
        
        const userInput = screen.getByTestId('login-input-username');
        expect(userInput).toBeTruthy();
        const btnAcessar = screen.getByTestId('btn-acessar');
        expect(btnAcessar).toBeTruthy();
        
        const user = userEvent.setup();
        await user.type(userInput, 'thi@go.com');
        fireEvent.press(btnAcessar);

        // expect().toBeTruthy();
        expect(screen.getByTestId('msg-box')).toBeTruthy();
    });
});