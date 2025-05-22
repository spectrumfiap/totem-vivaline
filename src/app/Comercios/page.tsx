"use client";
import { useEffect, useState } from "react";

type Comercio = {
  nome: string;
  endereco: string;
  telefone: string;
};

const AsideComercios = () => {
  const [comercios, setComercios] = useState<Comercio[]>([]);

  useEffect(() => {
    const fetchComercios = async () => {
      try {
        const res = await fetch("https://api-vivaline.onrender.com/comercios", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": "1234",
          },
        });

        if (!res.ok) throw new Error("Erro ao buscar comércios");

        const data: Comercio[] = await res.json();
        setComercios(data);
      } catch (error) {
        console.error("Erro ao buscar comércios:", error);
      }
    };

    fetchComercios();
  }, []);

  return (
    <aside className="font-Kanit flex flex-col h-screen border-r w-[45%] sm:w-[25%] md:w-[30%] lg:w-[35%]">
      <h2 className="bg-[#ffffff] text-black text-[1.1rem] lg:text-[2rem] md:text-[2rem] text-center p-6 border-b border-black">
        COMÉRCIOS <span>LOCAIS</span>
      </h2>

      <ul className="flex-1 overflow-y-auto">
        {comercios.map((comercio, index) => (
          <li
            key={index}
            className="px-4 py-6 border-b border-black sm:px-1 sm:py-2 md:px-2 md:py-4 lg:px-4 lg:py-6 bg-[#f4f7f7]"
          >
            <h2 className="sm:text-sm md:text-md lg:text-[1.2rem] font-semibold">
              {comercio.nome}
            </h2>
            <span className="text-sm block mt-1">📍 {comercio.endereco}</span>
            <span className="text-sm block mt-1">📞 {comercio.telefone}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AsideComercios;
