"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const ComerciosLocais = () => {
  const [comercios, setComercios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/comercios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "eb24e9b8-35b9-48e4-97e9-8257903f0288", 
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Dados recebidos:", data);
        setComercios(data);
      })
      .catch((err) => console.error("Erro ao buscar comércios:", err));
  }, []);

  return (
    <main className="flex-1 flex flex-col items-center px-8 py-10">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-center gap-4 mb-10">
          <Image
            className="w-10 md:w-14"
            src="/assets/ViaMobilidade.svg"
            alt="ViaMobilidade"
            width={50}
            height={50}
          />
          <h1 className="text-2xl md:text-4xl font-semibold">
            Estação Paulista
          </h1>
        </div>

        {comercios.length > 0 ? (
          comercios.map((comercio, index) => (
            <div
              key={index}
              className="mb-10 p-6 rounded-2xl shadow-md bg-white text-center"
            >
              <h2 className="text-xl md:text-2xl font-medium">
                Loja {index + 1}: {comercio.nome}
              </h2>
              <p className="text-base md:text-lg mt-2">{comercio.descricao}</p>
              <p className="text-sm md:text-base mt-2">{comercio.horario}</p>
              <p className="text-sm md:text-base mt-1">{comercio.telefone}</p>
              <p className="text-sm md:text-base mt-1">
                Localização: {comercio.localizacao}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Carregando comércios...</p>
        )}
      </div>
    </main>
  );
};

export default ComerciosLocais;
