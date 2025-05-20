"use client"
import { useEffect } from "react"
import Aside from "@/components/Aside/page"
import Image from "next/image"
import Link from "next/link"

const Home = () => {
  useEffect(() => {
    // Insere o script do Chatbase de forma dinâmica
    const scriptTag = document.createElement("script")
    scriptTag.innerHTML = `
      (function(){
        if(!window.chatbase || window.chatbase("getState") !== "initialized"){
          window.chatbase = (...arguments) => {
            if(!window.chatbase.q){ window.chatbase.q = [] }
            window.chatbase.q.push(arguments)
          };
          window.chatbase = new Proxy(window.chatbase, {
            get(target, prop){
              if(prop === "q"){ return target.q }
              return (...args) => target(prop, ...args)
            }
          });
        }
        const onLoad = function(){
          const script = document.createElement("script");
          script.src = "https://www.chatbase.co/embed.min.js";
          script.id = "3s1r7gsu0WTo8h3DnGSlV";
          script.domain = "www.chatbase.co";
          document.body.appendChild(script);
        };
        if(document.readyState === "complete"){
          onLoad();
        } else {
          window.addEventListener("load", onLoad);
        }
      })();
    `
    document.body.appendChild(scriptTag)
  }, [])

  return (
    <div className="flex bg-gradient-to-b from-white to-[#C7CDCF] flex-1">
      <Aside />
      <main className="h-full sm:w-full sm:flex sm:flex-col md:w-full lg:w-[65%]">
        <ul className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 items-center h-full">
          <li className="flex justify-center">
            <Link href="/mapainterativo">
              <Image
                className="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                src="/assets/mapa-interativo-semfundo.png"
                alt="Mapa interativo"
                width={260}
                height={250}
              />
            </Link>
          </li>

          <li className="flex justify-center">
            <Link href="/StatusLinhas">
              <Image
                className="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                src="/assets/status-linhas-semfundo.png"
                width={260}
                height={250}
                alt="Status das linhas"
              />
            </Link>
          </li>

          <li className="flex justify-center">
            <Link href="/Comercios">
              <Image
                className="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                src="/assets/comercios-locais-semfundo.png"
                width={260}
                height={250}
                alt="Comércios locais"
              />
            </Link>
          </li>

          <li className="flex justify-center">
            <Link href="/Chatbot">
              <Image
                className="transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
                src="/assets/assistente-virtual-semfundo.png"
                width={260}
                height={250}
                alt="Assistente virtual"
              />
            </Link>
          </li>
        </ul>
      </main>
    </div>
  )
}

export default Home
