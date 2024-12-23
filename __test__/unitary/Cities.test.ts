import Cidade, { calcularValorPontos, calcularValorPontosComDesconto } from "@/models/Cidade";
import Pontos from "@/models/Pontos";

describe('CalcularValorPontos Tests', () => {

    it('Deve retornar 100 para a cidade RJ', () => {
        const rj: Cidade = {
            id: '1', nome: 'rj', atualizado: new Date(), pais: 'Brasil',
            pontos: [
                { nome: 'Ponto A', preco: 25.00, latitude: 0, longitude: 0, desconto: 0 },
                { nome: 'Ponto B', preco: 25.00, latitude: 0, longitude: 0, desconto: 0 },
                { nome: 'Ponto C', preco: 50.00, latitude: 0, longitude: 0, desconto: 0 },
            ]
        };

        const valorPontos = calcularValorPontos(rj);
        
        expect(valorPontos).toBe(100);
    });

    it('Deve retornar 0 para a cidade SP', () => {
        const sp: Cidade = {
            id: '1', nome: 'sp', atualizado: new Date(), pais: 'Brasil',
            pontos: [],
        };

        const valorPontos = calcularValorPontos(sp);

        expect(valorPontos).toBe(0);
    });

});

/* describe('CalcularValorPontosComDesconto Tests', () => {
    it('Deve retornar 90 para a cidade RJ', () => {
        const rj: Cidade = {
            id: '1', nome: 'rj', atualizado: new Date(), pais: 'Brasil',
            pontos: [
                { nome: 'Ponto A', preco: 25.00, latitude: 0, longitude: 0, desconto: 0.1 },
                { nome: 'Ponto B', preco: 25.00, latitude: 0, longitude: 0, desconto: 0.1 },
                { nome: 'Ponto C', preco: 50.00, latitude: 0, longitude: 0, desconto: 0.1 },
            ]
        };

        const valorPontos = calcularValorPontosComDesconto(rj, (ponto: Pontos) => {
            return ponto.preco - 10.00
        });
        
        expect(valorPontos).toBe(100);
    });
}); */