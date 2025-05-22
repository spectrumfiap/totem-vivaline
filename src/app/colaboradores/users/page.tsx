"use client";
import React, { useEffect, useState } from "react";

interface User {
  id?: number;
  nome: string;
  email: string;
  senha: string;
}

const UsersCrud = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar por ID
  const [buscarId, setBuscarId] = useState("");
  const [userEncontrado, setUserEncontrado] = useState<User | null>(null);

  // Criar novo usuário
  const [novoUser, setNovoUser] = useState<User>({
    nome: "",
    email: "",
    senha: "",
  });

  // Atualizar usuário
  const [atualizarId, setAtualizarId] = useState("");
  const [userAtualizar, setUserAtualizar] = useState<User>({
    nome: "",
    email: "",
    senha: "",
  });

  // Deletar usuário
  const [deletarId, setDeletarId] = useState("");

  const API_URL = "http://localhost:8080/users";
  const API_KEY = "1234";

  const listarTodos = () => {
    setLoading(true);
    setError(null);
    fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ao listar: ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const buscarPorId = () => {
    if (!buscarId) return alert("Informe um ID para buscar");
    setError(null);
    fetch(`${API_URL}/${buscarId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    })
      .then((res) => {
        if (res.status === 404) throw new Error("Usuário não encontrado");
        if (!res.ok) throw new Error(`Erro ao buscar: ${res.statusText}`);
        return res.json();
      })
      .then((data) => setUserEncontrado(data))
      .catch((err) => {
        setError(err.message);
        setUserEncontrado(null);
      });
  };

  const criarUser = () => {
    const { nome, email, senha } = novoUser;
    if (!nome || !email || !senha) {
      return alert("Preencha todos os campos para criar");
    }
    setError(null);
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(novoUser),
    })
      .then((res) => {
        if (res.status === 201) {
          alert("Usuário criado com sucesso!");
          setNovoUser({ nome: "", email: "", senha: "" });
          listarTodos();
        } else if (res.status === 409) {
          return res.json().then((data) => {
            throw new Error(data || "Conflito ao criar usuário");
          });
        } else {
          throw new Error(`Erro ao criar: ${res.statusText}`);
        }
      })
      .catch((err) => setError(err.message));
  };

  const atualizarUser = () => {
    const { nome, email, senha } = userAtualizar;
    if (!atualizarId) return alert("Informe o ID para atualizar");
    if (!nome || !email || !senha) {
      return alert("Preencha todos os campos para atualizar");
    }
    setError(null);
    fetch(`${API_URL}/${atualizarId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(userAtualizar),
    })
      .then((res) => {
        if (res.ok) {
          alert("Usuário atualizado com sucesso!");
          setAtualizarId("");
          setUserAtualizar({ nome: "", email: "", senha: "" });
          listarTodos();
        } else if (res.status === 404) {
          throw new Error("Usuário não encontrado para atualizar");
        } else {
          throw new Error(`Erro ao atualizar: ${res.statusText}`);
        }
      })
      .catch((err) => setError(err.message));
  };

  const deletarUser = () => {
    if (!deletarId) return alert("Informe o ID para deletar");
    setError(null);
    fetch(`${API_URL}/${deletarId}`, {
      method: "DELETE",
      headers: {
        "x-api-key": API_KEY,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Usuário deletado com sucesso!");
          setDeletarId("");
          listarTodos();
        } else if (res.status === 404) {
          throw new Error("Usuário não encontrado para deletar");
        } else {
          throw new Error(`Erro ao deletar: ${res.statusText}`);
        }
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    listarTodos();
  }, []);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Gerenciar Usuários</h1>

      {error && <p className="text-red-600 font-semibold mb-4">Erro: {error}</p>}

      {/* Listar todos */}
      <section className="mb-10">
        <button onClick={listarTodos} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Listar Todos os Usuários
        </button>

        {loading ? (
          <p>Carregando usuários...</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {users.map((u) => (
              <li key={u.id} className="border p-4 rounded">
                <strong>{u.nome}</strong><br />
                Email: {u.email}<br />
                Senha: {u.senha}<br />
                ID: {u.id}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Buscar por ID */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Buscar Usuário por ID</h2>
        <input
          type="number"
          placeholder="ID"
          value={buscarId}
          onChange={(e) => setBuscarId(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button onClick={buscarPorId} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Buscar
        </button>
        {userEncontrado && (
          <div className="mt-4 border p-4 rounded bg-gray-100">
            <p><strong>{userEncontrado.nome}</strong></p>
            <p>Email: {userEncontrado.email}</p>
            <p>Senha: {userEncontrado.senha}</p>
            <p>ID: {userEncontrado.id}</p>
          </div>
        )}
      </section>

      {/* Criar novo usuário */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Adicionar Novo Usuário</h2>
        {["nome", "email", "senha"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={(novoUser as any)[field]}
            onChange={(e) => setNovoUser({ ...novoUser, [field]: e.target.value })}
            className="border p-2 rounded mr-2 mb-2"
          />
        ))}
        <br />
        <button
          onClick={criarUser}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Adicionar Usuário
        </button>
      </section>

      {/* Atualizar usuário */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Atualizar Usuário</h2>
        <input
          type="number"
          placeholder="ID do Usuário"
          value={atualizarId}
          onChange={(e) => setAtualizarId(e.target.value)}
          className="border p-2 rounded mr-2 mb-2"
        />
        {["nome", "email", "senha"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={(userAtualizar as any)[field]}
            onChange={(e) => setUserAtualizar({ ...userAtualizar, [field]: e.target.value })}
            className="border p-2 rounded mr-2 mb-2"
          />
        ))}
        <br />
        <button
          onClick={atualizarUser}
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
        >
          Atualizar Usuário
        </button>
      </section>

      {/* Deletar usuário */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Deletar Usuário por ID</h2>
        <input
          type="number"
          placeholder="ID do Usuário"
          value={deletarId}
          onChange={(e) => setDeletarId(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={deletarUser}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Deletar Usuário
        </button>
      </section>
    </main>
  );
};

export default UsersCrud;
