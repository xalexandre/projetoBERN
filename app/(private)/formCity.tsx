import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Switch, Button, Modal, Portal, Text, useTheme, HelperText } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams } from "expo-router";
import env from '@/constants/env';
import ModalCityConfirm from "@/components/ModalCityConfirm";

export default function FormCityScreen() {
    const theme = useTheme();

    const { id } = useLocalSearchParams();

    const [inputNome, setInputNome] = useState("");
    const [inputPais, setInputPais] = useState("Brasil");
    const [inputData, setInputData] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [inputPassaporte, setInputPassaporte] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [nomeError, setNomeError] = useState("");
    const [paisError, setPaisError] = useState("");
    const [dataError, setDataError] = useState("");

    const listaPais = [
        { label: "Brasil", value: "BR" },
        { label: "Estados Unidos", value: "EUA" },
        { label: "França", value: "FR" },
        { label: "Espanha", value: "ES" },
        { label: "Portugal", value: "PT" },
        { label: "Itália", value: "IT" },
    ];

    useEffect(() => {
        const getCity = async () => {
            if (id) {
                try {
                    const apiGqlUrl = env.API_GQL_URL;
                    const queryData = {
                        query: `
                        query GetCities {
                            cities {
                                id
                                nome
                                pais
                                atualizado
                            }
                        }`
                    };

                    console.log('Query enviada:', queryData);

                    const response = await fetch(apiGqlUrl, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(queryData)
                    });

                    const responseJson = await response.json();
                    console.log('Resposta completa:', responseJson);
                    
                    if (responseJson.data?.cities) {
                        const cityData = responseJson.data.cities.find((city: { id: string; nome: string; pais: string }) => city.id === id);
                        console.log('Dados da cidade:', cityData);
                        
                        if (cityData) {
                            setInputNome(cityData.nome || '');
                            setInputPais(cityData.pais || 'Brasil');
                            setInputData(new Date());
                            setInputPassaporte(false);
                        }
                    }
                } catch (error) {
                    console.error('Erro ao buscar cidade:', error);
                }
            }
        }
        
        getCity();
    }, [id]);

    const validateForm = () => {
        let isValid = true;
        
        if (inputNome.trim().length < 3) {
            setNomeError("Nome da cidade deve ter pelo menos 3 caracteres");
            isValid = false;
        } else {
            setNomeError("");
        }

        if (!inputPais) {
            setPaisError("Selecione um país");
            isValid = false;
        } else {
            setPaisError("");
        }

        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            setShowModal(true);
        }
    };

    return (
        <View style={[styles.formContainer, { backgroundColor: theme.colors.background }]}>
            <TextInput
                mode="flat"
                label="Nome da Cidade"
                placeholder="Informe o Nome da cidade"
                value={inputNome}
                onChangeText={setInputNome}
                error={!!nomeError}
                textColor={theme.colors.onBackground}
                style={{ backgroundColor: theme.colors.surface }}
                right={<TextInput.Icon icon="city" />}
            />
            {nomeError && (
                <HelperText type="error" visible={!!nomeError}>
                    {nomeError}
                </HelperText>
            )}
            <View style={[styles.formPickerContainer, { borderColor: theme.colors.outline }]}>
                <Text style={{ color: theme.colors.onBackground }}>País: </Text>
                <Picker
                    style={[styles.formPicker, { color: theme.colors.onBackground }]}
                    selectedValue={inputPais}
                    onValueChange={setInputPais}
                >
                    {listaPais.map(pais => (
                        <Picker.Item 
                            key={pais.value} 
                            label={pais.label} 
                            value={pais.value}
                            color={theme.colors.onBackground}
                        />
                    ))}
                </Picker>
            </View>
            <Button
                mode="contained"
                icon="calendar"
                onPress={() => setShowDatePicker(true)}
                style={{ marginVertical: 8 }}
            >
                {inputData.toLocaleDateString("pt-BR")}
            </Button>
            {paisError && (
                <HelperText type="error" visible={!!paisError}>
                    {paisError}
                </HelperText>
            )}
            {showDatePicker && (
                <DateTimePicker
                    value={inputData}
                    onChange={(_, date) => {
                        setShowDatePicker(false);
                        if (date) setInputData(date);
                    }}
                />
            )}
            <View style={styles.switchContainer}>
                <Text style={[styles.switchLabel, { color: theme.colors.onBackground }]}>
                    Passaporte:
                </Text>
                <View style={styles.switchOption}>
                    <Text style={{ color: theme.colors.onBackground }}>Não</Text>
                    <Switch
                        value={inputPassaporte}
                        onValueChange={setInputPassaporte}
                        color={theme.colors.primary}
                    />
                    <Text style={{ color: theme.colors.onBackground }}>Sim</Text>
                </View>
            </View>

            <Button
                mode="contained"
                icon="content-save"
                onPress={handleSubmit}
                style={{ marginTop: 16 }}
            >
                Salvar
            </Button>

            <Portal>
                <Modal
                    visible={showModal}
                    onDismiss={() => setShowModal(false)}
                >
                    <ModalCityConfirm
                        id={id as string}
                        nome={inputNome}
                        pais={inputPais}
                        data={inputData}
                        passaporte={inputPassaporte}
                        onDismiss={() => setShowModal(false)}
                    />
                </Modal>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    formDateTimePicker: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    formDateTimePickerLabel: {
        flex: 1,
    },
    formContainer: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    formTextInput: {
        margin: 4,
        padding: 8,
        borderRadius: 5,
        backgroundColor: "#caf0f8"
    },
    formPickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    formPicker: {
        flex: 1,
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    switchLabel: {
        flex: 1,
    },
    switchOption: {
        flexDirection: "row",
        alignItems: "center",
    },
    formPressableSubmit: {
        backgroundColor: "#8cd867",
        margin: 20,
        padding: 5,
        borderRadius: 5,
    },
    formPressableSubmitLabel: {
        textAlign: "center",
    }
});