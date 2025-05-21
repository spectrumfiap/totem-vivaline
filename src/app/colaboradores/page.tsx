"use client";

import { useEffect, useState } from "react";

type Item = { id: number; [key: string]: any };

export default function Colaboradores() {
  const [tipo, setTipo] = useState("comercio");
  const [itens, setItens] = useState<Item[]>([]);
  const [form, setForm] = useState<any>({});
  const [editId, setEditId] = useState<number | null>(null);

  const API_BASE = "http://localhost:8080/api"; // ajuste para sua API

  // Campos dinâmicos por tipo
  const camposPorTipo: Record<string, string[]> = {
    comercio: ["nome", "endereco", "telefone"],
    duvida: ["titulo", "descricao"],
    linhastatus: ["linha", "status"],
    estacoes: ["nome", "latitude", "longitude"],
    usuarios: ["nome", "email", "cargo"],
  };

  // Busca dados do tipo selecionado
  const fetchItens = async () => {
    try {
      const res = await fetch(`${API_BASE}/${tipo}`);
      if (!res.ok) throw new Error("Erro ao buscar dados");
      const data = await res.json();
      setItens(data);
      setEditId(null);
      setForm({});
    } catch (error) {
      alert("Erro ao buscar dados: " + error);
    }
  };

  useEffect(() => {
    fetchItens();
  }, [tipo]);

  // Manipula inputs dinâmicos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Adicionar ou editar item
  const handleSubmit = async () => {
    try {
      const url = editId ? `${API_BASE}/${tipo}/${editId}` : `${API_BASE}/${tipo}`;
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Erro na requisição");

      fetchItens();
    } catch (error) {
      alert("Erro ao salvar: " + error);
    }
  };

  // Editar item: preencher form com dados
  const handleEdit = (item: Item) => {
    setEditId(item.id);
    setForm(item);
  };

  // Excluir item
  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que quer excluir?")) return;
    try {
      const res = await fetch(`${API_BASE}/${tipo}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao deletar");
      fetchItens();
    } catch (error) {
      alert("Erro ao deletar: " + error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Área de Colaboradores</h1>

      <div className="mb-4">
        <label className="font-semibold mr-2">Selecione o tipo:</label>
        <select
          value={tipo}
          onChange={(e) => {
            setTipo(e.target.value);
            setForm({});
            setEditId(null);
          }}
          className="border p-2 rounded"
        >
          <option value="comercio">Comércio</option>
          <option value="duvida">Dúvida</option>
          <option value="linhastatus">Linha Status</option>
          <option value="estacoes">Estações do Mapa</option>
          <option value="usuarios">Usuários</option>
        </select>
      </div>

      <div className="mb-6 border p-4 rounded shadow bg-white">
        <h2 className="text-xl font-semibold mb-4">{editId ? "Editar" : "Adicionar"} {tipo}</h2>
        {camposPorTipo[tipo].map((campo) => (
          <div key={campo} className="mb-3">
            <label className="block mb-1 capitalize font-medium">{campo}:</label>
            <input
              type="text"
              name={campo}
              value={form[campo] || ""}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editId ? "Atualizar" : "Adicionar"}
        </button>
        {editId && (
          <button
            onClick={() => {
              setEditId(null);
              setForm({});
            }}
            className="ml-4 px-4 py-2 rounded border hover:bg-gray-100"
          >
            Cancelar
          </button>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Lista de {tipo}</h2>
        {itens.length === 0 && <p>Nenhum item cadastrado.</p>}

        <ul className="space-y-3">
          {itens.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border rounded p-3 bg-white"
            >
              <div>
                {camposPorTipo[tipo].map((campo) => (
                  <span key={campo} className="mr-4 font-mono">
                    <b>{campo}:</b> {item[campo]}
                  </span>
                ))}
              </div>
              <div>
                <button
                  onClick={() => handleEdit(item)}
                  className="mr-2 bg-yellow-400 px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
