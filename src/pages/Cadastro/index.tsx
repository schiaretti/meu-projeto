import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ComboBox from "../../components/ComboBox";

function CadastroPoste() {
    const [searchParams] = useSearchParams();
    const [endereco, setEndereco] = useState<string>("Buscando endereço...");

    const latitude = searchParams.get("lat") ? parseFloat(searchParams.get("lat") as string) : null;
    const longitude = searchParams.get("lng") ? parseFloat(searchParams.get("lng") as string) : null;

    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            buscarEndereco(latitude, longitude);
        }
    }, [latitude, longitude]);

    const buscarEndereco = async (lat: number, lng: number) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
            );
            const data = await response.json();

            if (data?.address) {
                const { road, city, town, village, postcode } = data.address;
                const cidade = city || town || village || "Cidade desconhecida";
                setEndereco(`${road || "Endereço desconhecido"}, ${cidade} - CEP: ${postcode || "Não disponível"}`);
            } else {
                setEndereco("Endereço não encontrado");
            }
        } catch (error) {
            console.error("Erro ao obter endereço:", error);
            setEndereco("Erro ao buscar endereço");
        }
    };

    const handleMaterialChange = (selectedValue: string) => {
        console.log("Material selecionado:", selectedValue);
    };

    return (
        <div className="max-w-3xl mx-auto mt-6 p-6 bg-white border rounded-lg shadow-md ">
            <button
                type="submit"
                className="col-span-1 md:col-span-2 w-full bg-blue-500 mb-4 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Dados Anteriores
            </button>

            {/* Seção de Endereço */}
            <section className="mb-6">
                <h2 className="text-lg font-semibold text-center bg-gray-200 p-2 rounded-md mb-4">
                    Endereço
                </h2>
                <p className="text-sm text-gray-700 text-center mb-4">{endereco}</p>

                <h1 className="text-lg font-semibold text-center bg-gray-200 p-2 rounded-md mb-4">
                    Referência
                </h1>

                <ComboBox
                    label="Selecione"
                    options={[
                        { value: "Em Frente", label: "Em Frente" },
                        { value: "Sem Número", label: "Sem Número" },
                        { value: "Praça", label: "Praça" },
                    ]}
                    onChange={handleMaterialChange}
                    className="mb-4"
                />

                <input
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:bg-slate-200 mb-4"
                    placeholder="Número"
                    type="number"
                />
            </section>


            {/* Formulário */}
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <h2 className="col-span-1 md:col-span-2 text-lg font-semibold text-center bg-gray-200 p-2 rounded-md">
                    Materiais Instalados no Poste
                </h2>

                <ComboBox
                    label="Selecione o Braço"
                    options={[
                        { value: "Braço Curto", label: "Braço Curto" },
                        { value: "Braço Médio", label: "Braço Médio" },
                        { value: "Braço Longo", label: "Braço Longo" },
                        { value: "Level 1", label: "Level 1" },
                        { value: "Level 2", label: "Level 2" },
                        { value: "Pétala com 2", label: "Pétala com 2" },
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
                    label="Fases"
                    options={[
                        { value: "Monofásico", label: "Monofásico" },
                        { value: "Bifásico", label: "Bifásico" },
                        { value: "Trifásico", label: "Trifásico" },
                    ]}
                    onChange={handleMaterialChange}
                />

                <div className="col-span-1 md:col-span-2">
                    <label className="block text-md font-medium text-gray-700 mb-4">Altura do Poste</label>
                    <input
                        placeholder="Altura em metros"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                <h2 className="col-span-1 md:col-span-2 text-lg font-semibold text-center bg-gray-200 p-2 rounded-md">
                    Infra estrutura da via
                </h2>

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

                <div className="col-span-1 md:col-span-2">
                    <label className="block text-md font-medium text-gray-700 mb-4">Quantidade de faixas</label>
                    <input
                        placeholder="Número de Faixas"
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    
                </div>

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

                <div className="col-span-1 md:col-span-2">
                    <label className="block text-md font-medium text-gray-700 mb-4">Largura do canteiro</label>
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

                <div className="col-span-1 md:col-span-2">
                    <label className="block text-md font-medium text-gray-700 mb-4">Distância do poste ao meio Fio</label>
                    <input
                        placeholder="Em Metros"
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
                        { value: "Espaço Municipal", label: "Espaço Municipal" },
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
        </div>
    );
}

export default CadastroPoste;
