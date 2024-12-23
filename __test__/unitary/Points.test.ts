import Pontos, { calcularDesconto } from "@/models/Pontos";

describe('CalcularDesconto tests', () => {
    it('Deve retornar 90 para um preço de 100 e desconto de 0.1', () => {
        const ponto: Pontos = {
            nome: 'Ponto A', preco: 100.00, desconto: 0.1,
            latitude: 0, longitude: 0,
        }
        
        const valorDesconto = calcularDesconto(ponto);
        
        // expect(valorDesconto).not.toBe(100);
        expect(valorDesconto).toBe(90);
    });

    it('Deve retornar 100 para um preço de 100 e desconto de 1', () => {
        const ponto: Pontos = {
            nome: 'Ponto A', preco: 100.00, desconto: 1,
            latitude: 0, longitude: 0,
        }
        
        const valorDesconto = calcularDesconto(ponto);

        expect(valorDesconto).toBe(100);
    });

    it('Deve retornar 50 para um preço de 50 e desconto de 0.41', () => {
        const ponto: Pontos = {
            nome: 'Ponto A', preco: 50.00, desconto: 0.41,
            latitude: 0, longitude: 0,
        }

        const valorDesconto = calcularDesconto(ponto);

        expect(valorDesconto).toBe(50);
    });
});