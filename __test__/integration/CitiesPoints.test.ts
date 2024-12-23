import Cidade, { calcularValorPontosComDesconto } from "@/models/Cidade";
import { calcularDesconto } from "@/models/Pontos";

describe('CalcularValorPontosComDesconto Tests', () => {
    it('Deve retornar 90 para a cidade RJ', () => {
        const rj: Cidade = {
            id: '1', nome: 'rj', atualizado: new Date(), pais: 'Brasil',
            pontos: [
                { nome: 'Ponto A', preco: 25.00, latitude: 0, longitude: 0, desconto: 0.1 },
                { nome: 'Ponto B', preco: 25.00, latitude: 0, longitude: 0, desconto: 0.1 },
                { nome: 'Ponto C', preco: 50.00, latitude: 0, longitude: 0, desconto: 0.1 },
            ]
        };

        const valorPontos = calcularValorPontosComDesconto(rj, calcularDesconto);
        
        expect(valorPontos).toBe(90);
    });
});