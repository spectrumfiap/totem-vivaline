"use client";
import { useEffect, useState } from "react";

type Noticia = {
  titulo: string;
  data: string;
};

const Aside = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      const res = await fetch("/noticias.json");
      const data: Noticia[] = await res.json();
      setNoticias(data);
    };
    fetchNoticias();
  }, []);

  return (
    <aside className="font-Kanit flex flex-col h-screen border-r w-[45%] sm:w-[25%] md:w-[30%] lg:w-[35%]">
      {/* Título fixo */}
      <h2 className="bg-[#ffffff] text-black text-[1.1rem] lg:text-[2rem] md:text-[2rem] text-center p-6 border-b border-black">
        NOTÍCIAS <span>HOJE</span>
      </h2>

      {/* Feed que preenche o espaço disponível com rolagem */}
      <ul className="flex-1 overflow-y-auto">
        {noticias.map((noticia, index) => (
          <li
            key={index}
            className="px-4 py-6 border-b border-black sm:px-1 sm:py-2 md:px-2 md:py-4 lg:px-4 lg:py-6 bg-[#f4f7f7]"
          >
            <h2 className="sm:text-sm md:text-md lg:text-[1.2rem] font-semibold">
              {noticia.titulo}
            </h2>
            <span className="text-sm">{noticia.data}</span>
            <br />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
