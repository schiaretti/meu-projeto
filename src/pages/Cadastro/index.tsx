import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ComboBox from "../../components/ComboBox";
import Componentebotao from "../../components/CameraBotao";


function CadastroPoste() {
    const [searchParams] = useSearchParams();
    const [endereco, setEndereco] = useState<string>("Buscando endereço...");
    const [cep, setCep] = useState<string | null>(null);
    const [cidade, setCidade] = useState<string>('');
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);



    // Recupera os parâmetros da URL e converte para float
    useEffect(() => {
        const lat = searchParams.get("lat");
        const lng = searchParams.get("lng");

        if (lat && lng) {
            setLatitude(parseFloat(lat));
            setLongitude(parseFloat(lng));
        }
    }, [searchParams]);

    // Atualiza o endereço quando a latitude e longitude mudam
    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            buscarEndereco(latitude, longitude);
        }
    }, [latitude, longitude]);

    // Função que faz a busca do endereço com base nas coordenadas
    const buscarEndereco = async (lat: number, lng: number) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
            );
            const data = await response.json();

            if (data?.address) {
                const { road, city, town, village, postcode } = data.address;

                // Determinar qual cidade usar
                const cidadeEncontrada = city || town || village || "Cidade desconhecida";

                // Atualizar o estado com o endereço, cidade e CEP
                setEndereco(road || "Endereço desconhecido");
                setCep(postcode || "Não disponível");
                setCidade(cidadeEncontrada);
            } else {
                setEndereco("Endereço não encontrado");
                setCep("Não disponível");
                setCidade("Cidade não encontrada");
            }
        } catch (error) {
            console.error("Erro ao obter endereço:", error);
            setEndereco("Erro ao buscar endereço");
            setCep("Erro");
            setCidade("Erro");
        }
    };

    const handleMaterialChange = (selectedValue: string) => {
        console.log("Material selecionado:", selectedValue);
    };



    return (
        <div>
            {/* Input para o endereço */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                <input
                    type="text"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Input para o CEP */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">CEP</label>
                <input
                    type="text"
                    value={cep || ""}
                    onChange={(e) => setCep(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Input para a Cidade */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Cidade</label>
                <input
                    type="text"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Inputs para Latitude e Longitude */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
                <input
                    type="text"
                    value={latitude ?? ""}
                    onChange={(e) => setLatitude(e.target.value ? parseFloat(e.target.value) : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
                <input
                    type="text"
                    value={longitude ?? ""}
                    onChange={(e) => setLongitude(e.target.value ? parseFloat(e.target.value) : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <input
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:bg-slate-200 mb-4"
                placeholder="Número"
                type="number"
            />


            <ComboBox
                label="Selecione"
                options={[
                    { value: "Em Frente", label: "Em Frente" },
                    { value: "Sem Número", label: "Sem Número" },
                    { value: "Praça", label: "Praça" },
                    { value: "Viela", label: "Viela" },
                ]}
                onChange={handleMaterialChange}
                className="mb-4"
            />





            {/* Formulário */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <h2 className="col-span-1 md:col-span-2 text-lg font-semibold text-center bg-gray-200 p-2 rounded-md">
                    Informações do ponto de luz
                </h2>

                <ComboBox
                    label="Poste com Transformador"
                    options={[
                        { value: "Sim", label: "Sim" },
                        { value: "Não", label: "Não" },

                    ]}
                    onChange={handleMaterialChange}
                />

                <ComboBox
                    label="Poste com medição"
                    options={[
                        { value: "Sim", label: "Sim" },
                        { value: "Não", label: "Não" },

                    ]}
                    onChange={handleMaterialChange}
                />

                <ComboBox
                    label="Poste de:"
                    options={[
                        { value: "Circular concreto", label: "Circular concreto" },
                        { value: "Madeira", label: "Madeira" },
                        { value: "Concreto DT", label: "Concreto DT" },
                        { value: "Metal", label: "Metal" },
                        { value: "Ornamental", label: "Ornamental" },

                    ]}
                    onChange={handleMaterialChange}
                />

                <ComboBox
                    label="Altura do poste"
                    options={[
                        { value: "5", label: "5" },
                        { value: "6", label: "6" },
                        { value: "7", label: "7" },
                        { value: "8", label: "8" },
                        { value: "9", label: "9" },
                        { value: "10", label: "10" },
                        { value: "11", label: "11" },
                        { value: "12", label: "12" },
                        { value: "13", label: "13" },
                        { value: "14", label: "14" },
                        { value: "15", label: "15" },
                        { value: "16", label: "16" },
                        { value: "17", label: "17" },
                        { value: "18", label: "18" },
                    ]}
                    onChange={handleMaterialChange}
                />

                <ComboBox
                    label="Estrutura da postiação"
                    options={[
                        { value: "Unilateral", label: "Unilateral" },
                        { value: "Bilateral", label: "Bilateral" },
                        { value: "Canteiro central", label: "Canteiro central" },

                    ]}
                    onChange={handleMaterialChange}
                />


                <ComboBox
                    label="Selecione o Braço"
                    options={[
                        { value: "Braço Curto", label: "Braço Curto" },
                        { value: "Braço Médio", label: "Braço Médio" },
                        { value: "Braço Longo", label: "Braço Longo" },
                        { value: "Level 1", label: "Level 1" },
                        { value: "Level 2", label: "Level 2" },
                        { value: "Suporte com 1", label: "Suporte com 1" },
                        { value: "Pétala com 2", label: "Pétala com 2" },
                        { value: "Pétala com 3", label: "Pétala com 3" },
                        { value: "Pétala com 4", label: "Pétala com 4" },
                    ]}
                    onChange={handleMaterialChange}
                />

                <ComboBox
                    label="Tamanho o Braço"
                    options={[
                        { value: "0.50", label: "0.50" },
                        { value: "1.20", label: "1.20" },
                        { value: "2.20", label: "2.20" },
                        { value: "3.20", label: "3.20" },
                        { value: "4.20", label: "4.20" },

                    ]}
                    onChange={handleMaterialChange}
                />

                <ComboBox
                    label="Quantidade de Pontos"
                    options={[
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3", label: "3" },
                        { value: "4", label: "4" },
                    ]}
                    onChange={handleMaterialChange}
                />

                <ComboBox
                    label="Tipo da Lâmpada"
                    options={[
                        { value: "Vapor de Sodio 70 W", label: "Vapor de Sodio 70 W" },
                        { value: "Vapor de Sodio 100 W", label: "Vapor de Sodio 100 W" },
                        { value: "Vapor de Sodio 150 W", label: "Vapor de Sodio 150 W" },
                    ]}
                    onChange={handleMaterialChange}
                />

                <ComboBox
                    label="Tipo do Reator"
                    options={[
                        { value: "Reator Externo", label: "Reator Externo" },
                        { value: "Reator Integrado", label: "Reator Integrado" },

                    ]}
                    onChange={handleMaterialChange}
                />

                <ComboBox
                    label="Tipo de Comando"
                    options={[
                        { value: "Individual", label: "Individual" },
                        { value: "Coletivo", label: "Coletivo" },
                    ]}
                    onChange={handleMaterialChange}
                />

                <ComboBox
                    label="Tipo de Rede"
                    options={[
                        { value: "Aérea BT", label: "Aérea BT" },
                        { value: "Convencional", label: "Convencional" },
                        { value: "Subterrânea", label: "Subterrânea" },
                    ]}
                    onChange={handleMaterialChange}
                />

                <ComboBox
                    label="Tipo de Cabo"
                    options={[
                        { value: "Multiplexado", label: "Multiplexado" },
                        { value: "Convencional", label: "Convencional" },
                        { value: "Cobre", label: "Cobre" },
                    ]}
                    onChange={handleMaterialChange}
                />

                <ComboBox
                    label="Número de fases"
                    options={[
                        { value: "Monofásico", label: "Monofásico" },
                        { value: "Bifásico", label: "Bifásico" },
                        { value: "Trifásico", label: "Trifásico" },
                    ]}
                    onChange={handleMaterialChange}
                />


                <ComboBox
                    label="Tipo de Via"
                    options={[
                        { value: "Via Rápida", label: "Via Rápida" },
                        { value: "Via Local", label: "Via Local" },
                        { value: "Via Arterial", label: "Via Arterial" },
                        { value: "Via Coletora", label: "Via Coletora" },
                        { value: "Via Rural", label: "Via Rural" },
                    ]}
                    onChange={handleMaterialChange}
                />

                <ComboBox
                    label="Pavimento"
                    options={[
                        { value: "Asfalto", label: "Asfalto" },
                        { value: "Paralelepipedo", label: "Paralelepipedo" },
                        { value: "Terra", label: "Terra" },
                        { value: "Bloquete", label: "Bloquete" },

                    ]}
                    onChange={handleMaterialChange}
                />

                <ComboBox
                    label="Quantidade de faixas"
                    options={[
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3", label: "3" },
                        { value: "4", label: "4" },
                        { value: "5", label: "5" },
                        { value: "6", label: "6" },

                    ]}
                    onChange={handleMaterialChange}
                />

                <div className="col-span-1 md:col-span-2">
                    <label className="block text-md font-medium text-gray-700 mb-4">Largura da via</label>
                    <input
                        placeholder="Em Metros"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>


                <ComboBox
                    label="Tipo de Passeio"
                    options={[
                        { value: "Concreto", label: "Concreto" },
                        { value: "Pedra", label: "Pedra" },
                        { value: "Terra", label: "Terra" },
                        { value: "Bloquete", label: "Bloquete" },
                        { value: "Cerâmico", label: "Cerâmico" },
                    ]}
                    onChange={handleMaterialChange}
                />



                <div className="col-span-1 md:col-span-2">
                    <label className="block text-md font-medium text-gray-700 mb-4">Largura da calçada de pedestre</label>
                    <input
                        placeholder="Em Metros"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <ComboBox
                    label="Canteiro central existente"
                    options={[
                        { value: "Sim", label: "Sim" },
                        { value: "Não", label: "Não" },
                    ]}
                    onChange={handleMaterialChange}
                />

                <div className="col-span-1 md:col-span-2">
                    <label className="block text-md font-medium text-gray-700 mb-4">Largura do canteiro central</label>
                    <input
                        placeholder="Em Metros"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>


                <div className="col-span-1 md:col-span-2">
                    <label className="block text-md font-medium text-gray-700 mb-4">Distância entre postes</label>
                    <input
                        placeholder="Em Metros"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <ComboBox
                    label="Árvore existente"
                    options={[
                        { value: "Sim", label: "Sim" },
                        { value: "Não", label: "Não" },
                    ]}
                    onChange={handleMaterialChange}
                />

                <ComboBox
                    label="Porte e altura da árvore"
                    options={[
                        { value: "Pequeno porte", label: "Pequeno porte" },
                        { value: "Médio porte", label: "Médio porte" },
                        { value: "Grande porte", label: "Grande porte" },
                    ]}
                    onChange={handleMaterialChange}
                />

                <div className="col-span-1 md:col-span-2">
                    <label className="block text-md font-medium text-gray-700 mb-4">Distância do poste ao meio Fio</label>
                    <input
                        placeholder="Em centrimetros"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <div className="col-span-1 md:col-span-2">
                    <label className="block text-md font-medium text-gray-700 mb-4">Distância do meio fio ao ponto de luz</label>
                    <input
                        placeholder="Em Metros"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <ComboBox
                    label="Finalidade da Instalação"
                    options={[
                        { value: "Viária", label: "Viária" },
                        { value: "Praça", label: "Praça" },
                        { value: "Espaço municipal", label: "Espaço municipal" },
                        { value: "Ciclo via", label: "Ciclo via" },
                        { value: "Pista de caminhada", label: "Pista de caminhada" },
                    ]}
                    onChange={handleMaterialChange}
                />

                <button
                    type="submit"
                    className="col-span-1 md:col-span-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Cadastrar Ponto
                </button>
            </form>

            <div className="flex gap-4 mb-3 p-2">
                {/* Botão "Foto do Poste" */}
                <div className="flex-1">
                    <Componentebotao buttonText="Foto do Poste " minPhotos={3} />
                </div>

                {/* Botão "Salvar" */}
                <div className="flex-1">
                    <button className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition">
                        <span role="img" aria-label="save" className="mr-2">
                            💾
                        </span>
                        Salvar
                    </button>
                </div>
            </div>

            <div className="flex gap-4 mb-3 p-2">
                {/* Botão "Foto da Árvore" */}
                <div className="flex-1">
                    <Componentebotao buttonText="Foto da Árvore" minPhotos={3} />
                </div>

                {/* Botão "Salvar" */}
                <div className="flex-1">
                    <button className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition">
                        <span role="img" aria-label="save" className="mr-2">
                            💾
                        </span>
                        Salvar
                    </button>
                </div>
            </div>


        </div >
    );
}

export default CadastroPoste;
